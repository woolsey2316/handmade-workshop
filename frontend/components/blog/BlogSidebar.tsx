import Image from "next/image";
import { blogCategories, postHref, recentPosts } from "@/lib/blog";

export function BlogSidebar() {
  return (
    <aside className="space-y-10">
      <section>
        <h2 className="font-display text-xl font-medium text-ink">Get connected</h2>
        <div className="mt-4 h-px w-10 bg-gold" />
        <ul className="mt-5 flex flex-wrap gap-2">
          {["Twitter", "Facebook", "Vimeo", "Pinterest"].map((network) => (
            <li key={network}>
              <a
                href="#"
                className="inline-flex h-9 min-w-9 items-center justify-center border border-line px-3 text-[11px] font-medium uppercase tracking-wider text-muted transition-colors hover:border-gold hover:text-gold"
              >
                {network}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl font-medium text-ink">Search the blog</h2>
        <div className="mt-4 h-px w-10 bg-gold" />
        <form className="mt-5 flex">
          <input
            type="search"
            placeholder="Enter your keyword"
            className="w-full border border-line px-3 py-2.5 text-sm outline-none focus:border-gold"
          />
          <button
            type="submit"
            className="bg-ink px-4 text-white transition-colors hover:bg-gold"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </form>
      </section>

      <section>
        <h2 className="font-display text-xl font-medium text-ink">Categories</h2>
        <div className="mt-4 h-px w-10 bg-gold" />
        <ul className="mt-5 divide-y divide-line border-y border-line">
          {blogCategories.map((category) => (
            <li key={category}>
              <a
                href="#"
                className="flex items-center justify-between py-3 text-sm text-foreground transition-colors hover:text-gold"
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl font-medium text-ink">Recent posts</h2>
        <div className="mt-4 h-px w-10 bg-gold" />
        <ul className="mt-5 space-y-5">
          {recentPosts.map((post) => (
            <li key={post.id} className="flex gap-3">
              <a
                href={postHref(post)}
                className="relative h-16 w-16 shrink-0 overflow-hidden bg-[#f4f4f4]"
              >
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </a>
              <div className="min-w-0">
                <a
                  href={postHref(post)}
                  className="line-clamp-2 text-sm font-medium text-ink transition-colors hover:text-gold"
                >
                  {post.title}
                </a>
                <p className="mt-1 text-[11px] text-muted">
                  {post.date} <span className="mx-1">|</span> By {post.author}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
