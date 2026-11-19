"use client";

import useSWR from "swr";
import { fetchPosts } from "@/lib/posts";
import type { BlogPost } from "@/lib/blog";

export type UsePostsOptions = {
  slug?: string;
};

function postsKey(options?: UsePostsOptions) {
  return ["posts", options?.slug ?? null] as const;
}

async function postsFetcher([
  ,
  slug,
]: readonly ["posts", string | null]): Promise<BlogPost[]> {
  return fetchPosts(slug ? { slug } : undefined);
}

export function usePosts(options?: UsePostsOptions) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    postsKey(options),
    postsFetcher,
  );

  return {
    posts: data ?? [],
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
