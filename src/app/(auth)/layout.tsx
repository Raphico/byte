export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
