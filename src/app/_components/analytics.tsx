import LogLib from "@loglib/tracker/react"

export function Analytics() {
  return (
    <LogLib
      config={{
        id: "byte_raphico",
      }}
    />
  )
}
