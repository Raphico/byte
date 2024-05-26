"use server"

import { revalidateTag } from "next/cache"
import { createWorkshop } from "@/data-access/workshop"

import { validateRequest } from "../lucia/validate-request"
import { type CreateEditWorkshopSchema } from "../zod/schemas/workshops"

export async function createWorkshopAction(input: CreateEditWorkshopSchema) {
  const { user } = await validateRequest()

  if (!user) {
    throw new Error("User not found")
  }

  await createWorkshop({
    userId: user.id,
    title: input.title,
    description: input.description,
    duration: input.duration,
    accessCode: input.accessCode,
    scheduled: input.scheduled,
    isPublic: input.isPublic,
  })

  revalidateTag(`workshops-${user.id}`)
  revalidateTag(`workshops`)
}
