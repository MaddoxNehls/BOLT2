import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The World\'s Largest Hackathon | Ignite the Code',
  description: 'Join the World\'s Largest Hackathon with $1M+ in prizes. Where Ideas Ignite the Future.',
  metadataBase: new URL('http://hackathon.dev'),
  openGraph: {
    type: 'website',
    title: 'The World\'s Largest Hackathon | Ignite the Code',
    description: 'Join the World\'s Largest Hackathon with $1M+ in prizes. Where Ideas Ignite the Future.',
    siteName: 'BOLT Hackathon',
    images: [
      {
        url: '/graph.png',
        width: 1200,
        height: 630,
        alt: 'BOLT Hackathon Preview Image'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The World\'s Largest Hackathon | Ignite the Code',
    description: 'Join the World\'s Largest Hackathon with $1M+ in prizes. Where Ideas Ignite the Future.',
    images: ['/graph.png']
  },
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