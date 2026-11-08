import type {Person} from "@/lib/content";

/** Speakers or map creators, with their organization and department. */
export function People({people}: { people: Person[] }) {
  return (
    <ul className="list-none pl-0 mt-0">
      {people.map((person) => {
        const hasAffiliation = person.title || person.organization || person.department;
        return (
          <li key={person.id} className="mt-1 text-lg font-medium leading-none m-0 ml-2">
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
