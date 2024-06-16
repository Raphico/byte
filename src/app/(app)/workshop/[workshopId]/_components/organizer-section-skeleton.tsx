import { Skeleton } from "@/components/ui/skeleton"

export function OrganizerSectionSkeleton() {
  return (
    <div className="space-y-1">
      <h4 className="font-medium sm:text-lg">Organizer</h4>

      <div className="flex items-center gap-2">
        <Skeleton className="size-8 rounded-full" />

        <Skeleton className="h-5 w-10" />
      </div>
    </div>
  )
}
