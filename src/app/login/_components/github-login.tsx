import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function GithubLogin() {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4">
      <h3 className="text-lg font-semibold">Authenticate with Github</h3>
      <Link
        href="/login/github"
        className={cn(buttonVariants(), "w-full")}
        aria-label="Authenticate with Github"
      >
        Authenticate
        <Icons.github className="ml-2 size-4" aria-hidden="true" />
      </Link>
    </div>
  )
}
