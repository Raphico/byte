import { redirect } from "next/navigation"

import { redirects } from "@/config/constants"
import { getUserSession } from "@/server/data/user"

import { Header } from "./_components/header"

interface AppLayoutProps {
  children: React.ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const { user } = await getUserSession()

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
