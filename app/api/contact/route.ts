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
import { isSpamVerdict } from '@/lib/spam-verdict';
import { GENERIC_SERVER_ERROR, clipReason, spamLogFields } from '@/lib/spam-log';
import { contactFormSchema, formatZodErrors } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    // Parse the request body
    const body = await request.json();

    // Anti-spam evaluation (honeypots, rate limiting, timing, keyword heuristics)
    const spamResult = evaluateSpam(body, clientIp);
    if (spamResult.isSpam) {
      const log = spamLogFields(body);
      console.warn(`[AntiSpam] Blocked spam contact submission from ${clientIp} (${spamResult.reason})`);

      try {
        await dbConnect();
        const spamEntry = new Enquiry({
          name: log.name,
          email: log.email,
          phone: log.phone,
          message: log.message,
          travelType: 'Contact Inquiry',
          status: 'Spam',
          isSpam: true,
          spamScore: 1.0,
          spamReason: clipReason(spamResult.reason),
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

    // Save the lead first, so a slow or failing AI call can never lose it.
    let savedId: unknown = null;
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
      savedId = validEntry._id;
    } catch (dbErr) {
      console.error('Failed to save contact enquiry to DB:', dbErr);
    }

    // AI Spam Agent Evaluation (Semantic Intelligence)
    const aiSpam = await analyzeSpamWithAi({
      name,
      email,
      phone,
      message,
    });

    if (isSpamVerdict(aiSpam)) {
      console.warn(`[AI Spam Agent] Flagged contact submission (${aiSpam.category}, ${Math.round(aiSpam.confidence * 100)}%): ${aiSpam.reason}`);

      if (savedId) {
        try {
          await Enquiry.findByIdAndUpdate(savedId, {
            status: 'Spam',
            isSpam: true,
            spamScore: aiSpam.confidence,
            spamReason: clipReason(aiSpam.reason),
            spamCategory: aiSpam.category,
          });
        } catch (dbErr) {
          console.error('Failed to tag AI spam contact enquiry:', dbErr);
        }
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Contact form submitted successfully'
        },
        { status: 200 }
      );
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
    return NextResponse.json(GENERIC_SERVER_ERROR, { status: 500 });
  }
}
