import { describe, expect, it } from 'vitest';
import { sanitizeRichHtml, withSanitizedDetails } from '@/lib/sanitize';
import { jsonLd } from '@/lib/json-ld';
import { csvCell, toCsv } from '@/lib/csv';

describe('sanitizeRichHtml', () => {
  it('keeps normal editor formatting', () => {
    const html = '<h2>Day 1</h2><p>Visit <strong>Goa</strong> &amp; <em>relax</em>.</p><ul><li>Beach</li></ul>';
    expect(sanitizeRichHtml(html)).toBe(html);
  });

  it('removes script tags and their content', () => {
    expect(sanitizeRichHtml('<p>hi</p><script>alert(1)</script>')).toBe('<p>hi</p>');
  });

  it('removes event handler attributes', () => {
    const out = sanitizeRichHtml('<img src="https://x.test/a.jpg" onerror="alert(1)"><p onclick="x()">t</p>');
    expect(out).not.toMatch(/onerror|onclick|alert/);
    expect(out).toContain('src="https://x.test/a.jpg"');
  });

  it('drops javascript: and data: URLs', () => {
    const out = sanitizeRichHtml('<a href="javascript:alert(1)">x</a><img src="data:image/svg+xml,<svg onload=alert(1)>">');
    expect(out).not.toMatch(/javascript:|data:/);
  });

  it('removes iframes, styles, forms and svg', () => {
    const out = sanitizeRichHtml(
      '<iframe src="https://evil.test"></iframe><style>body{}</style><form action="/x"><input></form><svg><script>1</script></svg>ok',
    );
    expect(out).toBe('ok');
  });

  it('adds rel=noopener to target=_blank links', () => {
    expect(sanitizeRichHtml('<a href="https://a.test" target="_blank">a</a>')).toBe(
      '<a href="https://a.test" target="_blank" rel="noopener noreferrer">a</a>',
    );
  });

  it('handles non-string input', () => {
    expect(sanitizeRichHtml(undefined)).toBe('');
    expect(sanitizeRichHtml(42)).toBe('');
  });

  it('withSanitizedDetails cleans only details', () => {
    const item = { name: '<b>x</b>', details: '<p>a</p><script>b</script>' };
    expect(withSanitizedDetails(item)).toEqual({ name: '<b>x</b>', details: '<p>a</p>' });
  });
});

describe('jsonLd', () => {
  it('cannot be broken out of with </script>', () => {
    const out = jsonLd({ name: '</script><script>alert(1)</script>' });
    expect(out).not.toContain('<');
    expect(out).not.toContain('>');
    expect(JSON.parse(out)).toEqual({ name: '</script><script>alert(1)</script>' });
  });

  it('escapes & and line separators while staying valid JSON', () => {
    const value = { a: 'Tom & Jerry \u2028 next' };
    const out = jsonLd(value);
    expect(out).not.toMatch(/[&\u2028]/);
    expect(JSON.parse(out)).toEqual(value);
  });
});

describe('csvCell', () => {
  it.each(['=1+1', '+SUM(A1)', '-2+3', '@cmd', '\tTAB', '\rCR', '=HYPERLINK("http://evil.test","x")'])(
    'neutralises formula-looking cell %j',
    (value) => {
      const out = csvCell(value);
      expect(out.startsWith(`"'`)).toBe(true);
    },
  );

  it('quotes and escapes double quotes', () => {
    expect(csvCell('say "hi"')).toBe('"say ""hi"""');
  });

  it('leaves normal values alone apart from quoting', () => {
    expect(csvCell('Priya Shah')).toBe('"Priya Shah"');
    expect(csvCell(null)).toBe('""');
    expect(csvCell(12)).toBe('"12"');
  });

  it('builds a full CSV document', () => {
    expect(toCsv(['A', 'B'], [['=x', 'ok']])).toBe('"A","B"\r\n"\'=x","ok"');
  });
});
