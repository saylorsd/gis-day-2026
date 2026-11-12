import { AccessibilityMenu } from "./AccessibilityMenu";
import { HomeButton } from "./HomeButton";
import { DecorativeImage } from "@/components/DecorativeImage";

/** Site title on every page, with a HOME button off the home page. */
export function Header() {
  return (
    <header className="px-4 py-6 text-center md:px-12">
      <div className="mx-auto flex w-fit items-center">
        <DecorativeImage className="h-12" src="/images/earthani.gif" />
        <h1 className="mt-2 mb-0 p-0 text-6xl font-black text-shadow-md">
          {" "}
          GIS Day 2026{" "}
        </h1>
        <DecorativeImage className="h-12" src="/images/earthani.gif" />
      </div>
      <div className="mx-auto mt-2 flex w-full max-w-md items-center justify-between">
        {Array.from({ length: 9 }, (_, i) => (
          <DecorativeImage
            key={i}
            className="h-6"
            src={i % 2 ? "/images/compass2.gif" : "/images/globe-clean.gif"}
          />
        ))}
      </div>
      <HomeButton />
      <AccessibilityMenu />
    </header>
  );
}
