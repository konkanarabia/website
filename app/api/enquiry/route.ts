import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import {
  travelEnquiryAdminEmail,
  travelEnquiryCustomerEmail,
} from '@/lib/email-templates';
import { formatServerPriceRange } from '@/lib/server-currency';
import { formatServerDate, formatServerDuration } from '@/lib/server-date';
import dbConnect from '@/lib/mongodb';
import { evaluateSpam, getClientIp } from '@/lib/antispam';
import { analyzeSpamWithAi } from '@/lib/ai-spam-agent';
import { isSpamVerdict } from '@/lib/spam-verdict';
import { GENERIC_SERVER_ERROR, clipReason, spamLogFields } from '@/lib/spam-log';
import { travelEnquirySchema, formatZodErrors } from '@/lib/validations';
import Enquiry from '@/lib/models/Enquiry';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    // Parse the request body
    const body = await request.json();

    // Anti-spam evaluation (honeypots, rate limiting, timing, keyword heuristics)
    const spamResult = evaluateSpam(body, clientIp);
    if (spamResult.isSpam) {
      const log = spamLogFields(body);
      console.warn(`[AntiSpam] Blocked spam travel enquiry from ${clientIp} (${spamResult.reason})`);

      try {
        await dbConnect();
        const spamEntry = new Enquiry({
          name: log.name,
          email: log.email,
          phone: log.phone,
          preferredContact: log.preferredContact,
          travelType: log.travelType || 'Travel Enquiry',
          destination: log.destination,
          message: log.message,
          status: 'Spam',
          isSpam: true,
          spamScore: 1.0,
          spamReason: clipReason(spamResult.reason),
          spamCategory: 'gibberish',
        });
        await spamEntry.save();
      } catch (dbErr) {
        console.error('Failed to log blocked spam enquiry to DB:', dbErr);
      }

      return NextResponse.json(
        { 
          success: true, 
          message: 'Enquiry submitted successfully' 
        },
        { status: 200 }
      );
    }

    // Strict Schema Validation
    const validation = travelEnquirySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: formatZodErrors(validation.error),
        },
        { status: 400 }
      );
    }

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
    } = validation.data;

    // Save the lead first, so a slow or failing AI call can never lose it.
    await dbConnect();
    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      preferredContact,
      travelType,
      destination,
      departureDate: departureDate ? new Date(departureDate) : undefined,
      returnDate: returnDate ? new Date(returnDate) : undefined,
      travelers: travelers !== undefined ? String(travelers) : undefined,
      budgetMin,
      budgetMax,
      message,
      subscribe: Boolean(subscribe),
    });
    await newEnquiry.save();

    // AI Spam Agent Evaluation (Semantic Intelligence)
    const aiSpam = await analyzeSpamWithAi({
      name,
      email,
      phone,
      destination,
      travelType,
      message,
    });

    // If AI detects spam, tag the saved lead as Spam for admin review and SUPPRESS emails
    if (isSpamVerdict(aiSpam)) {
      console.warn(`[AI Spam Agent] Flagged spam enquiry (${aiSpam.category}, ${Math.round(aiSpam.confidence * 100)}%): ${aiSpam.reason}`);
      try {
        await Enquiry.findByIdAndUpdate(newEnquiry._id, {
          status: 'Spam',
          isSpam: true,
          spamScore: aiSpam.confidence,
          spamReason: clipReason(aiSpam.reason),
          spamCategory: aiSpam.category,
        });
      } catch (dbErr) {
        console.error('Failed to tag AI spam enquiry:', dbErr);
      }

      return NextResponse.json(
        { 
          success: true, 
          message: 'Travel enquiry submitted successfully',
          adminEmailSent: false,
          customerEmailSent: false,
        },
        { status: 200 }
      );
    }

    // Format dates for display
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
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Processing travel enquiry');
    }

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
      if (process.env.NODE_ENV === 'development') {
        console.log('Admin email sent');
      }
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
    return NextResponse.json(GENERIC_SERVER_ERROR, { status: 500 });
  }
}
