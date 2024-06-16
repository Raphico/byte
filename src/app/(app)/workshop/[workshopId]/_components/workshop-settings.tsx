"use client"

import * as React from "react"

import { type getWorkshop } from "@/server/data/workshop"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { useCreateEditWorkshopModal } from "@/components/workshops/create-edit-workshop-modal"
import { useDeleteWorkshopAlert } from "@/components/workshops/delete-workshop-alert"

interface WorkshopSettingsProps {
  workshop: NonNullable<Awaited<ReturnType<typeof getWorkshop>>>
}

export function WorkshopSettings({ workshop }: WorkshopSettingsProps) {
  const [open, setOpen] = React.useState(false)

  const { setShowCreateEditWorkshopModal, CreateEditWorkshopModal } =
    useCreateEditWorkshopModal({
      text: "Update",
      workshop,
    })

  const { setShowDeleteWorkshopAlert, DeleteWorkshopAlert } =
    useDeleteWorkshopAlert({
      id: workshop.id,
    })

  return (
    <>
      <CreateEditWorkshopModal />
      <DeleteWorkshopAlert />
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <Icons.more className="size-5" aria-hidden="true" />
            <span className="sr-only">Workshop Settings Dropdown</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setOpen(false)
              setShowCreateEditWorkshopModal(true)
            }}
            aria-label="Edit Workshop"
          >
            <Icons.pen className="mr-2 size-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            aria-label="Delete Workshop"
            onClick={() => {
              setOpen(false)
              setShowDeleteWorkshopAlert(true)
            }}
            className="text-red-400"
          >
            <Icons.trash className="mr-2 size-4" aria-hidden="true" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
