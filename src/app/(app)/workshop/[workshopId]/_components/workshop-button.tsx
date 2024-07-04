import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

import { RegisterButton } from "./register-button"
import { StartWorkshopButton } from "./start-workshop-button"

interface WorkshopButtonProps {
  userId: string
  workshopId: string
  workshopTitle: string
  isUserOrganizer: boolean
  isUserRegistered: boolean
  hasWorkshopStarted: boolean
  hasWorkshopCompleted: boolean
}

export function WorkshopButton({
  hasWorkshopStarted,
  isUserOrganizer,
  workshopTitle,
  isUserRegistered,
  workshopId,
  userId,
  hasWorkshopCompleted,
}: WorkshopButtonProps) {
  if (hasWorkshopCompleted) {
    return (
      <Button disabled size="sm">
        Ended
      </Button>
    )
  }

  if (isUserOrganizer) {
    return (
      <StartWorkshopButton
        workshopId={workshopId}
        isDisabled={hasWorkshopStarted}
      />
    )
  }

  if (!hasWorkshopStarted) {
    return (
      <RegisterButton
        isDisabled={hasWorkshopStarted}
        userId={userId}
        workshopId={workshopId}
        isCurrentUserRegistered={isUserRegistered}
        workshopTitle={workshopTitle}
      />
    )
  }

  if (hasWorkshopStarted && isUserRegistered) {
    return (
      <Link
        className={cn(buttonVariants({ size: "sm" }))}
        href={`/session/${workshopId}`}
      >
        Join
      </Link>
    )
  }

  return (
    <Button size="sm" disabled>
      Closed
    </Button>
  )
}
