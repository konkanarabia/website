import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import {
  travelEnquiryAdminEmail,
  travelEnquiryCustomerEmail,
} from '@/lib/email-templates';
import { formatServerPriceRange } from '@/lib/server-currency';
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
      const adminMail = travelEnquiryAdminEmail({
        name,
        email,
        phone: phone || '',
        preferredContact: preferredContact || 'Email',
        travelType,
        destination,
        formattedDepartureDate,
        formattedReturnDate,
        tripDuration,
        travelers: travelers ?? '',
        budgetRange: formatServerPriceRange(budgetMin, budgetMax),
        message: message || '',
        subscribe: Boolean(subscribe),
      });
      await sendEmail({
        to: process.env.EMAIL_TO as string,
        ...adminMail,
      });

      adminEmailSent = true;
      console.log('Admin email sent successfully');
    } catch (emailError) {
      console.error('Admin email sending failed:', emailError);
      // We'll continue processing and try to send the confirmation email
    }

    try {
      const customerMail = travelEnquiryCustomerEmail({
        name,
        email,
        phone: phone || '',
        preferredContact: preferredContact || 'Email',
        travelType,
        destination,
        formattedDepartureDate,
        formattedReturnDate,
        tripDuration,
        travelers: travelers ?? '',
        budgetRange: formatServerPriceRange(budgetMin, budgetMax),
        message: message || '',
        subscribe: Boolean(subscribe),
      });
      await sendEmail({ to: email, ...customerMail });

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
      RESEND_API_KEY: process.env.RESEND_API_KEY ? '✓ Set' : '✗ Not set',
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
