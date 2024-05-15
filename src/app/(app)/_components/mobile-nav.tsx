"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type NavItem } from "@/types"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Icons } from "@/components/icons"

interface MobileNavProps {
  items: NavItem[]
}

export function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="size-5 sm:hidden">
          <Icons.menu aria-hidden="true" />
          <span className="sr-only">Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="p-6 pb-0">
          <div className="flex items-center">
            <Icons.logo className="mr-2 size-6" aria-hidden="true" />
            <span className="font-semibold">Byte</span>
          </div>
        </DrawerHeader>
        <div className="flex flex-col items-start gap-4 p-6">
          {items.map((item) => {
            const isActive = pathname.includes(item.href)
            return (
              <Link
                className={cn("text-sm font-medium text-muted-foreground", {
                  "text-primary": isActive,
                })}
                key={item.href}
                href={item.href}
              >
                {item.title}
              </Link>
            )
          })}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
