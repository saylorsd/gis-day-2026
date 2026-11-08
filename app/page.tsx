import { Markdown } from "@/components/Markdown";
import { home } from "@/lib/content";

// Windows 95 16-color palette, cycled over the menu buttons.
const MENU_COLORS = ["text-[#800000]", "text-[#000080]", "text-[#008000]", "text-[#800080]", "text-[#008080]"];

export const metadata = { title: home().title };

export default function HomePage() {
    const { event, body, menu, sponsors, music } = home();
    return (
        <>
            <main className="mx-auto max-w-2xl px-4">
                <div className="mx-auto max-w-xs">
                    {/* @ts-expect-error <marquee> is obsolete but very 90s */}
                    <marquee className="text-xl font-bold italic">{event.date}</marquee>
                    {event.location.map((line) => (
                        <div key={line} className="text-xl leading-none">
                            {line}
                        </div>
                    ))}
                    <div className="flex items-end justify-center">
                        <img className="h-12" src="/images/scottiebeg-wag2.gif" alt="" />
                        <img className="h-12" src="/images/scottiebeg2.gif" alt="" />
                        <div>
                            <div className="text-3xl leading-none">{event.campus}</div>
                        </div>
                        <img className="h-12" src="/images/scottiebeg.gif" alt="" />
                        <img className="h-12" src="/images/scottiebeg-wag.gif" alt="" />
                    </div>
                </div>

                {body && <Markdown className="mx-auto max-w-3xl px-4" text={body} />}

                <nav>
                    <ul className="mx-auto flex list-none flex-col items-center gap-4 px-4 font-black">
                        {menu.map((item, i) => (
                            <li key={item.href} className="w-full min-w-sm md:w-fit">
                                <a className={`btn xl text-center ${MENU_COLORS[i % MENU_COLORS.length]}`} href={item.href}>
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
                                    <img className="max-h-[100px] max-w-[240px]" src={sponsor.logo} alt={sponsor.name} />
                                ) : (
                                    sponsor.name
                                );
                                return (
                                    <li key={sponsor.name}>
                                        {sponsor.url ? <a href={sponsor.url}>{content}</a> : content}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )}
            </main>
            {music && (
                <midi-player
                    src={encodeURI(music)}
                    sound-font="https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
                />
            )}
        </>
    );
}
