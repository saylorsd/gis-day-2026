import type { Person } from "@/lib/content";

/** Speakers or map creators, with their organization and department. */
export function People({ people }: { people: Person[] }) {
    return (
        <ul className="list-none pl-4">
            {people.map((person) => {
                const hasAffiliation = person.title || person.organization || person.department;
                return (
                    <li key={person.id} className="mt-1 text-lg font-medium">
                        <span className="font-bold">{person.name}</span>
                        {hasAffiliation && (
                            <>
                                {" "}
                                <span>{person.organization?.name}</span>{" "}
                                <span>{person.department}</span>
                            </>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
