import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shell"

import { OrganizerSectionSkeleton } from "./_components/organizer-section-skeleton"

export default function WorkshopLoading() {
  return (
    <Shell className="max-w-xl gap-4 sm:mt-8">
      <div className="flex w-full flex-col items-start space-y-2">
        <div className="flex w-full items-start justify-between">
          <Skeleton className="h-7 w-52" />

          <div className="flex items-center gap-1">
            <Skeleton className="size-4" />
            <Skeleton className="size-4" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Icons.clock
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="flex items-center gap-2">
          <Icons.watch
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Skeleton className="h-5 w-10" />
        </div>
      </div>

      <Separator />

      <div className="flex w-full flex-col items-start space-y-4">
        <div className="w-full space-y-1">
          <h4 className="font-medium sm:text-lg">About</h4>

          <Skeleton className="h-20 w-full" />
        </div>

        <OrganizerSectionSkeleton />
      </div>
    </Shell>
  )
}
