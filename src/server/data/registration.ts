import "server-only"

import { unstable_noStore as noStore } from "next/cache"
import { eq } from "drizzle-orm"

import { db } from "../db"
import { registrations, users } from "../db/schema"

export async function getWorkshopRegistrants(currentWorkshopId: string) {
  noStore()
  try {
    return await db
      .select({
        id: users.id,
        username: users.username,
        image: users.image,
      })
      .from(registrations)
      .innerJoin(users, eq(registrations.registrantId, users.id))
      .where(eq(registrations.workshopId, currentWorkshopId))
  } catch (err) {
    return []
  }
}
