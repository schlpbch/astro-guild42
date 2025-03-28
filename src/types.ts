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
  href: string;
  owner?: string;
  category: Category;
};

export type Community = {
  name: string;
  href: string;
};

export enum Category {
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
