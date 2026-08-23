const SITE_URL = 'https://konkanarabiahospitalitygroup.com';
export const BRAND_NAME = 'KonkanArabia Hospitality & Holiday Group';

const COLORS = {
  headerBg: '#0369a1',
  headerText: '#f8fafc',
  bodyBg: '#f1f5f9',
  cardBg: '#ffffff',
  text: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  accentBg: '#e0f2fe',
};

export function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function nl2br(raw: string): string {
  return escapeHtml(raw).replace(/\r\n/g, '\n').split('\n').join('<br />');
}

function layout(opts: {
  title: string;
  preheader?: string;
  innerHtml: string;
}): string {
  const pre = opts.preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(opts.preheader)}</div>`
    : '';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.bodyBg};font-family:Georgia,'Times New Roman',serif;-webkit-font-smoothing:antialiased;">
  ${pre}
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${COLORS.bodyBg};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:${COLORS.cardBg};border-radius:12px;overflow:hidden;border:1px solid ${COLORS.border};box-shadow:0 4px 24px rgba(15,23,42,0.06);">
          <tr>
            <td style="background:${COLORS.headerBg};padding:22px 28px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(248,250,252,0.85);font-family:system-ui,-apple-system,sans-serif;">${escapeHtml(BRAND_NAME)}</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;color:${COLORS.headerText};line-height:1.25;font-family:system-ui,-apple-system,sans-serif;">${escapeHtml(opts.title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;font-size:15px;line-height:1.6;color:${COLORS.text};font-family:system-ui,-apple-system,sans-serif;">
              ${opts.innerHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;font-size:12px;line-height:1.5;color:${COLORS.muted};font-family:system-ui,-apple-system,sans-serif;border-top:1px solid ${COLORS.border};">
              <p style="margin:16px 0 4px;"><a href="${SITE_URL}" style="color:${COLORS.headerBg};text-decoration:none;font-weight:600;">Visit our website</a></p>
              <p style="margin:0;">This email was sent from a form on ${escapeHtml(SITE_URL.replace('https://', ''))}.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;font-size:13px;color:${COLORS.muted};width:38%;vertical-align:top;font-family:system-ui,-apple-system,sans-serif;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;font-size:14px;color:${COLORS.text};vertical-align:top;font-family:system-ui,-apple-system,sans-serif;">${value}</td>
    </tr>`;
}

function detailsTable(rows: Array<[string, string]>): string {
  const body = rows.map(([l, v]) => detailRow(l, v)).join('');
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:16px 0 0;border-collapse:collapse;background:${COLORS.accentBg};border-radius:8px;padding:4px 16px;">${body}</table>`;
}

export function contactFormAdminEmail(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): { subject: string; text: string; html: string } {
  const safeName = input.name.trim();
  const subject = `New contact message — ${safeName}`;

  const text = [
    `${BRAND_NAME} — Contact form`,
    '',
    `Name: ${safeName}`,
    `Email: ${input.email.trim()}`,
    `Phone: ${input.phone || 'Not provided'}`,
    '',
    'Message:',
    input.message.trim(),
    '',
    `— Sent via ${SITE_URL}/contact`,
  ].join('\n');

  const inner = `
    <p style="margin:0 0 16px;color:${COLORS.muted};">Someone submitted the contact form on your website.</p>
    ${detailsTable([
      ['Name', escapeHtml(safeName)],
      ['Email', `<a href="mailto:${escapeHtml(input.email.trim())}" style="color:${COLORS.headerBg};">${escapeHtml(input.email.trim())}</a>`],
      ['Phone', escapeHtml(input.phone || 'Not provided')],
    ])}
    <p style="margin:24px 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:${COLORS.muted};">Message</p>
    <div style="margin:0;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid ${COLORS.border};font-size:14px;line-height:1.6;">${nl2br(input.message.trim())}</div>
  `;

  return { subject, text, html: layout({ title: 'New contact message', preheader: `From ${safeName}`, innerHtml: inner }) };
}

