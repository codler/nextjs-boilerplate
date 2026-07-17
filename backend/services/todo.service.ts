import { and, desc, eq, sql } from "drizzle-orm"
import { db } from "@/backend/config/db"
import { todo } from "@/db/todo.schema"

export async function getTodos() {
  return await db.select().from(todo).orderBy(desc(todo.createdAt))
}

export async function getTodoById(userId: string, id: string) {
  return await db
    .select()
    .from(todo)
    .where(and(eq(todo.userId, userId), eq(todo.id, id)))
    .orderBy(desc(todo.createdAt))
}

export async function createTodo(userId: string, text: string) {
  const [inserted] = await db.insert(todo).values({ userId, text }).returning()

  return inserted
}

export async function toggleTodoCompleted(userId: string, id: string) {
  const [updated] = await db
    .update(todo)
    .set({ completed: sql`NOT ${todo.completed}` })
    .where(and(eq(todo.userId, userId), eq(todo.id, id)))
    .returning()

  return updated
}

export async function deleteTodo(userId: string, id: string) {
  await db.delete(todo).where(and(eq(todo.userId, userId), eq(todo.id, id)))

  return { success: true }
}
