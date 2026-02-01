import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedEvents from "@utils/getSortedPastEvents";
import { SITE } from "@config";

export async function GET() {
  const events = await getCollection("events");
  const sortedEvents = getSortedEvents(events);

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedEvents.map(({ data, slug, body }) => {
      // Determine the image URL - prioritize ogImage, then extract from markdown
      let imageUrl = `${SITE.website}${SITE.ogImage}`;
      let imageType = "image/jpeg";

      // Check for ogImage in frontmatter first
      if (data.ogImage) {
        if (typeof data.ogImage === "string") {
          imageUrl = data.ogImage.startsWith("http")
            ? data.ogImage
            : `${SITE.website}${data.ogImage}`;
        } else {
          // Handle Astro image reference - use the src property
          imageUrl = data.ogImage.src
            ? `${SITE.website}${data.ogImage.src}`
            : `${SITE.website}${SITE.ogImage}`;

          // Get proper MIME type from the image format if available
          if (data.ogImage.format) {
            imageType = `image/${data.ogImage.format}`;
          }
        }
      } else {
        // Extract first image from markdown content
        const imageMatch = body?.match(/!\[.*?\]\(@assets\/images\/([^)]+)\)/);
        if (imageMatch && imageMatch[1]) {
          const filename = imageMatch[1];

          // Extract base filename without extension for Astro processed assets
          const baseName = filename.replace(/\.[^/.]+$/, "");
          const extension = filename.split(".").pop()?.toLowerCase();

          // Use the optimized image path that Astro generates
          // Astro typically creates optimized versions with different formats
          if (
            extension === "png" ||
            extension === "jpg" ||
            extension === "jpeg"
          ) {
            // For photos, Astro often converts to WebP for better compression
            imageUrl = `${SITE.website}_astro/${baseName}.webp`;
            imageType = "image/webp";
          } else if (extension === "svg") {
            // SVGs are usually kept as-is
            imageUrl = `${SITE.website}_astro/${filename}`;
            imageType = "image/svg+xml";
          } else if (extension === "webp") {
            imageUrl = `${SITE.website}_astro/${filename}`;
            imageType = "image/webp";
          } else if (extension === "avif") {
            imageUrl = `${SITE.website}_astro/${filename}`;
            imageType = "image/avif";
          } else {
            // Fallback to original filename
            imageUrl = `${SITE.website}_astro/${filename}`;
            imageType = `image/${extension || "jpeg"}`;
          }
        }
      }

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
        customData: `
          <language>en-us</language>
          ${data.eventDate ? `<eventDate>${data.eventDate}</eventDate>` : ""}
          ${data.location ? `<location><![CDATA[${data.location}]]></location>` : ""}
          <image>
            <url>${imageUrl}</url>
            <title>${data.title}</title>
            <link>${SITE.website}events/${slug}/</link>
            <description>${data.description || data.title}</description>
            ${
              data.ogImage &&
              typeof data.ogImage !== "string" &&
              data.ogImage.width
                ? `<width>${data.ogImage.width}</width>`
                : ""
            }
            ${
              data.ogImage &&
              typeof data.ogImage !== "string" &&
              data.ogImage.height
                ? `<height>${data.ogImage.height}</height>`
                : ""
            }
          </image>
        `,
      };
    }),
    customData: `
      <language>en-us</language>
      <managingEditor>${SITE.author}</managingEditor>
      <webMaster>${SITE.author}</webMaster>
      <generator>Astro v4</generator>
      <image>
        <url>${SITE.website}${SITE.ogImage}</url>
        <title>${SITE.title}</title>
        <link>${SITE.website}</link>
        <description>${SITE.desc}</description>
      </image>
    `,
  });
}
