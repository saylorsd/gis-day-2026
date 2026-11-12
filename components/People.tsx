import type { Person } from "@/lib/content";

/** Speakers or map creators, with their organization and department. */
export function People({ people }: { people: Person[] }) {
  return (
    <ul className="mt-0 list-none pl-0">
      {people.map((person) => {
        const hasAffiliation =
          person.title || person.organization || person.department;
        return (
          <li
            key={person.id}
            className="m-0 mt-1 ml-2 text-lg leading-none font-medium"
          >
            <span className="text-5xl leading-0">⌙</span>
            <span className="font-bold">{person.name}</span>
            {hasAffiliation && (
              <>
                {", "}
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
