import type { CollectionEntry } from "astro:content";
import getSortedEvents from "./getSortedEvents";
import { slugifyAll } from "./slugify";

const getEventsByTopic = (events: CollectionEntry<"blog">[], tag: string) =>
  getSortedEvents(
    events.filter(event => slugifyAll(event.data.tags).includes(tag))
  );

export default getEventsByTopic;
