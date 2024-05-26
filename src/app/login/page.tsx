import { type Metadata } from "next"

import { GithubLogin } from "./_components/github-login"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Byte",
}

export default function SignInPage() {
  return (
    <div className="container flex min-h-screen w-full max-w-sm flex-col items-center justify-center">
      <GithubLogin />
    </div>
  )
}
