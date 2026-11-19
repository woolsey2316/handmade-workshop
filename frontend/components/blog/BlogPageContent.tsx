import { fetchPosts } from "@/lib/posts";
import { BlogPostDetail } from "./BlogPostDetail";
import { BlogSidebar } from "./BlogSidebar";

export async function BlogPageContent({ slug }: { slug: string }) {
  const posts = await fetchPosts();
  const post = posts.find((item) => item.slug === slug);

  const index = posts.findIndex((item) => item.slug === slug);
  const previous = index === -1 ? null : (posts[index + 1] ?? null);
  const next = index === -1 ? null : (posts[index - 1] ?? null);

  return (
    <>
      <BlogSidebar posts={posts} />
      <BlogPostDetail post={post} previous={previous} next={next} />
    </>
  );
}
