import * as React from "react"
import { toast } from "sonner"

import { addParticipantAction } from "@/server/actions/registration"
import { type getWorkshops } from "@/server/data/workshop"
import { cn } from "@/lib/utils"
import { getExactScheduled } from "@/utils/format-scheduled-date"
import { getErrorMessage, showErrorToast } from "@/utils/handle-error"

import { CopyButton } from "../copy-button"
import { Icons } from "../icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { useCreateEditWorkshopModal } from "./create-edit-workshop-modal"
import { useDeleteWorkshopAlert } from "./delete-workshop-alert"

interface WorkshopDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string
  workshop: Awaited<ReturnType<typeof getWorkshops>>[number]
}

export function WorkshopDetails({
  userId,
  workshop,
  className,
  ...props
}: WorkshopDetailsProps) {
  const [isPending, startTransition] = React.useTransition()

  const { CreateEditWorkshopModal, setShowCreateEditWorkshopModal } =
    useCreateEditWorkshopModal({
      text: "Update",
      workshop,
    })

  const { DeleteWorkshopAlert, setShowDeleteWorkshopAlert } =
    useDeleteWorkshopAlert({
      id: workshop.id,
    })

  const addParticipant = () => {
    startTransition(async () => {
      const { error } = await addParticipantAction({
        workshopId: workshop.id,
        participantId: userId,
      })

      if (error) {
        showErrorToast(error)
      }

      toast.success("Registration successful")

      try {
        await fetch("/api/email/new-participant", {
          method: "POST",
          body: JSON.stringify({
            email: workshop.organizer.email,
            organizerUsername: workshop.organizer.username,
            workshopTitle: workshop.title,
          }),
        })
      } catch (error) {
        console.error(getErrorMessage(error))
      }
    })
  }

  const isCurrentUserWorkshop = workshop.organizer.id === userId

  const organizerUsernameInitial = workshop.organizer.username.charAt(0)

  return (
    <>
      <CreateEditWorkshopModal />
      <DeleteWorkshopAlert />
      <div className={cn("space-y-4", className)} {...props}>
        <div className="flex flex-col items-start space-y-1">
          <div className="flex items-center gap-2">
            <Icons.clock
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">
              {getExactScheduled(workshop.scheduled)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Icons.watch
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">
              {workshop.duration} mins
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col items-start space-y-4">
          <div className="space-y-1">
            <h4 className="font-medium sm:text-lg">About</h4>
            <p className="text-sm text-muted-foreground">
              {workshop.description}
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-medium sm:text-lg">Organizer</h4>

            <div className="flex items-center gap-2">
              <Avatar className="size-8 bg-muted">
                {workshop.organizer.image ? (
                  <AvatarImage src={workshop.organizer.image} />
                ) : (
                  <AvatarFallback>{organizerUsernameInitial}</AvatarFallback>
                )}
              </Avatar>

              <p className="text-sm text-muted-foreground">
                {workshop.organizer.username}
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <CopyButton
              value={workshop.accessCode}
              size="icon"
              variant="secondary"
              className="rounded-full hover:bg-secondary/90"
            />
            {isCurrentUserWorkshop && (
              <>
                <Button
                  onClick={() => {
                    setShowCreateEditWorkshopModal(true)
                  }}
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Icons.pen className="size-4" aria-hidden="true" />
                </Button>
                <Button
                  onClick={() => {
                    setShowDeleteWorkshopAlert(true)
                  }}
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                >
                  <Icons.trash className="size-4" aria-hidden="true" />
                </Button>
              </>
            )}
          </div>
          {!isCurrentUserWorkshop ? (
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              onClick={addParticipant}
            >
              {isPending && (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Register
            </Button>
          ) : (
            <Button size="sm">Start</Button>
          )}
        </div>
      </div>
    </>
  )
}
