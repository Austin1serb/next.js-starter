# Next.js Service Business Starter

Starter for brochure-style service business sites built with Next.js App Router.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Motion
- React Zero UI
- Playwright

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run test:install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

The starter expects these variables:

- `NEXT_PUBLIC_VERCEL_URL`
- `NODE_ENV`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SERBYTE_API_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITEKEY`
- `TURNSTILE_SECRET`

Use `.env.example` as the starting point.

## Scripts

- `npm run dev` starts the local dev server with Turbopack.
- `npm run build` creates a production build.
- `npm run start` runs the production server.
- `npm run lint` runs ESLint.
- `npm run type-check` runs TypeScript without emitting files.
- `npm run format` formats the repo with Prettier.
- `npm run test` runs Playwright tests.
- `npm run test:install` installs Playwright browsers.
- `npm run clean` removes build output and `node_modules`.

## Project Layout

```txt
src/app/        routes, layouts, pages, and app components
src/config/     site config and schema config
src/hooks/      shared hooks
src/utils/      shared utilities
public/         static assets
e2e/            Playwright tests
```

## Starter Checklist

Before using this for a new client site, update:

- `src/config/site-config.ts` with the real business info and domain.
- `src/app/page.tsx` and the route pages with real content.
- `public/` assets like logos, favicon, and social/share images.
- Contact form env vars and any bot protection settings you want enabled.

## Notes

- Playwright runs against the local production server config.
- The sitemap uses the real page file path in `src/app` to derive `lastModified`.
