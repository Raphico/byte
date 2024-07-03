import { notFound, redirect } from "next/navigation"

import { redirects } from "@/config/constants"
import { getWorkshopRegistrants } from "@/server/data/registration"
import { getUserSession } from "@/server/data/user"
import { getWorkshopSession } from "@/server/data/workshop"
import { Shell } from "@/components/shell"

import { SessionCall } from "./_components/session-call"

interface SessionPageProps {
  params: {
    workshopId: string
  }
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { user } = await getUserSession()

  if (!user) {
    redirect(redirects.toLogin)
  }

  const workshopId = decodeURIComponent(params.workshopId)

  const workshop = await getWorkshopSession(workshopId)

  if (!workshop) {
    notFound()
  }

  const isOrganizer = workshop.organizerId === user.id

  if (workshop.hasCompleted) {
    redirect(`/workshop/${workshop.id}`)
  }

  if (!workshop.hasStarted && !isOrganizer) {
    redirect(`/workshop/${workshop.id}`)
  }

  const registrants = await getWorkshopRegistrants(workshop.id)
  const isCurrentUserARegistrant = registrants.some(
    (registrant) => registrant.id === user.id
  )

  if (workshop.hasStarted && !isCurrentUserARegistrant) {
    redirect(`/dashboard`)
  }

  return (
    <Shell className="max-w-6xl" variant="centered">
      <SessionCall
        workshopId={workshopId}
        isOrganizer={isOrganizer}
        user={user}
      />
    </Shell>
  )
}
