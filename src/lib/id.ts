import { customAlphabet } from "nanoid"

export function generateId(length = 11) {
  return customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length
  )()
}