export function contactFormUserConfirmation(input: {
  name: string;
}): { subject: string; text: string; html: string } {
  const name = input.name.trim();
  const subject = 'We received your message';

  const text = [
    `Dear ${name},`,
    '',
    `Thank you for contacting ${BRAND_NAME}. We have received your message and our team will get back to you as soon as possible, usually within one business day.`,
    '',
    `Kind regards,`,
    BRAND_NAME,
    '',
    SITE_URL,
  ].join('\n');

  const inner = `
    <p style="margin:0 0 12px;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 12px;">Thank you for reaching out. We have received your message and will respond as soon as we can.</p>
    <p style="margin:0;padding:14px 16px;background:${COLORS.accentBg};border-radius:8px;border-left:4px solid ${COLORS.headerBg};font-size:14px;">
      We typically reply within <strong>one business day</strong> for general enquiries.
    </p>
    <p style="margin:20px 0 0;">Kind regards,<br /><strong>${escapeHtml(BRAND_NAME)}</strong></p>
  `;

  return { subject, text, html: layout({ title: 'Thank you for contacting us', preheader: 'We will be in touch soon', innerHtml: inner }) };
}

export type TravelEnquiryTemplateInput = {
  name: string;
  email: string;
  phone: string;
  preferredContact: string;
  travelType: string;
  destination: string;
  formattedDepartureDate: string;
  formattedReturnDate: string;
  tripDuration?: string;
  travelers: string | number;
  budgetRange: string;
  message: string;
  subscribe: boolean;
};

export function travelEnquiryAdminEmail(input: TravelEnquiryTemplateInput): {
  subject: string;
  text: string;
  html: string;
} {
  const dest = input.destination.trim();
  const subject = `New travel enquiry: ${dest} (${input.travelType})`;

  const textLines = [
    `${BRAND_NAME} — New travel enquiry`,
    '',
    'Customer',
    `  Name: ${input.name}`,
    `  Email: ${input.email}`,
    `  Phone: ${input.phone || 'Not provided'}`,
    `  Preferred contact: ${input.preferredContact || 'Email'}`,
    '',
    'Trip',
    `  Type: ${input.travelType}`,
    `  Destination: ${dest}`,
    `  Departure: ${input.formattedDepartureDate}`,
    `  Return: ${input.formattedReturnDate}`,
    ...(input.tripDuration ? [`  Duration: ${input.tripDuration}`] : []),
    `  Travelers: ${input.travelers}`,
    `  Budget: ${input.budgetRange}`,
    '',
    'Notes',
    `  ${input.message || 'None'}`,
    '',
    `Newsletter opt-in: ${input.subscribe ? 'Yes' : 'No'}`,
    '',
    `— ${SITE_URL}/enquiry`,
  ];

  const tripRows: Array<[string, string]> = [
    ['Travel type', escapeHtml(String(input.travelType))],
    ['Destination', escapeHtml(dest)],
    ['Departure', escapeHtml(input.formattedDepartureDate)],
    ['Return', escapeHtml(input.formattedReturnDate)],
  ];
  if (input.tripDuration) {
    tripRows.push(['Duration', escapeHtml(input.tripDuration)]);
  }
  tripRows.push(
    ['Travelers', escapeHtml(String(input.travelers))],
    ['Budget', escapeHtml(input.budgetRange)]
  );

  const inner = `
    <p style="margin:0 0 8px;color:${COLORS.muted};">A new travel enquiry was submitted.</p>
    <h2 style="margin:20px 0 10px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${COLORS.muted};font-family:system-ui,-apple-system,sans-serif;">Customer</h2>
    ${detailsTable([
      ['Name', escapeHtml(input.name.trim())],
      ['Email', `<a href="mailto:${escapeHtml(input.email.trim())}" style="color:${COLORS.headerBg};">${escapeHtml(input.email.trim())}</a>`],
      ['Phone', escapeHtml(input.phone || 'Not provided')],
      ['Preferred contact', escapeHtml(input.preferredContact || 'Email')],
    ])}
    <h2 style="margin:20px 0 10px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${COLORS.muted};font-family:system-ui,-apple-system,sans-serif;">Trip</h2>
    ${detailsTable(tripRows)}
    <h2 style="margin:20px 0 10px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${COLORS.muted};font-family:system-ui,-apple-system,sans-serif;">Additional notes</h2>
    <div style="margin:0;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid ${COLORS.border};font-size:14px;line-height:1.6;">${
      input.message?.trim() ? nl2br(input.message.trim()) : `<span style="color:${COLORS.muted};">No additional notes</span>`
    }</div>
    <p style="margin:20px 0 0;font-size:14px;"><strong>Newsletter:</strong> ${input.subscribe ? 'Opted in' : 'Not subscribed'}</p>
  `;

  return {
    subject,
    text: textLines.join('\n'),
    html: layout({ title: 'New travel enquiry', preheader: `${dest} · ${input.travelType}`, innerHtml: inner }),
  };
}

