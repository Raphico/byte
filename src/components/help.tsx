import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Icons } from "./icons"

interface HelpProps {
  content: string
  about: string
}

export function Help({ content, about }: HelpProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Icons.help className="ml-1 size-3" />
        <span className="sr-only">{about}</span>
      </PopoverTrigger>
      <PopoverContent
        className="space-y-3 rounded-[0.5rem] text-sm"
        side="right"
        align="start"
        alignOffset={-20}
      >
        <p>{content}</p>
      </PopoverContent>
    </Popover>
  )
}
