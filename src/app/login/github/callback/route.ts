import { cookies } from "next/headers"
import { type GitHubUser } from "@/types"
import { OAuth2RequestError } from "arctic"
import { eq } from "drizzle-orm"
import { generateIdFromEntropySize } from "lucia"

import { redirects } from "@/config/constants"
import { db } from "@/lib/drizzle"
import { users } from "@/lib/drizzle/schema"
import { github, lucia } from "@/lib/lucia"

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const storedState = cookies().get("github_oauth_state")?.value ?? null

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
      headers: { Location: redirects.toLogin },
    })
  }

  try {
    const tokens = await github.validateAuthorizationCode(code)
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    })

    const githubUser = (await githubUserResponse.json()) as GitHubUser

    if (!githubUser.email) {
      return new Response(
        JSON.stringify({
          message: "Email access is required for authentication",
        }),
        {
          status: 400,
          headers: { Location: redirects.toLogin },
        }
      )
    }

    const user = await db.query.users.findFirst({
      where: eq(users.githubId, githubUser.id),
    })

    if (user) {
      const session = await lucia.createSession(user.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
      return new Response(null, {
        status: 302,
        headers: {
          Location: redirects.afterLogin,
        },
      })
    }

    const userId = generateIdFromEntropySize(10) // 16 characters long

    await db.insert(users).values({
      id: userId,
      githubId: githubUser.id,
      username: githubUser.login,
      email: githubUser.email,
      image: githubUser.avatar_url,
    })

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    return new Response(null, {
      status: 302,
      headers: {
        Location: redirects.afterLogin,
      },
    })
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(
        JSON.stringify({ message: "Invalid Authorization code" }),
        {
          status: 400,
        }
      )
    }
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    })
  }
}
