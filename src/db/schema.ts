import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 50 }).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
})
