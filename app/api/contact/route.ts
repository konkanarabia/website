import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate form data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email message
    const emailMessage = {
      to: process.env.EMAIL_TO as string,
      from: process.env.EMAIL_FROM as string,
      subject: `New contact form submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await sgMail.send(emailMessage);

    // Send confirmation email to the user (optional)
    const confirmationEmail = {
      to: email,
      from: process.env.EMAIL_FROM as string,
      subject: 'Thank you for contacting us',
      text: `
        Dear ${name},
        
        Thank you for your message. We have received your inquiry and will get back to you shortly.
        
        Best regards,
        Your Company Name
      `,
      html: `
        <h3>Thank you for contacting us</h3>
        <p>Dear ${name},</p>
        <p>Thank you for your message. We have received your inquiry and will get back to you shortly.</p>
        <p>Best regards,<br>Your Company Name</p>
      `,
    };

    // Uncomment to send confirmation email
    // await sgMail.send(confirmationEmail);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}