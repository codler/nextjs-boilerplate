import { Elysia, t } from "elysia"
import { authMiddleware } from "./middlewares/auth.middleware"
import {
  getTodos,
  getTodoById,
  createTodo,
  toggleTodoCompleted,
  deleteTodo,
} from "@/backend/services/todo.service"
import { handleHttpError } from "@/backend/error"

export const todosElysia = new Elysia({ prefix: "/todos" })
  .use(authMiddleware)
  .get(
    "/",
    async () => {
      return await getTodos()
    },
    { auth: true }
  )

  .get(
    "/:id",
    async ({ params, user }) => {
      return await getTodoById(user.id, params.id)
    },
    { auth: true }
  )

  .post(
    "/",
    async ({ body, user }) => {
      return await createTodo(user.id, body.text)
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
      return await toggleTodoCompleted(user.id, params.id)
    },
    { auth: true }
  )

  .delete(
    "/:id",
    async ({ params, user }) => {
      await deleteTodo(user.id, params.id)
      return { success: true }
    },
    { auth: true }
  )
