/**
 * Loads the YAML files in content/ at build time.
 *
 * Every reference (person ids, organization ids) is checked, so a typo in the
 * YAML fails `next build` with a message saying which file and entry is wrong.
 */
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const CONTENT_DIR = path.join(process.cwd(), "content");

/** Minutes each lightning talk gets. */
export const TALK_MINUTES = 5;

function load<T>(file: string): T {
    const full = path.join(CONTENT_DIR, file);
    try {
        return YAML.parse(fs.readFileSync(full, "utf8")) as T;
    } catch (error) {
        throw new Error(`content/${file}: ${(error as Error).message}`);
    }
}

function fail(file: string, message: string): never {
    throw new Error(`content/${file}: ${message}`);
}

// --- Organizations & people -------------------------------------------------

export type Organization = { id: string; name: string; website?: string };

export type Person = {
    id: string;
    name: string;
    title?: string;
    department?: string;
    organization?: Organization;
};

type RawPerson = Omit<Person, "id" | "organization"> & { organization?: string };

export function organizations(): Map<string, Organization> {
    const raw = load<Record<string, Omit<Organization, "id">>>("organizations.yaml") ?? {};
    return new Map(Object.entries(raw).map(([id, org]) => [id, {id, ...org}]));
}

function organizationRef(file: string, where: string, id: string | undefined) {
    if (!id) return undefined;
    const org = organizations().get(id);
    if (!org) fail(file, `${where}: unknown organization "${id}" (see organizations.yaml)`);
    return org;
}

export function people(): Map<string, Person> {
    const raw = load<Record<string, RawPerson>>("people.yaml") ?? {};
    return new Map(
        Object.entries(raw).map(([id, p]) => [
            id,
            {...p, id, organization: organizationRef("people.yaml", id, p.organization)},
        ]),
    );
}

function peopleRefs(file: string, where: string, ids: string[] | undefined): Person[] {
    const all = people();
    return (ids ?? []).map((id) => {
        const person = all.get(id);
        if (!person) fail(file, `${where}: unknown person "${id}" (see people.yaml)`);
        return person;
    });
}

// --- Home -------------------------------------------------------------------

export type Sponsor = { name: string; logo?: string; url?: string };

export type Home = {
    title: string;
    description?: string;
    subtitle?: string;
    event: { date: string; location: string[]; campus: string };
    body?: string;
    menu: { title: string; href: string }[];
    sponsors: Sponsor[];
    music?: string;
};

export function home(): Home {
    const data = load<Home>("home.yaml");
    return {...data, menu: data.menu ?? [], sponsors: data.sponsors ?? []};
}

// --- Program ----------------------------------------------------------------

export type Talk = {
    title: string;
    description?: string;
    speakers: Person[];
    start: string; // "HH:MM"
    end: string;
};

export type Subsession = { title?: string; qaMinutes: number; talks: Talk[] };

export const SESSION_TYPES = ["lightning", "presentation", "meal", "activity", "general", "social"] as const;
export type SessionType = (typeof SESSION_TYPES)[number];

/** Title image (in public/images/) for sessions that don't set their own `image`. */
const DEFAULT_SESSION_IMAGES: Partial<Record<SessionType, string>> = {
    lightning: "bolt-down.gif",
    presentation: "radio_microphone_lg.gif",
    meal: "eat.gif",
};

function imageRef(file: string, where: string, name: string | undefined) {
    if (!name) return undefined;
    if (!fs.existsSync(path.join(process.cwd(), "public", "images", name)))
        fail(file, `${where}: image "${name}" not found in public/images/`);
    return `/images/${name}`;
}

export type Session = {
    name: string;
    type: SessionType;
    /** Title image URL, e.g. "/images/eat.gif". */
    image?: string;
    start: string;
    end?: string;
    organization?: Organization;
    note?: string;
    location?: string;
    description?: string;
    subsessions: Subsession[];
};

type RawProgram = {
    title: string;
    description?: string;
    sessions?: {
        name: string;
        type: string;
        image?: string;
        start: string;
        end?: string;
        organization?: string;
        note?: string;
        location?: string;
        description?: string;
        subsessions?: {
            title?: string;
            qa_minutes?: number;
            talks?: { title: string; description?: string; speakers?: string[] }[];
        }[];
    }[];
};

