import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedEvents from "@utils/getSortedPastEvents";
import { buildRssItem } from "@utils/rss-item-builder";
import { SITE } from "@config";

export async function GET() {
  const events = await getCollection("events");
  const sortedEvents = getSortedEvents(events);

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedEvents.map(buildRssItem),
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
