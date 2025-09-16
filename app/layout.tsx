import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CartProvider } from "@/contexts/cart-context"
import { ThemeProvider } from "@/contexts/theme-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mauricycles",
  description: "Tienda especializada en bicicletas",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider>
          <CartProvider>
            <Suspense fallback={null}>{children}</Suspense>
            <Analytics />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
