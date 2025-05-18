import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { formatServerCurrency, formatServerPriceRange } from '@/lib/server-currency';
import { formatServerDate, formatServerDateRange, formatServerDuration } from '@/lib/server-date';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      preferredContact,
      travelType, 
      destination, 
      departureDate, 
      returnDate, 
      travelers,
      budgetMin,
      budgetMax,
      message,
      subscribe
    } = body;

    // Validate form data
    if (!name || !email || !travelType || !destination) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }    // Format dates for display
    let formattedDepartureDate = 'Not specified';
    let formattedReturnDate = 'Not specified';
    let tripDuration;
    
    if (departureDate) {
      formattedDepartureDate = formatServerDate(new Date(departureDate), { dateStyle: 'long' });
      
      if (returnDate) {
        formattedReturnDate = formatServerDate(new Date(returnDate), { dateStyle: 'long' });
        
        // Calculate trip duration
        const start = new Date(departureDate);
        const end = new Date(returnDate);
        const durationInDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        tripDuration = formatServerDuration(durationInDays, { includeNights: true });
      }
    }
    
    console.log('Processing travel enquiry:', { name, email, destination });
    
    let adminEmailSent = false;
    let customerEmailSent = false;
    
    try {
      // Send email to admin
      await sendEmail({
        to: process.env.EMAIL_TO as string,
        subject: `New Travel Enquiry: ${destination} (${travelType})`,
        text: `
          NEW TRAVEL ENQUIRY
          
          Customer Details:
          -----------------
          Name: ${name}
          Email: ${email}
          Phone: ${phone || 'Not provided'}
          Preferred Contact Method: ${preferredContact || 'Email'}
            Trip Details:
          ------------
          Travel Type: ${travelType}
          Destination: ${destination}
          Departure Date: ${formattedDepartureDate}
          Return Date: ${formattedReturnDate}
          ${tripDuration ? `Duration: ${tripDuration}` : ''}
          Number of Travelers: ${travelers}
          Budget Range: ${formatServerPriceRange(budgetMin, budgetMax)}
          
          Additional Information:
          ---------------------
          ${message || 'No additional information provided'}
          
          Newsletter Subscription: ${subscribe ? 'Yes' : 'No'}
        `,
        html: `
          <h2>NEW TRAVEL ENQUIRY</h2>
          
          <h3>Customer Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
            <li><strong>Preferred Contact Method:</strong> ${preferredContact || 'Email'}</li>
          </ul>
            <h3>Trip Details:</h3>
          <ul>
            <li><strong>Travel Type:</strong> ${travelType}</li>
            <li><strong>Destination:</strong> ${destination}</li>
            <li><strong>Departure Date:</strong> ${formattedDepartureDate}</li>
            <li><strong>Return Date:</strong> ${formattedReturnDate}</li>
            ${tripDuration ? `<li><strong>Duration:</strong> ${tripDuration}</li>` : ''}
            <li><strong>Number of Travelers:</strong> ${travelers}</li>
            <li><strong>Budget Range:</strong> ${formatServerPriceRange(budgetMin, budgetMax)}</li>
          </ul>
          
          <h3>Additional Information:</h3>
          <p>${message || 'No additional information provided'}</p>
          
          <p><strong>Newsletter Subscription:</strong> ${subscribe ? 'Yes' : 'No'}</p>
        `,      });
      
      adminEmailSent = true;
      console.log('Admin email sent successfully');
    } catch (emailError) {
      console.error('Admin email sending failed:', emailError);
      // We'll continue processing and try to send the confirmation email
    }

    try {
      // Send confirmation email to the customer
      await sendEmail({
        to: email,
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
          ${tripDuration ? `- Duration: ${tripDuration}` : ''}
          - Number of Travelers: ${travelers}
          - Budget Range: ${formatServerPriceRange(budgetMin, budgetMax)}
          
          ${message ? `Your message: ${message}` : ''}
          
          If you have any questions, please feel free to contact us.
          
          Best regards,
          The Travel Team
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
            ${tripDuration ? `<li><strong>Duration:</strong> ${tripDuration}</li>` : ''}
            <li><strong>Number of Travelers:</strong> ${travelers}</li>
            <li><strong>Budget Range:</strong> ${formatServerPriceRange(budgetMin, budgetMax)}</li>
          </ul>
          
          ${message ? `<p><strong>Your message:</strong> ${message}</p>` : ''}
          
          <p>If you have any questions, please feel free to contact us.</p>
          
          <p>Best regards,<br>The Travel Team</p>
        `,      });
      
      customerEmailSent = true;
      console.log('Customer confirmation email sent successfully');
    } catch (confirmationError) {
      console.error('Confirmation email sending failed:', confirmationError);
      // Continue with success response as the main functionality worked
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Travel enquiry submitted successfully',
        adminEmailSent,
        customerEmailSent
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing travel enquiry:', error);
    
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
