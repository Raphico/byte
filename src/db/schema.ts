import { sql } from "drizzle-orm"
import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const users = pgTable(
  "users",
  {
    id: text("id").notNull().primaryKey(),
    username: varchar("name", { length: 50 }).notNull(),
    githubId: integer("github_id").notNull().unique(),
    email: varchar("email", { length: 50 }).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").default(sql`current_timestamp`),
  },
  (t) => ({
    discordIdx: index("user_github_idx").on(t.githubId),
  })
)

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
})
