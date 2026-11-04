import { Analytics } from '@vercel/analytics/next'
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { siteUrl } from '@/lib/content'
import './globals.css'

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
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
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f8f6' },
    { media: '(prefers-color-scheme: dark)', color: '#141a20' },
  ],
}

// Applies the saved (or system) appearance before first paint so the page never flashes.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.dataset.theme='dark'}catch(e){}`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={body.variable}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
