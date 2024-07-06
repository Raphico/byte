import { type User } from "lucia"

import { appConfig } from "@/config/app"

import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { UserDropdown } from "./user-dropdown"

interface HeaderProps {
  user: User
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <MainNav items={appConfig.navItems} />
        <MobileNav items={appConfig.navItems} />
        <UserDropdown user={user} />
      </div>
    </header>
  )
}
