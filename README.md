# Next.js Starter

Minimal starter powered by Next.js 15, React 19, TypeScript, Tailwind CSS v4, Motion, React Zero UI, and Playwright for E2E tests.

## Features

- Next.js 15 (App Router) with React 19
- TypeScript
- Tailwind CSS v4
- Motion animations
- React Zero UI State management and icon sprite
- Playwright end‑to‑end testing
- ESLint + Prettier

## Prerequisites

- Node.js 20+
- npm 10+

## Quick start

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Scripts

- `dev`: Start the dev server (Turbopack)
- `build`: Create a production build
- `start`: Start the production server (after `build`)
- `lint`: Run ESLint
- `type-check`: Run TypeScript in no‑emit mode
- `format`: Prettier format
- `clean`: Remove `.next`, `node_modules`, and lockfile
- `test`: Run Playwright tests

## Testing (Playwright)

This project runs tests against the production server.

```bash
npm run build
npm test
```

Notes:

- Base URL defaults to `http://localhost:3000`. You can override with `NEXT_PUBLIC_VERCEL_URL`.
- The test runner will reuse an existing server locally when possible.

## Environment variables

Next.js automatically loads variables from `.env.local`, `.env.development`, `.env.production`, etc.

Common variables:

- `NEXT_PUBLIC_VERCEL_URL` – Used by Playwright as `baseURL` when set.

## Project layout

```
app/                # Routes, layouts, pages, and UI components
e2e/                # Playwright tests
public/             # Static assets and icon sprite
utils/              # Utilities (env helpers, motion wrappers)
```

Icons: an SVG sprite is generated via the prebuild step and placed at `public/icons.svg`.

## License

This starter is provided as‑is; add a license file if you plan to distribute.