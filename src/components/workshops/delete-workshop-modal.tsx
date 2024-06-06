import * as React from "react"
import { toast } from "sonner"

import { deleteWorkshopAction } from "@/server/actions/workshop"
import { showErrorToast } from "@/utils/handle-error"

import { Icons } from "../icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"

interface DeleteWorkshopAlertModalProps {
  id: number
}

export function DeleteWorkshopAlertModal({
  showDeleteWorkshopAlertModal,
  setShowDeleteWorkshopAlertModal,
  props,
}: {
  showDeleteWorkshopAlertModal: boolean
  setShowDeleteWorkshopAlertModal: React.Dispatch<React.SetStateAction<boolean>>
  props: DeleteWorkshopAlertModalProps
}) {
  const idAsNumber = Number(props.id)
  const [_, startTransition] = React.useState()

  const deleteWorkshop = () => {
    startTransition(async () => {
      const { error } = await deleteWorkshopAction(idAsNumber)

      if (error) {
        showErrorToast(error)
      }

      toast.success("Workshop Deleted")
    })
  }

  return (
    <AlertDialog
      open={showDeleteWorkshopAlertModal}
      onOpenChange={setShowDeleteWorkshopAlertModal}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be done. This will permanently delete your
            workshop
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteWorkshop}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function useDeleteWorkshopAlertModal(
  props: DeleteWorkshopAlertModalProps
) {
  const [showDeleteWorkshopAlertModal, setShowDeleteWorkshopAlertModal] =
    React.useState(false)

  const DeleteWorkshopAlertModalCallback = React.useCallback(
    () => (
      <DeleteWorkshopAlertModal
        showDeleteWorkshopAlertModal={showDeleteWorkshopAlertModal}
        setShowDeleteWorkshopAlertModal={setShowDeleteWorkshopAlertModal}
        props={props}
      />
    ),
    [showDeleteWorkshopAlertModal, props]
  )

  return React.useMemo(
    () => ({
      showDeleteWorkshopAlertModal,
      setShowDeleteWorkshopAlertModal,
      DeleteWorkshopAlertModal: DeleteWorkshopAlertModalCallback,
    }),
    [DeleteWorkshopAlertModalCallback, showDeleteWorkshopAlertModal]
  )
}
