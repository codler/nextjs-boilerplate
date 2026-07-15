import { Elysia, t } from "elysia"
import { betterAuth } from "../../auth.elysia"
import { db } from "@/lib/db"

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
      const { rows } = await db.query<Todo>(
        `
      SELECT *
      FROM todos
      ORDER BY "createdAt" DESC
      `
      )

      return rows
    },
    { auth: true }
  )

  .get(
    "/:id",
    async ({ params, user }) => {
      const { rows } = await db.query<Todo>(
        `
      SELECT *
      FROM todos
      WHERE "userId" = $1
        AND id = $2
      ORDER BY "createdAt" DESC
      `,
        [user.id, params.id]
      )

      return rows
    },
    { auth: true }
  )

  .post(
    "/",
    async ({ body, user }) => {
      const { rows } = await db.query<Todo>(
        `
        INSERT INTO todos (text, "userId")
        VALUES ($1, $2)
        RETURNING *
        `,
        [body.text, user.id]
      )

      return rows[0]
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
      const { rows } = await db.query<Todo>(
        `
      UPDATE todos
      SET completed = NOT completed
      WHERE "userId" = $1 
        AND id = $2
      RETURNING *
      `,
        [user.id, params.id]
      )

      return rows[0]
    },
    { auth: true }
  )

  // Delete
  .delete(
    "/:id",
    async ({ params, user }) => {
      await db.query(`DELETE FROM todos WHERE "userId" = $1 AND id = $2`, [
        user.id,
        params.id,
      ])

      return { success: true }
    },
    { auth: true }
  )

export const GET = app.fetch
export const POST = app.fetch
export const PATCH = app.fetch
export const DELETE = app.fetch
export type TodoElysia = typeof app
