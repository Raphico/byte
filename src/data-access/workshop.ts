import "server-only"

import { unstable_cache as cache } from "next/cache"
import { asc, eq } from "drizzle-orm"

import { db } from "@/lib/drizzle"
import { users, workshops, type NewWorkshop } from "@/lib/drizzle/schema"

export async function createWorkshop(
  workshop: Omit<NewWorkshop, "organizerId"> & { userId: string }
) {
  await db.insert(workshops).values({
    title: workshop.title,
    description: workshop.description,
    duration: workshop.duration,
    accessCode: workshop.accessCode,
    organizerId: workshop.userId,
    scheduled: workshop.scheduled,
    isPublic: workshop.isPublic,
  })
}

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
        .orderBy(asc(workshops.scheduled))
    },
    [`workshops`],
    {
      revalidate: 900,
      tags: [`workshops`],
    }
  )()
}
