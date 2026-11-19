"use client";

import useSWR from "swr";
import { API_BASE_URL } from "@/lib/auth";
import type { Product } from "@/lib/products";
import { toPublicImage } from "@/utils/image";

export type ApiProduct = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  price: string;
  sale_price: string | null;
  price_max: string | null;
  category: Product["category"];
  created_at: string;
  updated_at: string;
};

function toNumber(value: string | null | undefined): number | undefined {
  if (value == null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export function mapApiProduct(api: ApiProduct): Product {
  const salePrice = toNumber(api.sale_price);
  const priceMax = toNumber(api.price_max);
  return {
    id: String(api.id),
    name: api.name,
    price: toNumber(api.price) ?? 0,
    ...(salePrice !== undefined ? { salePrice } : {}),
    ...(priceMax !== undefined ? { priceMax } : {}),
    image: toPublicImage(api.image),
    category: api.category,
  };
}

export async function fetchProducts(options?: {
  category?: string;
  signal?: AbortSignal;
}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (options?.category) params.set("category", options.category);
  const query = params.toString();
  const path = `/products/${query ? `?${query}` : ""}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to load products (${response.status})`);
  }

  const data = (await response.json()) as ApiProduct[];
  return data.map(mapApiProduct);
}


export type UseProductsOptions = {
  category?: string;
};

function productsKey(options?: UseProductsOptions) {
  return ["products", options?.category ?? null] as const;
}

async function productsFetcher([
  ,
  category,
]: readonly ["products", string | null]): Promise<Product[]> {
  return fetchProducts(category ? { category } : undefined);
}

export function useProducts(options?: UseProductsOptions) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    productsKey(options),
    productsFetcher,
  );

  return {
    products: data ?? [],
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
