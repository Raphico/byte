"use server"

import { env } from "@/env"
import { StreamClient } from "@stream-io/node-sdk"

import { getUserSession } from "../data/user"

export async function generateStreamTokenAction() {
  const { user } = await getUserSession()

  if (!user) {
    throw new Error("User not found")
  }

  const serverClient = new StreamClient(
    env.NEXT_PUBLIC_STREAM_API_KEY,
    env.STREAM_SECRET_KEY
  )

  const expireTime = Math.floor(Date.now() / 1000) * 3600
  const issuedAt = Math.floor(Date.now() / 1000) - 60

  const token = serverClient.createToken(user.id, expireTime, issuedAt)

  return token
}
