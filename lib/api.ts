import { treaty } from "@elysia/eden"
import type { ApiElysia } from "@/backend"

export const api =
  typeof window === "undefined"
    ? treaty((await import("@/backend")).app).api
    : treaty<ApiElysia>(process.env.NEXT_PUBLIC_API_URL!).api
