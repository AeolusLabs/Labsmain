import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/content'

const paths = ['', '/solutions', '/work', '/work/vib3pulse', '/work/tikvah', '/work/tlc-beauty-shop', '/products', '/about', '/contact', '/privacy']

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map(path => ({ url: `${siteUrl}${path}` }))
}
