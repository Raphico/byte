/**
 *  The following code sets up a database connection using drizzle to postgres
 *  and prevents nextjs from creating multiple connections in development
 */

import { env } from "@/env"
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined
}

let db: PostgresJsDatabase<typeof schema>

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(env.DATABASE_URL), { schema })
} else {
  if (!global.db) {
    global.db = drizzle(postgres(env.DATABASE_URL), { schema })
  }
  db = global.db
}

export { db }
