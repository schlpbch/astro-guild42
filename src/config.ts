import type { Site, SocialObjects, Patron } from "./types";
import { Category } from "./types";

export const SITE: Site = {
  website: "https://guild42.ch/",
  author: "Andreas Schlapbach",
  desc: "Guild42 - Event and Networking Platform for Software Engineering in Berne.",
  title: "Guild42",
  ogImage: "guild42-og.jpg",
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

export const PATRONS: Array<Patron> = [
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
      name: "Johann Fuchs",
      href: "https://www.linkedin.com/in/johann-fuchs-b48a522/",
      category: Category.Life,
    },
  {
    name: "Lightware Solutions GmbH, Bern",
    href: "https://www.lightware-solutions.ch/",
    owner: "Andreas Pfeuti",
    category: Category.Life,
  },
    {
      name: "Daniel Lorch",
      href: "https://www.linkedin.com/in/dlorch/",
      category: Category.Life,
    },
  {
    name: "ROKT GmbH",
    href: "https://rokt.cloud/",
    owner: "Thomas Philipona",
    category: Category.Life,
  },
    {
      name: "sourcefactory.ch",
      href: "https://sourcefactory.ch/",
      owner: "Marce Bouquet, Markus Wild",
      category: Category.Life,
    },
  {
    name: "IMS Informatik und Management Service AG",
    href: "https://www.ims.ch/",
    category: Category.Life,
  },
    {
      name: "Markus Horisberger",
      href: "https://www.linkedin.com/in/markushorisberger/",
      category: Category.Life,
    },
  {
    name: "Matthias Rüedlinger",
    href: "https://www.linkedin.com/in/matthias-rueedlinger/",
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
    name: "Codeblock GmbH",
    href: "https://www.linkedin.com/company/codeblock-gmbh/",
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
    name: "Iterate GmbH",
    href: "https://iterate.ch/",
    owner: "David Kocher, Yves Langisch",
    category: Category.Life,
  }

];

export const SOCIALS: SocialObjects = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/guild42-ch/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:vorstand@guild42.ch",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/guild42ch",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@guild4267",
    linkTitle: `${SITE.title} on YouTube`,
    active: true,
  },
  {
    name: "WhatsApp",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on WhatsApp`,
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
    href: "https://cyberplace.social/@guild42ch",
    linkTitle: `${SITE.title} on Mastodon`,
    active: true,
  },
];
