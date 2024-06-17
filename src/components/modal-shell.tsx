"use client"

import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

import { Dialog, DialogContent, DialogOverlay } from "./ui/dialog"
import { Drawer, DrawerContent, DrawerOverlay } from "./ui/drawer"

interface ModalShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ModalShell({ children, className, ...props }: ModalShellProps) {
  const router = useRouter()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const onOpenChange = () => router.back()

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={onOpenChange}>
        <DialogOverlay />
        <DialogContent>
          <div className={cn(className)} {...props}>
            {children}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={true} onOpenChange={onOpenChange}>
      <DrawerOverlay />
      <DrawerContent>
        <div className={cn(className)} {...props}>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
