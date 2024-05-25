import { sql } from "drizzle-orm"
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
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

export const workshops = pgTable("workshops", {
  id: serial("id").notNull().primaryKey(),
  organizerId: text("organizer_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 50 }).notNull(),
  description: text("description").notNull(),
  scheduled: timestamp("date").notNull(),
  duration: integer("duration").notNull(),
  isPublic: boolean("is_public").default(true).notNull(),
  accessCode: varchar("access_code", { length: 16 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").default(sql`current_timestamp`),
})

export type Workshop = typeof workshops.$inferSelect
export type NewWorkshop = typeof workshops.$inferInsert
