import {Details} from "@/components/Details";
import {People} from "@/components/People";
import {maps} from "@/lib/content";

export const metadata = {title: maps().title, description: maps().description};

export default function MapsPage() {
  const {maps: list, posters} = maps();
  return (
    <main className="mx-auto max-w-2xl px-4">
      <h2 className="page-title gif-fallback">Maps</h2>
      <img src="/images/maps.gif" alt="" aria-hidden="true" className="mt-4 h-16 md:h-auto"/>
      {list.length === 0 && <p>Map submissions coming soon.</p>}
      {list.map((map, i) => (
        <article key={map.title} id={`map-${i + 1}`} className="text-left px-2 mb-12">
          <h3 className="m-0">{map.title}</h3>
          <People people={map.creators}/>
          <Details text={map.description}/>
        </article>
      ))}
      {posters.length > 0 && (
        <section id="posters">
          <h2>Research Posters</h2>
          {posters.map((poster, i) => (
            <article key={poster.title} id={`poster-${i + 1}`} className="text-left px-2">
              <h3>{poster.title}</h3>
              <People people={poster.creators}/>
              <Details text={poster.description}/>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
