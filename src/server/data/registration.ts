import "server-only"

import { unstable_noStore as noStore } from "next/cache"
import { eq } from "drizzle-orm"

import { db } from "../db"
import { registrations, users } from "../db/schema"

export async function getWorkshopRegistrants(workshopId: string) {
  noStore()
  try {
    await db
      .select({
        id: users.id,
        image: users.image,
      })
      .from(registrations)
      .innerJoin(users, eq(registrations.registrantId, users.id))
      .where(eq(registrations.workshopId, workshopId))
  } catch (err) {
    return []
  }
}
