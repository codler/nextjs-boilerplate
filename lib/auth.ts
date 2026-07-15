import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { Pool } from "pg"

export const auth = betterAuth({
  database: new Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
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
