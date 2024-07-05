"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { and, eq } from "drizzle-orm"

import { getUserSession } from "@/server/data/user"
import { type CreateEditWorkshopSchema } from "@/lib/zod/schemas/workshops"
import { getErrorMessage } from "@/utils/handle-error"

import { db } from "../db"
import { workshops } from "../db/schema"

export async function createWorkshopAction(input: CreateEditWorkshopSchema) {
  try {
    const { user } = await getUserSession()

    if (!user) {
      throw new Error("User not found")
    }

    await db.insert(workshops).values({
      ...input,
      organizerId: user.id,
    })

    revalidatePath("/explore")
    revalidateTag(`workshops-${user.id}`)

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
  input: Omit<CreateEditWorkshopSchema, "accessCode"> & {
    id: string
  }
) {
  try {
    const { user } = await getUserSession()

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

    revalidatePath("/explore")
    revalidateTag(`workshops-${user.id}`)
    revalidateTag(`workshops-${input.id}`)

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

export async function deleteWorkshopAction(workshopId: string) {
  try {
    const { user } = await getUserSession()

    if (!user) {
      throw new Error("User not found")
    }

    await db
      .delete(workshops)
      .where(
        and(eq(workshops.organizerId, user.id), eq(workshops.id, workshopId))
      )

    revalidatePath("/explore")
    revalidateTag(`workshops-${workshopId}`)
    revalidateTag(`workshops-${user.id}`)

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

export async function startWorkshopAction(workshopId: string) {
  try {
    const { user } = await getUserSession()

    if (!user) {
      throw new Error("User not found")
    }

    await db
      .update(workshops)
      .set({
        hasStarted: true,
      })
      .where(
        and(eq(workshops.id, workshopId), eq(workshops.organizerId, user.id))
      )
    revalidateTag(`workshops-${workshopId}`)


    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

export async function MarkWorkshopHasCompleted(workshopId: string) {
  try {
    const { user } = await getUserSession()

    if (!user) {
      throw new Error("User not found")
    }

    await db
      .update(workshops)
      .set({
        hasCompleted: true,
      })
      .where(
        and(eq(workshops.id, workshopId), eq(workshops.organizerId, user.id))
      )
    
    revalidateTag(`workshops-${workshopId}`)

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}
