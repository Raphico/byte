"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { redirects } from "@/config/constants"

import { lucia } from "."
import { validateRequest } from "./validate-request"

export async function logout() {
  const { session } = await validateRequest()

  if (!session) {
    throw new Error("No session found")
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect(redirects.afterLogout)
}
