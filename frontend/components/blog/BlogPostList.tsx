import Image from "next/image";
import type { BlogPost } from "@/lib/blog";
import { postHref } from "@/lib/blog";

export function BlogPostList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="space-y-12">
      {posts.map((post) => (
        <article key={post.id} className="group flex flex-col gap-4 sm:flex-row">
          {post.type === "quote" && post.quote ? (
            <a href={postHref(post)} className="block flex-1">
              <blockquote className="border border-line bg-[#fafafa] px-8 py-10 text-center md:px-12">
                <p className="font-display text-2xl leading-relaxed text-ink italic md:text-3xl">
                  “{post.quote.text}”
                </p>
                <cite className="mt-6 block text-sm not-italic text-muted">
                  {post.quote.author}
                </cite>
              </blockquote>
            </a>
          ) : (
            <a
              href={postHref(post)}
              className="relative block aspect-video w-full shrink-0 overflow-hidden bg-[#f4f4f4] sm:w-56 md:w-72"
            >
              <Image
                src={post.image}
                alt={post.title}
                sizes="(max-width: 640px) 100vw, 288px"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {post.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-ink">
                    ▶
                  </span>
                </span>
              )}
              {post.type === "gallery" && (
                <span className="absolute right-3 top-3 bg-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Gallery
                </span>
              )}
              {post.type === "audio" && (
                <span className="absolute inset-x-0 bottom-0 bg-ink/85 px-4 py-3 text-[11px] uppercase tracking-wider text-white">
                  Audio post
                </span>
              )}
            </a>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl font-medium text-ink transition-colors group-hover:text-gold md:text-2xl">
              <a href={postHref(post)}>{post.title}</a>
            </h2>

            <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted">
              <li>{post.author}</li>
              <li>{post.date}</li>
              <li>{post.categories.join(", ")}</li>
              <li>
                {post.comments} Comment{post.comments === 1 ? "" : "s"}
              </li>
            </ul>

            {post.excerpt && (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
                {post.excerpt}
              </p>
            )}

            {post.type !== "quote" && (
              <a
                href={postHref(post)}
                className="mt-5 inline-flex text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-gold"
              >
                View more
              </a>
            )}
          </div>
        </article>
      ))}

      <nav
        aria-label="Blog pagination"
        className="flex items-center justify-center gap-2 pt-4"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center bg-gold text-sm text-white">
          1
        </span>
        <a
          href="#"
          className="inline-flex h-9 w-9 items-center justify-center border border-line text-sm text-ink transition-colors hover:border-gold hover:text-gold"
        >
          2
        </a>
      </nav>
    </div>
  );
}
