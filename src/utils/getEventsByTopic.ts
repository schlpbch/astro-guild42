import type { CollectionEntry } from "astro:content";
import getSortedEvents from "./getSortedPastEvents";
import { slugifyAll } from "./slugify";

const getEventsByTopic = (events: CollectionEntry<"events">[], topic: string) =>
  getSortedEvents(
    events.filter(event => slugifyAll(event.data.topics).includes(topic))
  );

export default getEventsByTopic;
