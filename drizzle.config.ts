import { defineConfig } from "drizzle-kit"
import { dbCredentials } from "./server-config/db"

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/*.schema.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: `postgresql://${dbCredentials.user}:${dbCredentials.password}@${dbCredentials.host}:${dbCredentials.port}/${dbCredentials.database}`,
  },
})
