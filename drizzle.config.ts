import { defineConfig } from "drizzle-kit"
import { dbCredentials } from "./lib-server/db"

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/*.schema.ts",
  dbCredentials: {
    url: `postgresql://${dbCredentials.user}:${dbCredentials.password}@${dbCredentials.host}:${dbCredentials.port}/${dbCredentials.database}`,
  },
})
