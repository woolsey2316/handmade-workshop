"use client";

import { BlogPostList } from "@/components/blog/BlogPostList";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { PageHero } from "@/components/blog/PageHero";
import { Partners } from "@/components/home/Partners";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { usePosts } from "@/hooks/api/use-posts";

export default function BlogPage() {
  const { posts, isLoading, error } = usePosts();
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          title="Blog"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Blog" },
          ]}
        />
        <section className="mx-auto max-w-300 px-5 py-12 md:py-16">
          <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-14">
            <BlogSidebar posts={posts ?? []} />
            <BlogPostList posts={posts ?? []} />
          </div>
        </section>
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
