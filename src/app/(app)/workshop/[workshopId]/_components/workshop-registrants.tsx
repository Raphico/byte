import { type getWorkshopRegistrants } from "@/server/data/registration"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface WorkshopRegistrantsProps {
  registrants: Awaited<ReturnType<typeof getWorkshopRegistrants>>
}

export function WorkshopRegistrants({ registrants }: WorkshopRegistrantsProps) {
  const displayedRegistrants = registrants.slice(0, 4)
  const extraRegistrantsCount = registrants.length - displayedRegistrants.length

  return (
    <div className="flex -space-x-4 rtl:space-x-reverse">
      {displayedRegistrants.map((registrant) => (
        <Avatar key={registrant.id}>
          <AvatarImage
            src={registrant.image ?? ""}
            alt={`@${registrant.username}`}
          />
          <AvatarFallback>
            {registrant.username?.charAt(0) ?? "R"}
          </AvatarFallback>
        </Avatar>
      ))}

      {extraRegistrantsCount && (
        <div className="z-50 flex size-10 items-center justify-center rounded-full bg-muted text-xs font-medium text-white">
          +{extraRegistrantsCount}
        </div>
      )}
    </div>
  )
}
