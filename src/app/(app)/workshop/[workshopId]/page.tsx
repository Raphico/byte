import * as React from "react"
import { notFound, redirect } from "next/navigation"

import { redirects } from "@/config/constants"
import { getUserSession } from "@/server/data/user"
import { getWorkshop } from "@/server/data/workshop"
import { getExactScheduled } from "@/utils/format-scheduled-date"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CopyButton } from "@/components/copy-button"
import { Icons } from "@/components/icons"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"

import { OrganizerSection } from "./_components/organizer-section"
import { OrganizerSectionSkeleton } from "./_components/organizer-section-skeleton"
import { WorkshopSettings } from "./_components/workshop-settings"

interface WorkshopPageProps {
  params: {
    workshopId: string
  }
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const workshopId = decodeURIComponent(params.workshopId)

  const workshop = await getWorkshop(workshopId)

  if (!workshop) {
    notFound()
  }

  const { user } = await getUserSession()

  if (!user) {
    redirect(redirects.toLogin)
  }

  const isCurrentUserWorkshop = workshop.organizerId === user.id

  return (
    <Shell className="max-w-xl gap-4 sm:mt-8">
      <div className="flex w-full flex-col items-start space-y-1">
        <div className="flex w-full items-start justify-between">
          <PageHeader>
            <PageHeaderHeading>{workshop.title}</PageHeaderHeading>
          </PageHeader>

          <div className="flex items-center gap-1">
            <CopyButton
              value={workshop.accessCode}
              size="icon"
              className="rounded-full"
            />
            {isCurrentUserWorkshop && <WorkshopSettings workshop={workshop} />}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Icons.clock
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            {getExactScheduled(workshop.scheduled)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Icons.watch
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            {workshop.duration} mins
          </p>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col items-start space-y-4">
        <div className="space-y-1">
          <h4 className="font-medium sm:text-lg">About</h4>

          <p className="max-w-lg text-sm text-muted-foreground">
            {workshop.description}
          </p>
        </div>

        <React.Suspense fallback={<OrganizerSectionSkeleton />}>
          <OrganizerSection organizerId={workshop.organizerId} />
        </React.Suspense>

        <div className="flex w-full justify-end">
          {!isCurrentUserWorkshop ? (
            <Button size="sm">
              {/* {isPending && (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )} */}
              Register
            </Button>
          ) : (
            <Button size="sm">Start</Button>
          )}
        </div>
      </div>
    </Shell>
  )
}
