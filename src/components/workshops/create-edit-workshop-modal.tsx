import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  createWorkshopAction,
  updateWorkshopAction,
} from "@/server/actions/workshop"
import { type getWorkshop } from "@/server/data/workshop"
import { generateId } from "@/lib/id"
import {
  createEditWorkshopSchema,
  type CreateEditWorkshopSchema,
} from "@/lib/zod/schemas/workshops"
import { convertScheduledToDate } from "@/utils/format-scheduled-date"
import { showErrorToast } from "@/utils/handle-error"
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
  text: "Create" | "Update"
  workshop?: NonNullable<Awaited<ReturnType<typeof getWorkshop>>>
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
  const { workshop } = props

  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<CreateEditWorkshopSchema>({
    resolver: zodResolver(createEditWorkshopSchema),
    defaultValues: {
      title: workshop?.title ?? "",
      description: workshop?.description ?? "",
      scheduled:
        workshop?.scheduled && convertScheduledToDate(workshop.scheduled),
      duration: workshop?.duration ?? 15,
      accessCode: workshop?.accessCode ?? generateId(8),
      isPublic: workshop?.isPublic ?? true,
    },
  })

  const onSubmit = (values: CreateEditWorkshopSchema) => {
    startTransition(async () => {
      const { error } = workshop
        ? await updateWorkshopAction({
            id: workshop.id,
            ...values,
          })
        : await createWorkshopAction({
            ...values,
          })

      if (error) {
        showErrorToast(error)
        return
      }

      setShowCreateEditWorkshopModal(false)
      toast.success(`Workshop ${workshop ? "Updated" : "Created"}`)
      form.reset()
    })
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
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              {props.text} Workshop
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
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              {props.text} Workshop
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
