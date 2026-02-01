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
    items: sortedEvents.map(({ data, slug }) => {
      // Determine the image URL
      let imageUrl = `${SITE.website}${SITE.ogImage}`;
      if (data.ogImage) {
        if (typeof data.ogImage === "string") {
          imageUrl = data.ogImage.startsWith("http")
            ? data.ogImage
            : `${SITE.website}${data.ogImage}`;
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
          type: "image/jpeg",
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
