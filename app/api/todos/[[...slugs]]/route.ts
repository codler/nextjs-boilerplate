import { Elysia, t } from "elysia"
import { and, desc, eq, sql } from "drizzle-orm"
import { betterAuth } from "../../auth.elysia"
import { db } from "@/lib-server/db"
import { todo } from "@/db/todo.schema"

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  userId: string
}

export const app = new Elysia({ prefix: "/api/todos" })
  .use(betterAuth)

  .get(
    "/",
    async () => {
      const rows = await db.select().from(todo).orderBy(desc(todo.createdAt))

      return rows
    },
    { auth: true }
  )

  .get(
    "/:id",
    async ({ params, user }) => {
      const rows = await db
        .select()
        .from(todo)
        .where(and(eq(todo.userId, user.id), eq(todo.id, params.id)))
        .orderBy(desc(todo.createdAt))

      return rows
    },
    { auth: true }
  )

  .post(
    "/",
    async ({ body, user }) => {
      const [inserted] = await db
        .insert(todo)
        .values({ text: body.text, userId: user.id })
        .returning()

      return inserted
    },
    {
      auth: true,
      body: t.Object({
        text: t.String(),
      }),
    }
  )

  // Toggle completed
  .patch(
    "/toggle/:id",
    async ({ params, user }) => {
      const [updated] = await db
        .update(todo)
        .set({ completed: sql`NOT ${todo.completed}` })
        .where(and(eq(todo.userId, user.id), eq(todo.id, params.id)))
        .returning()

      return updated
    },
    { auth: true }
  )

  // Delete
  .delete(
    "/:id",
    async ({ params, user }) => {
      await db
        .delete(todo)
        .where(and(eq(todo.userId, user.id), eq(todo.id, params.id)))

      return { success: true }
    },
    { auth: true }
  )

export const GET = app.fetch
export const POST = app.fetch
export const PATCH = app.fetch
export const DELETE = app.fetch
export type TodoElysia = typeof app
