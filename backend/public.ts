import { Elysia } from "elysia"
import { sql } from "drizzle-orm"
import { db } from "@/backend/config/db"
import { todo } from "@/db/todo.schema"

export const publicElysia = new Elysia({ prefix: "/public" }).get(
  "/todos/count",
  async () => {
    const [{ total }] = await db
      .select({ total: sql<number>`COUNT(*)` })
      .from(todo)

    return { total }
  }
)
