import { GoogleGenAI } from '@google/genai';

let genAiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) return null;
  if (!genAiClient) genAiClient = new GoogleGenAI({ apiKey: key });
  return genAiClient;
}

/** Comma-separated override, e.g. `gemini-2.0-flash,gemini-2.5-flash` */
export function geminiModelCandidates(): string[] {
  const fromEnv =
    process.env.GEMINI_MODELS?.split(',').map((s) => s.trim()).filter(Boolean) ?? [];
  if (fromEnv.length > 0) return fromEnv;
  return ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
}

function extractModelText(response: unknown): string {
  if (response == null || typeof response !== 'object') return '';

  try {
    const t = (response as { text?: unknown }).text;
    if (typeof t === 'string' && t.length > 0) return t;
  } catch {
    /* SDK getter edge cases */
  }

  const r = response as Record<string, unknown>;
  const candidates = r.candidates as Array<Record<string, unknown>> | undefined;
  const content = candidates?.[0]?.content as Record<string, unknown> | undefined;
  const parts = content?.parts as Array<Record<string, unknown>> | undefined;
  if (!Array.isArray(parts)) return '';

  return parts
    .filter((p) => !p?.thought)
    .map((p) => (typeof p?.text === 'string' ? p.text : ''))
    .join('');
}

function isRetryableModelError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /429|RESOURCE_EXHAUSTED|503|UNAVAILABLE|quota|rate limit|overloaded|try again later|404|NOT_FOUND|MODEL_NOT_FOUND|not found|does not exist|No such model|invalid model/i.test(
    msg,
  );
}

export type GeminiTextResult =
  | { ok: true; text: string; model: string }
  | { ok: false; error: string };

export type GeminiGenerateOptions = {
  /** Ask the API for strict JSON text (helps structured weather/review-style replies). */
  responseMimeType?: 'application/json' | 'text/plain';
  /** JSON schema the reply must follow (use with responseMimeType 'application/json'). */
  responseSchema?: Record<string, unknown>;
  /** Instructions kept separate from user-supplied content. */
  systemInstruction?: string;
  /** Abort the whole call (all fallback models) after this many ms. */
  timeoutMs?: number;
};

function buildConfig(options: GeminiGenerateOptions | undefined, signal: AbortSignal | undefined) {
  const config: Record<string, unknown> = {};
  if (options?.responseMimeType) config.responseMimeType = options.responseMimeType;
  if (options?.responseSchema) config.responseSchema = options.responseSchema;
  if (options?.systemInstruction) config.systemInstruction = options.systemInstruction;
  if (signal) config.abortSignal = signal;
  return Object.keys(config).length > 0 ? { config } : {};
}

/**
 * Calls generateContent across fallback models so one model hitting free-tier
 * quota does not take down every AI feature.
 */
export async function geminiGenerateText(
  prompt: string,
  options?: GeminiGenerateOptions,
): Promise<GeminiTextResult> {
  const ai = getGeminiClient();
  if (!ai) {
    return { ok: false, error: 'GEMINI_API_KEY is not configured' };
  }

  const models = geminiModelCandidates();
  let lastError = 'All Gemini models failed or returned empty text';
  const signal = options?.timeoutMs ? AbortSignal.timeout(options.timeoutMs) : undefined;

  for (const model of models) {
    if (signal?.aborted) return { ok: false, error: 'Gemini request timed out' };
    try {
      const request = ai.models.generateContent({
        model,
        contents: prompt,
        ...buildConfig(options, signal),
      });
      const response = signal ? await raceAbort(request, signal) : await request;
      const text = extractModelText(response).trim();
      if (text) return { ok: true, text, model };
      lastError = 'Model returned empty text';
    } catch (e) {
      lastError = e instanceof Error ? e.message : String(e);
      if (signal?.aborted) return { ok: false, error: 'Gemini request timed out' };
      if (isRetryableModelError(e)) continue;
      return { ok: false, error: lastError };
    }
  }

  return { ok: false, error: lastError };
}

/** Rejects when the signal fires, even if the SDK ignores abortSignal. */
function raceAbort<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(new Error('Gemini request timed out'));
    if (signal.aborted) return onAbort();
    signal.addEventListener('abort', onAbort, { once: true });
    promise.then(
      (v) => {
        signal.removeEventListener('abort', onAbort);
        resolve(v);
      },
      (e) => {
        signal.removeEventListener('abort', onAbort);
        reject(e);
      },
    );
  });
}
