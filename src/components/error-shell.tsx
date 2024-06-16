import Link from "next/link"

import { Icons } from "./icons"
import { Button, buttonVariants } from "./ui/button"

type ErrorShellProps = {
  title: string
  description: string
  icon?: keyof typeof Icons
  retryLink?: string
  retryLinkText?: string
  reset?: () => void
}

export function ErrorShell({
  title,
  description,
  retryLink,
  retryLinkText,
  icon,
  reset,
}: ErrorShellProps) {
  const Icon = icon && Icons[icon]

  return (
    <section
      role="alert"
      className="flex flex-col items-center justify-center space-y-1"
    >
      {Icon && <Icon className="size-4" aria-hidden="true" />}
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="pb-1 text-center text-sm text-muted-foreground sm:text-base">
        {description}
      </p>
      {retryLink && (
        <Link href={retryLink} className={buttonVariants({ size: "sm" })}>
          {retryLinkText}
        </Link>
      )}
      {reset && (
        <Button aria-label="Retry" variant="outline" onClick={() => reset()}>
          <Icons.refresh className="mr-2 size-4" aria-hidden="true" />
          Retry
        </Button>
      )}
    </section>
  )
}
