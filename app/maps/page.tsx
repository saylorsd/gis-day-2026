import { Linebreaks } from "@/components/Markdown";
import { People } from "@/components/People";
import { maps } from "@/lib/content";

export const metadata = { title: maps().title };

export default function MapsPage() {
    const { maps: list } = maps();
    return (
        <main>
            <h2 className="sr-only">Maps</h2>
            <img src="/images/maps.gif" alt="maps" className="mt-4 h-16 md:h-auto" />
            {list.length === 0 && <p>Map submissions coming soon.</p>}
            {list.map((map, i) => (
                <article key={map.title} id={`map-${i + 1}`}>
                    <h3>{map.title}</h3>
                    <People people={map.creators} />
                    {map.description && <Linebreaks text={map.description} />}
                </article>
            ))}
        </main>
    );
}
