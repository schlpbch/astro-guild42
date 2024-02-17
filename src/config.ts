import type { Site, SocialObjects, Patreon } from "./types";
import { Category } from "./types";

export const SITE: Site = {
  website: "https://guild42.ch/", // replace this with your deployed domain
  author: "Andreas Schlapbach",
  desc: "Guild 42 - Event and Networking Platform for Software Engineering in Berne.",
  title: "Guild 42",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const PATREONS: Array<Patreon> = [
  {
    name: "adesso Schweiz AG, Bern",
    href: "https://www.adeesso.ch/",
    category: Category.Everything,
  },
  {
    name: "ti&m AG, Bern & Zürich",
    href: "https://www.ti8m.ch/",
    category: Category.Everything,
  },
  {
    name: "mtrail, Bern",
    href: "https://www.mtrail.ch/",
    category: Category.Everything,
  },
  {
    name: "avega IT AG, Bern",
    href: "https://www.avega.ch/",
    category: Category.Universe,
  },
  {
    name: "72 Services AG, Bern",
    href: "https://www.72services.com/",
    owner: "Simon Martinelli",
    category: Category.Life,
  },
  {
    name: "Lightware Solutions GmbH, Bern",
    href: "https://www.lightware-solutions.ch/",
    owner: "Andreas Pfeuti",
    category: Category.Life,
  },
  {
    name: "Noser Engineering AG, Bern",
    href: "https://www.noser.com/",
    owner: "Stephan Marti",
    category: Category.Life,
  },
  {
    name: "Plaintext GmbH",
    href: "https://plaintext.ch/",
    owner: "Daniel Marthaler",
    category: Category.Life,
  },
  {
    name: "sourcefactory.ch",
    href: "https://sourcefactory.ch/",
    owner: "Marce Bouquet, Markus Wild",
    category: Category.Life,
  },
  {
    name: "Codeblock GmbH",
    href: "https://www.codeblock.ch/",
    owner: "Claude Gex",
    category: Category.Life,
  },
  {
    name: "Glue Software Engineering",
    href: "https://glue.ch/",
    owner: "Igor Metz",
    category: Category.Life,
  },
  {
    name: "ROKT GmbH",
    href: "https://rokt.cloud/",
    owner: "Thomas Philipona",
    category: Category.Life,
  },
  {
    name: "IMS Informatik und Management Service AG",
    href: "https://www.imsag.ch/",
    owner: "Alexander Meyer",
    category: Category.Life,
  },
  {
    name: "Iterate GmbH",
    href: "https://iterate.ch/",
    owner: "David Kocher, Yves Langisch",
    category: Category.Life,
  },
  {
    name: "Aschi Hegg",
    category: Category.Life,
  },
  {
    name: "Daniel Lorch",
    category: Category.Life,
  },
  {
    name: "Johann Fuchs",
    category: Category.Life,
  },
  {
    name: "Markus Horisberger",
    category: Category.Life,
  },
  {
    name: "Matthias Rüedlinger",
    category: Category.Life,
  },
  {
    name: "Beat Kappert",
    category: Category.Life,
  },
];

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:yourmail@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: "Twitter",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: "YouTube",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: "WhatsApp",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on WhatsApp`,
    active: false,
  },
  {
    name: "Discord",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "GitLab",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
  {
    name: "Telegram",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
  },
  {
    name: "Mastodon",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },
];
