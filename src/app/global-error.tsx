"use client"

import { Button } from "@/components/ui/button"
import { DotBg } from "@/components/dot-bg"
import { Icons } from "@/components/icons"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <main
          role="alert"
          className="container grid min-h-screen max-w-5xl items-center justify-center gap-6 bg-background pb-8 pt-6 font-sans antialiased md:pb-12 md:pt-10 lg:pb-24 lg:pt-16"
        >
          <DotBg />
          <div className="flex size-full flex-col items-center justify-center space-y-4">
            <Icons.warning
              className="size-28 text-red-500 dark:text-red-500"
              aria-hidden="true"
            />
            <h1 className="text-center text-2xl font-bold text-red-500 dark:text-red-500 sm:text-2xl lg:text-3xl">
              {error.message ?? "Something went wrong!"}
            </h1>
            <Button
              aria-label="Retry"
              variant="outline"
              onClick={() => reset()}
            >
              <Icons.refresh className="mr-2 size-4" aria-hidden="true" />
              Retry
            </Button>
          </div>
        </main>
      </body>
    </html>
  )
}
