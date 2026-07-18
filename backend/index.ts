import Elysia from "elysia"
import { todosElysia } from "./todos"
import { publicElysia } from "./public"
import { handleHttpError } from "./error"

export const app = new Elysia({ prefix: "/api" })
  .onError(({ error, code }) => {
    if (code === "UNKNOWN") return handleHttpError(error)
  })
  .use(publicElysia)
  .use(todosElysia)

export type ApiElysia = typeof app
