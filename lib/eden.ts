import { treaty } from "@elysia/eden"
import type { ApiElysia } from "../app/api/[[...slugs]]/route"
import type { TodoElysia } from "../app/api/todos/[[...slugs]]/route"

// .api to enter /api prefix
export const api =
  // process is defined on server side and build time
  typeof window === "undefined"
    ? treaty((await import("../app/api/[[...slugs]]/route")).app).api
    : treaty<ApiElysia>(process.env.NEXT_PUBLIC_API_URL!).api

export const todos =
  typeof window === "undefined"
    ? treaty((await import("../app/api/todos/[[...slugs]]/route")).app).api.todos
    : treaty<TodoElysia>(process.env.NEXT_PUBLIC_API_URL!).api.todos
