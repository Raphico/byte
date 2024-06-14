import "server-only"

import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache"
import { asc, eq } from "drizzle-orm"

import { db } from "../db"
import { users, workshops } from "../db/schema"

export async function getUserWorkshops(userId: string) {
  return await cache(
    async () => {
      return db
        .select({
          id: workshops.id,
          title: workshops.title,
          organizer: {
            id: users.id,
            username: users.username,
            image: users.image,
            email: users.email,
          },
          description: workshops.description,
          duration: workshops.duration,
          accessCode: workshops.accessCode,
          scheduled: workshops.scheduled,
          isPublic: workshops.isPublic,
          createdAt: workshops.createdAt,
        })
        .from(workshops)
        .innerJoin(users, eq(users.id, workshops.organizerId))
        .where(eq(workshops.organizerId, userId))
        .orderBy(asc(workshops.scheduled))
    },
    [`workshops-${userId}`],
    {
      revalidate: 900,
      tags: [`workshops-${userId}`],
    }
  )()
}

export async function getWorkshops() {
  noStore()
  try {
    return db
      .select({
        id: workshops.id,
        title: workshops.title,
        organizer: {
          id: users.id,
          username: users.username,
          image: users.image,
          email: users.email,
        },
        description: workshops.description,
        duration: workshops.duration,
        accessCode: workshops.accessCode,
        scheduled: workshops.scheduled,
        isPublic: workshops.isPublic,
        createdAt: workshops.createdAt,
      })
      .from(workshops)
      .where(eq(workshops.isPublic, true))
      .innerJoin(users, eq(users.id, workshops.organizerId))
      .orderBy(asc(workshops.scheduled))
  } catch (err) {
    return []
  }
}
