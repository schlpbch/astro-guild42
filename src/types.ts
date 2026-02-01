import type socialIcons from "@assets/socialIcons";

export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
  scheduledPostMargin: number;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

export type Patron = {
  name: string;
  href?: string;
  owner?: string;
  category: Category;
};

export type Community = {
  name: string;
  href: string;
};

export enum Category {
  Member42,
  Life,
  Universe,
  Everything,
}

export type SocialMedia =
  | "Github"
  | "Instagram"
  | "LinkedIn"
  | "Mail"
  | "Twitter"
  | "YouTube"
  | "WhatsApp"
  | "Snapchat"
  | "Pinterest"
  | "Telegram"
  | "Mastodon"
  | "Bluesky";

export interface ImageResolution {
  imageUrl: string;
  imageType: string;
}

export interface RssItemData {
  link: string;
  title: string;
  description: string;
  pubDate: Date;
  author: string;
  categories: string[];
  enclosure: {
    url: string;
    type: string;
    length: number;
  };
  customData: string;
}
