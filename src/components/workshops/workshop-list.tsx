import { type getWorkshops } from "@/server/data/workshop"

import { WorkshopCard } from "./workshop-card"

interface WorkshopListProps {
  workshops: Awaited<ReturnType<typeof getWorkshops>>
}

export function WorkshopList({ workshops }: WorkshopListProps) {
  return (
    <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {workshops.map((workshop) => (
        <WorkshopCard key={workshop.id} workshop={workshop} />
      ))}
    </section>
  )
}
