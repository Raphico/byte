import { z } from "zod"

export const registrationSchema = z.object({
  userId: z.string(),
  workshopId: z.string(),
})

export const registerUserWithAccessCode = z.object({
  userId: registrationSchema.shape.userId,
  accessCode: z
    .string()
    .min(8)
    .max(8)
    .describe("The access code to the workshop"),
})

export type RegisterUserWithAccessCode = z.infer<
  typeof registerUserWithAccessCode
>
export type RegistrationSchema = z.infer<typeof registrationSchema>
