import type { MetadataRoute } from 'next'
export default function sitemap():MetadataRoute.Sitemap{return ['','/solutions','/work','/work/vib3pulse','/products','/about','/contact','/privacy'].map(path=>({url:`https://aeoluslabsltd.com${path}`}))}
