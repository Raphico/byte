"use server"

import { env } from "@/env"

import { resend } from "@/lib/resend"
import { getErrorMessage } from "@/utils/handle-error"
import NewParticipantEmail from "@/components/emails/new-participant-email"

import { getWorkshopOrganizer } from "../data/workshop"

export async function notifyOrganizerAboutRegistration(input: {
  workshopId: string
  workshopTitle: string
}) {
  try {
    const organizer = await getWorkshopOrganizer(input.workshopId)

    if (!organizer) {
      throw new Error("Workshop must have an organizer")
    }

    const { error } = await resend.emails.send({
      from: env.EMAIL_FROM_ADDRESS,
      to: [organizer.email],
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
