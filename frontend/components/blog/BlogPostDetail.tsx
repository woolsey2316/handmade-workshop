import Image from "next/image";
import type { BlogPost } from "@/lib/blog";
import { postHref } from "@/lib/blog";

export function BlogPostDetail({
  post,
  previous,
  next,
}: {
  post: BlogPost;
  previous: BlogPost | null;
  next: BlogPost | null;
}) {
  return (
    <article>
      {post.type === "quote" && post.quote ? (
        <blockquote className="border border-line bg-[#fafafa] px-8 py-12 text-center md:px-12">
          <p className="font-display text-2xl leading-relaxed text-ink italic md:text-3xl">
            “{post.quote.text}”
          </p>
          <cite className="mt-6 block text-sm not-italic text-muted">
            {post.quote.author}
          </cite>
        </blockquote>
      ) : (
        <div className="relative aspect-video overflow-hidden bg-[#f4f4f4]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover"
          />
          {post.type === "video" && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/25">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-ink">
                ▶
              </span>
            </span>
          )}
        </div>
      )}

      <header className="mt-8">
        <h1 className="font-display text-3xl font-medium text-ink md:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted">
          <li>{post.author}</li>
          <li>{post.date}</li>
          <li>{post.categories.join(", ")}</li>
          <li>
            {post.comments} Comment{post.comments === 1 ? "" : "s"}
          </li>
        </ul>
      </header>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted md:text-base">
        {post.content.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2
                key={index}
                className="pt-2 font-display text-2xl font-medium tracking-wide text-ink uppercase md:text-3xl"
              >
                {block.text}
              </h2>
            );
          }
          if (block.type === "quote") {
            return (
              <blockquote
                key={index}
                className="border-l-2 border-gold bg-[#fafafa] px-6 py-5 font-display text-xl text-ink italic md:px-8 md:text-2xl"
              >
                {block.text}
              </blockquote>
            );
          }
          return <p key={index}>{block.text}</p>;
        })}
      </div>

      <div className="mt-10 flex flex-col gap-6 border-y border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">Tags :</span>
          {post.tags.map((tag) => (
            <a
              key={tag}
              href="/blog"
              className="border border-line px-3 py-1 text-[11px] uppercase tracking-wider text-ink transition-colors hover:border-gold hover:text-gold"
            >
              {tag}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">Share:</span>
          {["Facebook", "Twitter", "Pinterest"].map((network) => (
            <a
              key={network}
              href="#"
              className="border border-line px-3 py-1 text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-gold hover:text-gold"
            >
              {network}
            </a>
          ))}
        </div>
      </div>

      <nav className="mt-8 grid gap-4 border-b border-line pb-8 sm:grid-cols-2">
        {previous ? (
          <a
            href={postHref(previous)}
            className="group border border-line p-4 transition-colors hover:border-gold"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Previous Post
            </span>
            <span className="mt-2 block font-display text-lg text-ink transition-colors group-hover:text-gold">
              {previous.title}
            </span>
          </a>
        ) : (
          <div />
        )}
        {next ? (
          <a
            href={postHref(next)}
            className="group border border-line p-4 text-right transition-colors hover:border-gold sm:justify-self-end"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Next Post
            </span>
            <span className="mt-2 block font-display text-lg text-ink transition-colors group-hover:text-gold">
              {next.title}
            </span>
          </a>
        ) : null}
      </nav>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
          Leave a Reply
        </h2>
        <div className="mt-3 h-px w-10 bg-gold" />
        <p className="mt-5 text-sm text-muted">
          You must be{" "}
          <a href="/my-account" className="text-ink underline-offset-2 hover:text-gold hover:underline">
            logged in
          </a>{" "}
          to post a comment.
        </p>
      </section>
    </article>
  );
}
