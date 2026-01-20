import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'SE7ENDAYS Studio - Premium Minecraft Development',
  description: 'Professional Minecraft Bedrock Edition development studio specializing in advanced add-ons and cinematic experiences.',
  icons: {
    icon: '/images/s7d_taskbar_link_icon.png',
    shortcut: '/images/s7d_taskbar_link_icon.png',
    apple: '/images/s7d_taskbar_link_icon.png',
  },
  openGraph: {
    title: 'SE7ENDAYS Studio - Premium Minecraft Development',
    description: 'Professional Minecraft Bedrock Edition development studio specializing in advanced add-ons and cinematic experiences.',
    images: '/images/s7d_taskbar_link_icon.png',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'SE7ENDAYS Studio',
    description: 'Professional Minecraft Bedrock Edition development studio.',
    images: '/images/s7d_taskbar_link_icon.png',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" id="top">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
