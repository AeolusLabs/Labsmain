import tokens from './tokens.json'
import { tokenPixels } from './resolve'

// Asset dimensions stay with assets; rendered image sizes follow the shell.
const phoneGutters = tokenPixels('size.gutter-phone') * 2
const desktopGutters = tokenPixels('size.gutter') * 2
const content = tokenPixels('size.container') - desktopGutters
const fluid = `(max-width: ${tokens.breakpoint.phone}px) calc(100vw - ${phoneGutters}px)`
const shell = `(max-width: ${tokens.size.container}) calc(100vw - ${desktopGutters}px)`
const firstColumn = (grid: string) => {
  const columns = [...grid.matchAll(/([\d.]+)fr/g)].map(([value]) => Number.parseFloat(value))
  return columns[0] / columns.reduce((sum, value) => sum + value, 0)
}

export const imageSizes = {
  full: `${fluid}, ${shell}, ${content}px`,
  feature: `${fluid}, (max-width: ${tokens.breakpoint.stack}px) calc(100vw - ${desktopGutters}px), ${Math.round(content * firstColumn(tokens.grid.feature))}px`,
  work: `${fluid}, ${Math.round(content * firstColumn(tokens.grid.work))}px`,
  phone: tokens.size.phone,
} as const
