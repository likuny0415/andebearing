import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

interface InquiryData {
  name: string;
  email: string;
  company: string;
  country: string;
  phone?: string;
  productInterest?: string;
  quantity?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: InquiryData = await request.json();

    // Server-side validation
    if (!data.name || !data.email || !data.company || !data.country || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Store inquiry as JSON file (fallback when SMTP is not configured)
    const inquiry = {
      ...data,
      timestamp: new Date().toISOString(),
      id: `INQ-${Date.now()}`,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // TODO: Integrate SMTP email sending here when ready
    // For now, store inquiries as JSON files
    const dir = join(process.cwd(), 'data', 'inquiries');
    await mkdir(dir, { recursive: true });
    await writeFile(
      join(dir, `${inquiry.id}.json`),
      JSON.stringify(inquiry, null, 2),
      'utf-8'
    );

    console.log(`[Inquiry] ${inquiry.id} from ${data.company} (${data.country}) - ${data.email}`);

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (error) {
    console.error('[Inquiry Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}