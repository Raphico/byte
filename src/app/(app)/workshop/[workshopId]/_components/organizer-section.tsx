import { getWorkshopOrganizer } from "@/server/data/workshop"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface OrganizerSectionProps {
  organizerId: string
}

export async function OrganizerSection({ organizerId }: OrganizerSectionProps) {
  const organizer = await getWorkshopOrganizer(organizerId)

  const organizerUsernameInitial = organizer?.username.charAt(0)

  return (
    <div className="space-y-1">
      <h4 className="font-medium sm:text-lg">Organizer</h4>

      <div className="flex items-center gap-2">
        <Avatar className="size-8 bg-muted">
          {organizer?.image ? (
            <AvatarImage src={organizer.image} />
          ) : (
            <AvatarFallback>{organizerUsernameInitial}</AvatarFallback>
          )}
        </Avatar>

        <p className="text-sm text-muted-foreground">{organizer?.username}</p>
      </div>
    </div>
  )
}
