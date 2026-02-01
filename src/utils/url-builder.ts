import { SITE } from "@config";

/**
 * Builds a complete URL from a relative path
 */
export function buildAbsoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE.website}${path}`;
}

/**
 * Builds an optimized asset URL for Astro processed images
 */
export function buildAssetUrl(filename: string): string {
  return `${SITE.website}_astro/${filename}`;
}

/**
 * Builds an event URL from a slug
 */
export function buildEventUrl(slug: string): string {
  return `${SITE.website}events/${slug}/`;
}

/**
 * Gets the file extension from a filename
 */
export function getFileExtension(filename: string): string | undefined {
  return filename.split(".").pop()?.toLowerCase();
}

/**
 * Gets the base filename without extension
 */
export function getBaseFilename(filename: string): string {
  return filename.replace(/\.[^/.]+$/, "");
}
