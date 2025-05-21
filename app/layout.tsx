import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import Providers from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Dandi GitHub Analyzer - Get insights for any GitHub repository",
  description:
    "Dandi provides deep insights into any GitHub repository, helping you understand trends, activity, and important updates.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
