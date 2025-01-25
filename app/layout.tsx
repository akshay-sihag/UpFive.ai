import type { Metadata } from "next"
import { Inter, Comfortaa } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["700"],
})

export const metadata: Metadata = {
  title: "UpFive.ai - AI Cover Letter Generator",
  description: "Generate professional cover letters for Upwork & Fiverr using AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

