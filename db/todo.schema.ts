import { defineRelations } from "drizzle-orm"
import { pgTable, uuid, text, boolean } from "drizzle-orm/pg-core"
import { user } from "./auth.schema"
import { timestamps } from "./schemaHelper"

export const todo = pgTable("todo", {
  id: uuid().defaultRandom().primaryKey(),
  text: text().notNull(),
  completed: boolean().notNull().default(false),

  ...timestamps(),

  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const relations = defineRelations({ todo, user }, (r) => ({
  todo: {
    user: r.one.user({
      from: r.todo.userId,
      to: r.user.id,
    }),
  },
}))
