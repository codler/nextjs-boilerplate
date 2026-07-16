import { Elysia } from "elysia"
import { todosElysia } from "./todos"
import { publicElysia } from "./public"

export const app = new Elysia({ prefix: "/api" })
  .use(publicElysia)
  .use(todosElysia)

export const GET = app.fetch
export const POST = app.fetch
export const PATCH = app.fetch
export const DELETE = app.fetch

export type ApiElysia = typeof app