const toMinutes = (file: string, where: string, hhmm: string) => {
    const match = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm));
    if (!match) fail(file, `${where}: time "${hhmm}" should look like "09:15" (quote it)`);
    return Number(match[1]) * 60 + Number(match[2]);
};

const fromMinutes = (minutes: number) =>
    `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

export function program(): { title: string; description?: string; sessions: Session[] } {
    const file = "program.yaml";
    const data = load<RawProgram>(file);
    const sessions = (data.sessions ?? []).map((s) => {
        const where = `session "${s.name}"`;
        // Talks run back to back from the session start, with Q&A after each subsession.
        let clock = toMinutes(file, where, s.start);
        if (s.end) toMinutes(file, where, s.end);
        if (!SESSION_TYPES.includes(s.type as SessionType))
            fail(file, `${where}: type "${s.type}" should be one of ${SESSION_TYPES.join(", ")}`);
        const subsessions = (s.subsessions ?? []).map((ss) => {
            const talks = (ss.talks ?? []).map((t) => {
                const start = clock;
                clock += TALK_MINUTES;
                return {
                    title: t.title,
                    description: t.description,
                    speakers: peopleRefs(file, `talk "${t.title}"`, t.speakers),
                    start: fromMinutes(start),
                    end: fromMinutes(clock),
                };
            });
            const qaMinutes = ss.qa_minutes ?? 5;
            clock += qaMinutes;
            return {title: ss.title, qaMinutes, talks};
        });
        return {
            name: s.name,
            type: s.type as SessionType,
            image: imageRef(file, where, s.image ?? DEFAULT_SESSION_IMAGES[s.type as SessionType]),
            start: s.start,
            end: s.end,
            organization: organizationRef(file, where, s.organization),
            note: s.note,
            location: s.location,
            description: s.description,
            subsessions,
        };
    });
    return {title: data.title, description: data.description, sessions};
}

// --- Maps & tables ---------------------------------------------------------

export type MapSubmission = { title: string; description?: string; creators: Person[] };

export function maps(): { title: string; description?: string; maps: MapSubmission[]; posters: MapSubmission[] } {
    const file = "maps.yaml";
    type RawEntry = { title: string; description?: string; creators?: string[] };
    type Raw = { title: string; description?: string; maps?: RawEntry[]; posters?: RawEntry[] };
    const data = load<Raw>(file);
    const resolve = (entries: RawEntry[] | undefined, kind: string) =>
        (entries ?? [])
            .map((m) => ({...m, creators: peopleRefs(file, `${kind} "${m.title}"`, m.creators)}))
            .sort((a, b) => a.title.localeCompare(b.title));
    return {
        title: data.title,
        description: data.description,
        maps: resolve(data.maps, "map"),
        posters: resolve(data.posters, "poster"),
    };
}

export type TablingGroup = {
    name: string;
    organization?: Organization;
    table_number?: string;
    description?: string;
};

export function tabling(): { title: string; description?: string; tables: TablingGroup[] } {
    const file = "tables.yaml";
    type Raw = {
        title: string;
        description?: string;
        tables?: (Omit<TablingGroup, "organization"> & { organization?: string })[]
    };
    const data = load<Raw>(file);
    const tables = (data.tables ?? [])
        .map((t) => ({
            ...t,
            table_number: t.table_number == null ? undefined : String(t.table_number),
            organization: organizationRef(file, `table "${t.name}"`, t.organization),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    return {title: data.title, description: data.description, tables};
}

// --- Content pages (content/pages/*.yaml) -----------------------------------

export type Cell = string | string[];
export type Block =
    | { markdown: string }
    | { table: { columns: string[]; rows: Record<string, Cell>[]; caption?: string } };

export type ContentPage = { slug: string; title: string; description?: string; body: Block[] };

export function contentPageSlugs(): string[] {
    return fs
        .readdirSync(path.join(CONTENT_DIR, "pages"))
        .filter((f) => f.endsWith(".yaml"))
        .map((f) => f.replace(/\.yaml$/, ""));
}

export function contentPage(slug: string): ContentPage {
    const file = `pages/${slug}.yaml`;
    const data = load<Omit<ContentPage, "slug">>(file);
    (data.body ?? []).forEach((block, i) => {
        if (!("markdown" in block) && !("table" in block)) {
            fail(file, `body block ${i + 1} should be "markdown" or "table"`);
        }
    });
    return {slug, ...data, body: data.body ?? []};
}
