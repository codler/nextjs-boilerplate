import { treaty } from "@elysia/eden"
import type { app } from "../app/api/[[...slugs]]/route"

// .api to enter /api prefix
export const api =
  // process is defined on server side and build time
  typeof window === "undefined"
    ? treaty((await import("../app/api/[[...slugs]]/route")).app).api
    : treaty<typeof app>(process.env.NEXT_PUBLIC_API_URL!).api
