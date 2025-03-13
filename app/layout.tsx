import type { Metadata } from 'next/types'
import './globals.css'
import { Preloader } from '@/components/preloader'

export const metadata: Metadata = {
  title: 'UMAIR ANWAR PORTFOLIO',
  description: 'A Windows XP clone built with Next.js',
  generator: 'v0.dev',
  icons: {
    icon: '/icons/xp.png'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  )
}
