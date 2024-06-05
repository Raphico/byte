import * as React from "react"

import { type getWorkshops } from "@/server/data/workshop"
import { useMediaQuery } from "@/hooks/use-media-query"

import { Icons } from "../icons"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer"
import { WorkshopDetails } from "./workshop-details"

interface WorkshopDetailsModalProps {
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
  props: WorkshopDetailsModalProps
}) {
  const { userId, workshop } = props

  const isDesktop = useMediaQuery("(min-width: 768px)")

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

          <WorkshopDetails
            isCurrentUserWorkshop={isCurrentUserWorkshop}
            workshop={workshop}
          />
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

        <WorkshopDetails
          isCurrentUserWorkshop={isCurrentUserWorkshop}
          workshop={workshop}
          className="p-4 pt-1.5"
        />
      </DrawerContent>
    </Drawer>
  )
}

export function useWorkshopDetailsModal(props: WorkshopDetailsModalProps) {
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
