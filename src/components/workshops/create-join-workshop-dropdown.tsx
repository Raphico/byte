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
import { useJoinWorkshopWithCodeModal } from "./join-workshop-with-code-modal"

interface CreateJoinWorkshopDropdownProps {
  userId: string
}

export function CreateJoinWorkshopDropdown({
  userId,
}: CreateJoinWorkshopDropdownProps) {
  const [open, setOpen] = React.useState(false)
  const { setShowCreateEditWorkshopModal, CreateEditWorkshopModal } =
    useCreateEditWorkshopModal({
      text: "Create",
    })

  const { JoinWorkshopWithCodeModal, setShowJoinWorkshopWithCodeModal } =
    useJoinWorkshopWithCodeModal({
      userId,
    })

  return (
    <>
      <CreateEditWorkshopModal />
      <JoinWorkshopWithCodeModal />
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
          <DropdownMenuItem
            onClick={() => {
              setOpen(false)
              setShowJoinWorkshopWithCodeModal(true)
            }}
          >
            <Icons.video className="mr-2 size-4" aria-hidden="true" />
            Join Workshop
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
