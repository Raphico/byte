"use server"

import { revalidateTag } from "next/cache"
import { env } from "@/env"
import { and, eq } from "drizzle-orm"

import { resend } from "@/lib/resend"
import { getErrorMessage, showErrorToast } from "@/utils/handle-error"
import NewParticipantEmail from "@/components/emails/new-participant-email"

import { getWorkshopOrganizer } from "../data/workshop"
import { db } from "../db"
import { registrations } from "../db/schema"

interface RegisterUserProps {
  workshopId: string
  participantId: string
}

export async function registerUserAndNotifyAction(
  input: RegisterUserProps & {
    workshopTitle: string
  }
) {
  const { error } = await registerUserAction({
    workshopId: input.workshopId,
    participantId: input.participantId,
  })

  if (!error) {
    showErrorToast(error)
  }

  try {
    const organizer = await getWorkshopOrganizer(input.workshopId)

    if (!organizer) {
      throw new Error("Workshop must have an organizer")
    }

    const { error } = await resend.emails.send({
      from: env.EMAIL_FROM_ADDRESS,
      to: ["raphicogit@gmail.com"],
      subject: "New Registration for your workshop",
      react: NewParticipantEmail({
        WorkshopTitle: input.workshopTitle,
        organizerUsername: organizer.username,
      }),
    })

    if (error) {
      console.error(getErrorMessage(error))
    }
  } catch (err) {
    console.error(getErrorMessage(err))
  }
}

export async function registerUserAction(input: RegisterUserProps) {
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
