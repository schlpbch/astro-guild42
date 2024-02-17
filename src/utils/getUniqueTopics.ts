import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";
import eventFilter from "./eventFilter";

interface Topic {
  topic: string;
  topicName: string;
}

const getUniqueTopics = (events: CollectionEntry<"blog">[]) => {
  const topics: Topic[] = events
    .filter(eventFilter)
    .flatMap(event => event.data.topics)
    .map(topic => ({ topic: slugifyStr(topic), topicName: topic }))
    .filter(
      (value, index, self) =>
        self.findIndex(topic => topic.topic === value.topic) === index
    )
    .sort((tagA, tagB) => tagA.topic.localeCompare(tagB.topic));
  return topics;
};

export default getUniqueTopics;
