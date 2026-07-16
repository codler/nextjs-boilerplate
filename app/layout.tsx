import { Geist_Mono, Nunito_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/themeProvider"
import { NextIntlClientProvider } from "next-intl"
import { cn } from "@/lib/utils"
import Providers from "../components/providers"
import { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"
import SiteFooter from "@/components/siteFooter"
import SiteHeader from "@/components/siteHeader"
import { Toaster } from "@/components/ui/sonner"

const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = createMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        nunitoSans.variable
      )}
    >
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <Providers>
          <NextIntlClientProvider>
            <ThemeProvider>
              <SiteHeader />
              <main>{children}</main>
              <SiteFooter />
              <Toaster expand closeButton richColors duration={8000} />
            </ThemeProvider>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
