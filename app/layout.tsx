import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Impeccable Shoes Cleaning Service | Order Management',
  description: 'Professional shoe cleaning service order tracking system',
  keywords: ['shoe cleaning', 'order tracking', 'shoe care', 'impeccable'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} bg-white text-sneaker-dark`}>
        {children}
      </body>
    </html>
  )
}
