import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"

export const dbCredentials = {
  host: process.env.PG_HOST!,
  port: Number(process.env.PG_PORT!),
  user: process.env.PG_USER!,
  password: process.env.PG_PASSWORD!,
  database: process.env.PG_DATABASE!,
}

export const pg = new Pool(dbCredentials)
export const db = drizzle({ client: pg })
