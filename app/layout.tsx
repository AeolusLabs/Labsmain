import { Analytics } from '@vercel/analytics/next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { siteUrl } from '@/lib/content'
import tokens from '@/design-system/tokens.json'
import './globals.css'

const body = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const title = 'AeolusLabs — Software built around your business'
const description = 'AeolusLabs builds websites, applications, business systems and practical AI for businesses in Nigeria and across Africa.'

export const metadata: Metadata = {
  title: { default: title, template: '%s — AeolusLabs' },
  description,
  generator: 'AeolusLabs',
  metadataBase: new URL(siteUrl),
  openGraph: { title, description, type: 'website', locale: 'en_NG', siteName: 'AeolusLabs' },
  twitter: { card: 'summary_large_image', title, description },
  applicationName: 'AeolusLabs',
  // iOS home-screen name and behaviour. The icons themselves come from app/icon.*, app/apple-icon.png and app/favicon.ico.
  appleWebApp: { capable: true, title: 'AeolusLabs', statusBarStyle: 'default' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: tokens.color.bg,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
