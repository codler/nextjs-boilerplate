# Next.js Boilerplate

A modern Next.js starter using:

- Next.js App Router with React 19
- Elysia API routes
- Drizzle ORM for Postgres schema and query modeling
- better-auth for authentication and session handling
- next-intl for localization
- next-themes for theme switching
- React Query with streamed hydration

## Project layout

- `app/` — App Router pages and API routes
- `app/layout.tsx` — root layout with providers
- `app/api/` — Elysia route handlers
- `db/` — Drizzle database schema definitions
- `backend/config/` — runtime database/auth configuration
- `lib/` — shared utilities and typed API client wrappers
- `components/` — shared UI primitives and providers
- `proxy.ts` — route protection in Next.js 16 middleware-style flow

## Environment

This project expects `NEXT_PUBLIC_API_URL` to be defined for browser API client usage.

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

