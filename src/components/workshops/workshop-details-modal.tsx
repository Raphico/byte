import * as React from "react"

import { type getWorkshops } from "@/server/data/workshop"
import { getExactScheduled } from "@/utils/format-scheduled-date"
import { useMediaQuery } from "@/hooks/use-media-query"

import { CopyButton } from "../copy-button"
import { Icons } from "../icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer"
import { Separator } from "../ui/separator"

interface WorkshopDetailsProps {
  userId: string
  workshop: Awaited<ReturnType<typeof getWorkshops>>[number]
}

export function WorkshopDetailsModal({
  showWorkshopDetailsModal,
  setShowWorkshopDetailsModal,
  props,
}: {
  showWorkshopDetailsModal: boolean
  setShowWorkshopDetailsModal: React.Dispatch<React.SetStateAction<boolean>>
  props: WorkshopDetailsProps
}) {
  const { userId, workshop } = props
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const organizerUsernameInitial = workshop.organizer.username.charAt(0)

  const isCurrentUserWorkshop = workshop.organizer.id === userId

  if (isDesktop) {
    return (
      <Dialog
        open={showWorkshopDetailsModal}
        onOpenChange={setShowWorkshopDetailsModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl">{workshop.title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-start space-y-4">
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
                <h4 className="text-lg font-medium">About</h4>
                <p className="text-sm text-muted-foreground">
                  {workshop.description}
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-medium">Organizer</h4>

                <div className="flex items-center gap-2">
                  <Avatar className="size-8 bg-muted">
                    {workshop.organizer.image ? (
                      <AvatarImage src={workshop.organizer.image} />
                    ) : (
                      <AvatarFallback>
                        {organizerUsernameInitial}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <p className="text-sm text-muted-foreground">
                    {workshop.organizer.username}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex w-full items-center justify-between pt-4">
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
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <Icons.pen className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="rounded-full"
                    >
                      <Icons.trash className="size-4" aria-hidden="true" />
                    </Button>
                  </>
                )}
              </div>
              {!isCurrentUserWorkshop && <Button size="sm">Register</Button>}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer
      open={showWorkshopDetailsModal}
      onOpenChange={setShowWorkshopDetailsModal}
    >
      <DrawerContent>
        <DrawerHeader className="pb-1.5">
          <div className="flex items-center justify-between">
            <DrawerTitle>{workshop.title}</DrawerTitle>

            <DrawerClose>
              <Icons.close className="size-4" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="space-y-4 p-4 pt-1.5">
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
              <h4 className="text-lg font-medium">About</h4>
              <p className="text-sm text-muted-foreground">
                {workshop.description}
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-medium">Organizer</h4>

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
        </div>
        <DrawerFooter>
          <div className="flex w-full items-center justify-between">
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
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <Icons.pen className="size-4" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full"
                  >
                    <Icons.trash className="size-4" aria-hidden="true" />
                  </Button>
                </>
              )}
            </div>
            {isCurrentUserWorkshop && <Button size="sm">Register</Button>}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function useWorkshopDetailsModal(props: WorkshopDetailsProps) {
  const [showWorkshopDetailsModal, setShowWorkshopDetailsModal] =
    React.useState(false)

  const WorkshopDetailsModalCallback = React.useCallback(
    () => (
      <WorkshopDetailsModal
        showWorkshopDetailsModal={showWorkshopDetailsModal}
        setShowWorkshopDetailsModal={setShowWorkshopDetailsModal}
        props={props}
      />
    ),
    [props, showWorkshopDetailsModal]
  )

  return React.useMemo(
    () => ({
      showWorkshopDetailsModal,
      setShowWorkshopDetailsModal,
      WorkshopDetailsModal: WorkshopDetailsModalCallback,
    }),
    [
      WorkshopDetailsModalCallback,
      setShowWorkshopDetailsModal,
      showWorkshopDetailsModal,
    ]
  )
}
