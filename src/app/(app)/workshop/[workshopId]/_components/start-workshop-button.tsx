"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface StartWorkshopButtonProps {
  workshopId: string
}

export function StartWorkshopButton({ workshopId }: StartWorkshopButtonProps) {
  return (
    <Link
      href={`/session/${workshopId}`}
      className={cn(buttonVariants({ size: "sm" }))}
    >
      Start Workshop
    </Link>
  )
}
