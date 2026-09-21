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
- `npm run typecheck` runs TypeScript, which Biome does not replace.

Install the `biomejs.biome` VS Code extension for the workspace's format and fix on save settings. Husky checks remain opt-in in `.husky/pre-commit`.

`biome.json` keeps the shared Serbyte rules with React/Next.js domains, Tailwind CSS directives, generated-file exclusions, and Playwright overrides. Next.js source retains global `process.env` access for framework replacement; contact handlers may log warnings and errors.

Biome's file-size limit is 2 MiB so it can resolve Playwright's type declarations, which exceed the default 1 MiB limit. `noUnresolvedImports` remains enabled.

Placeholder links in the design preview skip destination validation. Templated email HTML is excluded because its encoded inline CSS cannot be parsed by Biome. Application accessibility checks remain enabled. Class sorting has a separate fix command; `cn` and `twMerge` are excluded because argument order can affect merged styles.

Biome currently leaves Markdown, MDX, and YAML unformatted. Its utility class sorter does not fully reproduce the Tailwind Prettier plugin; see [Biome's class sorting limitations](https://biomejs.dev/linter/rules/use-sorted-classes/javascript/).

## Design Tokens

Edit the small palette and fluid type scale in `src/app/globals.css`. Colors use roles: `background` for the page, `surface` for cards and panels, `muted` for subdued areas, and `inverse` for dark sections. Pair a surface with its `-foreground` color, such as `bg-surface text-surface-foreground`.

`primary` and `secondary` are the main and supporting brand colors; `accent` adds emphasis. `success`, `warning`, and `danger` communicate status. Use `border` for dividers and `ring` for keyboard focus. Derive soft fills and states with utilities like `bg-primary/10`, `border-primary/20`, and `hover:bg-primary/90`. Tailwind supplies spacing, radius, and shadows.

These are project conventions based on [semantic color pairs](https://ui.shadcn.com/docs/theming) and [Tailwind theme variables](https://tailwindcss.com/docs/theme), not a universal token dictionary.

## Environment

Email delivery uses:

- `SMTP_USER`
- `SMTP_PASSWORD`

Use `.env.example` as the starting point.

### Optional Turnstile

The contact form uses `@marsidev/react-turnstile`. Set both `NEXT_PUBLIC_TURNSTILE_SITEKEY` and `TURNSTILE_SECRET` to enable the widget and server verification. If either key is unset or blank, the widget is hidden and the contact action skips CAPTCHA entirely. No code change is needed to opt out.

Configured sites require a valid token before processing the form. The widget clears expired tokens and resets after each submission attempt. Real keys also require the `contact` action and the hostname from `DOMAIN_URL`; set `TURNSTILE_HOSTNAMES` to a comma-separated allowlist when the same form uses multiple hostnames.

The commented pair in `.env.example` is Cloudflare's public test configuration. Test keys use Siteverify but return synthetic action/hostname values, so those metadata checks apply only to real keys. Use your own widget keys for a live site. See [Cloudflare's testing guide](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) and the [Turnstile Spin skill](https://github.com/cloudflare/skills/blob/main/skills/turnstile-spin/SKILL.md).

## Request Attribution

`src/proxy.ts` records first and last attribution touches and starts a 30-minute attribution session. Next.js requires it alongside `src/app`. It handles page GET requests and skips API routes, Next.js internals, file assets, and prefetch requests so background requests do not count as visits.

## Project Layout

src/app/        routes, layouts
src/app/(main)/ main layout and main pages
src/config/     site config and schema config
src/hooks/      shared hooks
src/lib/      shared utilities
src/app/components/ui/ shared ui components
e2e/            Playwright tests
