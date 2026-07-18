# DevTork Studio — Next.js 15 V6

A production-oriented, multipage agency website built with the Next.js 15 App Router, React 19, TypeScript, Lenis smooth scrolling, accessible motion, dynamic case studies, insights, SEO metadata, and a validated contact route.

## V6 refined highlights

- The heavy multi-layer canvas was replaced with a lightweight KOTA-inspired soft-spectrum gradient using native CSS radial gradients.
- Removed background pointer tracking, animated grids, rings, light beams, blur filters, and continuous ambient JavaScript work.
- Existing content parallax remains, but now runs only while scrolling or resizing and settles through a small requestAnimationFrame loop.
- Fixed the desktop navbar side-extension bug by keeping the full-width header transparent and applying glass styling only to the inner navigation capsule.
- Dark sections, layouts, loader, custom cursor, page transitions, mobile menu, forms, and responsive behaviour remain unchanged.
- Canonical URLs, Open Graph URLs, sitemap, robots, and link-preview metadata now use `https://devtork1.vercel.app`.
- Facebook, WhatsApp, Telegram, LinkedIn, X, Discord, and other preview clients use the existing 1200×630 preview image through an absolute URL.
- Reduced-motion support remains enabled.

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

## Environment variables

```env
RESEND_API_KEY=...
CONTACT_TO_EMAIL=hello@devtork.studio
CONTACT_FROM_EMAIL=DevTork Website <website@verified-domain.com>
NEXT_PUBLIC_SITE_URL=https://devtork1.vercel.app
```

`NEXT_PUBLIC_SITE_URL` must use the final public HTTPS domain so Facebook, WhatsApp, Telegram, LinkedIn, X, Discord, and other link-unfurling services can load the absolute Open Graph image URL.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Before launch

Verify business claims and project wording, add final legal details, configure analytics and consent where required, test the contact-email flow, and run accessibility/performance checks on real desktop and mobile devices.
