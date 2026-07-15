import { auth } from "@/lib/auth"
import { Elysia, t } from "elysia"

// user middleware (compute user and session and pass to routes)
const betterAuth = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        })

        if (!session) return status(401)

        return {
          user: session.user,
          session: session.session,
        }
      },
    },
  })

export const app = new Elysia({ prefix: "/api" })
  .use(betterAuth)
  .get("/", "Hello Nextjs")
  .get("/user", ({ user }) => user, {
    auth: true,
  })
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  })

export const GET = app.fetch
export const POST = app.fetch
export type App = typeof app