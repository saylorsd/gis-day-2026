import { Details } from "@/components/Details";
import { People } from "@/components/People";
import { twMerge } from "tailwind-merge";

import {
  program,
  type Session,
  type Subsession,
  type Talk,
} from "@/lib/content";
import { clockTime } from "@/lib/time";

export const metadata = { title: program().title, description: program().description };

export default function ProgramPage() {
  const { sessions } = program();
  return (
    <main className="mx-auto max-w-2xl px-4">
      <h2 className="page-title gif-fallback">Agenda</h2>
      <img
        src="/images/agenda.gif"
        alt=""
        aria-hidden="true"
        className="mt-4 h-16 md:h-auto"
      />
      <section id="lightning-talks">
        {sessions.length === 0 && (
          <p>The schedule hasn&apos;t been posted yet.</p>
        )}
        {sessions.map((session, i) => (
          <SessionBlock key={session.name} session={session} index={i} />
        ))}
      </section>
    </main>
  );
}

function SessionBlock({ session, index }: { session: Session; index: number }) {
  return (
    <article
      id={`session-${index + 1}`}
      data-type={session.type}
      className={`session-${session.type} not-first:mt-8`}
    >
      <header className="mb-2">
        <div>
          {session.image && (
            <>
              <img
                className="h-12"
                alt=""
                aria-hidden="true"
                src={session.image}
              />{" "}
            </>
          )}
          <h3 className="m-0 flex-col items-center text-4xl leading-none font-black uppercase">
            {session.name}
          </h3>
        </div>
        {session.organization && (
          <p className="my-2 text-2xl leading-none font-bold">
            {session.organization.name}
          </p>
        )}
        <p className="my-2 text-xl leading-none">
          <time dateTime={session.start}>{clockTime(session.start)}</time>
          {session.end && (
            <>
              {" "}
              <span>→</span>
              <time dateTime={session.end}>{clockTime(session.end)}</time>
            </>
          )}
          {session.location && <span> &middot; {session.location}</span>}
        </p>
        {session.sponsor && (
          <p className="my-2 text-lg leading-none italic">
            Sponsored by {session.sponsor}
          </p>
        )}
        <Details text={session.description} />
      </header>
      <div>
        {session.subsessions.map((subsession, i) => (
          <SubsessionBlock key={i} subsession={subsession} />
        ))}
      </div>
    </article>
  );
}

function SubsessionBlock({ subsession }: { subsession: Subsession }) {
  return (
    <div className="py-4">
      <ol className="m-0 list-none pl-0 text-2xl font-bold">
        {subsession.talks.map((talk) => (
          <li key={talk.title}>
            <TalkBlock talk={talk} />
          </li>
        ))}
      </ol>
      {subsession.qaMinutes > 0 && (
        <p className="text-2xl font-medium">
          <img
            className="h-8"
            src="/images/question-mark.gif"
            aria-hidden="true"
            alt="Question Mark"
          />{" "}
          <span>Q&amp;A &middot; {subsession.qaMinutes} minutes</span>{" "}
          <img
            className="h-8"
            src="/images/question-mark.gif"
            aria-hidden="true"
            alt="Question Mark"
          />
        </p>
      )}
    </div>
  );
}

function TalkBlock({ talk }: { talk: Talk }) {
  return (
    <article className="mb-8">
      <h4 className="m-0">{talk.title}</h4>
      <People people={talk.speakers} />
      <Details text={talk.description} />
    </article>
  );
}
