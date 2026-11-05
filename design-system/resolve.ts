import tokens from './tokens.json'

type Tokens = typeof tokens
export type TokenPath = {
  [Group in keyof Tokens]: `${Group & string}.${keyof Tokens[Group] & string}`
}[keyof Tokens]

/** Resolve aliases for non-CSS consumers (canvas, metadata and image sizing). */
export function tokenValue(key: TokenPath, trail: string[] = []): string | number {
  if (trail.includes(key)) throw new Error(`Token cycle: ${[...trail, key].join(' → ')}`)
  const [group, name] = key.split('.')
  const value = (tokens[group as keyof Tokens] as Record<string, string | number>)[name]
  if (value === undefined) throw new Error(`Unknown token: ${key}`)
  if (typeof value === 'number') return value
  return value.replace(/\{([a-z0-9.-]+)\}/g, (_, reference: TokenPath) =>
    String(tokenValue(reference, [...trail, key])))
}

export function tokenPixels(key: TokenPath): number {
  const value = String(tokenValue(key))
  if (!/^\d+(?:\.\d+)?px$/.test(value)) throw new Error(`Expected pixel token: ${key}`)
  return Number.parseFloat(value)
}
