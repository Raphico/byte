"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type NavItem } from "@/types"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className="hidden items-center gap-4 sm:flex">
      <Link href="/">
        <Icons.logo className="size-6" aria-hidden="true" />
        <span className="sr-only">Logo</span>
      </Link>

      {items.map((item) => {
        const isActive = pathname.includes(item.href)
        return (
          <Link
            className={cn(
              "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
              {
                "text-primary": isActive,
              }
            )}
            key={item.href}
            href={item.href}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
