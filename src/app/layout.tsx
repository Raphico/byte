import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/styles/globals.css"

import { siteConfig } from "@/config/site"
import { getAbsoluteUrl } from "@/utils/getAbsoluteUrl"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
