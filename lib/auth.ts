import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { db } from "./db"

export const auth = betterAuth({
  database: db,
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
