"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  cancelRegistrationAction,
  registerUserAction,
} from "@/server/actions/registration"
import { showErrorToast } from "@/utils/handle-error"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface RegisterButtonProps {
  userId: string
  workshopId: string
  workshopTitle: string
  isCurrentUserRegistered: boolean
  isDisabled: boolean
}

export function RegisterButton({
  userId,
  workshopId,
  isCurrentUserRegistered,
  isDisabled,
}: RegisterButtonProps) {
  const [isPending, startTransition] = React.useTransition()

  const handleOnclickRegisterButton = () => {
    startTransition(async () => {
      const registrationInput = {
        workshopId,
        userId,
      }

      const { error } = isCurrentUserRegistered
        ? await cancelRegistrationAction(registrationInput)
        : await registerUserAction(registrationInput)

      if (error) {
        showErrorToast(error)
        return
      }

      toast.success(
        isCurrentUserRegistered
          ? "Registration Canceled"
          : "Registration Complete"
      )
    })
  }

  return (
    <Button
      onClick={handleOnclickRegisterButton}
      size="sm"
      disabled={isPending || isDisabled}
    >
      {isPending && (
        <Icons.spinner
          className="mr-2 size-4 animate-spin"
          aria-hidden={true}
        />
      )}
      {isCurrentUserRegistered ? "Cancel" : "Register"}
    </Button>
  )
}
