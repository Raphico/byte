"use server"

import { revalidateTag } from "next/cache"
import { eq } from "drizzle-orm"

import {
  type RegisterUserWithAccessCode,
  type RegistrationSchema,
} from "@/lib/zod/schemas/registration"
import { getErrorMessage } from "@/utils/handle-error"

import { db } from "../db"
import { registrations, workshops } from "../db/schema"

export async function registerUserWithAccessCode(
  input: RegisterUserWithAccessCode
) {
  try {
    const workshop = await db.query.workshops.findFirst({
      columns: {
        id: true,
        organizerId: true,
      },
      where: eq(workshops.accessCode, input.accessCode),
    })

    if (!workshop) {
      throw new Error("Workshop not found")
    }

    if ((workshop.organizerId = input.userId)) {
      throw new Error("You cannot register for your own workshop")
    }

    const { error } = await registerUserAction({
      userId: input.userId,
      workshopId: workshop.id,
    })

    if (error) {
      throw new Error(error)
    }

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

export async function registerUserAction(input: RegistrationSchema) {
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

export async function cancelRegistrationAction(input: RegistrationSchema) {
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
