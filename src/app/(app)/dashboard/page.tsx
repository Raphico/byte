import { type Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env"

import { redirects } from "@/config/constants"
import { validateRequest } from "@/lib/lucia/validate-request"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Dashboard",
  description: "Welcome to the dashboard",
}

export default async function DashboardPage() {
  const { user } = await validateRequest()

  if (!user) {
    return redirect(redirects.toLogin)
  }

  return (
    <div>
      <h1 className="text-lg">{user.username}</h1>
    </div>
  )
}
