import type { CollectionEntry } from "astro:content";
import { SITE } from "@config";
import type { RssItemData } from "../types";
import { resolveEventImage } from "./rss-image-resolver";
import { buildEventUrl } from "./url-builder";

/**
 * Builds a complete RSS item for an event
 */
export function buildRssItem({
  data,
  slug,
  body,
}: {
  data: CollectionEntry<"events">["data"];
  slug: string;
  body?: string;
}): RssItemData {
  const { imageUrl, imageType } = resolveEventImage(data, body);

  return {
    link: `events/${slug}/`,
    title: data.title,
    description: data.description || data.title,
    pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    author: data.speakers?.join(", ") || SITE.author,
    categories: data.topics || [],
    enclosure: {
      url: imageUrl,
      type: imageType,
      length: 0,
    },
    customData: buildCustomData(data, slug, imageUrl),
  };
}

/**
 * Builds the custom XML data for RSS items
 */
function buildCustomData(
  data: CollectionEntry<"events">["data"],
  slug: string,
  imageUrl: string
): string {
  const eventDateXml = data.eventDate
    ? `<eventDate>${data.eventDate}</eventDate>`
    : "";

  const locationXml = data.location
    ? `<location><![CDATA[${data.location}]]></location>`
    : "";

  const imageDimensions = getImageDimensions(data.ogImage);

  return `
    <language>en-us</language>
    ${eventDateXml}
    ${locationXml}
    <image>
      <url>${imageUrl}</url>
      <title>${data.title}</title>
      <link>${buildEventUrl(slug)}</link>
      <description>${data.description || data.title}</description>
      ${imageDimensions.width}
      ${imageDimensions.height}
    </image>
  `;
}

/**
 * Extracts image dimensions from Astro image objects
 */
function getImageDimensions(ogImage?: any): { width: string; height: string } {
  const hasImageData =
    ogImage && typeof ogImage !== "string" && ogImage.width && ogImage.height;

  return {
    width: hasImageData ? `<width>${ogImage.width}</width>` : "",
    height: hasImageData ? `<height>${ogImage.height}</height>` : "",
  };
}
