import type { Site, SocialObjects, Patron, Community } from "./types";
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
  enable: true,
  svg: true,
  width: 42,
  height: 42,
};

export const PATRONS: Array<Patron> = [
  {
    name: "Algosys GmbH",
    href: "https://algosys.ch/",
    owner: "Nicolas Regez",
    category: Category.Life,
  },
  {
    name: "avega IT AG, Bern",
    href: "https://www.avega.ch/",
    category: Category.Universe,
  },
  {
    name: "Codeblock GmbH",
    href: "https://www.linkedin.com/company/codeblock-gmbh/",
    owner: "Claude Gex",
    category: Category.Life,
  },
  {
    name: "Daniel Lorch",
    href: "https://www.linkedin.com/in/dlorch/",
    category: Category.Life,
  },
  {
    name: "Glue Software Engineering",
    href: "https://glue.ch/",
    owner: "Igor Metz",
    category: Category.Life,
  },
  {
    name: "IMS Informatik und Management Service AG",
    href: "https://www.ims.ch/",
    category: Category.Life,
  },
  {
    name: "Iterate GmbH",
    href: "https://iterate.ch/",
    owner: "David Kocher, Yves Langisch",
    category: Category.Life,
  },
  {
    name: "Johann Fuchs",
    href: "https://www.linkedin.com/in/johann-fuchs-b48a522/",
    category: Category.Life,
  },
  {
    name: "Lightware Solutions GmbH",
    href: "https://www.lightware-solutions.ch/",
    owner: "Andreas Pfeuti",
    category: Category.Life,
  },
  {
    name: "Markus Horisberger",
    href: "https://www.linkedin.com/in/markushorisberger/",
    category: Category.Life,
  },
  {
    name: "Martinelli GmbH",
    href: "https://www.martinelli.ch/",
    owner: "Simon Martinelli",
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
    owner: "Marc Bouquet",
    category: Category.Life,
  },
  {
    name: "Tim&Koko AG",
    href: "https://tim-koko.ch/blog/tim-koko/",
    owner: "Thomas Philipona",
    category: Category.Life,
  },
];

export const COMMUNITY: Array<Community> = [
  {
    name: "cloud native bern",
    href: "https://www.meetup.com/cloudnativebern/",
  },
  {
    name: "cloud native day",
    href: "https://cloudnativeday.ch/",
  },
  {
    name: "bärner go meetup",
    href: "https://berne.gophers.ch/",
  },
  {
    name: "berner architekten treffen",
    href: "https://www.berner-architekten-treffen.ch/",
  },
  {
    name: "uphill conf",
    href: "https://www.uphillconf.com/about",
  },
  {
    name: "/ch/open",
    href: "ttps://www.ch-open.ch/ueber-ch-open/",
  },
  {
    name: "java user group",
    href: "https://www.jug.ch/events/bern/",
  },
  {
    name: "devops bern",
    href: "https://www.meetup.com/devops-bern/",
  },
  {
    name: "microsoft azure bern user group",
    href: "https://www.meetup.com/de-DE/Azure-Cloud-Bern-User-Group/",
  },
  {
    name: "bärner js talks",
    href: "https://www.meetup.com/barner-js-talks/",
  },
  {
    name: "rust bern",
    href: "https://www.meetup.com/rust-bern/",
  },
  {
    name: ".net user group bern",
    href: "https://www.meetup.com/net-user-group-bern/",
  },
  {
    name: "hackergarten bern",
    href: "https://www.meetup.com/hackergarten-bern/",
  },
  {
    name: "bärn häckt",
    href: "https://www.bernhackt.ch/",
  },
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
    active: false,
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
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/guild42ch.bsky.social",
    linkTitle: `${SITE.title} on Bluesky`,
    active: true,
  },
];
