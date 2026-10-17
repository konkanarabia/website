import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import {
  contactFormAdminEmail,
  contactFormUserConfirmation,
} from '@/lib/email-templates';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/lib/models/Enquiry';
import { evaluateSpam, getClientIp } from '@/lib/antispam';
import { analyzeSpamWithAi } from '@/lib/ai-spam-agent';
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

      try {
        await dbConnect();
        const spamEntry = new Enquiry({
          name: body.name || 'Anonymous',
          email: body.email || 'unknown@example.com',
          phone: body.phone,
          message: body.message,
          travelType: 'Contact Inquiry',
          status: 'Spam',
          isSpam: true,
          spamScore: 1.0,
          spamReason: spamResult.reason,
          spamCategory: 'gibberish',
        });
        await spamEntry.save();
      } catch (dbErr) {
        console.error('Failed to log blocked spam contact enquiry to DB:', dbErr);
      }

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

    // AI Spam Agent Evaluation (Semantic Intelligence)
    const aiSpam = await analyzeSpamWithAi({
      name,
      email,
      phone,
      message,
    });

    if (aiSpam.isSpam && aiSpam.confidence >= 0.65) {
      console.warn(`[AI Spam Agent] Blocked contact submission (${aiSpam.category}, ${Math.round(aiSpam.confidence * 100)}%): ${aiSpam.reason}`, {
        name,
        email,
      });

      try {
        await dbConnect();
        const spamEntry = new Enquiry({
          name,
          email,
          phone,
          message,
          travelType: 'Contact Inquiry',
          status: 'Spam',
          isSpam: true,
          spamScore: aiSpam.confidence,
          spamReason: aiSpam.reason,
          spamCategory: aiSpam.category,
        });
        await spamEntry.save();
      } catch (dbErr) {
        console.error('Failed to log AI spam contact enquiry to DB:', dbErr);
      }

      return NextResponse.json(
        { 
          success: true, 
          message: 'Contact form submitted successfully' 
        },
        { status: 200 }
      );
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Processing contact form submission');
    }

    // Save legitimate contact enquiry to MongoDB
    try {
      await dbConnect();
      const validEntry = new Enquiry({
        name,
        email,
        phone,
        message,
        travelType: 'Contact Inquiry',
        status: 'New',
        isSpam: false,
      });
      await validEntry.save();
    } catch (dbErr) {
      console.error('Failed to save contact enquiry to DB:', dbErr);
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