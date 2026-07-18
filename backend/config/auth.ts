import { betterAuth } from "better-auth/minimal"
import { nextCookies } from "better-auth/next-js"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "./db"
import * as schema from "../../db/auth.schema"
import { anonymous } from "better-auth/plugins"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    camelCase: true,
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    anonymous({
      generateName: () => `anon-${Math.random().toString(36).substring(2, 10)}`,
    }),
    nextCookies(), // make sure this is the last plugin in the array
  ],
  rateLimit: {
    enabled: true,
    // storage: "secondary-storage",
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },
})
