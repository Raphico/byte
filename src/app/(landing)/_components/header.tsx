import Link from "next/link"

import { redirects } from "@/config/constants"
import { Icons } from "@/components/icons"

export function Header() {
  return (
    <header className="w-full">
      <div className="container flex max-w-5xl items-center justify-between py-6">
        <Link href="/">
          <Icons.logo className="size-7" aria-hidden="true" />
          <span className="sr-only">Logo</span>
        </Link>

        <Link
          href={redirects.toLogin}
          className="text-sm font-medium text-zinc-300 hover:text-white"
        >
          Login
        </Link>
      </div>
    </header>
  )
}
