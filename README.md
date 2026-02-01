# Guild42 website

The Guild42 website is a static site built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). It serves as the online presence for the Guild42 community, showcasing our events, and resources.

## Features

- **Static Site**: Fast and efficient, built with Astro.
- **Responsive Design**: Optimized for all devices using Tailwind CSS.
- **Dark Mode**: Supports dark mode for better user experience.
- **Markdown Support**: Content is written in Markdown for easy editing and readability.
- **RSS Feed**: Automatic RSS feed generation for events at `/rss.xml`.
- **Social Media Integration**: Links to our social media profiles for community engagement.

## Getting Started

The site uses [PNPM](https://pnpm.io) as package manager, thus run `pnpm run dev` for development and `pnpm run build` for production builds.

## Content Management

### Adding Events

Events are stored as Markdown files in `src/content/events/`. Each event file includes:

- Front matter with metadata (date, title, speakers, topics, etc.)
- Event description and details in Markdown format

### Managing Surveys

Survey data and schemas are located in:

- `src/data/surveys/` - Survey response data
- `src/config/survey-schemas.ts` - Survey structure definitions
- `scripts/process-survey-data.py` - Data processing utilities

### Pages and Layouts

- **Pages**: Located in `src/pages/` for route-based pages
- **Layouts**: Reusable page templates in `src/layouts/`
- **Components**: UI components in `src/components/`

### Styling and Assets

- **Styles**: Global styles in `src/styles/base.css`
- **Images**: Static images in `src/assets/images/`
- **Public Assets**: Files in `public/` are served directly

## Origin

The codebase is based on [Astro Paper](https://astro-paper.pages.dev/) by [Sat Naing](https://satnaing.dev) 👨🏻‍💻 and [contributors](https://github.com/satnaing/astro-paper/graphs/contributors).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
