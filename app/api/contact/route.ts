import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

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

    console.log('Processing contact form submission:', { name, email, phone: phone || 'Not provided' });

    try {
      // Send email to admin
      await sendEmail({
        to: process.env.EMAIL_TO as string,
        subject: `New contact form submission from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone || 'Not provided'}
          
          Message:
          ${message}
        `,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });
    } catch (emailError) {
      console.error('Email sending failed, but continuing with response:', emailError);
      // We'll continue processing and return success to the user
      // In a production app, you might want to log this to a monitoring service
    }

    // Send confirmation email to the user (optional)
    // Uncomment to send confirmation email
    // await sendEmail({
    //   to: email,
    //   subject: 'Thank you for contacting us',
    //   text: `
    //     Dear ${name},
    //     
    //     Thank you for your message. We have received your inquiry and will get back to you shortly.
    //     
    //     Best regards,
    //     Your Company Name
    //   `,
    //   html: `
    //     <h3>Thank you for contacting us</h3>
    //     <p>Dear ${name},</p>
    //     <p>Thank you for your message. We have received your inquiry and will get back to you shortly.</p>
    //     <p>Best regards,<br>Your Company Name</p>
    //   `,
    // });

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
      EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
      EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
      EMAIL_SERVER_SECURE: process.env.EMAIL_SERVER_SECURE,
      EMAIL_TO: process.env.EMAIL_TO,
      EMAIL_FROM: process.env.EMAIL_FROM
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