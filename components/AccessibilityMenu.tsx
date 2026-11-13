"use client";

import { useEffect, useState } from "react";

/**
 * Accessibility options, saved in localStorage and applied as classes on <html>
 * (styled in app/styles/main.css). ACCESSIBILITY_SCRIPT applies the saved
 * choices before first paint so the GIFs and tiles don't flash in.
 */
const OPTIONS = [
  {
    key: "no-gifs",
    label: "Hide animations",
    query: "(prefers-reduced-motion: reduce)",
  },
  { key: "no-bg", label: "Remove background tiles", query: null },
  {
    key: "high-contrast",
    label: "High contrast",
    query: "(prefers-contrast: more)",
  },
] as const;

type Key = (typeof OPTIONS)[number]["key"];

const storageKey = (key: Key) => `a11y:${key}`;

/**
 * Inline <head> script. With no saved choice, "Hide animations" follows
 * prefers-reduced-motion and "High contrast" follows prefers-contrast: more.
 */
export const ACCESSIBILITY_SCRIPT = `(function () {
  try {
    var c = document.documentElement.classList;
    function apply(key, query) {
      var saved = localStorage.getItem("a11y:" + key);
      if (saved === "1" || (saved === null && query && matchMedia(query).matches)) c.add(key);
      // Follow the system setting live (including DevTools emulation) until
      // the visitor makes their own choice in the menu.
      if (query) matchMedia(query).addEventListener("change", function (e) {
        try {
          if (localStorage.getItem("a11y:" + key) === null) c.toggle(key, e.matches);
        } catch (err) {}
      });
    }
    apply("no-gifs", "(prefers-reduced-motion: reduce)");
    // A saved "off" overrides the reduced-motion CSS in main.css.
    if (localStorage.getItem("a11y:no-gifs") === "0") c.add("show-gifs");
    apply("no-bg");
    apply("high-contrast", "(prefers-contrast: more)");
  } catch (e) {}
})();`;

export function AccessibilityMenu() {
  const [enabled, setEnabled] = useState<Record<Key, boolean>>(
    () =>
      Object.fromEntries(OPTIONS.map(({ key }) => [key, false])) as Record<
        Key,
        boolean
      >,
  );

  // Sync with whatever the head script applied, now and when a system
  // preference changes later.
  useEffect(() => {
    const html = document.documentElement;
    const sync = () =>
      setEnabled(
        Object.fromEntries(
          OPTIONS.map(({ key }) => [key, html.classList.contains(key)]),
        ) as Record<Key, boolean>,
      );
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggle = (key: Key, on: boolean) => {
    const query = OPTIONS.find((o) => o.key === key)?.query;
    const systemDefault = query ? matchMedia(query).matches : false;
    const c = document.documentElement.classList;
    c.toggle(key, on);
    // Only remember a choice that overrides the system setting. Picking the
    // system's own answer clears the saved choice, so the option goes back to
    // following the system (otherwise flipping a toggle on and off would pin
    // it and ignore later changes to the system setting).
    if (key === "no-gifs") c.toggle("show-gifs", !on && systemDefault);
    try {
      if (on === systemDefault) localStorage.removeItem(storageKey(key));
      else localStorage.setItem(storageKey(key), on ? "1" : "0");
    } catch {}
    setEnabled((prev) => ({ ...prev, [key]: on }));
  };

  return (
    <details className="mx-auto mt-2 w-fit text-center">
      <summary className="btn">Accessibility</summary>
      <div className="field mt-2 max-w-sm text-left">
        <fieldset className="m-0 border-none p-0">
          <legend className="sr-only">Accessibility options</legend>
          {OPTIONS.map(({ key, label }) => (
            <label key={key} className="block cursor-pointer text-lg">
              <input
                type="checkbox"
                checked={enabled[key]}
                onChange={(e) => toggle(key, e.target.checked)}
              />{" "}
              {label}
            </label>
          ))}
        </fieldset>
        <p>
          <a href="https://www.streamtext.net/player?event=GIS-for-All">
            Follow live captioning
          </a>
        </p>
        <p className="mt-3 border-t border-[#808080] pt-2 text-base">
          If you require accessibility accommodations, please email Jessica
          Benner (
          <a href="mailto:jbenner@andrew.cmu.edu?subject=Accessibility">
            jbenner@andrew.cmu.edu
          </a>
          ) with the word &ldquo;accessibility&rdquo; in the subject line to
          share your needs.
        </p>
      </div>
    </details>
  );
}
