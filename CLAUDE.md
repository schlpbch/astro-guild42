# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Guild42 is a static website for a software engineering community in Berne, Switzerland. Built with Astro 5, React, Tailwind CSS, and TypeScript. Deployed to Netlify at guild42.ch.

## Commands

```bash
pnpm dev              # Local dev server
pnpm build            # Production build (astro build + jampack optimization)
pnpm preview          # Preview production build locally
pnpm lint             # ESLint
pnpm format:check     # Prettier check
pnpm format           # Prettier fix
pnpm sync             # Sync Astro content collections
```

Package manager is **pnpm** (v10.22).

## Architecture

- **Content collection**: Events are markdown files in `src/content/events/`. Schema defined in `src/content/config.ts` with Zod validation. Key fields: `speakers`, `pubDatetime`, `upcoming` (boolean for future events), `topics`, `draft`.
- **Layouts**: `Layout.astro` (base HTML), `Events.astro` (event list), `EventDetails.astro` (single event).
- **Pages**: File-based routing in `src/pages/`. Dynamic event pages via `[slug]/index.astro`. OG images generated at build time via `[slug]/index.png.ts` using satori + resvg-js.
- **Site config**: `src/config.ts` contains site metadata, patron list (with categories), community list, and social links.
- **Utils**: Event filtering/sorting helpers in `src/utils/` — `getSortedPastEvents`, `getSortedForthcomingEvents`, `getEventsByTopic`, `eventFilter`.

## Path Aliases (tsconfig)

`@assets/*`, `@components/*`, `@config`, `@content/*`, `@layouts/*`, `@pages/*`, `@styles/*`, `@utils/*` — all resolve to `src/<name>/*`.

## Adding a New Event

Create a markdown file in `src/content/events/`. Follow naming convention `YYYY_MM_DD_Title.md`. Frontmatter must include: `author`, `speakers` (array), `pubDatetime`, `title`, `topics` (array), `description`. Set `upcoming: true` for future events. OG images require minimum 1200×630px.

## Styling

Tailwind with custom CSS variable-based theming (skin colors: base, accent, inverted, card, card-muted). Dark/light mode supported. Font: IBM Plex Mono. Typography plugin used for markdown content styling.

## Pre-commit

Husky + lint-staged runs linting on staged files before commits. Commitizen (`pnpm cz`) available for conventional commit messages.
