"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { Button, type ButtonProps } from "./ui/button"

export function CopyButton({
  value,
  className,
  children,
  ...props
}: ButtonProps) {
  const [isCopied, setIsCopied] = React.useState(false)

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn("text-muted-foreground", className)}
      onClick={() => {
        if (typeof window === "undefined") return
        setIsCopied(true)
        void window.navigator.clipboard.writeText(value?.toString() ?? "")
        setTimeout(() => setIsCopied(false), 2000)
      }}
      {...props}
    >
      {isCopied ? (
        <Icons.check className="size-4" aria-hidden="true" />
      ) : (
        <Icons.copy className="size-4" aria-hidden="true" />
      )}
      {children}
    </Button>
  )
}