export function travelEnquiryCustomerEmail(input: TravelEnquiryTemplateInput): {
  subject: string;
  text: string;
  html: string;
} {
  const dest = input.destination.trim();
  const name = input.name.trim();
  const subject = `Your enquiry — ${dest}`;

  const text = [
    `Dear ${name},`,
    '',
    `Thank you for your travel enquiry to ${dest}. ${BRAND_NAME} has received your details and our specialists will review them shortly.`,
    '',
    'We aim to respond within 24 hours on business days.',
    '',
    'Summary',
    `  Destination: ${dest}`,
    `  Travel type: ${input.travelType}`,
    `  Departure: ${input.formattedDepartureDate}`,
    `  Return: ${input.formattedReturnDate}`,
    `  Travelers: ${input.travelers}`,
    `  Budget: ${input.budgetRange}`,
    ...(input.message?.trim() ? ['', 'Your message:', `  ${input.message.trim()}`] : []),
    '',
    'If you have any questions in the meantime, reply to this email or contact us via our website.',
    '',
    `Kind regards,`,
    BRAND_NAME,
  ].join('\n');

  const tripRows: Array<[string, string]> = [
    ['Destination', escapeHtml(dest)],
    ['Travel type', escapeHtml(String(input.travelType))],
    ['Departure', escapeHtml(input.formattedDepartureDate)],
    ['Return', escapeHtml(input.formattedReturnDate)],
  ];
  if (input.tripDuration) {
    tripRows.push(['Duration', escapeHtml(input.tripDuration)]);
  }
  tripRows.push(
    ['Travelers', escapeHtml(String(input.travelers))],
    ['Budget', escapeHtml(input.budgetRange)]
  );

  const inner = `
    <p style="margin:0 0 12px;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 12px;">Thank you for your enquiry regarding <strong>${escapeHtml(dest)}</strong>. We have received your request and our team will review it shortly.</p>
    <p style="margin:0 0 20px;padding:14px 16px;background:${COLORS.accentBg};border-radius:8px;border-left:4px solid ${COLORS.headerBg};font-size:14px;">
      We aim to respond within <strong>24 hours</strong> on business days.
    </p>
    <h2 style="margin:0 0 10px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${COLORS.muted};font-family:system-ui,-apple-system,sans-serif;">Your trip details</h2>
    ${detailsTable(tripRows)}
    ${
      input.message?.trim()
        ? `<p style="margin:20px 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:${COLORS.muted};">Your message</p>
           <div style="margin:0;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid ${COLORS.border};font-size:14px;line-height:1.6;">${nl2br(input.message.trim())}</div>`
        : ''
    }
    <p style="margin:24px 0 0;">If anything needs changing, just reply to this email.</p>
    <p style="margin:16px 0 0;">Kind regards,<br /><strong>${escapeHtml(BRAND_NAME)}</strong></p>
  `;

  return {
    subject,
    text,
    html: layout({ title: 'We received your enquiry', preheader: dest, innerHtml: inner }),
  };
}

export type FranchiseEnquiryTemplateInput = {
  fname: string;
  company?: string;
  email: string;
  phone: string;
  country: string;
  itype: string;
  format: string;
  budget?: string;
  message?: string;
};

