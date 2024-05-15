import { redirect } from "next/navigation"

import { redirects } from "@/config/constants"
import { validateRequest } from "@/lib/lucia/validate-request"

import { Header } from "./_components/header"

export default async function AppLayout({ children }: React.PropsWithChildren) {
  const { user } = await validateRequest()

  if (!user) {
    redirect(redirects.toLogin)
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header user={user} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
