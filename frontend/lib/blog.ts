export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string };

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  categories: string[];
  tags: string[];
  comments: number;
  content: string;
  type?: "standard" | "video" | "gallery" | "audio" | "quote";
  quote?: { text: string; author: string };
};

export const blogCategories = [
  "Destination",
  "Food",
  "Landscape",
  "Nature",
  "Photography",
  "Travel",
  "Uncategorized",
] as const;

export function postHref(post: Pick<BlogPost, "slug">) {
  return `/blog/${post.slug}`;
}
