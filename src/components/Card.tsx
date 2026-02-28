import { slugifyStr } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";
import SubHeading from "./SubHeading";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"events">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, speakers, pubDatetime, modDatetime, description } =
    frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <SubHeading
        pubDatetime={pubDatetime}
        modDatetime={modDatetime}
        speakers={speakers}
      />
      <p>{description}</p>
    </li>
  );
}
