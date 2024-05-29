"use server"

import { revalidateTag } from "next/cache"

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
