import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { deleteWorkshopAction } from "@/server/actions/workshop"
import { showErrorToast } from "@/utils/handle-error"

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

interface DeleteWorkshopAlertProps {
  id: string
}

export function DeleteWorkshopAlert({
  showDeleteWorkshopAlert,
  setShowDeleteWorkshopAlert,
  props,
}: {
  showDeleteWorkshopAlert: boolean
  setShowDeleteWorkshopAlert: React.Dispatch<React.SetStateAction<boolean>>
  props: DeleteWorkshopAlertProps
}) {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = React.useTransition()

  const deleteWorkshop = () => {
    startTransition(async () => {
      const { error } = await deleteWorkshopAction(props.id)

      if (error) {
        showErrorToast(error)
        return
      }

      toast.success("Workshop Deleted")
      router.push("/dashboard")
    })
  }

  return (
    <AlertDialog
      open={showDeleteWorkshopAlert}
      onOpenChange={setShowDeleteWorkshopAlert}
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

export function useDeleteWorkshopAlert(props: DeleteWorkshopAlertProps) {
  const [showDeleteWorkshopAlert, setShowDeleteWorkshopAlert] =
    React.useState(false)

  const DeleteWorkshopAlertCallback = React.useCallback(
    () => (
      <DeleteWorkshopAlert
        showDeleteWorkshopAlert={showDeleteWorkshopAlert}
        setShowDeleteWorkshopAlert={setShowDeleteWorkshopAlert}
        props={props}
      />
    ),
    [showDeleteWorkshopAlert, props]
  )

  return React.useMemo(
    () => ({
      showDeleteWorkshopAlert,
      setShowDeleteWorkshopAlert,
      DeleteWorkshopAlert: DeleteWorkshopAlertCallback,
    }),
    [DeleteWorkshopAlertCallback, showDeleteWorkshopAlert]
  )
}
