import { email, productUrl, tikvahUrl, tlcUrl } from '@/lib/content'

/** Facts and short lines shared by the pages of the new site. Approved wording only: see DESIGN.md "Product truth". */
export { email }

export const nav = [
  { label: 'Work', href: '/new/work' },
  { label: 'What we do', href: '/new/what-we-do' },
  { label: 'About', href: '/new/about' },
] as const
export const cta = { label: 'Start a conversation', href: '/new/contact' } as const

export const founders = ['Allan Ajayi-Adjari', 'Bernard Nneboh'] as const

export const promises = [
  ['Understand first.', 'Listen before choosing a solution.'],
  ['Build deliberately.', 'Keep the work on a clear need.'],
  ['Communicate openly.', 'Keep you involved as it takes shape.'],
  ['Keep improving.', 'Learn from use and plan what is next.'],
] as const

export interface Project {
  slug: 'tikvah' | 'tlc-beauty-shop' | 'vib3pulse'
  name: string
  /** One short line, 15 words or fewer. */
  line: string
  kind: 'Client project' | 'Our own product'
  liveUrl: string
  /** What we did, as stated in DESIGN.md. Never add claims. */
  role: string
  /** Real public captures. Width and height are the files' real sizes (check before use). */
  image: { src: string; alt: string; width: number; height: number }
  phone?: { src: string; alt: string; width: number; height: number }
}

export const projects: readonly Project[] = [
  {
    slug: 'tikvah', name: 'Tikvah', line: 'A private place to write to a real team.', kind: 'Client project', liveUrl: tikvahUrl,
    role: 'Frontend and backend. A complete web application.',
    image: { src: '/projects/tikvah/home-desktop.webp', alt: 'Tikvah’s desktop homepage, with its introduction, plant illustration and account entry point', width: 2560, height: 1800 },
    phone: { src: '/projects/tikvah/home-mobile.webp', alt: 'Tikvah’s homepage on a mobile screen', width: 780, height: 1688 },
  },
  {
    slug: 'tlc-beauty-shop', name: 'TLC Beauty Shop', line: 'A salon website where people book.', kind: 'Client project', liveUrl: tlcUrl,
    role: 'End-to-end delivery. The website and booking journey for TheLashCode.',
    image: { src: '/projects/tlc-beauty-shop/home-desktop.jpg', alt: 'TheLashCode website for TLC Beauty Shop, with salon photography and a booking entry point', width: 1440, height: 1000 },
  },
  {
    slug: 'vib3pulse', name: 'Vib3Pulse', line: 'Events, tickets and community. Our own product.', kind: 'Our own product', liveUrl: productUrl,
    role: 'Owned by AeolusLabs. A web application for events, ticketing and social planning.',
    image: { src: '/projects/vib3pulse/home-desktop.jpg', alt: 'Vib3Pulse’s public landing page with event categories and its sample ticket demonstration', width: 1440, height: 1000 },
  },
]

/** Visible credit required by the brain model's CC BY 4.0 licence. Show it wherever the brain is shown (the footer does). */
export const brainCredit = {
  text: '“Brain” by dgallichan on Sketchfab, via NIH 3D (Johnson J). Changed into a point sample.',
  licence: 'CC BY 4.0',
  licenceUrl: 'https://creativecommons.org/licenses/by/4.0/',
}
