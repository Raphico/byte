import { type getWorkshops } from "@/server/data/workshop"
import { cn } from "@/lib/utils"
import { getExactScheduled } from "@/utils/format-scheduled-date"

import { CopyButton } from "../copy-button"
import { Icons } from "../icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

interface WorkshopDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  isCurrentUserWorkshop: boolean
  workshop: Awaited<ReturnType<typeof getWorkshops>>[number]
}

export function WorkshopDetails({
  workshop,
  isCurrentUserWorkshop,
  className,
  ...props
}: WorkshopDetailsProps) {
  const organizerUsernameInitial = workshop.organizer.username.charAt(0)

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex flex-col items-start space-y-1">
        <div className="flex items-center gap-2">
          <Icons.clock
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            {getExactScheduled(workshop.scheduled)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Icons.watch
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            {workshop.duration} mins
          </p>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col items-start space-y-4">
        <div className="space-y-1">
          <h4 className="font-medium sm:text-lg">About</h4>
          <p className="text-sm text-muted-foreground">
            {workshop.description}
          </p>
        </div>

        <div className="space-y-1">
          <h4 className="font-medium sm:text-lg">Organizer</h4>

          <div className="flex items-center gap-2">
            <Avatar className="size-8 bg-muted">
              {workshop.organizer.image ? (
                <AvatarImage src={workshop.organizer.image} />
              ) : (
                <AvatarFallback>{organizerUsernameInitial}</AvatarFallback>
              )}
            </Avatar>

            <p className="text-sm text-muted-foreground">
              {workshop.organizer.username}
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between pt-2">
        <div className="flex items-center gap-4">
          <CopyButton
            value={workshop.accessCode}
            size="icon"
            variant="secondary"
            className="rounded-full hover:bg-secondary/90"
          />
          {isCurrentUserWorkshop && (
            <>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Icons.pen className="size-4" aria-hidden="true" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full"
              >
                <Icons.trash className="size-4" aria-hidden="true" />
              </Button>
            </>
          )}
        </div>
        {!isCurrentUserWorkshop && <Button size="sm">Register</Button>}
      </div>
    </div>
  )
}
