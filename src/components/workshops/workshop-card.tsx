"use client"

import { type getWorkshops } from "@/server/data/workshop"
import { cn } from "@/lib/utils"
import { formatScheduledDate } from "@/utils/format-scheduled-date"

import { Icons } from "../icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { badgeVariants } from "../ui/badge"
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { useWorkshopDetailsModal } from "./workshop-details-modal"

interface WorkshopCardProps {
  userId: string
  workshop: Awaited<ReturnType<typeof getWorkshops>>[number]
}

export function WorkshopCard({ userId, workshop }: WorkshopCardProps) {
  const organizerUsernameInitial = workshop.organizer.username.charAt(0)
  const { setShowWorkshopDetailsModal, WorkshopDetailsModal } =
    useWorkshopDetailsModal({
      userId,
      workshop,
    })

  return (
    <>
      <WorkshopDetailsModal />
      <Card
        className="grid cursor-pointer transition-colors hover:bg-muted"
        onClick={() => setShowWorkshopDetailsModal(true)}
      >
        <CardHeader className="flex-row justify-between p-4">
          <CardTitle className="max-w-48">{workshop.title}</CardTitle>

          <Icons.more className="size-4" aria-hidden="true" />
        </CardHeader>
        <CardFooter className="p-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <p className={cn(badgeVariants({ variant: "secondary" }))}>
                {formatScheduledDate(workshop.scheduled)}
              </p>

              <p className="text-sm">{workshop.duration} mins</p>
            </div>

            <Avatar className="size-8 bg-muted">
              {workshop.organizer.image ? (
                <AvatarImage src={workshop.organizer.image} />
              ) : (
                <AvatarFallback>{organizerUsernameInitial}</AvatarFallback>
              )}
            </Avatar>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
