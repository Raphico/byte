import * as z from "zod"

export const createEditWorkshopSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters",
    })
    .max(50, {
      message: "Title must be less that 50 characters",
    })
    .describe("The workshop title"),
  description: z
    .string()
    .min(20, {
      message: "Description must be at least 20 characters",
    })
    .max(2000, {
      message: "Description must be less that 2000 characters",
    })
    .describe("The detailed description of the workshop"),
  duration: z.coerce
    .number()
    .min(15)
    .max(480)
    .nonnegative()
    .describe("The duration of the workshop be in minutes"),
  isPublic: z
    .boolean()
    .default(true)
    .describe("Indicates if the workshop is public or not"),
  accessCode: z
    .string()
    .min(8)
    .max(8)
    .describe("The access code to the workshop"),
  scheduled: z
    .date({
      required_error: "Scheduled Date is required",
    })
    .describe("The workshop scheduled date"),
})

export type CreateEditWorkshopSchema = z.infer<typeof createEditWorkshopSchema>
