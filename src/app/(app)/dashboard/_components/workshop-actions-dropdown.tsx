import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

export function WorkshopActionsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="size-8">
          <Icons.circleEllipsis />
          <span className="sr-only">Create or Join a Workshop</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Icons.plus className="mr-2 size-4" aria-hidden="true" />
          Create Workshop
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icons.video className="mr-2 size-4" aria-hidden="true" />
          Join Workshop
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
