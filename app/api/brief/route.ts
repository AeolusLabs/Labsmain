import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'
import { DEFAULT_MODEL, MAX_USER_TURNS, finishBriefTool, parseConversation, systemPrompt } from '@/lib/brief-assistant'
import { OpenRouterError, askOpenRouter, assistantProvider, type Turn } from '@/lib/brief-provider'
import { needOptions, type Need } from '@/lib/need-options'
import { clientIp, createLimiter, sameOrigin } from '@/lib/rate-limit'

export const maxDuration = 30

const MAX_BODY = 30000
const limited = createLimiter(40, 15 * 60 * 1000)

const fail = (error: string, status: number) => NextResponse.json({ error }, { status })
const UNAVAILABLE = 'The assistant is unavailable right now. You can use the form instead.'

// Visitor chat is untrusted input, and nothing the model returns has side effects: the reply and the draft
// brief are only shown to the visitor, who edits and sends the brief themselves through the normal form.
// The Anthropic client is pinned to Anthropic's own address and the site's key so that settings on a developer
// machine (ANTHROPIC_BASE_URL, ANTHROPIC_AUTH_TOKEN, profiles) can never redirect visitor chats elsewhere.
function createClient(apiKey: string) {
  return new Anthropic({
    apiKey,
    authToken: null,
    profile: null,
    credentials: null,
    baseURL: process.env.AEOLUS_ANTHROPIC_BASE_URL || 'https://api.anthropic.com',
    timeout: 25_000,
    maxRetries: 1,
  })
}

type ChatMessage = { role: 'user' | 'assistant'; content: string }

async function askAnthropic(apiKey: string, messages: ChatMessage[], wrapUp: boolean, emphasise: boolean): Promise<Turn> {
  const response = await createClient(apiKey).messages.create({
    model: process.env.BRIEF_ASSISTANT_MODEL || DEFAULT_MODEL,
    max_tokens: 4000,
    system: systemPrompt(wrapUp, emphasise),
    tools: [finishBriefTool],
    // Light effort: this is a short intake conversation, not a hard reasoning task.
    output_config: { effort: 'low' },
    messages,
  })
  const tool = response.content.find((b): b is Anthropic.ToolUseBlock => b.type === 'tool_use' && b.name === 'finish_brief')
  return {
    refused: response.stop_reason === 'refusal',
    text: response.content.flatMap(b => (b.type === 'text' ? [b.text] : [])).join('\n').trim().slice(0, 1500),
    toolInput: tool?.input ?? null,
  }
}

type Brief = { message: string; need: Need; brief: string }

function readBrief(input: unknown): Brief | null {
  if (!input || typeof input !== 'object') return null
  const { message, need, brief } = input as Record<string, unknown>
  if (typeof message !== 'string' || typeof brief !== 'string' || !brief.trim()) return null
  const matched = needOptions.find(option => option === need) ?? needOptions[0]
  return { message: message.trim().slice(0, 500), need: matched, brief: brief.trim().slice(0, 2500) }
}

export async function POST(request: Request) {
  const provider = assistantProvider()
  if (!provider) return fail(UNAVAILABLE, 503)
  if (!sameOrigin(request)) return fail('Please use this website to talk to the assistant.', 403)
  if (Number(request.headers.get('content-length') || 0) > MAX_BODY) return fail('That message is too long.', 413)

  let body: Record<string, unknown>
  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY) return fail('That message is too long.', 413)
    body = JSON.parse(raw)
  } catch { return fail('Please try again.', 400) }

  const messages = parseConversation(body?.messages)
  if (!messages) return fail('Please check your message and try again.', 400)

  if (limited(clientIp(request))) return fail('You have sent a lot of messages recently. Please wait a little while, or use the form instead.', 429)

  const userTurns = messages.filter(m => m.role === 'user').length
  const wrapUp = body.finish === true || userTurns >= MAX_USER_TURNS
  const ask = (emphasise: boolean) => provider === 'openrouter'
    ? askOpenRouter(process.env.OPENROUTER_API_KEY!, messages, wrapUp, emphasise)
    : askAnthropic(process.env.ANTHROPIC_API_KEY!, messages, wrapUp, emphasise)

  try {
    let response = await ask(false)
    // Forced tool use is not available on the newest models, so wrapping up is requested in the prompt.
    // If the model still answers in text, ask once more, then give up politely.
    if (wrapUp && !readBrief(response.toolInput) && !response.refused) response = await ask(true)

    if (response.refused) {
      return NextResponse.json({ type: 'reply', reply: 'I can’t help with that here. Please describe your project in the form instead and the team will read it.' })
    }
    const brief = readBrief(response.toolInput)
    if (brief) return NextResponse.json({ type: 'brief', ...brief })
    if (wrapUp) return fail('I couldn’t put the summary together. Please try again, or use the form instead.', 502)

    const reply = response.text
    if (!reply) return fail(UNAVAILABLE, 502)
    return NextResponse.json({ type: 'reply', reply })
  } catch (error) {
    // Logged for the Vercel function logs. Never includes anything the visitor wrote.
    if (error instanceof OpenRouterError) console.error(`Brief assistant: OpenRouter returned ${error.status}: ${error.message}`)
    else if (error instanceof Anthropic.AuthenticationError) console.error('Brief assistant: the Anthropic API key was rejected. Check ANTHROPIC_API_KEY.')
    else if (error instanceof Anthropic.RateLimitError) console.error('Brief assistant: Anthropic rate limit reached.')
    else if (error instanceof Anthropic.APIError) console.error(`Brief assistant: Anthropic returned ${error.status}: ${String(error.message).slice(0, 200)}`)
    else console.error('Brief assistant failed:', error instanceof Error ? error.message : 'unknown error')
    return fail(UNAVAILABLE, (error instanceof Anthropic.RateLimitError || (error instanceof OpenRouterError && error.status === 429)) ? 503 : 502)
  }
}
