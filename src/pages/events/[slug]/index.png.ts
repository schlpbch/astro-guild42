import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForEvent } from "@utils/generateOgImages";
import { slugifyStr } from "@utils/slugify";

export async function getStaticPaths() {
  const events = await getCollection("blog").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return events.map(event => ({
    params: { slug: slugifyStr(event.data.title) },
    props: event,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(
    await generateOgImageForEvent(props as CollectionEntry<"blog">),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
