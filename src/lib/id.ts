import { customAlphabet } from "nanoid"

export function generateId(length = 12) {
  return customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length
  )()
}
