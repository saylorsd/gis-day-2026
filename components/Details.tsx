import { Linebreaks } from "@/components/Markdown";

/**
 * Collapsible description: a Win95 button that opens a sunken text field.
 * The button reads "Show details" when closed and "Hide details" when open
 * (pure CSS via the details[open] state, so it works without JavaScript).
 * Renders nothing when there's no text.
 */
export function Details({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <details className="group text-left text-base font-normal">
      <summary className="btn mt-2">
        <span className="group-open:hidden">Show details</span>
        <span className="hidden group-open:inline">Hide details</span>
      </summary>
      <div className="field mt-2">
        <Linebreaks text={text} />
      </div>
    </details>
  );
}
