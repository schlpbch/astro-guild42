import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";
import eventFilter from "./eventFilter";

interface Topic {
  tag: string;
  tagName: string;
}

const getUniqueTopics = (events: CollectionEntry<"blog">[]) => {
  const topics: Topic[] = events
    .filter(eventFilter)
    .flatMap(event => event.data.tags)
    .map(tag => ({ tag: slugifyStr(tag), tagName: tag }))
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return topics;
};

export default getUniqueTopics;
