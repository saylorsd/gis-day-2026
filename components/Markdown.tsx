import { marked } from "marked";

/** Renders Markdown from the YAML content at build time. */
export function Markdown({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const html = marked.parse(text, { async: false });
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

/** Plain text with Django's `linebreaks` behavior: blank lines split paragraphs, newlines become <br>. */
export function Linebreaks({ text }: { text: string }) {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((para, i) => (
      <p key={i} className="m-0 p-0">
        {para.split("\n").map((line, j) => (
          <span key={j}>
            {j > 0 && <br />}
            {line}
          </span>
        ))}
      </p>
    ));
}
