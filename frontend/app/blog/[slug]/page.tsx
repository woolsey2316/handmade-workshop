export const instant = false

import { Suspense } from "react";
import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { Partners } from "@/components/home/Partners";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { fetchPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-300 px-5 py-12 md:py-16">
          <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-14">
            <Suspense fallback={<div>Loading...</div>}>
              <BlogPageContent slug={slug} />
            </Suspense>
          </div>
        </section>
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
