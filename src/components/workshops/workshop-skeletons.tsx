import { Skeleton } from "../ui/skeleton"

export function WorkshopSkeletons() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-40 rounded-lg" />
      ))}
    </>
  )
}
