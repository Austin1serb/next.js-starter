# Next.js Service Business Starter

Starter for marketing-focused business sites built with Next.js App Router.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Motion
- React Zero UI
- Icons: @react-zero-ui/icon-sprite, which has full lucide and tabler icon sets
- Playwright for testing

## Environment

The starter expects these variables:

- `SMTP_USER`
- `SMTP_PASSWORD`
- `NEXT_PUBLIC_TURNSTILE_SITEKEY`
- `TURNSTILE_SECRET`

Use `.env.example` as the starting point.

## Project Layout

src/app/        routes, layouts
src/app/(main)/ main layout and main pages
src/config/     site config and schema config
src/hooks/      shared hooks
src/lib/      shared utilities
src/app/components/ui/ shared ui components
e2e/            Playwright tests
