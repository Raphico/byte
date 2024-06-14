"use server"

import { revalidateTag } from "next/cache"
import { and, eq } from "drizzle-orm"

import { getErrorMessage } from "@/utils/handle-error"

import { db } from "../db"
import { registrations } from "../db/schema"

export async function addParticipantAction(input: {
  workshopId: string
  participantId: string
}) {
  try {
    const checkUserRegistered = await db.query.registrations.findFirst({
      where: and(
        eq(registrations.participantId, input.participantId),
        eq(registrations.workshopId, input.workshopId)
      ),
    })

    if (checkUserRegistered) {
      throw new Error("User already registered")
    }

    await db.insert(registrations).values({
      ...input,
    })

    revalidateTag(`workshops-${input.participantId}`)

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}
