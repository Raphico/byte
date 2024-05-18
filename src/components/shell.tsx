/**
 * Original source:
 * @see https://github.com/sadmann7/skateshop/tree/main/src/components/shell.tsx
 */

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const shellVariants = cva("grid items-center gap-8 pb-8 pt-6 lg:py-6", {
  variants: {
    variant: {
      default: "container",
      centered: "container flex h-dvh max-w-2xl flex-col justify-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType
}

function Shell({
  className,
  as: Comp = "section",
  variant,
  ...props
}: ShellProps) {
  return (
    <Comp className={cn(shellVariants({ variant }), className)} {...props} />
  )
}

export { Shell, shellVariants }
