import {HomeButton} from "./HomeButton";

/** Site title on every page, with a HOME button off the home page. */
export function Header() {
  return (
    <header className="px-4 py-6 text-center md:px-12 ">
      <div className="mx-auto flex w-fit items-center">
        <img className="h-12" alt="earth" aria-hidden="true" src="/images/earthani.gif"/>
        <h1 className="mt-2 mb-0 p-0 text-6xl font-black text-shadow-md"> GIS Day 2026 </h1>
        <img className="h-12" alt="earth" aria-hidden="true" src="/images/earthani.gif"/>
      </div>
      <div className="mx-auto flex w-full max-w-md items-center justify-between mt-2">
        {Array.from({length: 9}, (_, i) => (
          <img
            key={i}
            className="h-6"
            src={i % 2 ? "/images/compass2.gif" : "/images/globe-clean.gif"}
            alt=""
            aria-hidden="true"
          />
        ))}

      </div>
      <HomeButton/>
    </header>
  );
}
