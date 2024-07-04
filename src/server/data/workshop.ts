import "server-only"

import { unstable_noStore as noStore } from "next/cache"
import { asc, eq, or } from "drizzle-orm"

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
  noStore()
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
        hasStarted: true,
        hasCompleted: true,
        isPublic: true,
        createdAt: true,
      },
      where: eq(workshops.id, workshopId),
    })
  } catch (err) {
    return null
  }
}

export async function getWorkshopMetadata(workshopId: string) {
  noStore()
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
      .leftJoin(registrations, eq(registrations.workshopId, workshops.id))
      .where(
        or(
          eq(workshops.organizerId, userId),
          eq(registrations.registrantId, userId)
        )
      )
      .orderBy(asc(workshops.scheduled))
  } catch (err) {
    return []
  }
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

export async function getWorkshopOrganizer(organizerId: string) {
  noStore()
  try {
    return await db.query.users.findFirst({
      columns: {
        id: true,
        email: true,
        username: true,
        image: true,
      },
      where: eq(users.id, organizerId),
    })
  } catch (err) {
    return null
  }
}
