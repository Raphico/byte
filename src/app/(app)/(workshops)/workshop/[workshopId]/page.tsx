import * as React from "react"
import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { env } from "@/env"

import { redirects } from "@/config/constants"
import { getWorkshopRegistrants } from "@/server/data/registration"
import { getUserSession } from "@/server/data/user"
import { getWorkshop, getWorkshopMetadata } from "@/server/data/workshop"
import { getExactScheduled } from "@/utils/format-scheduled-date"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CopyButton } from "@/components/copy-button"
import { Icons } from "@/components/icons"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"

import { OrganizerSection } from "./_components/organizer-section"
import { OrganizerSectionSkeleton } from "./_components/organizer-section-skeleton"
import { WorkshopButton } from "./_components/workshop-button"
import { WorkshopRegistrants } from "./_components/workshop-registrants"
import { WorkshopSettings } from "./_components/workshop-settings"

interface WorkshopPageProps {
  params: {
    workshopId: string
  }
}

export async function generateMetadata({
  params,
}: WorkshopPageProps): Promise<Metadata> {
  const workshopId = decodeURIComponent(params.workshopId)

  const workshop = await getWorkshopMetadata(workshopId)

  if (!workshop) {
    return {}
  }

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: workshop.title,
    description: workshop.description,
  }
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const { user } = await getUserSession()

  if (!user) {
    redirect(redirects.toLogin)
  }

  const workshopId = decodeURIComponent(params.workshopId)

  const workshop = await getWorkshop(workshopId)

  if (!workshop) {
    notFound()
  }

  const registrants = await getWorkshopRegistrants(workshop.id)

  const isUserOrganizer = workshop.organizerId === user.id
  const isUserRegistered = registrants.some(
    (registrant) => registrant.id === user.id
  )

  return (
    <Shell className="max-w-xl gap-4">
      <div className="flex w-full flex-col items-start space-y-1">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <PageHeader>
              <PageHeaderHeading>{workshop.title}</PageHeaderHeading>
            </PageHeader>
            <Badge>
              {workshop.hasCompleted
                ? "Ended"
                : workshop.hasStarted
                  ? "Ongoing"
                  : "Open"}
            </Badge>
          </div>

          {isUserOrganizer && <WorkshopSettings workshop={workshop} />}
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

        <WorkshopRegistrants registrants={registrants} />
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

        <div className="flex w-full justify-end space-x-4">
          <CopyButton
            variant="secondary"
            className="gap-2 text-secondary-foreground"
            value={workshop.accessCode}
          >
            Copy code
          </CopyButton>

          <WorkshopButton
            userId={user.id}
            workshopId={workshop.id}
            isUserOrganizer={isUserOrganizer}
            isUserRegistered={isUserRegistered}
            workshopTitle={workshop.title}
            hasWorkshopStarted={workshop.hasStarted}
            hasWorkshopCompleted={workshop.hasCompleted}
          />
        </div>
      </div>
    </Shell>
  )
}
