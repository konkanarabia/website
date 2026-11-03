/**
 * CSV cell encoding with formula-injection protection. Spreadsheet apps run
 * cells that start with = + - @ (or tab / CR) as formulas, so a lead named
 * "=HYPERLINK(...)" could execute on the admin's machine. Such cells get a
 * leading apostrophe, which Excel and Sheets show as plain text.
 */
// Leading spaces or newlines don't stop LibreOffice (and some Excel imports)
// from reading the rest as a formula, so look past them.
const FORMULA_START = /^\s*[=+\-@]|^[\t\r\n]/;

export function csvCell(value: unknown): string {
  let s = value === null || value === undefined ? '' : String(value);
  if (FORMULA_START.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export function csvRow(values: unknown[]): string {
  return values.map(csvCell).join(',');
}

export function toCsv(headers: string[], rows: unknown[][]): string {
  return [csvRow(headers), ...rows.map(csvRow)].join('\r\n');
}
