import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { registerUserWithAccessCode } from "@/server/actions/registration"
import {
  joinWorkshopWithCodeSchema,
  type JoinWorkshopWithCodeSchema,
} from "@/lib/zod/schemas/workshops"
import { showErrorToast } from "@/utils/handle-error"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { JoinWorkshopWithCodeForm } from "./join-workshop-with-code-form"

interface JoinWorkshopWithCodeModalProps {
  userId: string
}

export function JoinWorkshopWithCodeModal({
  showJoinWorkshopWithCodeModal,
  setShowJoinWorkshopWithCodeModal,
  props,
}: {
  showJoinWorkshopWithCodeModal: boolean
  setShowJoinWorkshopWithCodeModal: React.Dispatch<
    React.SetStateAction<boolean>
  >
  props: JoinWorkshopWithCodeModalProps
}) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<JoinWorkshopWithCodeSchema>({
    resolver: zodResolver(joinWorkshopWithCodeSchema),
    defaultValues: {
      accessCode: "",
    },
  })

  const onSubmit = (values: JoinWorkshopWithCodeSchema) => {
    startTransition(async () => {
      const { error } = await registerUserWithAccessCode({
        userId: props.userId,
        accessCode: values.accessCode,
      })

      if (error) {
        showErrorToast(error)
      }

      setShowJoinWorkshopWithCodeModal(false)
      toast.success("Registration Successful")
      form.reset()
    })
  }

  return (
    <Dialog
      open={showJoinWorkshopWithCodeModal}
      onOpenChange={setShowJoinWorkshopWithCodeModal}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader className="items-center">
          <DialogTitle className="text-base">Join Workshop</DialogTitle>
        </DialogHeader>
        <JoinWorkshopWithCodeForm onSubmit={onSubmit} form={form}>
          <Button disabled={isPending}>
            {isPending && (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Join
          </Button>
        </JoinWorkshopWithCodeForm>
      </DialogContent>
    </Dialog>
  )
}

export function useJoinWorkshopWithCodeModal(
  props: JoinWorkshopWithCodeModalProps
) {
  const [showJoinWorkshopWithCodeModal, setShowJoinWorkshopWithCodeModal] =
    React.useState(false)

  const JoinWorkshopWithCodeModalCallback = React.useCallback(
    () => (
      <JoinWorkshopWithCodeModal
        showJoinWorkshopWithCodeModal={showJoinWorkshopWithCodeModal}
        setShowJoinWorkshopWithCodeModal={setShowJoinWorkshopWithCodeModal}
        props={props}
      />
    ),
    [showJoinWorkshopWithCodeModal, props]
  )

  return React.useMemo(
    () => ({
      showJoinWorkshopWithCodeModal,
      setShowJoinWorkshopWithCodeModal,
      JoinWorkshopWithCodeModal: JoinWorkshopWithCodeModalCallback,
    }),
    [JoinWorkshopWithCodeModalCallback, showJoinWorkshopWithCodeModal]
  )
}