export function franchiseEnquiryAdminEmail(input: FranchiseEnquiryTemplateInput): {
  subject: string;
  text: string;
  html: string;
} {
  const safeName = input.fname.trim();
  const subject = `[Franchise Enquiry] ${safeName} — ${input.format || 'Mumbai to Malabar'}`;

  const rows: Array<[string, string]> = [
    ['Investor / Lead Name', escapeHtml(safeName)],
    ['Email', `<a href="mailto:${escapeHtml(input.email.trim())}" style="color:${COLORS.headerBg};">${escapeHtml(input.email.trim())}</a>`],
    ['Phone / WhatsApp', `<a href="tel:${escapeHtml(input.phone.trim())}" style="color:${COLORS.headerBg};">${escapeHtml(input.phone.trim())}</a>`],
    ['Company / Organisation', escapeHtml(input.company?.trim() || 'Individual')],
    ['Country / Region', escapeHtml(input.country?.trim() || 'Not specified')],
    ['Investor Profile', escapeHtml(input.itype?.trim() || 'Not specified')],
    ['Preferred Format', escapeHtml(input.format?.trim() || 'Not specified')],
    ['Investment Budget', escapeHtml(input.budget?.trim() || 'Not specified')],
  ];

  const text = [
    `${BRAND_NAME} — Mumbai to Malabar Food Express Franchise Enquiry`,
    '',
    `Name: ${safeName}`,
    `Email: ${input.email.trim()}`,
    `Phone: ${input.phone.trim()}`,
    `Company: ${input.company?.trim() || 'Individual'}`,
    `Country / Region: ${input.country?.trim() || 'Not specified'}`,
    `Investor Profile: ${input.itype?.trim() || 'Not specified'}`,
    `Preferred Format: ${input.format?.trim() || 'Not specified'}`,
    `Investment Budget: ${input.budget?.trim() || 'Not specified'}`,
    ...(input.message?.trim() ? ['', 'Message:', input.message.trim()] : []),
    '',
    `— Submitted via ${SITE_URL}/franchise.html`,
  ].join('\n');

  const inner = `
    <p style="margin:0 0 16px;color:${COLORS.muted};">A new franchise / partner enquiry has been submitted for <strong>Mumbai to Malabar Food Express</strong>.</p>
    ${detailsTable(rows)}
    ${
      input.message?.trim()
        ? `<p style="margin:24px 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:${COLORS.muted};">Message / Notes</p>
           <div style="margin:0;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid ${COLORS.border};font-size:14px;line-height:1.6;">${nl2br(input.message.trim())}</div>`
        : ''
    }
  `;

  return {
    subject,
    text,
    html: layout({
      title: 'New Franchise Enquiry — Mumbai to Malabar Express',
      preheader: `Franchise lead: ${safeName} (${input.format || 'Express'})`,
      innerHtml: inner,
    }),
  };
}

export function franchiseEnquiryUserConfirmation(input: {
  fname: string;
  format?: string;
}): { subject: string; text: string; html: string } {
  const name = input.fname.trim();
  const subject = 'Thank you for your interest in Mumbai to Malabar Food Express';

  const text = [
    `Dear ${name},`,
    '',
    `Thank you for expressing interest in the Mumbai to Malabar Food Express franchise opportunity by ${BRAND_NAME}.`,
    '',
    'Our business development and franchise partnerships team has received your enquiry. We will review your profile and preferred format and get back to you with the franchise prospectus and financial overview.',
    '',
    'If you have urgent questions, feel free to reply to this email or reach us on WhatsApp at +91 9370528517 / +971 557337618.',
    '',
    'Kind regards,',
    'Franchise & Business Development Team',
    BRAND_NAME,
    '',
    SITE_URL,
  ].join('\n');

  const inner = `
    <p style="margin:0 0 12px;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 12px;">Thank you for your interest in partnering with <strong>Mumbai to Malabar Food Express</strong>, an authentic coastal culinary brand powered by <strong>${escapeHtml(BRAND_NAME)}</strong>.</p>
    <p style="margin:0 0 20px;padding:14px 16px;background:${COLORS.accentBg};border-radius:8px;border-left:4px solid ${COLORS.headerBg};font-size:14px;">
      Our Franchise & Business Development team has received your details and will get in touch with you shortly with our detailed <strong>Franchise Prospectus & Investment Deck</strong>.
    </p>
    <p style="margin:0 0 12px;font-size:14px;color:${COLORS.muted};">
      Need immediate assistance? You can connect with our team on WhatsApp / Phone at <strong>+91-9370528517</strong> (India) or <strong>+971-557337618</strong> (UAE/International).
    </p>
    <p style="margin:24px 0 0;">Kind regards,<br /><strong>Franchise Partnerships Team</strong><br />${escapeHtml(BRAND_NAME)}</p>
  `;

  return {
    subject,
    text,
    html: layout({
      title: 'Welcome to Mumbai to Malabar Food Express',
      preheader: 'Your franchise enquiry has been received',
      innerHtml: inner,
    }),
  };
}

