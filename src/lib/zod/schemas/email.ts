import { z } from "zod"

export const newParticipantEmailSchema = z.object({
  email: z.string().email().describe("The workshop organizer's email"),
  organizerUsername: z.string().describe("The workshop's organizer username"),
  workshopTitle: z
    .string()
    .describe("The title of workshop the participant registered to"),
})
