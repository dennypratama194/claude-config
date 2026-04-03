---
paths:
  - "app/**/*.tsx"
  - "app/**/*.jsx"
  - "app/**/*.ts"
  - "src/app/**/*.tsx"
  - "src/app/**/*.ts"
  - "pages/**/*.tsx"
  - "pages/**/*.jsx"
  - "next.config.*"
---

# Next.js Rules
# Loaded only when working with Next.js App Router or Pages Router files

## Read First
Before touching any page or component, read:
1. app/layout.tsx (or pages/_app.tsx) — global layout, fonts, providers
2. app/globals.css or styles/globals.css — global CSS custom properties
3. src/components/ or components/ — what already exists
Do NOT create a component that already exists with a different name.

## App Router Conventions
- Pages go in app/ — one folder per route, page.tsx per segment
- Layouts go in app/layout.tsx — use for shared UI and metadata
- Server Components by default — only add 'use client' when needed (interactivity, hooks, browser APIs)
- Loading states: app/loading.tsx per segment
- Error boundaries: app/error.tsx per segment
- API routes go in app/api/[route]/route.ts

## Pages Router Conventions (legacy)
- Pages in pages/ — one file per route
- API routes in pages/api/
- _app.tsx for global layout/providers
- _document.tsx for HTML shell only

## Data Fetching
- Server Components: fetch() directly, no useEffect needed
- Client Components: SWR or React Query for client-side fetching
- Never fetch in useEffect when a Server Component can do it instead
- Use generateStaticParams() for static generation of dynamic routes

## Styling
- Tailwind utility classes — mobile-first
- CSS Modules for component-scoped styles if Tailwind isn't enough
- Never use arbitrary Tailwind values like w-[327px]
- CSS custom properties defined in globals.css, consumed everywhere

## Performance
- Images: always use next/image — never raw <img> tags
- Links: always use next/link — never raw <a> tags for internal routes
- Fonts: use next/font — never load fonts via <link> in head
- Dynamic imports for heavy components: const Comp = dynamic(() => import('./Comp'))

## TypeScript
- Typed props interfaces on every component
- Type page params: { params: { slug: string }, searchParams: { [key: string]: string } }
- Use Next.js built-in types: NextPage, Metadata, generateMetadata

## What "Done" Means
- Page renders at 375 / 768 / 1440px
- No console errors or TypeScript errors
- Server/Client component boundary is intentional, not accidental
- Hover and focus states implemented
