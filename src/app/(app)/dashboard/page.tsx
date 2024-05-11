import { type Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env"

import { logout } from "@/lib/lucia/actions"
import { validateRequest } from "@/lib/lucia/validate-request"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Dashboard",
  description: "Welcome to the dashboard",
}

export default async function DashboardPage() {
  const { user } = await validateRequest()

  if (!user) {
    return redirect("/sign-in")
  }

  return (
    <div>
      <h1 className="text-lg">{user.username}</h1>
      <form action={logout}>
        <Button>Sign out</Button>
      </form>
    </div>
  )
}
