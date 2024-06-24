"use server"

import { revalidateTag } from "next/cache"
import { eq } from "drizzle-orm"

import { getErrorMessage } from "@/utils/handle-error"

import { db } from "../db"
import { registrations } from "../db/schema"

interface RegistrationProps {
  workshopId: string
  userId: string
}

export async function registerUserAction(input: RegistrationProps) {
  try {
    await db.insert(registrations).values({
      registrantId: input.userId,
      workshopId: input.workshopId,
    })

    revalidateTag(`workshops-${input.userId}`)

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

export async function cancelRegistrationAction(input: RegistrationProps) {
  try {
    await db
      .delete(registrations)
      .where(eq(registrations.registrantId, input.userId))

    revalidateTag(`workshops-${input.userId}`)

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}
