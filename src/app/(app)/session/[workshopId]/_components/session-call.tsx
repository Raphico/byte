"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { env } from "@/env"
import {
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  type Call,
} from "@stream-io/video-react-sdk"
import { type User } from "lucia"

import "@stream-io/video-react-sdk/dist/css/styles.css"

import { generateStreamTokenAction } from "@/server/actions/stream"
import { MarkWorkshopHasCompleted } from "@/server/actions/workshop"
import { Icons } from "@/components/icons"

interface SessionCallProps {
  workshopId: string
  user: Pick<User, "id" | "username" | "image">
  isOrganizer: boolean
}

export function SessionCall({
  workshopId,
  user,
  isOrganizer,
}: SessionCallProps) {
  const router = useRouter()
  const [videoClient, setVideoClient] =
    React.useState<StreamVideoClient | null>(null)
  const [call, setCall] = React.useState<Call | null>(null)

  React.useEffect(() => {
    const client = new StreamVideoClient({
      apiKey: env.NEXT_PUBLIC_STREAM_API_KEY,
      user,
      tokenProvider: () => generateStreamTokenAction(),
    })

    setVideoClient(client)

    return () => {
      setVideoClient(null)
      client.disconnectUser().catch(console.error)
    }
  }, [user])

  React.useEffect(() => {
    if (!videoClient) return

    const call = videoClient.call("default", workshopId)
    call.join({ create: true }).catch((err) => {
      console.error(err)
    })

    setCall(call)

    return () => {
      setCall(null)
      call.leave().catch(console.error)
    }
  }, [videoClient, workshopId])

  if (!videoClient || !call) {
    return (
      <div className="mt-8 flex items-center justify-center">
        <Icons.spinner className="size-8 animate-spin" aria-hidden="true" />
      </div>
    )
  }

  return (
    <StreamVideo client={videoClient}>
      <StreamTheme>
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls
            onLeave={() => {
              if (isOrganizer) {
                void MarkWorkshopHasCompleted(workshopId).then(() =>
                  call.endCall()
                )
              }

              router.push("/dashboard")
            }}
          />
          {/* <div className="grid w-full space-x-10 lg:grid-cols-[1fr_20rem]">
            <div className="flex flex-col items-center justify-center space-y-4">
              <SpeakerLayout />
              <CallControls
                onLeave={async () => {
                  if (isOrganizer) {
                    await MarkWorkshopHasCompleted(workshopId).then(() =>
                      call.endCall()
                    )
                  }

                  router.push("/dashboard")
                }}
              />
            </div>

            <div className="max-lg:hidden">
              <CallParticipantsList onClose={() => undefined} />
            </div>
          </div>
          <div className="lg:hidden">
            <CallParticipantsList onClose={() => undefined} />
          </div> */}
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  )
}
