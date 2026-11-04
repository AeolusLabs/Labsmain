import { NextResponse } from 'next/server'
import { email as recipient } from '@/lib/content'

const MAX_BODY = 20000
// Sender must be on a domain verified in Resend. aeoluslabsltd.com has its Resend DNS records published.
const DEFAULT_FROM = 'AeolusLabs Enquiries <enquiries@aeoluslabsltd.com>'

// Best-effort limit per server instance. Serverless instances do not share memory, so this only blunts
// simple floods. For a durable limit, add a Vercel Firewall rate-limit rule for POST /api/enquiries.
const WINDOW_MS = 15 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) { hits.set(ip, recent); return true }
  hits.set(ip, [...recent, now])
  if (hits.size > 500) for (const [key, times] of hits) if (times.every(t => now - t >= WINDOW_MS)) hits.delete(key)
  return false
}

const fail = (error: string, status: number) => NextResponse.json({ error }, { status })
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ')

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('host') || new URL(request.url).host
  if (origin) {
    try { if (new URL(origin).host !== host) return fail('Please submit the form from this website.', 403) }
    catch { return fail('Invalid request origin.', 403) }
  }

  if (Number(request.headers.get('content-length') || 0) > MAX_BODY) return fail('Your enquiry is too long.', 413)
  let data: Record<string, unknown>
  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY) return fail('Your enquiry is too long.', 413)
    data = JSON.parse(raw)
  } catch { return fail('Please check your enquiry and try again.', 400) }
  if (!data || typeof data !== 'object') return fail('Invalid enquiry.', 400)
  if (data.website) return fail('Unable to submit this enquiry.', 400)

  const field = (key: string, max: number) => (typeof data[key] === 'string' ? (data[key] as string).trim().slice(0, max) : '')
  const name = field('name', 100), email = field('email', 254), organization = field('organization', 150), need = field('need', 150), challenge = field('challenge', 5000)
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(email) || challenge.length < 20 || data.consent !== 'yes') {
    return fail('Please provide your name, a valid email, at least 20 characters about your challenge, and consent to be contacted.', 400)
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  if (limited(ip)) return fail('You have sent several enquiries recently. Please wait a little while, or email us directly.', 429)

  const subject = `New project enquiry from ${oneLine(name)}`
  const text = `Name: ${name}\nEmail: ${email}\nOrganisation: ${organization || 'Not provided'}\nNeed: ${need || 'Not provided'}\nReceived: ${new Date().toISOString()}\n\n${challenge}\n\n(Sent from the AeolusLabs website enquiry form. Reply to this email to answer the sender.)`
  const draft = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return NextResponse.json({ mode: 'prepared', reason: 'not_configured', mailto: draft })

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.ENQUIRY_FROM_EMAIL || DEFAULT_FROM, to: [recipient], reply_to: email, subject, text }),
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) throw new Error(`Resend responded ${response.status}: ${(await response.text()).slice(0, 300)}`)
    return NextResponse.json({ mode: 'sent' })
  } catch (error) {
    // Visible in the Vercel function logs; contains no enquiry content or secrets.
    console.error('Enquiry email delivery failed:', error instanceof Error ? error.message : error)
    // Never lose the enquiry: hand the visitor a ready-to-send email instead, and say plainly nothing was sent.
    return NextResponse.json({ mode: 'prepared', reason: 'delivery_failed', mailto: draft })
  }
}
