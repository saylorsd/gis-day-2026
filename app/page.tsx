import { Markdown } from "@/components/Markdown";
import { MidiPlayer } from "@/components/MidiPlayer";
import { home } from "@/lib/content";
import { DecorativeImage } from "@/components/DecorativeImage";

// Windows 95 16-color palette, cycled over the menu buttons.
const MENU_COLORS = [
  "text-[#800000]",
  "text-[#000080]",
  "text-[#005000]",
  "text-[#800080]",
  "text-[#005050]",
];

export const metadata = {
  title: home().title,
  description: home().description,
};

export default function HomePage() {
  const { event, body, menu, sponsors, music } = home();
  return (
    <>
      <main className="mx-auto max-w-2xl px-4">
        <div className="mx-auto max-w-xs">
          <p className="m-0 text-xl font-bold italic">
            <a href="/friday">{event.date}</a>
          </p>
          {event.location.map((line) => (
            <div key={line} className="text-xl leading-none">
              {line}
            </div>
          ))}
          <div className="flex items-end justify-center">
            <DecorativeImage
              className="h-6"
              src="/images/scottiebeg-wag2.gif"
            />
            <DecorativeImage className="h-6" src="/images/scottiebeg2.gif" />
            <div>
              <div className="text-2xl leading-none">{event.campus}</div>
            </div>
            <DecorativeImage className="h-6" src="/images/scottiebeg.gif" />
            <DecorativeImage className="h-6" src="/images/scottiebeg-wag.gif" />
          </div>
        </div>
        {/* @ts-expect-error <marquee> is obsolete but fits the style of this site and serves no informational purpose*/}
        <marquee className="m-0 mt-1 text-xl leading-none font-bold text-pink-800 italic">
          GIS DAY&nbsp;&nbsp;&nbsp;&nbsp; GIS DAY&nbsp;&nbsp;&nbsp;&nbsp; GIS
          DAY&nbsp;&nbsp;&nbsp;&nbsp; GIS DAY
          {/* @ts-expect-error <marquee> is obsolete but fits the style of this site and serves no informational purpose*/}
        </marquee>
        {body && (
          <Markdown
            className="home-content m-0 mx-auto max-w-3xl leading-snug"
            text={body}
          />
        )}

        <nav>
          <ul className="mx-auto flex list-none flex-col items-center gap-4 px-4 font-black">
            {menu.map((item, i) => (
              <li key={item.href} className="w-full min-w-sm md:w-fit">
                <a
                  className={`btn xl text-center ${MENU_COLORS[i % MENU_COLORS.length]}`}
                  href={item.href}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {sponsors.length > 0 && (
          <section className="mx-auto max-w-4xl px-4">
            <h2>Sponsors</h2>
            <ul className="flex list-none flex-wrap items-center justify-center gap-6 pl-0">
              {sponsors.map((sponsor) => {
                const content = sponsor.logo ? (
                  <img
                    className="max-h-25 max-w-60"
                    src={sponsor.logo}
                    alt={sponsor.name}
                  />
                ) : (
                  sponsor.name
                );
                return (
                  <li key={sponsor.name}>
                    {sponsor.url ? (
                      <a href={sponsor.url}>{content}</a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
        {music && <MidiPlayer src={music} />}
      </main>

      <footer className="mx-auto max-w-2xl">
        <img
          src="/images/Crono_critical.gif"
          alt="Crono from Chrono Trigger"
          className="mx-auto mb-0 inline-block size-12"
        />
        <p className="inline-block text-center text-sm text-gray-600">
          © 2026 Steve Saylor & Pittsburgh GIS Day Steering Committee
        </p>
      </footer>
    </>
  );
}
