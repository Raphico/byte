"use client"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { useCreateEditWorkshopModal } from "./create-edit-workshop-modal"

export function CreateWorkshopButton() {
  const { setShowCreateEditWorkshopModal, CreateEditWorkshopModal } =
    useCreateEditWorkshopModal({
      text: "Create",
    })

  return (
    <>
      <CreateEditWorkshopModal />
      <Button size="sm" onClick={() => setShowCreateEditWorkshopModal(true)}>
        <Icons.plus className="mr-2 size-4" aria-hidden="true" />
        Create Workshop
      </Button>
    </>
  )
}
