import Image from "next/image";
import { blogPosts } from "@/lib/products";

export function BlogSection() {
  return (
    <section className="bg-[#fafafa] py-14 md:py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-10 text-center">
          <p className="font-[family-name:var(--font-script)] text-3xl text-accent">
            Stories
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
            From our blog
          </h2>
          <div className="mx-auto mt-4 h-px w-14 bg-accent" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="group bg-white">
              <a href="#" className="relative block aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </a>
              <div className="p-6">
                <p className="text-[12px] text-muted">
                  {post.date}
                  <span className="mx-1.5">|</span>
                  {post.author}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-medium text-ink transition-colors group-hover:text-accent">
                  <a href="#">{post.title}</a>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <a
                  href="#"
                  className="mt-5 inline-flex text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
                >
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
