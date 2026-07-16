import { auth } from "@/lib-server/auth"
import Elysia from "elysia"

// user middleware (compute user and session and pass to routes)
export const betterAuth = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status }) {
        const session = await auth.api.getSession({
          headers: await import("next/headers").then((mod) => mod.headers()),
        })

        if (!session) return status(401)

        return {
          user: session.user,
          session: session.session,
        }
      },
    },
  })
