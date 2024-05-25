import { cn } from "@/lib/utils"

import { Icons } from "./icons"

interface EmptyShellProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  icon?: keyof typeof Icons
}

export function EmptyShell({
  title,
  description,
  icon = "empty",
  className,
  children,
  ...props
}: EmptyShellProps) {
  const Icon = Icons[icon]

  return (
    <div
      className={cn(
        "flex w-full max-w-lg flex-col items-center justify-center space-y-2 text-center",
        className
      )}
      {...props}
    >
      <Icon className="size-16" aria-hidden="true" />

      <h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
      {description && (
        <p className="pb-1 text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
      {children}
    </div>
  )
}
