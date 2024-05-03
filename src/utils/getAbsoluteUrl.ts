import { env } from "@/env"

export function getAbsoluteUrl(url: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${url}`
}
