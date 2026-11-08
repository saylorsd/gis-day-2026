import type { Metadata } from "next";
import { Blocks } from "@/components/Blocks";
import { contentPage, contentPageSlugs } from "@/lib/content";

// One static page per content/pages/*.yaml; anything else is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => contentPageSlugs().map((slug) => ({ slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const page = contentPage((await params).slug);
    return { title: page.title, description: page.description };
}

export default async function ContentPage({ params }: Props) {
    const page = contentPage((await params).slug);
    return (
        <main className="mx-auto max-w-2xl px-4">
            <h1>{page.title}</h1>
            <div className="content">
                <Blocks blocks={page.body} />
            </div>
        </main>
    );
}
