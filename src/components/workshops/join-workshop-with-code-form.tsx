import * as React from "react"
import { type UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"
import { type JoinWorkshopWithCodeSchema } from "@/lib/zod/schemas/workshops"

import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

interface JoinWorkshopWithCodeFormProps
  extends Omit<React.ComponentPropsWithoutRef<"form">, "onSubmit"> {
  form: UseFormReturn<JoinWorkshopWithCodeSchema>
  onSubmit: (values: JoinWorkshopWithCodeSchema) => void
}

export function JoinWorkshopWithCodeForm({
  form,
  onSubmit,
  children,
  className,
  ...props
}: JoinWorkshopWithCodeFormProps) {
  return (
    <Form {...form}>
      <form
        className={cn("grid gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        {...props}
      >
        <FormField
          control={form.control}
          name="accessCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Workshop access code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {children}
      </form>
    </Form>
  )
}
