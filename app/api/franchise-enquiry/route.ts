import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import {
  franchiseEnquiryAdminEmail,
  franchiseEnquiryUserConfirmation,
} from '@/lib/email-templates';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fname, company, email, phone, country, itype, format, budget, message } = body;

    // Validate required fields
    if (!fname || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields (Full Name, Email Address, and Phone Number are required)' },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Processing franchise enquiry submission:', { fname, email, phone, format, country });
    }

    // 1. Send Admin Notification Email
    try {
      const adminMail = franchiseEnquiryAdminEmail({
        fname,
        company,
        email,
        phone,
        country: country || 'Not specified',
        itype: itype || 'Not specified',
        format: format || 'Not specified',
        budget,
        message,
      });

      await sendEmail({
        to: (process.env.EMAIL_TO || 'bookings@konkanarabiahospitalitygroup.com') as string,
        ...adminMail,
      });
    } catch (emailError) {
      console.error('Franchise admin notification email failed:', emailError);
    }

    // 2. Send User Confirmation Email
    try {
      const confirmation = franchiseEnquiryUserConfirmation({
        fname,
        format,
      });
      await sendEmail({
        to: email,
        ...confirmation,
      });
    } catch (confirmationError) {
      console.error('Franchise user confirmation email failed:', confirmationError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Franchise enquiry submitted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing franchise enquiry submission:', error);

    let errorMessage = 'Internal server error';
    let errorDetails = '';

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || '';
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined,
      },
      { status: 500 }
    );
  }
}
