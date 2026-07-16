# Next.js 16 + Elysia + Drizzle Project Skill

This skill is designed to understand the repository structure, architecture, and feature flow of a Next.js 16 app using Elysia API routes, Drizzle ORM, better-auth, and React Query.

## Project structure

- `app/` contains the App Router pages and API routes.
- `app/layout.tsx` is the global root layout.
- `app/page.tsx`, `app/login/page.tsx`, `app/sign-up/page.tsx`, and `app/dashboard/page.tsx` are the main pages.
- `app/api/` contains Elysia route handlers.
- `server-config/` contains runtime infrastructure and auth configuration.
- `db/` contains Drizzle schema definitions.
- `lib/` contains shared utilities and typed API client wrappers.
- `components/` contains UI primitives and providers.

## Key conventions

### Data model and backend flow
- `db/*.schema.ts` defines database tables with Drizzle.
- `server-config/db.ts` exports the Postgres pool and Drizzle client.
- `server-config/auth.ts` configures `better-auth` with `nextCookies`, the Drizzle adapter, and email/password auth.
- `app/api/auth.elysia.ts` creates an Elysia plugin for authenticated routes.
- `app/api/auth/[...all]/route.ts` exposes the `better-auth` Next.js handler.
- `app/api/todos/[[...slugs]]/route.ts` defines todo CRUD routes.
- `app/api/[[...slugs]]/route.ts` defines general API routes.
- `lib/eden.ts` exports typed API clients using `treaty` for server vs browser.
  - On the server it dynamically imports the local Elysia app and uses its `.api` methods.
  - In the browser it uses `process.env.NEXT_PUBLIC_API_URL` with the same typed app shape.

### Frontend flow
- `lib/auth-client.ts` exports the client-side `authClient` from `better-auth/react`.
- `app/dashboard/page.tsx` uses `authClient.useSession()` and `useSuspenseQuery()` to fetch todos.
- Pages use shared UI primitives from `components/ui`, such as `Button`, `Input`, `Label`, and `Card`.
- `components/providers.tsx` wraps the app in React Query provider and streamed hydration.
- `components/theme-provider.tsx` wraps the app in `next-themes` and adds a dark-mode hotkey.

### Routing and auth
- The app uses the App Router exclusively, no Pages Router files.
- `dashboard` is intended to be authenticated.
- Auth routes are handled by `better-auth` and Elysia middleware.
- The repo currently has one middleware-like file (`proxy.ts`) that is not named `middleware.ts`.

### i18n and metadata
- `server-config/i18n-request.ts` configures `next-intl` request-based locale loading.
- `app/layout.tsx` wraps the app in `NextIntlClientProvider`.
- `lib/metadata.ts` creates metadata with `metadataBase` from env.

## How to reason about features

Treat each feature as a chain:
1. Database schema in `db/<feature>.schema.ts`.
2. Backend service access in `server-config/db.ts` and/or `server-config/auth.ts`.
3. API route handlers in `app/api/<feature>/*/route.ts`.
4. Typed API client in `lib/eden.ts`.
5. Page and UI interaction in `app/<route>/page.tsx`.

For example, the todo feature flows as:
- `db/todo.schema.ts` → `server-config/db.ts` → `app/api/todos/[[...slugs]]/route.ts` → `lib/eden.ts` → `app/dashboard/page.tsx`

## What this skill should do

When asked to modify or extend the app, prefer:
- App Router pages and route files under `app/`.
- `db/` schema changes for data model updates.
- `server-config/` for runtime auth and DB config.
- `lib/eden.ts` for typed API access, with `api` and `todos` clients based on the Elysia app shape.
- `components/ui/` for shared UI primitives.
- `components/providers.tsx` for shared provider behavior.

When asked to add or update a feature:
- Keep API routes explicit and service-driven.
- Use feature-specific hooks or utilities rather than duplicating logic in pages.
- Preserve Next.js client/server component boundaries.
- Avoid creating or relying on legacy Pages Router files.

## What this skill should not do

- Do not use `proxy.ts` as valid middleware; Next.js middleware should be `middleware.ts`.
- Do not assume `NEXT_PUBLIC_API_URL` is available in browser runtime for same-origin API usage.
- Do not place business logic directly inside page components if it belongs in a feature service or API layer.
- Do not add pages outside of `app/`.

## Helpful prompts for this repo

- "Implement todo creation flow end-to-end using the repo conventions."
- "Refactor dashboard page into a server component with a client todo list component."
- "Add a new feature with schema, API route, typed client, and page UI following this repo's structure."
- "Fix auth route protection and middleware naming for this Next.js 16 app."
- "Create shared hooks for todo queries and mutations."

## Skill summary

This skill understands the repository as a Next.js 16 App Router application with Elysia-based API routes, a Drizzle-backed database layer, `better-auth` auth, and React Query hydration. It knows to treat `db/`, `server-config/`, `lib/`, `components/`, and `app/` as distinct layers and to favor explicit feature flow over catch-all routing.
