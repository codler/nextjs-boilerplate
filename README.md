# Next.js Boilerplate

A modern Next.js starter using:

- Next.js App Router
- Elysia API routes
- Drizzle ORM for Postgres schema and query modeling
- better-auth for authentication and session handling
- next-intl for localization
- next-themes for theme switching
- React Query with streamed hydration

## Project layout

- `app/` — App Router pages and route handlers
- `app/layout.tsx` — root layout with providers
- `app/api/[[...slugs]]/route.ts` — Elysia bridge for backend API requests
- `app/api/auth/[...all]/route.ts` — Next.js auth handler for better-auth
- `backend/` — Elysia backend app, route modules, services, and public API
- `backend/config/` — runtime database and auth configuration
- `db/` — Drizzle database schema definitions and migrations
- `hooks/` — reusable hooks for queries and feature logic
- `lib/` — shared utilities and typed API client wrappers
- `components/` — shared UI primitives and providers
- `proxy.ts` — route protection helper for Next.js flows

## Environment

This project expects `NEXT_PUBLIC_API_URL` to be defined for browser API client usage and standard Postgres environment variables for server-side database access.

## Adding components

To add UI components, use shadcn's generator:

```bash
npx shadcn@latest add button
```

The generated components will be placed in the `components/ui/` directory.

## Using components

Import shared UI primitives like this:

```tsx
import { Button } from "@/components/ui/button"
```

