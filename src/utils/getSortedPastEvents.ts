import type { CollectionEntry } from "astro:content";
import eventFilter from "./eventFilter";

const getSortedEvents = (events: CollectionEntry<"blog">[]) => {
  return events
    .filter(eventFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

export default getSortedEvents;
