import type { Viewport } from "next"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"

export const viewport: Viewport = {
  colorScheme: "dark",
}

export default function HomePage() {
  return (
    <section className="container flex min-h-screen w-full flex-col items-center justify-center space-y-4 text-center">
      <div className="absolute inset-0 -z-10 bg-dot"></div>

      <Link
        href={siteConfig.githubLink}
        className={cn(
          badgeVariants({
            variant: "outline",
          }),
          "animate-fade-up text-zinc-300 transition-colors duration-150 hover:text-white"
        )}
        target="_blank"
        rel="noreferrer"
        style={{ animationDelay: "0.10s", animationFillMode: "both" }}
      >
        Star on Github
        <span className="ml-1 text-zinc-400 transition-transform duration-150 ease-in-out">
          -&gt;
        </span>
      </Link>

      <h1
        className="max-w-3xl animate-fade-up bg-gradient-to-b from-neutral-200 via-zinc-200 to-neutral-500 bg-clip-text font-heading text-4xl font-semibold tracking-tight text-transparent md:text-6xl lg:text-8xl"
        style={{ animationDelay: "0.20s", animationFillMode: "both" }}
      >
        <Balancer>One Platform for Virtual Learning</Balancer>
      </h1>

      <p
        className="max-w-lg animate-fade-up text-base text-zinc-400 sm:pb-2 sm:text-lg"
        style={{ animationDelay: "0.30s", animationFillMode: "both" }}
      >
        Plan, organize, and manage virtual workshop sessions
      </p>

      <Link
        href="/sign-in"
        className={cn(
          buttonVariants(),
          "animate-fade-up bg-gradient-to-r from-neutral-200 via-zinc-100 to-neutral-200 text-zinc-900"
        )}
        style={{ animationDelay: "0.40s", animationFillMode: "both" }}
      >
        Get Started
        <span className="ml-1 text-zinc-400 transition-transform duration-150 ease-in-out">
          -&gt;
        </span>
      </Link>
    </section>
  )
}
