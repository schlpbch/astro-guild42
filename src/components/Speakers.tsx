import React from "react";

interface SpeakersProps {
  speakers: string[];
}

export default function Speakers({ speakers }: SpeakersProps) {
  return (
    <div>
      {speakers.map((speaker, index) => (
        <span key={index} className=" italic text-base opacity-80 pr-1">
          {speaker}
          {index !== speakers.length - 1 && ","}
        </span>
      ))}
    </div>
  );
}
