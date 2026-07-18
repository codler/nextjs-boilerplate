import { desc, eq, sql } from "drizzle-orm"
import { db } from "@/backend/config/db"
import { todo } from "@/db/todo.schema"
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from "@/backend/error"

export async function getTodos() {
  return await db.select().from(todo).orderBy(desc(todo.createdAt))
}

export async function getTodoById(userId: string, id: string) {
  const [existing] = await db.select().from(todo).where(eq(todo.id, id))

  if (!existing) {
    throw new NotFoundError("Todo not found")
  }

  if (existing.userId !== userId) {
    throw new ForbiddenError()
  }

  return existing
}

export async function createTodo(userId: string, text: string) {
  try {
    const [inserted] = await db
      .insert(todo)
      .values({ userId, text })
      .returning()
    return inserted
  } catch (error) {
    console.error("createTodo failed:", error)
    throw new InternalServerError("Unable to create todo")
  }
}

export async function toggleTodoCompleted(userId: string, id: string) {
  await getTodoById(userId, id)

  const [updated] = await db
    .update(todo)
    .set({ completed: sql`NOT ${todo.completed}` })
    .where(eq(todo.id, id))
    .returning()

  if (!updated) {
    throw new NotFoundError("Todo not found")
  }

  return updated
}

export async function deleteTodo(userId: string, id: string) {
  await getTodoById(userId, id)
  await db.delete(todo).where(eq(todo.id, id))
}
