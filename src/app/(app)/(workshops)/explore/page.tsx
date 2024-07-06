import { type Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env"

import { redirects } from "@/config/constants"
import { getUserSession } from "@/server/data/user"
import { getWorkshops } from "@/server/data/workshop"
import { EmptyShell } from "@/components/empty-shell"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"
import { CreateJoinWorkshopDropdown } from "@/components/workshops/create-join-workshop-dropdown"
import { CreateWorkshopButton } from "@/components/workshops/create-workshop-button"
import { WorkshopCard } from "@/components/workshops/workshop-card"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Explore",
  description: "Find and Join Workshop sessions",
}

export default async function DashboardPage() {
  const { user } = await getUserSession()

  if (!user) {
    redirect(redirects.toLogin)
  }

  const workshops = await getWorkshops()

  return (
    <Shell className="max-w-6xl">
      <div className="flex items-center justify-between">
        <PageHeader>
          <PageHeaderHeading>Explore</PageHeaderHeading>
        </PageHeader>

        <CreateJoinWorkshopDropdown userId={user.id} />
      </div>
      {workshops.length ? (
        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </section>
      ) : (
        <Shell className="h-[50vh]" variant="centered">
          <EmptyShell
            title="No Workshops Available"
            description="It looks like there are no workshops available at the moment"
            icon="empty"
          >
            <CreateWorkshopButton />
          </EmptyShell>
        </Shell>
      )}
    </Shell>
  )
}
