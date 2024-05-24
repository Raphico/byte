import * as z from "zod"

export const createEditWorkshopSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(20).max(2000),
  duration: z.coerce.number().min(15).max(480).nonnegative(),
  isPublic: z.boolean().default(true),
  code: z.string().min(16).max(16),
  scheduled: z.date({
    required_error: "Scheduled Date is required",
  }),
})

export type CreateEditWorkshopSchema = z.infer<typeof createEditWorkshopSchema>
