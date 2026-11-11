import {Details} from "@/components/Details";
import {tabling} from "@/lib/content";
import {Linebreaks} from "@/components/Markdown";

export const metadata = {title: tabling().title, description: tabling().description};

export default function TablingPage() {
  const {title, tables} = tabling();
  return (
    <main className="mx-auto max-w-2xl px-4">
      <h1 className="page-title">{title}</h1>
      <ul className="m-0 pl-0 list-none">
        {tables.length === 0 && <li>Tabling groups coming soon.</li>}
        {tables.map((table, i) => (
          <li key={table.name} id={`table-${i + 1}`} className="mb-12">
            <h3 className="m-0">{table.name}</h3>
            {table.table_number && <p>Table {table.table_number}</p>}
            {table.organization && (
              <p className="m-0">
                <span className="text-5xl leading-0">⌙</span>
                <span>{table.organization.name}</span>
              </p>
            )}
            <Linebreaks text={table.description ?? ""}/>
          </li>
        ))}
      </ul>
    </main>
  );
}
