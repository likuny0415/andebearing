import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface InquiryData {
  name: string;
  email: string;
  company?: string;
  country?: string;
  phone?: string;
  productInterest?: string;
  bearingModel?: string;
  bearingSize?: string;
  quantity?: string;
  application?: string;
  incoterms?: string;
  message?: string;
}

// Simple in-memory rate limiter (resets on cold start, sufficient for basic protection)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // max 5 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  return false;
}

// Periodically clean up expired entries to prevent memory leak
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

function buildEmailHtml(inquiry: Record<string, string>): string {
  const rows = [
    { label: 'Inquiry ID', value: inquiry.id },
    { label: 'Timestamp', value: inquiry.timestamp },
    { label: 'Name', value: inquiry.name },
    { label: 'Email', value: inquiry.email },
    { label: 'Company', value: inquiry.company },
    { label: 'Country / Region', value: inquiry.country },
    { label: 'Phone', value: inquiry.phone },
    { label: 'Product Interest', value: inquiry.productInterest },
    { label: 'Bearing Model', value: inquiry.bearingModel },
    { label: 'Bearing Size', value: inquiry.bearingSize },
    { label: 'Quantity', value: inquiry.quantity },
    { label: 'Application', value: inquiry.application },
    { label: 'Incoterms', value: inquiry.incoterms },
    { label: 'Message', value: inquiry.message },
  ].filter(row => row.value); // Only include fields that have values

  const tableRows = rows.map(row =>
    `<tr>
      <td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;white-space:nowrap;vertical-align:top;">${row.label}</td>
      <td style="padding:8px 12px;border:1px solid #e2e8f0;">${row.value}</td>
    </tr>`
  ).join('');

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1e40af;border-bottom:2px solid #1e40af;padding-bottom:8px;">
        🔔 New Inquiry from Ande Bearing Website
      </h2>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        ${tableRows}
      </table>
      <p style="color:#64748b;font-size:12px;margin-top:24px;">
        This email was automatically sent from the Ande Bearing website contact form.
      </p>
    </div>
  `;
}

async function sendEmail(inquiry: Record<string, string>): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL || 'kuny.li0145@gmail.com';

  if (!resendApiKey) {
    console.warn('[Inquiry] RESEND_API_KEY not configured. Skipping email notification.');
    return;
  }

  const resend = new Resend(resendApiKey);

  const companyPart = inquiry.company ? ` from ${inquiry.company}` : '';
  const subject = `New Inquiry ${inquiry.id}${companyPart} - ${inquiry.name}`;

  const { error } = await resend.emails.send({
    from: 'Beiren Bearing <onboarding@resend.dev>',
    to: [notifyEmail],
    subject,
    html: buildEmailHtml(inquiry),
  });

  if (error) {
    throw new Error(`Resend API error: ${error.message}`);
  }

  console.log(`[Inquiry] Email sent to ${notifyEmail} for ${inquiry.id}`);
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Clean up old entries periodically (every request is fine for low-traffic)
    cleanupRateLimitMap();

    const data: InquiryData = await request.json();

    // Server-side validation — only name and email are required
    if (!data.name || !data.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Sanitize input lengths
    if (data.name.length > 200 || data.email.length > 200) {
      return NextResponse.json({ error: 'Field length exceeds maximum' }, { status: 400 });
    }

    if (data.company && data.company.length > 200) {
      return NextResponse.json({ error: 'Field length exceeds maximum' }, { status: 400 });
    }

    if (data.message && data.message.length > 5000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }

    const inquiry: Record<string, string> = {
      id: `INQ-${Date.now()}`,
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      company: data.company || '',
      country: data.country || '',
      phone: data.phone || '',
      productInterest: data.productInterest || '',
      bearingModel: data.bearingModel || '',
      bearingSize: data.bearingSize || '',
      quantity: data.quantity || '',
      application: data.application || '',
      incoterms: data.incoterms || '',
      message: data.message || '',
    };

    console.log(`[Inquiry] ${inquiry.id} from ${inquiry.name} (${inquiry.email})${inquiry.company ? ` - ${inquiry.company}` : ''}`);

    // Send email notification
    try {
      await sendEmail(inquiry);
    } catch (emailError) {
      console.error('[Inquiry] Failed to send email notification:', emailError);
      // Don't fail the whole request if email fails — the inquiry is still logged
    }

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (error) {
    console.error('[Inquiry Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}