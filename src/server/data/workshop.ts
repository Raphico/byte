import "server-only"

import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache"
import { asc, eq } from "drizzle-orm"

import { db } from "../db"
import { registrations, users, workshops } from "../db/schema"

export async function getWorkshop(workshopId: string) {
  try {
    return db.query.workshops.findFirst({
      columns: {
        id: true,
        organizerId: true,
        title: true,
        description: true,
        duration: true,
        accessCode: true,
        scheduled: true,
        isPublic: true,
        createdAt: true,
      },
      where: eq(workshops.id, workshopId),
    })
  } catch (err) {
    return null
  }
}

export async function getUserWorkshops(userId: string) {
  return await cache(
    async () => {
      return db
        .select({
          id: workshops.id,
          title: workshops.title,
          duration: workshops.duration,
          scheduled: workshops.scheduled,
        })
        .from(workshops)
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
        duration: workshops.duration,
        scheduled: workshops.scheduled,
      })
      .from(workshops)
      .where(eq(workshops.isPublic, true))
      .orderBy(asc(workshops.scheduled))
  } catch (err) {
    return []
  }
}

export async function getWorkshopRegistrants(currentWorkshopId: string) {
  noStore()
  try {
    return await db
      .select({
        id: users.id,
        image: users.image,
      })
      .from(registrations)
      .innerJoin(users, eq(registrations.participantId, users.id))
      .where(eq(registrations.workshopId, currentWorkshopId))
  } catch (err) {
    return []
  }
}

export async function getWorkshopOrganizer(organizerId: string) {
  return await cache(async () => {
    return await db.query.users.findFirst({
      columns: {
        id: true,
        username: true,
        image: true,
      },
      where: eq(users.id, organizerId),
    })
  })()
}
