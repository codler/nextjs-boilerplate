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
      try {
        return await getTodoById(user.id, params.id)
      } catch (error) {
        return handleHttpError(error)
      }
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
      try {
        return await toggleTodoCompleted(user.id, params.id)
      } catch (error) {
        return handleHttpError(error)
      }
    },
    { auth: true }
  )

  .delete(
    "/:id",
    async ({ params, user }) => {
      try {
        await deleteTodo(user.id, params.id)
        return { success: true }
      } catch (error) {
        return handleHttpError(error)
      }
    },
    { auth: true }
  )
