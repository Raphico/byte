import Link from "next/link"

import { type getWorkshops } from "@/server/data/workshop"
import { cn } from "@/lib/utils"
import { formatScheduledDate } from "@/utils/format-scheduled-date"

import { badgeVariants } from "../ui/badge"
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card"

interface WorkshopCardProps {
  workshop: Awaited<ReturnType<typeof getWorkshops>>[number]
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  return (
    <Link href={`/workshop/${workshop.id}`}>
      <Card className="grid size-full">
        <CardHeader className="p-4">
          <CardTitle className="max-w-48">{workshop.title}</CardTitle>
        </CardHeader>
        <CardFooter className="p-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <p className={cn(badgeVariants({ variant: "secondary" }))}>
                {formatScheduledDate(workshop.scheduled)}
              </p>

              <p className="text-sm">{workshop.duration} mins</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
