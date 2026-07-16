import { treaty } from "@elysia/eden"
import type { ApiElysia } from "../app/api/[[...slugs]]/route"

export const api =
  typeof window === "undefined"
    ? treaty((await import("../app/api/[[...slugs]]/route")).app).api
    : treaty<ApiElysia>(process.env.NEXT_PUBLIC_API_URL!).api
