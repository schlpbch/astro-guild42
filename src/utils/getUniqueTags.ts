import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";
import eventFilter from "./eventFilter";

interface Tag {
  tag: string;
  tagName: string;
}

const getUniqueTags = (events: CollectionEntry<"blog">[]) => {
  const tags: Tag[] = events
    .filter(eventFilter)
    .flatMap(event => event.data.tags)
    .map(tag => ({ tag: slugifyStr(tag), tagName: tag }))
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
};

export default getUniqueTags;
