'use server';

import { cookies } from 'next/headers';
import { sendEmail } from '@/lib/email';
import { updateEnquiryStatus } from '@/app/actions/enquiries';

async function isAdminSession(): Promise<boolean> {
  const secret = process.env.ADMIN_TOKEN_SECRET;
  if (!secret) return false;
  const token = (await cookies()).get('admin_token')?.value;
  return token === secret;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function textToHtml(text: string): string {
  const chunks = text.trim().split(/\n\n+/);
  const inner =
    chunks.length > 0
      ? chunks.map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br/>')}</p>`).join('')
      : `<p>${escapeHtml(text)}</p>`;
  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1e293b">${inner}</body></html>`;
}

export type SendAdminLeadEmailInput = {
  to: string;
  subject: string;
  body: string;
  enquiryId?: string;
  markContacted?: boolean;
};

/**
 * Send a transactional email via Resend from the admin dashboard.
 * Requires admin cookie + RESEND_API_KEY + EMAIL_FROM.
 */
export async function sendAdminLeadEmail(input: SendAdminLeadEmailInput) {
  if (!(await isAdminSession())) {
    return { success: false as const, error: 'Unauthorized' };
  }

  const to = input.to?.trim();
  const subject = input.subject?.trim().slice(0, 200);
  const body = input.body?.trim();

  if (!to || !subject || !body) {
    return { success: false as const, error: 'To, subject, and message are required' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return { success: false as const, error: 'Invalid recipient email' };
  }

  if (!process.env.RESEND_API_KEY) {
    return { success: false as const, error: 'RESEND_API_KEY is not configured' };
  }

  const from = process.env.EMAIL_FROM?.trim();
  if (!from) {
    return { success: false as const, error: 'EMAIL_FROM is not configured' };
  }

  try {
    await sendEmail({
      to,
      from,
      subject,
      text: body,
      html: textToHtml(body),
    });

    if (input.markContacted !== false && input.enquiryId) {
      await updateEnquiryStatus(input.enquiryId, 'Contacted');
    }

    return { success: true as const };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Failed to send email';
    return { success: false as const, error: msg };
  }
}
