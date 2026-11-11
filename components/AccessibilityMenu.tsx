"use client";

import { useEffect, useState } from "react";

/**
 * Accessibility options, saved in localStorage and applied as classes on <html>
 * (styled in app/styles/main.css). ACCESSIBILITY_SCRIPT applies the saved
 * choices before first paint so the GIFs and tiles don't flash in.
 */
const OPTIONS = [
    { key: "no-gifs", label: "Hide animations" },
    { key: "no-bg", label: "Remove background tiles" },
    { key: "high-contrast", label: "High contrast" },
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
    }
    apply("no-gifs", "(prefers-reduced-motion: reduce)");
    apply("no-bg");
    apply("high-contrast", "(prefers-contrast: more)");
  } catch (e) {}
})();`;

export function AccessibilityMenu() {
    const [enabled, setEnabled] = useState<Record<Key, boolean>>(
        () => Object.fromEntries(OPTIONS.map(({ key }) => [key, false])) as Record<Key, boolean>,
    );

    // Sync with whatever the head script applied.
    useEffect(() => {
        const c = document.documentElement.classList;
        setEnabled(Object.fromEntries(OPTIONS.map(({ key }) => [key, c.contains(key)])) as Record<Key, boolean>);
    }, []);

    const toggle = (key: Key, on: boolean) => {
        document.documentElement.classList.toggle(key, on);
        try {
            localStorage.setItem(storageKey(key), on ? "1" : "0");
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
                <p className="mt-3 border-t border-[#808080] pt-2 text-base">
                    If you require accessibility accommodations, please email Jessica Benner (
                    <a href="mailto:jbenner@andrew.cmu.edu?subject=Accessibility">jbenner@andrew.cmu.edu</a>) with
                    the word &ldquo;accessibility&rdquo; in the subject line to share your needs.
                </p>
            </div>
        </details>
    );
}
