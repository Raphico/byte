import { type Metadata } from "next"
import { env } from "@/env"

import { EmptyShell } from "@/components/empty-shell"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"
import { CreateJoinWorkshopDropdown } from "@/components/workshops/create-join-workshop-dropdown"
import { CreateWorkshopButton } from "@/components/workshops/create-workshop-button"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Dashboard",
  description: "Welcome to the dashboard",
}

export default function DashboardPage() {
  return (
    <Shell className="max-w-6xl">
      <div className="flex items-center justify-between">
        <PageHeader>
          <PageHeaderHeading>Upcoming</PageHeaderHeading>
        </PageHeader>

        <CreateJoinWorkshopDropdown />
      </div>

      <Shell variant="centered">
        <EmptyShell
          title="No Upcoming Workshops"
          description="Looks like you don't have any workshops scheduled yet"
          icon="empty"
        >
          <CreateWorkshopButton />
        </EmptyShell>
      </Shell>
    </Shell>
  )
}
