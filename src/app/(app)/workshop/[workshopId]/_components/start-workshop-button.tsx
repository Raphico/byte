"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { startWorkshopAction } from "@/server/actions/workshop"
import { showErrorToast } from "@/utils/handle-error"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface RegisterButtonProps {
  workshopId: string
  isDisabled: boolean
}

export function StartWorkshopButton({
  workshopId,
  isDisabled,
}: RegisterButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const handleStartWorkshop = () => {
    startTransition(async () => {
      const { error } = await startWorkshopAction(workshopId)

      if (error) {
        showErrorToast(error)
      }

      router.push(`/session/${workshopId}`)
    })
  }

  return (
    <Button
      onClick={handleStartWorkshop}
      size="sm"
      disabled={isPending || isDisabled}
    >
      {isPending && (
        <Icons.spinner
          className="mr-2 size-4 animate-spin"
          aria-hidden={true}
        />
      )}
      Start
    </Button>
  )
}
