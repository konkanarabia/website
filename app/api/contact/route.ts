import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import {
  contactFormAdminEmail,
  contactFormUserConfirmation,
} from '@/lib/email-templates';
import { evaluateSpam, getClientIp } from '@/lib/antispam';
import { contactFormSchema, formatZodErrors } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    // Parse the request body
    const body = await request.json();

    // Anti-spam evaluation (honeypots, rate limiting, timing, keyword heuristics)
    const spamResult = evaluateSpam(body, clientIp);
    if (spamResult.isSpam) {
      console.warn(`[AntiSpam] Blocked spam contact submission from ${clientIp} (${spamResult.reason}):`, {
        name: body.name,
        email: body.email,
        phone: body.phone,
      });
      // Silently accept so bot thinks it succeeded without sending emails
      return NextResponse.json(
        { 
          success: true, 
          message: 'Contact form submitted successfully' 
        },
        { status: 200 }
      );
    }

    // Strict Schema Validation
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: formatZodErrors(validation.error),
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = validation.data;

    if (process.env.NODE_ENV === 'development') {
      console.log('Processing contact form submission');
    }

    try {
      const adminMail = contactFormAdminEmail({
        name,
        email,
        phone: phone || '',
        message,
      });
      await sendEmail({
        to: process.env.EMAIL_TO as string,
        ...adminMail,
      });
    } catch (emailError) {
      console.error('Email sending failed, but continuing with response:', emailError);
    }

    try {
      const confirmation = contactFormUserConfirmation({ name });
      await sendEmail({ to: email, ...confirmation });
    } catch (confirmationError) {
      console.error('Contact confirmation email failed:', confirmationError);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    
    // Provide more detailed error message for debugging
    let errorMessage = 'Internal server error';
    let errorDetails = '';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || '';
    }
    
    // Log environment variables for debugging (excluding sensitive info)
    console.log('Environment check:', {
      RESEND_API_KEY: process.env.RESEND_API_KEY ? 'set' : 'missing',
      EMAIL_TO: process.env.EMAIL_TO ? 'set' : 'missing',
      EMAIL_FROM: process.env.EMAIL_FROM ? 'set' : 'missing',
    });
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
      { status: 500 }
    );
  }
}