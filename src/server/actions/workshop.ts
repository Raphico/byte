"use server"

import { revalidateTag } from "next/cache"
import { and, eq } from "drizzle-orm"

import { validateRequest } from "@/lib/lucia/validate-request"
import { type CreateEditWorkshopSchema } from "@/lib/zod/schemas/workshops"
import { getErrorMessage } from "@/utils/handle-error"

import { db } from "../db"
import { workshops } from "../db/schema"

export async function createWorkshopAction(input: CreateEditWorkshopSchema) {
  try {
    const { user } = await validateRequest()

    if (!user) {
      throw new Error("User not found")
    }

    await db.insert(workshops).values({
      ...input,
      organizerId: user.id,
    })

    revalidateTag(`workshops-${user.id}`)
    revalidateTag(`workshops`)

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

export async function updateWorkshopAction(
  input: CreateEditWorkshopSchema & {
    id: number
  }
) {
  try {
    const { user } = await validateRequest()

    if (!user) {
      throw new Error("User not found")
    }

    await db
      .update(workshops)
      .set({
        title: input.title,
        description: input.description,
        duration: input.duration,
        isPublic: input.isPublic,
        scheduled: input.scheduled,
      })
      .where(
        and(eq(workshops.id, input.id), eq(workshops.organizerId, user.id))
      )

    revalidateTag(`workshops-${user.id}`)
    revalidateTag(`workshops`)

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}
