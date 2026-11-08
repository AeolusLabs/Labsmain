/** @type {import('next').NextConfig} */
const nextConfig = {
  // Captures are served resized to the rendered slot (see design-system/media.ts `sizes`), AVIF first, WebP fallback.
  images: { formats: ['image/avif', 'image/webp'] },
}
export default nextConfig
