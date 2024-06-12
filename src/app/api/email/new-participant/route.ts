import { env } from "@/env"
import { z } from "zod"

import { unknownError } from "@/config/constants"
import { resend } from "@/lib/resend"
import { newParticipantEmailSchema } from "@/lib/zod/schemas/email"
import NewParticipantEmail from "@/components/emails/new-participant-email"

export async function POST(req: Request) {
  try {
    const input = newParticipantEmailSchema.parse(await req.json())

    const { error } = await resend.emails.send({
      from: env.EMAIL_FROM_ADDRESS,
      to: ["raphicogit@gmail.com"],
      subject: "New Registration for your workshop",
      react: NewParticipantEmail({
        WorkshopTitle: input.workshopTitle,
        organizerUsername: input.organizerUsername,
      }),
    })

    if (error) {
      return new Response(error.message, { status: 500 })
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    if (error instanceof Error) {
      return new Response(error.message, { status: 500 })
    }

    return new Response(unknownError, { status: 500 })
  }
}
