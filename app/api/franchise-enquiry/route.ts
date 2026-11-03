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
import { isSpamVerdict } from '@/lib/spam-verdict';
import { GENERIC_SERVER_ERROR, clipReason, spamLogFields } from '@/lib/spam-log';
import { franchiseFormSchema, formatZodErrors } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const body = await request.json();

    // Anti-spam evaluation (honeypots, rate limiting, timing, keyword heuristics)
    const spamResult = evaluateSpam(body, clientIp);
    if (spamResult.isSpam) {
      const log = spamLogFields(body);
      console.warn(`[AntiSpam] Blocked spam franchise enquiry from ${clientIp} (${spamResult.reason})`);

      try {
        await dbConnect();
        const spamEntry = new Enquiry({
          name: log.name,
          email: log.email,
          phone: log.phone,
          destination: log.country,
          travelType: `Franchise (${log.format || 'Partnership'})`,
          message: `${log.company ? `Company: ${log.company}. ` : ''}${log.message || ''}`,
          status: 'Spam',
          isSpam: true,
          spamScore: 1.0,
          spamReason: clipReason(spamResult.reason),
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

    // Save the lead first, so a slow or failing AI call can never lose it.
    let savedId: unknown = null;
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
      savedId = validEntry._id;
    } catch (dbErr) {
      console.error('Failed to save franchise enquiry to DB:', dbErr);
    }

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

    if (isSpamVerdict(aiSpam)) {
      console.warn(`[AI Spam Agent] Flagged franchise enquiry (${aiSpam.category}, ${Math.round(aiSpam.confidence * 100)}%): ${aiSpam.reason}`);

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
          console.error('Failed to tag AI spam franchise enquiry:', dbErr);
        }
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
    return NextResponse.json(GENERIC_SERVER_ERROR, { status: 500 });
  }
}
