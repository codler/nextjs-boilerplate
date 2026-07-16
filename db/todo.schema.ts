import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core"

export const todo = pgTable("todo", {
  id: uuid("id").defaultRandom().primaryKey(),
  text: text("text").notNull(),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  userId: text("userId").notNull(),
})
