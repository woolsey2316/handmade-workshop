import { API_BASE_URL } from "@/lib/auth";
import type { BlogPost } from "@/lib/blog";
import { toPublicImage } from "@/utils/image";

export type ApiPost = {
  id: number;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
  slug: string;
  author: string;
  categories: string[];
  comments: number;
  tags: string[];
};

export function mapApiPost(api: ApiPost): BlogPost {
  const content = api.content ?? "";
  const excerpt =
    content.split(/\n\n+/).find((part) => part.trim().length > 0)?.trim() ?? "";

  return {
    id: String(api.id),
    title: api.title,
    content,
    image: toPublicImage(api.image),
    date: api.created_at,
    excerpt,
    tags: api.tags ?? [],
    slug: api.slug,
    author: api.author,
    categories: api.categories ?? [],
    comments: api.comments,
  };
}

export async function fetchPosts(options?: {
  slug?: string;
  signal?: AbortSignal;
}): Promise<BlogPost[]> {
  const params = new URLSearchParams();
  if (options?.slug) params.set("slug", options.slug);
  const query = params.toString();
  const path = `/posts/${query ? `?${query}` : ""}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to load posts (${response.status})`);
  }

  const data = (await response.json()) as ApiPost[];
  return data.map(mapApiPost);
}
