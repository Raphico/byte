"use client"

import { unknownError } from "@/config/constants"
import { ErrorShell } from "@/components/error-shell"
import { Shell } from "@/components/shell"

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
        <main role="alert" className="bg-background font-sans antialiased">
          <Shell variant="centered" className="max-w-2xl">
            <ErrorShell
              title=""
              description={error.message ?? unknownError}
              icon="warning"
              reset={reset}
            />
          </Shell>
        </main>
      </body>
    </html>
  )
}
