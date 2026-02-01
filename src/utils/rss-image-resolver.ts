import { SITE } from "@config";
import { getMimeType, DEFAULT_MIME_TYPE } from "../config/mime-types";
import type { ImageResolution } from "../types";
import {
  buildAbsoluteUrl,
  buildAssetUrl,
  getFileExtension,
  getBaseFilename,
} from "./url-builder";

/**
 * Resolves the best image for an event using priority:
 * 1. ogImage from frontmatter (custom or Astro image object)
 * 2. First image extracted from markdown content
 * 3. Site default ogImage
 */
export function resolveEventImage(
  data: { ogImage?: any },
  body?: string
): ImageResolution {
  // Default fallback
  const defaultImage: ImageResolution = {
    imageUrl: buildAbsoluteUrl(SITE.ogImage),
    imageType: DEFAULT_MIME_TYPE,
  };

  // Priority 1: Check for ogImage in frontmatter
  if (data.ogImage) {
    return resolveOgImage(data.ogImage, defaultImage);
  }

  // Priority 2: Extract from markdown content
  const markdownImage = extractMarkdownImage(body);
  if (markdownImage) {
    return markdownImage;
  }

  // Priority 3: Default fallback
  return defaultImage;
}

/**
 * Resolves ogImage field which can be either a string URL or Astro image object
 */
function resolveOgImage(
  ogImage:
    | string
    | { src?: string; format?: string; width?: number; height?: number },
  fallback: ImageResolution
): ImageResolution {
  if (typeof ogImage === "string") {
    return {
      imageUrl: buildAbsoluteUrl(ogImage),
      imageType: getMimeType(getFileExtension(ogImage)),
    };
  }

  // Handle Astro image object
  if (ogImage.src) {
    return {
      imageUrl: buildAbsoluteUrl(ogImage.src),
      imageType: ogImage.format ? `image/${ogImage.format}` : DEFAULT_MIME_TYPE,
    };
  }

  return fallback;
}

/**
 * Extracts and optimizes the first image from markdown content
 */
function extractMarkdownImage(body?: string): ImageResolution | null {
  if (!body) return null;

  const imageMatch = body.match(/!\[.*?\]\(@assets\/images\/([^)]+)\)/);
  if (!imageMatch?.[1]) return null;

  const filename = imageMatch[1];
  const extension = getFileExtension(filename);

  return generateOptimizedImageUrl(filename, extension);
}

/**
 * Generates optimized image URLs based on Astro's processing patterns
 */
function generateOptimizedImageUrl(
  filename: string,
  extension?: string
): ImageResolution {
  const baseName = getBaseFilename(filename);

  // Astro optimization patterns
  switch (extension) {
    case "png":
    case "jpg":
    case "jpeg":
      // Photos converted to WebP for better compression
      return {
        imageUrl: buildAssetUrl(`${baseName}.webp`),
        imageType: "image/webp",
      };

    case "svg":
      // SVGs kept as-is
      return {
        imageUrl: buildAssetUrl(filename),
        imageType: "image/svg+xml",
      };

    case "webp":
    case "avif":
      // Modern formats preserved
      return {
        imageUrl: buildAssetUrl(filename),
        imageType: getMimeType(extension),
      };

    default:
      // Fallback for unknown extensions
      return {
        imageUrl: buildAssetUrl(filename),
        imageType: getMimeType(extension),
      };
  }
}
