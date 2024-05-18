import { type Metadata } from "next"
import { env } from "@/env"

import { Button } from "@/components/ui/button"
import { EmptyShell } from "@/components/empty-shell"
import { Icons } from "@/components/icons"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"

import { WorkshopActionsDropdown } from "./_components/workshop-actions-dropdown"

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

        <WorkshopActionsDropdown />
      </div>

      <EmptyShell
        title="No Upcoming Workshops"
        description="Looks like you don't have any workshops scheduled yet"
        icon="empty"
      >
        <Button size="sm">
          <Icons.plus className="mr-2 size-4" aria-hidden="true" />
          Create Workshop
        </Button>
      </EmptyShell>
    </Shell>
  )
}
