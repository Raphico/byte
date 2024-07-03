import { ErrorShell } from "@/components/error-shell"
import { Shell } from "@/components/shell"

export default function SessionNotFound() {
  return (
    <Shell variant="centered" className="max-w-2xl">
      <ErrorShell
        title="Session not found"
        description="Oops! We can't seem to find the Session you're looking for"
        retryLinkText="Explore workshops"
        retryLink="/explore"
      />
    </Shell>
  )
}
