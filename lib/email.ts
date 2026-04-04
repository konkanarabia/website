import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing required environment variable: RESEND_API_KEY');
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export const sendEmail = async ({
  to,
  from = process.env.EMAIL_FROM as string,
  subject,
  text,
  html,
}: {
  to: string;
  from?: string;
  subject: string;
  text: string;
  html: string;
}) => {
  const recipients = to
    .split(/[,;]+/)
    .map((addr) => addr.trim())
    .filter(Boolean);

  if (recipients.length === 0 || !from) {
    throw new Error('Missing required email addresses (to/from)');
  }

  const resend = getResend();

  const { data, error } = await resend.emails.send({
    from,
    to: recipients,
    subject,
    text,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    throw new Error(error.message || 'Failed to send email');
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('Email sent:', data?.id);
  }
  return { success: true, messageId: data?.id };
};
