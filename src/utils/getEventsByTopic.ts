import type { CollectionEntry } from "astro:content";
import getSortedEvents from "./getSortedEvents";
import { slugifyAll } from "./slugify";

const getEventsByTopic = (events: CollectionEntry<"blog">[], topic: string) =>
  getSortedEvents(
    events.filter(event => slugifyAll(event.data.topics).includes(topic))
  );

export default getEventsByTopic;
