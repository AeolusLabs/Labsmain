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
  // The reference loads opsz 12..96, so large headlines use the tighter optical cut automatically.
  axes: ['opsz'],
  variable: '--font-display',
  display: 'swap',
})

const title = 'AeolusLabs — AI products & business automation'
const description = 'AeolusLabs builds AI-powered products and automation systems for businesses in Nigeria, across Africa and internationally.'

export const metadata: Metadata = {
  title: { default: title, template: '%s — AeolusLabs' },
  description,
  generator: 'AeolusLabs',
  metadataBase: new URL(siteUrl),
  openGraph: { title, description, type: 'website', locale: 'en_NG', siteName: 'AeolusLabs' },
  twitter: { card: 'summary_large_image', title, description },
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
