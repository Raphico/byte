"use client"

import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function RegisterButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="sm">
      {pending && (
        <Icons.spinner
          className="mr-2 size-4 animate-spin"
          aria-hidden="true"
        />
      )}
      Register
    </Button>
  )
}
