import { timestamp } from "drizzle-orm/pg-core"

export function timestamps() {
  return {
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),

    updatedAt: timestamp({ withTimezone: true })
      .$onUpdate(() => new Date())
      .notNull(),
  }
}
