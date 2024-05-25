import type { Viewport } from "next"

import { DotBg } from "@/components/dot-bg"

import { Hero } from "./_components/hero"

export const viewport: Viewport = {
  colorScheme: "dark",
}

export default function HomePage() {
  return (
    <>
      <DotBg />
      <Hero />
    </>
  )
}
