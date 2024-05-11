export default function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
