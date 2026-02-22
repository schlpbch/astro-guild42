import type { CollectionEntry } from "astro:content";
import { SITE } from "@config";

interface JsonLD {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

/**
 * Generate JSON-LD for the Organization
 */
export function generateOrganizationJsonLD(): JsonLD {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.title,
    url: SITE.website,
    logo: `${SITE.website}assets/logo.svg`,
    description: SITE.desc,
    sameAs: [
      "https://www.linkedin.com/company/guild42/",
      "https://github.com/guild42",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
      addressRegion: "Bern",
      addressLocality: "Thun",
    },
  };
}

/**
 * Generate JSON-LD for an Event
 */
export function generateEventJsonLD(
  event: CollectionEntry<"events">,
  baseUrl: string
): JsonLD {
  const { data, slug } = event;
  const eventUrl = `${baseUrl}events/${slug}/`;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: data.title,
    description: data.description,
    url: eventUrl,
    startDate: data.pubDatetime?.toISOString(),
    endDate: data.pubDatetime
      ? new Date(data.pubDatetime.getTime() + 2 * 60 * 60 * 1000).toISOString()
      : undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: data.upcoming
      ? "https://schema.org/EventScheduled"
      : "https://schema.org/EventMovedOnline",
    location: {
      "@type": "Place",
      name: "Guild42 Community",
      address: {
        "@type": "PostalAddress",
        addressCountry: "CH",
        addressRegion: "Bern",
      },
    },
    organizer: {
      "@type": "Organization",
      name: SITE.title,
      url: SITE.website,
    },
    image: data.ogImage
      ? `${baseUrl}${data.ogImage}`
      : `${baseUrl}${SITE.ogImage}`,
    performer: data.speakers?.map(speaker => ({
      "@type": "Person",
      name: speaker,
    })),
    keywords: data.topics?.join(", "),
  };
}

/**
 * Generate JSON-LD for BreadcrumbList
 */
export function generateBreadcrumbJsonLD(
  items: Array<{ name: string; url: string }>
): JsonLD {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
