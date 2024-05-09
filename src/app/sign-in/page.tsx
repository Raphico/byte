import { type Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Byte",
}

export default function SignInPage() {
  return (
    <div className="container flex min-h-screen w-full max-w-sm flex-col items-center justify-center space-y-4">
      <h3 className="text-lg font-semibold">Authenticate with Github</h3>
      <Link
        href=""
        className={cn(buttonVariants(), "w-full")}
        aria-label="Authenticate with Github"
      >
        Authenticate
        <Icons.github className="ml-2 size-4" aria-hidden="true" />
      </Link>
    </div>
  )
}
