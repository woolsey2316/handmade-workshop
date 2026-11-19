/** Prefer `/public` assets (same filenames as seeded media) so next/image works. */
export function toPublicImage(image: string | null): string {
  if (!image) return "/product-01-570x570.jpg";
  try {
    const path = image.startsWith("http") ? new URL(image).pathname : image;
    const filename = path.split("/").filter(Boolean).pop();
    if (filename) return `/${filename}`;
  } catch {
    // fall through
  }
  return image.startsWith("/") ? image : `/${image}`;
}