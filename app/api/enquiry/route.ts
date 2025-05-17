import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      travelType, 
      destination, 
      departureDate, 
      returnDate, 
      message 
    } = body;

    // Validate form data
    if (!name || !email || !phone || !travelType || !destination) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format dates for display
    const formattedDepartureDate = departureDate || 'Not specified';
    const formattedReturnDate = returnDate || 'Not specified';

    // Create email message
    const emailMessage = {
      to: process.env.EMAIL_TO as string,
      from: process.env.EMAIL_FROM as string,
      subject: `New Travel Enquiry: ${destination} (${travelType})`,
      text: `
        NEW TRAVEL ENQUIRY
        
        Customer Details:
        -----------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        
        Trip Details:
        ------------
        Travel Type: ${travelType}
        Destination: ${destination}
        Departure Date: ${formattedDepartureDate}
        Return Date: ${formattedReturnDate}
        
        Additional Information:
        ---------------------
        ${message || 'No additional information provided'}
      `,
      html: `
        <h2>NEW TRAVEL ENQUIRY</h2>
        
        <h3>Customer Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        
        <h3>Trip Details:</h3>
        <ul>
          <li><strong>Travel Type:</strong> ${travelType}</li>
          <li><strong>Destination:</strong> ${destination}</li>
          <li><strong>Departure Date:</strong> ${formattedDepartureDate}</li>
          <li><strong>Return Date:</strong> ${formattedReturnDate}</li>
        </ul>
        
        <h3>Additional Information:</h3>
        <p>${message || 'No additional information provided'}</p>
      `,
    };

    // Send email
    await sgMail.send(emailMessage);

    // Send confirmation email to the customer
    const confirmationEmail = {
      to: email,
      from: process.env.EMAIL_FROM as string,
      subject: `Thank you for your travel enquiry to ${destination}`,
      text: `
        Dear ${name},
        
        Thank you for your travel enquiry to ${destination}. We have received your request and our travel specialists will review it shortly.
        
        We aim to respond to all enquiries within 24 hours during business days.
        
        Trip Details:
        - Travel Type: ${travelType}
        - Destination: ${destination}
        - Departure Date: ${formattedDepartureDate}
        - Return Date: ${formattedReturnDate}
        
        If you need to provide additional information or have any questions, please don't hesitate to contact us.
        
        Best regards,
        Your Travel Team
      `,
      html: `
        <h2>Thank you for your travel enquiry</h2>
        
        <p>Dear ${name},</p>
        
        <p>Thank you for your travel enquiry to <strong>${destination}</strong>. We have received your request and our travel specialists will review it shortly.</p>
        
        <p>We aim to respond to all enquiries within 24 hours during business days.</p>
        
        <h3>Your Trip Details:</h3>
        <ul>
          <li><strong>Travel Type:</strong> ${travelType}</li>
          <li><strong>Destination:</strong> ${destination}</li>
          <li><strong>Departure Date:</strong> ${formattedDepartureDate}</li>
          <li><strong>Return Date:</strong> ${formattedReturnDate}</li>
        </ul>
        
        <p>If you need to provide additional information or have any questions, please don't hesitate to contact us.</p>
        
        <p>
        Best regards,<br>
        Your Travel Team
        </p>
      `,
    };

    // Send confirmation email to the customer
    await sgMail.send(confirmationEmail);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Travel enquiry submitted successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing travel enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}