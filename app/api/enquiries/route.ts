import { NextResponse } from 'next/server'
import { email as recipient } from '@/lib/content'
import { clientIp, createLimiter, sameOrigin } from '@/lib/rate-limit'

const MAX_BODY = 20000
// Sender must be on a domain verified in Resend. aeoluslabsltd.com has its Resend DNS records published.
const DEFAULT_FROM = 'AeolusLabs Enquiries <enquiries@aeoluslabsltd.com>'
const limited = createLimiter(5, 15 * 60 * 1000)

const fail = (error: string, status: number) => NextResponse.json({ error }, { status })
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ')

export async function POST(request: Request) {
  if (!sameOrigin(request)) return fail('Please submit the form from this website.', 403)

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

  if (limited(clientIp(request))) return fail('You have sent several enquiries recently. Please wait a little while, or email us directly.', 429)

  const origin = data.source === 'assistant' ? 'Prepared with the AeolusLabs assistant and reviewed by the sender' : 'Written by the sender'
  const subject = `New project enquiry from ${oneLine(name)}`
  const text = `Name: ${name}\nEmail: ${email}\nOrganisation: ${organization || 'Not provided'}\nNeed: ${need || 'Not provided'}\nHow it was written: ${origin}\nReceived: ${new Date().toISOString()}\n\n${challenge}\n\n(Sent from the AeolusLabs website enquiry form. Reply to this email to answer the sender.)`
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
