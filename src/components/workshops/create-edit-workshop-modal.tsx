import * as React from "react"
import { type Workshop } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { generateIdFromEntropySize } from "lucia"
import { useForm } from "react-hook-form"

import {
  createEditWorkshopSchema,
  type CreateEditWorkshopSchema,
} from "@/lib/validations/workshop"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { CreateEditWorkshopForm } from "./create-edit-workshop-form"

interface CreateEditWorkshopModalProps {
  workshop?: Workshop
  text: "Create" | "Edit"
}

export function CreateEditWorkshopModal({
  showCreateEditWorkshopModal,
  setShowCreateEditWorkshopModal,
  props,
}: {
  showCreateEditWorkshopModal: boolean
  setShowCreateEditWorkshopModal: React.Dispatch<React.SetStateAction<boolean>>
  props: CreateEditWorkshopModalProps
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [isPending, startTransition] = React.useTransition()
  const workshopCode = generateIdFromEntropySize(10)

  const form = useForm<CreateEditWorkshopSchema>({
    resolver: zodResolver(createEditWorkshopSchema),
    defaultValues: {
      title: "",
      description: "",
      scheduled: undefined,
      duration: 15,
      code: workshopCode,
      isPublic: true,
    },
  })

  const onSubmit = (values: CreateEditWorkshopSchema) => {
    console.log(values)
  }

  if (isDesktop) {
    return (
      <Dialog
        open={showCreateEditWorkshopModal}
        onOpenChange={setShowCreateEditWorkshopModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              {props.text} Workshop
            </DialogTitle>
          </DialogHeader>
          <CreateEditWorkshopForm form={form} onSubmit={onSubmit}>
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <Icons.spinner className="mr-2 size-4" aria-hidden="true" />
              )}
              Create Workshop
            </Button>
          </CreateEditWorkshopForm>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer
      open={showCreateEditWorkshopModal}
      onOpenChange={setShowCreateEditWorkshopModal}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerClose className="absolute left-4 top-11 text-sm text-muted-foreground">
            Cancel
          </DrawerClose>
          <DrawerTitle className="text-center text-base">
            {props.text} profile
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <CreateEditWorkshopForm form={form} onSubmit={onSubmit}>
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <Icons.spinner className="mr-2 size-4" aria-hidden="true" />
              )}
              Create Workshop
            </Button>
          </CreateEditWorkshopForm>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export function useCreateEditWorkshopModal(
  props: CreateEditWorkshopModalProps
) {
  const [showCreateEditWorkshopModal, setShowCreateEditWorkshopModal] =
    React.useState(false)

  const CreateEditWorkshopModalCallback = React.useCallback(() => {
    return (
      <CreateEditWorkshopModal
        showCreateEditWorkshopModal={showCreateEditWorkshopModal}
        setShowCreateEditWorkshopModal={setShowCreateEditWorkshopModal}
        props={props}
      />
    )
  }, [showCreateEditWorkshopModal, props])

  return React.useMemo(
    () => ({
      showCreateEditWorkshopModal,
      setShowCreateEditWorkshopModal,
      CreateEditWorkshopModal: CreateEditWorkshopModalCallback,
    }),
    [
      showCreateEditWorkshopModal,
      setShowCreateEditWorkshopModal,
      CreateEditWorkshopModalCallback,
    ]
  )
}
