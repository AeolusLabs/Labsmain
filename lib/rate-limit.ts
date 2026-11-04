// Best-effort limiter per server instance. Serverless instances do not share memory, so this only blunts
// simple floods. For a durable limit, add a Vercel Firewall rate-limit rule for the route.
export function createLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>()
  return function limited(key: string) {
    const now = Date.now()
    const recent = (hits.get(key) ?? []).filter(t => now - t < windowMs)
    if (recent.length >= max) { hits.set(key, recent); return true }
    hits.set(key, [...recent, now])
    if (hits.size > 500) for (const [k, times] of hits) if (times.every(t => now - t >= windowMs)) hits.delete(k)
    return false
  }
}

export function clientIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

// Rejects requests that did not come from this website's own pages.
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return true
  const host = request.headers.get('host') || new URL(request.url).host
  try { return new URL(origin).host === host } catch { return false }
}
