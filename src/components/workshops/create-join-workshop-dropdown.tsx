"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

import { useCreateEditWorkshopModal } from "./create-edit-workshop-modal"

export function CreateJoinWorkshopDropdown() {
  const [open, setOpen] = React.useState(false)
  const { setShowCreateEditWorkshopModal, CreateEditWorkshopModal } =
    useCreateEditWorkshopModal({
      text: "Create",
    })

  return (
    <>
      <CreateEditWorkshopModal />
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="size-8"
            onClick={() => setOpen(true)}
          >
            <Icons.circleEllipsis />
            <span className="sr-only">Create or Join a Workshop</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setOpen(false)
              setShowCreateEditWorkshopModal(true)
            }}
          >
            <Icons.plus className="mr-2 size-4" aria-hidden="true" />
            Create Workshop
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icons.video className="mr-2 size-4" aria-hidden="true" />
            Join Workshop
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
