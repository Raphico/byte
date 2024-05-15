import type { Metadata } from "next"
import localFont from "next/font/local"
import { GeistSans } from "geist/font/sans"

import { ThemeProvider } from "./_components/theme-provider"

import "@/styles/globals.css"

import { env } from "@/env.js"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { getAbsoluteUrl } from "@/utils/get-absolute-url"
import { Toaster } from "@/components/ui/sonner"

import { Analytics } from "./_components/analytics"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: [
    "react",
    "nextjs",
    "stream-io",
    "docker",
    "virtual workshops",
    "coding workshops",
  ],
  authors: [
    {
      name: "raphico",
      url: "https://raphico.tech",
    },
  ],
  creator: "raphico",
  openGraph: {
    title: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    siteName: siteConfig.title,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "raphico",
    images: [`${siteConfig.url}/og.png`],
  },
  icons: {
    icon: "/icon.png",
  },
  manifest: getAbsoluteUrl("/manifest.json"),
}

const fontSans = GeistSans

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontHeading.variable,
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
