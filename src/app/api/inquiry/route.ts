import { NextRequest, NextResponse } from 'next/server';

interface InquiryData {
  name: string;
  email: string;
  company: string;
  country: string;
  phone?: string;
  productInterest?: string;
  bearingModel?: string;
  bearingSize?: string;
  quantity?: string;
  application?: string;
  incoterms?: string;
  message: string;
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

    // Server-side validation
    if (!data.name || !data.email || !data.company || !data.country) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Sanitize input lengths
    if (data.name.length > 200 || data.email.length > 200 || data.company.length > 200) {
      return NextResponse.json({ error: 'Field length exceeds maximum' }, { status: 400 });
    }

    if (data.message && data.message.length > 5000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }

    const inquiry = {
      id: `INQ-${Date.now()}`,
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      company: data.company,
      country: data.country,
      phone: data.phone || '',
      productInterest: data.productInterest || '',
      bearingModel: data.bearingModel || '',
      bearingSize: data.bearingSize || '',
      quantity: data.quantity || '',
      application: data.application || '',
      incoterms: data.incoterms || '',
      message: data.message || '',
      ip,
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // TODO: Replace with your preferred storage/notification method:
    // - Send email via Resend/SendGrid/AWS SES
    // - Store in a database (Supabase, PlanetScale, etc.)
    // - Post to a webhook (Slack, Google Sheets, etc.)
    //
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@beirenbearing.com',
    //   to: CONTACT_EMAIL,
    //   subject: `New Inquiry ${inquiry.id} from ${data.company}`,
    //   text: JSON.stringify(inquiry, null, 2),
    // });

    console.log(`[Inquiry] ${inquiry.id} from ${data.company} (${data.country}) - ${data.email}`);

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (error) {
    console.error('[Inquiry Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}