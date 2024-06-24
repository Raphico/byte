"use client"

import * as React from "react"
import { toast } from "sonner"

import { notifyOrganizerAboutRegistration } from "@/server/actions/notification"
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
}

export function RegisterButton({
  userId,
  workshopId,
  workshopTitle,
  isCurrentUserRegistered,
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

      if (!isCurrentUserRegistered) {
        await notifyOrganizerAboutRegistration({
          workshopId,
          workshopTitle,
        })
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
      type="submit"
      onClick={handleOnclickRegisterButton}
      size="sm"
      disabled={isPending}
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
