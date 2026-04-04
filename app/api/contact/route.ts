import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import {
  contactFormAdminEmail,
  contactFormUserConfirmation,
} from '@/lib/email-templates';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate form data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

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