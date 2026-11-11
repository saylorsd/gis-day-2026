export const metadata = {
  title: "Friday the 13th",
  description: "Meet Bit, the unofficial mascot of Pittsburgh GIS Day 2026.",
};

export default async function ContentPage() {
  return (
    <main className="mx-auto max-w-2xl px-4">
      <h1 className="page-title">Friday the 13th</h1>
      <div className="content text-center">
        <img
          src="/images/bit.png"
          alt="Steve's cat Bit"
          className="max-h-52 md:max-h-96"
        />
        <p className="text-center">
          <em>Bit - The Unofficial Mascot for GIS Day 2026</em>
        </p>
        <p className="text-center">
          <a href="https://stevesaylor.dev/bit">See more of her</a>
        </p>
      </div>
    </main>
  );
}
