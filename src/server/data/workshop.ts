import "server-only"

import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache"
import { and, asc, eq, or } from "drizzle-orm"

import { db } from "../db"
import { registrations, users, workshops } from "../db/schema"

export async function getWorkshopSession(workshopId: string) {
  noStore()
  try {
    return db.query.workshops.findFirst({
      columns: {
        id: true,
        organizerId: true,
        hasStarted: true,
        hasCompleted: true,
      },
      where: eq(workshops.id, workshopId),
    })
  } catch (err) {
    return null
  }
}

export async function getWorkshop(workshopId: string) {
  return await cache(
    async () => {
      return db.query.workshops.findFirst({
        columns: {
          id: true,
          organizerId: true,
          title: true,
          description: true,
          duration: true,
          accessCode: true,
          scheduled: true,
          hasStarted: true,
          hasCompleted: true,
          isPublic: true,
          createdAt: true,
        },
        where: eq(workshops.id, workshopId),
      })
    },
    [`workshop-${workshopId}`],
    {
      revalidate: 300,
      tags: [`workshops-${workshopId}`],
    }
  )()
}

export async function getWorkshopMetadata(workshopId: string) {
  try {
    return db.query.workshops.findFirst({
      columns: {
        title: true,
        description: true,
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
        .leftJoin(registrations, eq(registrations.workshopId, workshops.id))
        .where(
          or(
            eq(workshops.organizerId, userId),
            eq(registrations.registrantId, userId)
          )
        )
        .orderBy(asc(workshops.hasCompleted), asc(workshops.scheduled))
    },
    [`workshops-${userId}`],
    {
      revalidate: 300,
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
      .where(
        and(
          eq(workshops.isPublic, true),
          eq(workshops.hasStarted, false),
          eq(workshops.hasCompleted, false)
        )
      )
      .orderBy(asc(workshops.scheduled))
  } catch (err) {
    return []
  }
}

export async function getWorkshopOrganizer(organizerId: string) {
  return await cache(async () => {
    return await db.query.users.findFirst({
      columns: {
        id: true,
        email: true,
        username: true,
        image: true,
      },
      where: eq(users.id, organizerId),
    })
  })()
}
