import type { CollectionEntry } from "astro:content";
import getSortedEvents from "./getSortedEvents";
import { slugifyAll } from "./slugify";

const getEventsByTopic = (posts: CollectionEntry<"blog">[], tag: string) =>
  getSortedEvents(
    posts.filter(post => slugifyAll(post.data.tags).includes(tag))
  );

export default getEventsByTopic;
