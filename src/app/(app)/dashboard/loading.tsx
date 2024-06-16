import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"
import { WorkshopSkeletons } from "@/components/workshops/workshop-skeletons"

export default function DashboardLoading() {
  return (
    <Shell className="max-w-6xl">
      <div className="flex items-center justify-between">
        <PageHeader>
          <PageHeaderHeading>Upcoming</PageHeaderHeading>
        </PageHeader>

        <Skeleton className="size-8 rounded-3xl" />
      </div>

      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <WorkshopSkeletons />
      </section>
    </Shell>
  )
}
