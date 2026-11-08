import type { MetadataRoute } from 'next'
import tokens from '@/design-system/tokens.json'

// Used by Android (Chrome install and home-screen shortcuts) and other browsers that read a web manifest.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AeolusLabs',
    short_name: 'AeolusLabs',
    description: 'AI-powered products and automation systems for businesses.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: tokens.color.bg,
    theme_color: tokens.color.bg,
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
