import { Analytics } from '@vercel/analytics/next'
import { Inter, Space_Grotesk } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AeolusLabs — Real problems. Thoughtful solutions.',
    template: '%s — AeolusLabs',
  },
  description: 'AeolusLabs builds practical websites, applications and digital systems around the problems that matter to African businesses.',
  generator: 'AeolusLabs',
  metadataBase: new URL('https://aeoluslabsltd.com'),
  openGraph: {
    title: 'AeolusLabs — Real problems. Thoughtful solutions.',
    description: 'Practical software and digital solutions for businesses in Nigeria and across Africa.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'AeolusLabs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AeolusLabs — Real problems. Thoughtful solutions.',
    description: 'Practical software and digital solutions for businesses in Nigeria and across Africa.',
  },
  icons: { icon: '/aeolus-mark.svg', apple: '/aeolus-mark.svg' },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
