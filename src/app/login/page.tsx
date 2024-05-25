import { type Metadata } from "next"
import { redirect } from "next/navigation"

import { redirects } from "@/config/constants"
import { validateRequest } from "@/lib/lucia/validate-request"
import { Shell } from "@/components/shell"

import { GithubLogin } from "./_components/github-login"

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
    <Shell variant="centered" className="max-w-sm">
      <GithubLogin />
    </Shell>
  )
}
