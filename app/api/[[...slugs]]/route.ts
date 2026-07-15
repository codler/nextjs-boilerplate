import { Elysia, t } from "elysia"
import { betterAuth } from "../auth.elysia"

export const app = new Elysia({ prefix: "/api" })
  .use(betterAuth)
  .get("/", { hello: "Hello Nextjs" })
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
export type ApiElysia = typeof app
