/**
 * Pure helpers for the AI spam agent: validate what the model returns and
 * combine it with the deterministic heuristics. No I/O, so it is unit-tested.
 */

export const SPAM_CATEGORIES = [
  'legitimate',
  'seo_marketing',
  'cold_sales',
  'crypto_scam',
  'phishing',
  'gibberish',
  'other_spam',
] as const;

export type SpamCategory = (typeof SPAM_CATEGORIES)[number];

export interface AiSpamAnalysis {
  isSpam: boolean;
  confidence: number; // 0.0 to 1.0
  category: SpamCategory;
  reason: string;
}

/** Model verdicts below this confidence never mark a submission as spam. */
export const AI_SPAM_THRESHOLD = 0.65;

export function clampConfidence(value: unknown): number {
  const n = typeof value === 'number' ? value : Number.NaN;
  if (!Number.isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

export function normalizeCategory(value: unknown, isSpam: boolean): SpamCategory {
  if (typeof value === 'string' && (SPAM_CATEGORIES as readonly string[]).includes(value)) {
    const cat = value as SpamCategory;
    // Keep category consistent with the verdict.
    if (isSpam && cat === 'legitimate') return 'other_spam';
    if (!isSpam && cat !== 'legitimate') return 'legitimate';
    return cat;
  }
  return isSpam ? 'other_spam' : 'legitimate';
}

/**
 * Validates raw model output. Returns null when it isn't a usable verdict,
 * so the caller falls back to heuristics.
 */
export function parseModelVerdict(raw: unknown): AiSpamAnalysis | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.isSpam !== 'boolean') return null;
  const isSpam = r.isSpam;
  const reason =
    typeof r.reason === 'string' && r.reason.trim()
      ? r.reason.trim().slice(0, 300)
      : isSpam
        ? 'Flagged as spam by AI Agent'
        : 'Legitimate customer enquiry';
  return {
    isSpam,
    confidence: clampConfidence(r.confidence),
    category: normalizeCategory(r.category, isSpam),
    reason,
  };
}

/**
 * Final verdict. A heuristic spam verdict always wins: the model can add a
 * spam flag but can never clear one, so text crafted to talk the model into
 * "legitimate" gains nothing.
 */
export function combineVerdicts(
  heuristic: AiSpamAnalysis | null,
  model: AiSpamAnalysis | null,
): AiSpamAnalysis {
  if (heuristic?.isSpam) return heuristic;
  if (model?.isSpam && model.confidence >= AI_SPAM_THRESHOLD) return model;
  if (model) {
    return {
      isSpam: false,
      confidence: model.isSpam ? model.confidence : 0,
      category: 'legitimate',
      reason: model.isSpam ? `Below spam threshold: ${model.reason}` : model.reason,
    };
  }
  return heuristic ?? { isSpam: false, confidence: 0, category: 'legitimate', reason: 'Verified enquiry (AI fallback)' };
}

export function isSpamVerdict(v: Pick<AiSpamAnalysis, 'isSpam' | 'confidence'>): boolean {
  return v.isSpam && clampConfidence(v.confidence) >= AI_SPAM_THRESHOLD;
}
