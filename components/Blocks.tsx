import type { Block, Cell } from "@/lib/content";
import { Markdown } from "./Markdown";

/** One item per line, like Wagtail's table cells. */
function CellLines({ cell }: { cell: Cell | undefined }) {
  const lines = Array.isArray(cell) ? cell : String(cell ?? "").split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line}
    </span>
  ));
}

/** The body of a content page: Markdown and table blocks. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, i) => {
    if ("markdown" in block) {
      return (
        <Markdown key={i} className="block-paragraph" text={block.markdown} />
      );
    }
    const { columns, rows, caption } = block.table;
    return (
      <div key={i} className="block-table">
        <table>
          {caption && <caption>{caption}</caption>}
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {columns.map((column) => (
                  <td key={column}>
                    <CellLines cell={row[column]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  });
}
