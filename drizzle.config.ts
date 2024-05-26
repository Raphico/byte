import { env } from "@/env"
import type { Config } from "drizzle-kit"

export default {
  schema: "./src/lib/drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config
