import type { ReactNode } from "react";

/**
 * CSS replacement for <marquee>: content scrolls right to left in a loop.
 *
 * The content is rendered twice and the track slides by half its width, so
 * the loop is seamless. The second copy is aria-hidden so screen readers only
 * hear the content once.
 *
 * Motion stops (content just sits still) when:
 * - the visitor's system asks for reduced motion (prefers-reduced-motion), or
 * - "Hide animations" is on in the Accessibility menu (.no-gifs on <html>).
 * It also pauses on hover. Styles: .marquee in app/styles/main.css.
 *
 * Pass `decorative` for text that adds nothing for screen reader users,
 * so the whole thing is hidden from them.
 */
export function Marquee({
  children,
  className = "",
  seconds = 12,
  decorative = false,
}: {
  children: ReactNode;
  className?: string;
  /** Time for one full loop. */
  seconds?: number;
  decorative?: boolean;
}) {
  return (
    <div
      className={`marquee ${className}`}
      style={{ "--marquee-duration": `${seconds}s` } as React.CSSProperties}
      aria-hidden={decorative || undefined}
    >
      <div className="marquee-track">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </div>
    </div>
  );
}
