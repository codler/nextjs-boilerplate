import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { drizzleAdapter } from "@better-auth/drizzle-adapter"
import { db } from "./db"
import * as schema from "./../drizzle/auth.schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
  rateLimit: {
    enabled: true,
    storage: "secondary-storage",
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },
})
