import { ErrorShell } from "@/components/error-shell"
import { Shell } from "@/components/shell"

export default function WorkshopNotFound() {
  return (
    <Shell variant="centered" className="max-w-2xl">
      <ErrorShell
        title="Workshop not found"
        description="Oops! We can't seem to find the workshop you're looking for"
        retryLinkText="Explore workshops"
        retryLink="/explore"
      />
    </Shell>
  )
}
