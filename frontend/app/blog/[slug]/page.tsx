import { notFound } from "next/navigation";
import { BlogPostDetail } from "@/components/blog/BlogPostDetail";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { PageHero } from "@/components/blog/PageHero";
import { Partners } from "@/components/home/Partners";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import {
  blogPosts,
  getAdjacentPosts,
  getPostBySlug,
} from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(slug);

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          title={post.title}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: post.categories[0] ?? "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
        <section className="mx-auto max-w-300 px-5 py-12 md:py-16">
          <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-14">
            <BlogSidebar />
            <BlogPostDetail post={post} previous={previous} next={next} />
          </div>
        </section>
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
