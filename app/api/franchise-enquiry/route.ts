import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import {
  franchiseEnquiryAdminEmail,
  franchiseEnquiryUserConfirmation,
} from '@/lib/email-templates';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/lib/models/Enquiry';
import { evaluateSpam, getClientIp } from '@/lib/antispam';
import { analyzeSpamWithAi } from '@/lib/ai-spam-agent';
import { franchiseFormSchema, formatZodErrors } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const body = await request.json();

    // Anti-spam evaluation (honeypots, rate limiting, timing, keyword heuristics)
    const spamResult = evaluateSpam(body, clientIp);
    if (spamResult.isSpam) {
      console.warn(`[AntiSpam] Blocked spam franchise enquiry from ${clientIp} (${spamResult.reason}):`, {
        fname: body.fname,
        email: body.email,
        phone: body.phone,
        company: body.company,
      });

      try {
        await dbConnect();
        const spamEntry = new Enquiry({
          name: body.fname || 'Anonymous',
          email: body.email || 'unknown@example.com',
          phone: body.phone,
          destination: body.country,
          travelType: `Franchise (${body.format || 'Partnership'})`,
          message: `${body.company ? `Company: ${body.company}. ` : ''}${body.message || ''}`,
          status: 'Spam',
          isSpam: true,
          spamScore: 1.0,
          spamReason: spamResult.reason,
          spamCategory: 'gibberish',
        });
        await spamEntry.save();
      } catch (dbErr) {
        console.error('Failed to log blocked spam franchise enquiry to DB:', dbErr);
      }

      // Silently accept so bot thinks it succeeded without sending emails
      return NextResponse.json(
        {
          success: true,
          message: 'Franchise enquiry submitted successfully',
        },
        { status: 200 }
      );
    }

    // Strict Schema Validation
    const validation = franchiseFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: formatZodErrors(validation.error),
        },
        { status: 400 }
      );
    }

    const { fname, company, email, phone, country, itype, format, budget, message } = validation.data;

    // AI Spam Agent Evaluation (Semantic Intelligence)
    const aiSpam = await analyzeSpamWithAi({
      name: fname,
      fname,
      email,
      phone,
      destination: country,
      travelType: `Franchise (${format})`,
      message: `${company ? `Company: ${company}. ` : ''}${message || ''}`,
    });

    if (aiSpam.isSpam && aiSpam.confidence >= 0.65) {
      console.warn(`[AI Spam Agent] Blocked franchise enquiry (${aiSpam.category}, ${Math.round(aiSpam.confidence * 100)}%): ${aiSpam.reason}`);

      try {
        await dbConnect();
        const spamEntry = new Enquiry({
          name: fname,
          email,
          phone,
          destination: country,
          travelType: `Franchise (${format})`,
          message: `${company ? `Company: ${company}. ` : ''}${message || ''}`,
          status: 'Spam',
          isSpam: true,
          spamScore: aiSpam.confidence,
          spamReason: aiSpam.reason,
          spamCategory: aiSpam.category,
        });
        await spamEntry.save();
      } catch (dbErr) {
        console.error('Failed to log AI spam franchise enquiry to DB:', dbErr);
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Franchise enquiry submitted successfully',
        },
        { status: 200 }
      );
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Processing franchise enquiry submission:', { fname, email, phone, format, country });
    }

    // Save legitimate franchise enquiry to MongoDB
    try {
      await dbConnect();
      const validEntry = new Enquiry({
        name: fname,
        email,
        phone,
        destination: country,
        travelType: `Franchise (${format})`,
        message: `${company ? `Company: ${company}. ` : ''}Investment Type: ${itype || 'N/A'}. Budget: ${budget || 'N/A'}.\n\n${message || ''}`,
        status: 'New',
        isSpam: false,
      });
      await validEntry.save();
    } catch (dbErr) {
      console.error('Failed to save franchise enquiry to DB:', dbErr);
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
