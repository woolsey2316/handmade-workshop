import { BlogPostList } from "@/components/blog/BlogPostList";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { PageHero } from "@/components/blog/PageHero";
import { Partners } from "@/components/home/Partners";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { blogPosts } from "@/lib/blog";

export default function BlogPage() {
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
            <BlogSidebar />
            <BlogPostList posts={blogPosts} />
          </div>
        </section>
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
