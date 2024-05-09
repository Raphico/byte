import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { DotBg } from "@/components/dot-bg"
import { Icons } from "@/components/icons"

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <DotBg />
      <div className="absolute left-8 top-6 flex items-center">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <Icons.chevronLeft className="mr-2 size-4" aria-hidden="true" />
          Go Back
        </Link>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  )
}
