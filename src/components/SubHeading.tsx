import Datetime from "./Datetime";
import Speakers from "./Speakers";

interface SubHeadingProps {
  pubDatetime: string | Date;
  modDatetime: string | Date | undefined | null;
  speakers: string[];
}

export default function SubHeading({
  pubDatetime,
  modDatetime,
  speakers,
}: SubHeadingProps) {
  return (
    <div className="flex items-start gap-4 pt-2 ">
      <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} size="lg" />
      &ndash;
      <Speakers speakers={speakers} />
    </div>
  );
}
