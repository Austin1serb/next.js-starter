# Next.js Service Business Starter

Starter for marketing-focused business sites built with Next.js App Router.

Small [project wiki](wiki/AGENTS.md) included. Replace its [overview](wiki/pages/project-overview.md) when starting a new website; add focused pages only as needed.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Motion
- React Zero UI
- Icons: @react-zero-ui/icon-sprite, which has full lucide and tabler icon sets
- Playwright for testing
- Biome for linting, formatting, import organization, and utility class sorting

## Code Quality

- `npm run lint` checks lint rules, formatting, and imports.
- `npm run lint:fix` applies formatting, import organization, and safe fixes.
- `npm run format` formats supported files; `npm run format:check` checks formatting.
- `npm run format:classes` applies utility class sorting fixes only.
- `npm run type-check` runs TypeScript, which Biome does not replace.

Install the `biomejs.biome` VS Code extension for the workspace's format and fix on save settings. Husky checks remain opt-in in `.husky/pre-commit`.

`biome.json` keeps the shared Serbyte rules with React/Next.js domains, Tailwind CSS directives, generated-file exclusions, and Playwright overrides. Next.js source retains global `process.env` access for framework replacement; contact handlers may log warnings and errors.

Placeholder links in the design preview skip destination validation. Templated email HTML is excluded because its encoded inline CSS cannot be parsed by Biome. Application accessibility checks remain enabled. Class sorting has a separate fix command; `cn` and `twMerge` are excluded because argument order can affect merged styles.

Biome currently leaves Markdown, MDX, and YAML unformatted. Its utility class sorter does not fully reproduce the Tailwind Prettier plugin; see [Biome's class sorting limitations](https://biomejs.dev/linter/rules/use-sorted-classes/javascript/).

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
