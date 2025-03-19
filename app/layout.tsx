import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The World\'s Largest Hackathon | Ignite the Code',
  description: 'Join the World\'s Largest Hackathon with $1M+ in prizes. Where Ideas Ignite the Future.',
  metadataBase: new URL('http://hackathon.dev'),
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico' }
    ],
    apple: { url: '/favicon/apple-touch-icon.png', sizes: '180x180' },
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 