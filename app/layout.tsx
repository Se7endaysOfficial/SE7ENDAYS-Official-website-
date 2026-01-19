import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: 'SE7ENDAYS Studio',
    template: '%s | SE7ENDAYS',
  },
  description: 'Professional Minecraft Bedrock Edition development studio specializing in advanced add-ons and cinematic experiences.',
  keywords: ['Minecraft', 'Bedrock Edition', 'Add-ons', 'Minecraft Mods', 'SE7ENDAYS', 'Minecraft Development', 'Cinematic', 'Parkour', 'MCPE', 'Minecraft PE'],
  authors: [{ name: 'SE7ENDAYS Studio' }],
  creator: 'SE7ENDAYS',
  publisher: 'SE7ENDAYS',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SE7ENDAYS Official',
    title: 'SE7ENDAYS Official',
    description: 'Professional Minecraft Bedrock Edition development studio specializing in advanced add-ons and cinematic experiences.',
    images: [
      {
        url: 'https://se7endays-official.vercel.app/images/64x64-icon.png',
        width: 64,
        height: 64,
        alt: 'SE7ENDAYS Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'SE7ENDAYS Official',
    description: 'Professional Minecraft Bedrock Edition development studio specializing in advanced add-ons and cinematic experiences.',
    images: ['https://se7endays-official.vercel.app/images/64x64-icon.png'],
    creator: '@se7endays',
  },
  metadataBase: new URL('https://se7endays-official.vercel.app'),
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
