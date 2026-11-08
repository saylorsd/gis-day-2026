import { Linebreaks } from "@/components/Markdown";
import { tabling } from "@/lib/content";

export const metadata = { title: tabling().title };

export default function TablingPage() {
    const { title, tables } = tabling();
    return (
        <main>
            <h1>{title}</h1>
            <ul>
                {tables.length === 0 && <li>Tabling groups coming soon.</li>}
                {tables.map((table, i) => (
                    <li key={table.name} id={`table-${i + 1}`}>
                        <h3>{table.name}</h3>
                        {table.table_number && <p>Table {table.table_number}</p>}
                        {table.organization && table.organization.name !== table.name && (
                            <p>{table.organization.name}</p>
                        )}
                        {table.description && <Linebreaks text={table.description} />}
                    </li>
                ))}
            </ul>
        </main>
    );
}
