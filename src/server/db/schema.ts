import { sql } from "drizzle-orm"
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

import { generateId } from "@/lib/id"

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 30 }).notNull().primaryKey(),
    username: varchar("name", { length: 50 }).notNull(),
    githubId: integer("github_id").notNull().unique(),
    email: varchar("email", { length: 50 }).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").default(sql`current_timestamp`),
  },
  (t) => ({
    githubIdx: index("user_github_idx").on(t.githubId),
  })
)

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: varchar("user_id", { length: 30 })
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
})

export const workshops = pgTable("workshops", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(),
  organizerId: varchar("organizer_id", { length: 30 })
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 50 }).notNull(),
  description: text("description").notNull(),
  scheduled: timestamp("date").notNull(),
  duration: integer("duration").notNull(),
  isPublic: boolean("is_public").notNull(),
  accessCode: varchar("access_code", { length: 8 }).unique().notNull(),
  hasStarted: boolean("has_started").notNull().default(false),
  hasCompleted: boolean("has_completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").default(sql`current_timestamp`),
})

export type Workshop = typeof workshops.$inferSelect
export type NewWorkshop = typeof workshops.$inferInsert

export const registrations = pgTable("registrations", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(),
  workshopId: varchar("workshop_id", { length: 30 })
    .notNull()
    .references(() => workshops.id, { onDelete: "cascade" }),
  registrantId: varchar("registrant_id", { length: 30 })
    .notNull()
    .references(() => users.id),
  registeredAt: timestamp("registered_at").defaultNow().notNull(),
})

export type NewRegistration = typeof registrations.$inferInsert
export type Registration = typeof registrations.$inferSelect
