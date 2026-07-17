import Elysia from "elysia"
import { todosElysia } from "./todos"
import { publicElysia } from "./public"

export const app = new Elysia({ prefix: "/api" })
  .use(publicElysia)
  .use(todosElysia)

export type ApiElysia = typeof app
