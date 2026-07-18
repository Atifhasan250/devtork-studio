# DevTork Studio — Next.js 15

A production-oriented, multipage agency website built with the Next.js 15 App Router, React 19, TypeScript, reusable server/client components, Lenis smooth scrolling, accessible motion, dynamic case studies, insights, SEO metadata, and a secure contact route.

## Pages

- `/` — homepage
- `/services` — service details
- `/work` — filterable project archive
- `/work/[slug]` — statically generated case studies
- `/studio` — studio values and capabilities
- `/insights` — article archive
- `/insights/[slug]` — statically generated articles
- `/contact` — validated inquiry form and FAQ
- `/privacy`, `/terms`, custom 404
- `/api/contact` — validated Resend email endpoint

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Contact form

Create a Resend account, verify a sending domain, and set:

```env
RESEND_API_KEY=...
CONTACT_TO_EMAIL=hello@devtork.studio
CONTACT_FROM_EMAIL=DevTork Website <website@verified-domain.com>
NEXT_PUBLIC_SITE_URL=https://devtork.atifhasan.com
```

The endpoint includes schema validation, a honeypot, output escaping, basic IP rate limiting, and generic failure responses. For high-volume deployment, replace the in-memory limiter with a shared Redis/Upstash limiter.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

The project can run on Vercel or any Node.js hosting platform that supports Next.js. Add the environment variables in the hosting dashboard, connect the domain, and deploy.

## Before public launch

Replace concept-project wording where needed, verify all business claims, add final legal details, configure analytics and consent only when required, test the contact email flow, and run accessibility/performance checks on real mobile devices.

## Brand and layout refinements in this build

- DM Sans and Manrope are loaded explicitly in the root layout so the Next.js version matches the typography of the original HTML version.
- The exact supplied DevTork JPG artwork is stored in `public/brand`, with transparent PNG marks extracted from that artwork for interface use. The earlier redrawn SVG assets were removed.
- The navigation is now an original floating dock with indexed links, an availability indicator, and a separate project action.
- Dark-first pages automatically use a light navigation treatment until the header becomes scrolled.
- Home and interior hero sizing now uses `svh`, viewport-aware typography, compact spacing, and short-screen rules so the complete hero composition fits normal desktop and mobile screens.

## V3 refinements

- Added lightweight scroll-based parallax for hero, project, article, and case-study media.
- Added richer reveal, ambient background, hover, progress, and page-enter motion.
- Reworked the custom cursor into a compact comet-style interaction.
- Kept the navigation visible while scrolling and removed the availability message.
- Improved the route transition so its purple cover waits until the next route has rendered.
- Fixed hero-title descender clipping and increased title, copy, and button spacing.
- Lowered interior page hero content on desktop and mobile.
- Simplified the open mobile-menu header so only the close button remains visible.
- Updated the positioning line to “Global digital studio · Bangladesh”.
- Fixed mobile service arrows and reduced the desktop content width for cleaner margins.

## V4 refinements

- Added the timed brand loader with staged progress and a minimum visible duration.
- Restored the restrained circular cursor.
- Reduced desktop navigation height and added the bidirectional text-sweep hover treatment.

## V5 refinements

- Completed loader and route-transition overlays are now unmounted instead of remaining as hidden fixed layers.
- Active overlays use dynamic mobile viewport units (`dvh`, `svh`, and `lvh`) to prevent a purple strip from appearing when a mobile browser toolbar expands or collapses.
- Added the official 1200×630 social link preview at `public/og/devtork-link-preview.jpg`.
- Added complete Open Graph and large-image Twitter metadata. Facebook, WhatsApp, Telegram, LinkedIn, X, Discord, and other compatible link unfurlers can read the same server-rendered preview metadata.
- Set `NEXT_PUBLIC_SITE_URL` to the final public HTTPS domain before deployment so preview image URLs are absolute and accessible to social crawlers.
