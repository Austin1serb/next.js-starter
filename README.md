# Next.js 15 Starter Repo with TypeScript, Tailwind, shadcn/ui, and Best Practices

## Setup

### 1. Initialize the Next.js Project

```sh
npx create-next-app@latest my-project --typescript --tailwind --eslint
cd my-project
```

### 2. Install Dependencies

```sh
npm install
```

## Project Structure

```tsx
📂 next.js-starter/
│── 📂 .vscode
│   └── settings.json \\ Updated TypeScript Interpretor to Next.js
│── 📂 app
│   │── 📂 privacy-policy
│   │   │── PrivacyPolicy.tsx
│   │   └── page.tsx
│   │── 📂 terms-of-service
│   │   │── Terms.tsx
│   │   └── page.tsx
│   │── error.tsx
│   │── favicon.ico
│   │── globals.css
│   │── layout.tsx
│   │── page.tsx
│   │── robots.ts
│   └── sitemap.ts // Automcatic sitemap generation
│── 📂 config
│   └── site.ts // Company information will be used in Metadata & Terms and Policy pages
│── 📂 public
│── .env
│── .prettierignore
│── .prettierrc
│── README.md
│── components.json
│── eslint.config.mjs
│── next.config.ts
│── package-lock.json
│── package.json
│── postcss.config.mjs
└── tsconfig.json
```
