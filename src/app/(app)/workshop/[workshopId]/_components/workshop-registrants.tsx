import { getWorkshopRegistrants } from "@/server/data/workshop"

interface WorkshopRegistrantsProps {
  workshopId: string
}

export async function WorkshopRegistrants({
  workshopId,
}: WorkshopRegistrantsProps) {
  const registrants = await getWorkshopRegistrants(workshopId)

  if (!registrants.length) {
    return
  }

  if (registrants.length <= 3) {
    return <></>
  }

  return <></>
}
