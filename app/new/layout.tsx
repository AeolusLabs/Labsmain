import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { NewPrefsProvider } from '@/components/new/prefs'
import { NewHeader } from '@/components/new/shell/new-header'
import { NewFooter } from '@/components/new/shell/new-footer'
import './css/shell.css'

export const metadata: Metadata = {
  title: { default: 'AeolusLabs', template: '%s | AeolusLabs' },
  robots: { index: false, follow: false },
}

export default function NewLayout({ children }: { children: ReactNode }) {
  return (
    <NewPrefsProvider>
      <a className="np-skip" href="#main-content">Skip to content</a>
      <NewHeader />
      <main id="main-content" className="np-main">{children}</main>
      <NewFooter />
    </NewPrefsProvider>
  )
}
