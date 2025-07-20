import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider"
import { AdminAccess } from "@/components/AdminAccess"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sharp Cinematic - Creative Visual Storytelling | Pre-wedding, Maternity, Baby & Product Photography",
  description:
    "Sharp Cinematic is a creative visual storytelling studio specializing in pre-wedding, maternity, baby, and product photography. Capturing life's beautiful moments with cinematic excellence.",
  keywords:
    "Sharp Cinematic, photography, cinematography, pre-wedding, maternity, baby photography, product photography, professional photographer, cinematic, visual storytelling",
  authors: [{ name: "Sharp Cinematic" }],
  openGraph: {
    title: "Sharp Cinematic - Creative Visual Storytelling",
    description: "Capturing life's beautiful moments through creative visual storytelling.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
          <AdminAccess />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
