import { auth } from "@/backend/config/auth"
import Elysia from "elysia"

export const authMiddleware = new Elysia({ name: "better-auth" })
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
