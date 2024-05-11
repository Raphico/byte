import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { redirects } from "@/config/constants"
import { validateRequest } from "@/lib/lucia/validate-request"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Byte",
}

export default async function SignInPage() {
  const { user } = await validateRequest()

  if (user) {
    redirect(redirects.afterLogin)
  }

  return (
    <div className="container flex min-h-screen w-full max-w-sm flex-col items-center justify-center space-y-4">
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
