import type { MetadataRoute } from 'next'

// Used by Android (Chrome install and home-screen shortcuts) and other browsers that read a web manifest.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AeolusLabs',
    short_name: 'AeolusLabs',
    description: 'Websites, applications, business systems and practical AI for businesses in Nigeria and across Africa.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f8f8f6',
    theme_color: '#f8f8f6',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
