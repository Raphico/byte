import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"

export function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn("grid gap-1", className)} {...props}>
      {children}
    </section>
  )
}

export function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadElement>) {
  return (
    <h1
      className={cn("text-lg font-semibold sm:text-xl", className)}
      {...props}
    />
  )
}

export function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Balancer
      className={cn("max-w-lg text-muted-foreground", className)}
      {...props}
    />
  )
}
