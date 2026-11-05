import { finishBriefTool, systemPrompt, type ChatMessage } from './brief-assistant'
import { siteUrl } from './content'

export type Provider = 'anthropic' | 'openrouter'

// Which AI provider answers the brief chat. Anthropic is used when its key is set; OpenRouter is used when
// only its key is set. If both are set, BRIEF_ASSISTANT_PROVIDER ("anthropic" or "openrouter") chooses.
// Returns null when neither key exists, so the contact page shows the ordinary enquiry form.
export function assistantProvider(): Provider | null {
  const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY)
  const hasOpenRouter = Boolean(process.env.OPENROUTER_API_KEY)
  const wanted = process.env.BRIEF_ASSISTANT_PROVIDER?.trim().toLowerCase()
  if (wanted === 'openrouter' && hasOpenRouter) return 'openrouter'
  if (wanted === 'anthropic' && hasAnthropic) return 'anthropic'
  if (hasAnthropic) return 'anthropic'
  if (hasOpenRouter) return 'openrouter'
  return null
}

// OpenRouter model slug. Override with OPENROUTER_MODEL; it must support tool calling.
export const DEFAULT_OPENROUTER_MODEL = 'anthropic/claude-sonnet-4.5'

// What either provider returns, reduced to what the route needs.
export type Turn = { refused: boolean; text: string; toolInput: unknown }

export class OpenRouterError extends Error {
  constructor(readonly status: number, message: string) {
    super(message)
  }
}

type OpenRouterResponse = {
  error?: { message?: unknown }
  choices?: {
    finish_reason?: string | null
    message?: {
      content?: unknown
      refusal?: unknown
      tool_calls?: { function?: { name?: string; arguments?: string } }[]
    }
  }[]
}

// The base URL is pinned to OpenRouter and the site's own key, like the Anthropic client, so nothing on a
// developer machine can redirect visitor chats elsewhere. AEOLUS_OPENROUTER_BASE_URL is for local mocks only.
export async function askOpenRouter(apiKey: string, messages: ChatMessage[], wrapUp: boolean, emphasise: boolean): Promise<Turn> {
  const base = process.env.AEOLUS_OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1'
  const response = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    cache: 'no-store',
    signal: AbortSignal.timeout(25_000),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': siteUrl,
      'X-Title': 'AeolusLabs brief assistant',
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || DEFAULT_OPENROUTER_MODEL,
      max_tokens: 4000,
      messages: [{ role: 'system', content: systemPrompt(wrapUp, emphasise) }, ...messages],
      tools: [{ type: 'function', function: { name: finishBriefTool.name, description: finishBriefTool.description, parameters: finishBriefTool.input_schema } }],
      tool_choice: 'auto',
    }),
  })

  const data = (await response.json().catch(() => null)) as OpenRouterResponse | null
  if (!response.ok) {
    const detail = typeof data?.error?.message === 'string' ? data.error.message.slice(0, 200) : response.statusText
    throw new OpenRouterError(response.status, detail)
  }

  const choice = data?.choices?.[0]
  const message = choice?.message
  let toolInput: unknown = null
  const call = message?.tool_calls?.find(c => c.function?.name === finishBriefTool.name)
  if (call?.function?.arguments) {
    try { toolInput = JSON.parse(call.function.arguments) } catch { toolInput = null }
  }
  return {
    refused: Boolean(message?.refusal) || choice?.finish_reason === 'content_filter',
    text: typeof message?.content === 'string' ? message.content.trim().slice(0, 1500) : '',
    toolInput,
  }
}
