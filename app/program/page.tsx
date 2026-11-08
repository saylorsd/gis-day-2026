import { Linebreaks } from "@/components/Markdown";
import { People } from "@/components/People";
import { program, type Session, type Subsession, type Talk } from "@/lib/content";
import { clockTime } from "@/lib/time";

export const metadata = { title: program().title };

export default function ProgramPage() {
    const { sessions } = program();
    return (
        <main className="mx-auto max-w-2xl px-4">
            <h2 className="sr-only">Schedule</h2>
            <img src="/images/agenda.gif" alt="agenda" className="mt-4 h-16 md:h-auto" />
            <section id="lightning-talks">
                {sessions.length === 0 && <p>The schedule hasn&apos;t been posted yet.</p>}
                {sessions.map((session, i) => (
                    <SessionBlock key={session.name} session={session} index={i} />
                ))}
            </section>
        </main>
    );
}

function SessionBlock({ session, index }: { session: Session; index: number }) {
    return (
        <article id={`session-${index + 1}`} className="not-first:mt-8">
            <header className="mb-2">
                <h3 className="m-0 text-4xl leading-none font-black uppercase">
                    {session.name.includes("Lightning") && (
                        <img className="h-6" alt="bolt" aria-hidden="true" src="/images/bolt-down.gif" />
                    )}{" "}
                    {session.name}
                </h3>
                <p className="my-2 text-xl leading-none">
                    <time dateTime={session.start}>{clockTime(session.start)}</time> <span>→</span>{" "}
                    <time dateTime={session.end}>{clockTime(session.end)}</time>
                </p>
            </header>
            <div>
                {session.subsessions.map((subsession, i) => (
                    <SubsessionBlock key={i} subsession={subsession} />
                ))}
            </div>
        </article>
    );
}

function SubsessionBlock({ subsession }: { subsession: Subsession }) {
    return (
        <div className="py-4">
            <ol className="m-0 list-none pl-0 text-2xl font-bold">
                {subsession.talks.map((talk) => (
                    <li key={talk.title}>
                        <TalkBlock talk={talk} />
                    </li>
                ))}
            </ol>
            {subsession.qaMinutes > 0 && (
                <p className="text-2xl font-medium">
                    <img className="h-8" src="/images/question-mark.gif" aria-hidden="true" alt="Question Mark" />{" "}
                    <span>Q&amp;A &middot; {subsession.qaMinutes} minutes</span>{" "}
                    <img className="h-8" src="/images/question-mark.gif" aria-hidden="true" alt="Question Mark" />
                </p>
            )}
        </div>
    );
}

function TalkBlock({ talk }: { talk: Talk }) {
    return (
        <article className="mb-8">
            <h4 className="m-0">{talk.title}</h4>
            <People people={talk.speakers} />
            {talk.description && <Linebreaks text={talk.description} />}
        </article>
    );
}
