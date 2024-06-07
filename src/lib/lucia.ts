import { env } from "@/env"
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { GitHub } from "arctic"
import { Lucia } from "lucia"

import { db } from "@/server/db"
import { sessions, users } from "@/server/db/schema"

import { type DatabaseUserAttributes } from "./types"

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      githubId: attributes.github_id,
      username: attributes.username,
      email: attributes.email,
      image: attributes.image,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    }
  },
})

export const github = new GitHub(env.GITHUB_CLIENT_ID, env.GITHUB_CLIENT_SECRET)

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}
