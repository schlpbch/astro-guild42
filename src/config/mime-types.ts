export const MIME_TYPE_MAP: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  svg: "image/svg+xml",
  avif: "image/avif",
  gif: "image/gif",
  ico: "image/x-icon",
} as const;

export const DEFAULT_MIME_TYPE = "image/webp";

export function getMimeType(extension: string | undefined): string {
  if (!extension) return DEFAULT_MIME_TYPE;
  return MIME_TYPE_MAP[extension.toLowerCase()] ?? `image/${extension}`;
}
