import sanitizeHtml from 'sanitize-html';

/**
 * Allow-list sanitizer for admin-authored rich text (Tiptap output). Used when
 * saving and again on the server before rendering, so old rows stored before
 * this change are cleaned too.
 */
const RICH_TEXT_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p', 'br', 'hr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'mark', 'sub', 'sup', 'small', 'span',
    'blockquote', 'code', 'pre', 'ul', 'ol', 'li', 'a', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    th: ['colspan', 'rowspan'],
    td: ['colspan', 'rowspan'],
    ol: ['start'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https'] },
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: attribs.target === '_blank' ? { ...attribs, rel: 'noopener noreferrer' } : attribs,
    }),
  },
};

export function sanitizeRichHtml(input: unknown): string {
  if (typeof input !== 'string' || input.length === 0) return '';
  return sanitizeHtml(input, RICH_TEXT_OPTIONS);
}

/** Returns a copy of `item` with its `details` HTML sanitized. */
export function withSanitizedDetails<T extends { details?: unknown }>(item: T): T {
  if (!item || typeof item.details !== 'string') return item;
  return { ...item, details: sanitizeRichHtml(item.details) };
}
