# ANDE Bearing Website — Comprehensive Codebase Audit

**Date:** 2026-02-22
**Auditor scope:** B2B growth engineering, technical SEO, web performance, security
**Stack:** Next.js 15.2 (App Router), React 19, next-intl 4.8, Tailwind CSS 4, Resend, Vercel

---

## 1. Executive Summary (10 bullets)

1. **Strong technical foundation** — Next.js App Router with proper SSR/SSG, well-structured i18n via `next-intl`, and solid security headers. The codebase is clean and maintainable.
2. **Product content is rich but image-less** — Product detail pages have excellent spec tables, features, and applications, but **zero product images** are rendered on pages despite images existing in `/public/products/`. This is the single biggest credibility gap for a B2B manufacturer site.
3. **No GA4/GTM analytics and zero event tracking** — Only Vercel Speed Insights is present. There is no way to attribute leads, track WhatsApp clicks, or measure conversion funnels. Flying blind on marketing ROI.
4. **No sticky/floating contact CTA** — WhatsApp button or persistent "Get Quote" is absent outside of specific pages. B2B best practice demands always-visible fast-path to inquiry.
5. **RFQ form lacks UTM capture** — Form submissions don't store UTM parameters, referrer, or landing page. Lead source attribution is impossible.
6. **Fake structured data (aggregateRating/review)** — Product detail JSON-LD includes fabricated ratings (`4.8/5, 56 reviews`) which violates Google's structured data policies and risks a manual action penalty.
7. **`localePrefix: 'as-needed'` creates SEO ambiguity** — English pages have no `/en/` prefix, meaning the root path and `/en/` path may both resolve. Combined with hreflang, this needs careful canonical enforcement.
8. **Product images use `<img>` in Header, not `<Image>` in product cards** — Product listing and detail pages show only SVG placeholder icons, not actual bearing photos. The Header logo also uses raw `<img>` instead of Next.js `<Image>`.
9. **Email notification uses `onboarding@resend.dev` sender** — This is Resend's sandbox domain. Deliverability will be poor; emails may land in spam. Must configure a custom sending domain.
10. **Blog has only 1 article** — Thin blog content hurts topical authority. The content pipeline needs 10-15 articles targeting procurement and technical keywords.

---

## 2. Prioritized Backlog

### P0 — Critical (Fix immediately, directly impacts leads or rankings)

| # | Problem | Impact | Evidence | Recommendation | Effort |
|---|---------|--------|----------|----------------|--------|
| P0-1 | **Product images not rendered on product pages** | Massive credibility loss. Procurement engineers expect photos/drawings. Bounce rate will be extremely high. | `src/app/[locale]/products/[slug]/page.tsx` — `ProductDetailPage` never uses `PRODUCT_IMAGES` map in JSX. Only a placeholder SVG gear icon is shown. `src/lib/products.ts:PRODUCT_IMAGES` maps exist but unused in rendering. | Add `<Image>` component using `PRODUCT_IMAGES[slug]` in both product detail and product listing cards. Add multiple images per product. | M |
| P0-2 | **Fake aggregateRating and review in Product JSON-LD** | Google manual action risk. Fabricated reviews/ratings violate structured data guidelines and can result in rich result removal or penalty. | `src/app/[locale]/products/[slug]/page.tsx` lines in `productSchema`: `aggregateRating: { ratingValue: '4.8', reviewCount: '56' }` and `review: { reviewBody: '...' }` | **Remove** `aggregateRating` and `review` from the product schema entirely until you have real, verified reviews. | S |
| P0-3 | **No analytics (GA4/GTM)** | Cannot measure traffic, conversion, or lead attribution. Marketing spend is unaccountable. | No `<Script>` tag for GA4 or GTM in `src/app/[locale]/layout.tsx`. No analytics package in `package.json`. Only `@vercel/speed-insights`. | Add GTM container in layout with consent-gated loading. Implement `dataLayer.push` events for: form_submit, whatsapp_click, email_click, phone_click, catalog_download. | M |
| P0-4 | **Resend sender domain is sandbox** | Inquiry notification emails go to spam. Leads may be lost silently. | `src/app/api/inquiry/route.ts`: `from: 'Beiren Bearing <onboarding@resend.dev>'` | Configure a custom domain in Resend (e.g., `noreply@andebearing.com`). Update the `from` field. Add SPF/DKIM/DMARC records. | S |
| P0-5 | **No cookie consent banner** | If GA4/GTM is added, GDPR/PECR compliance requires consent for tracking cookies. Even without GA, Vercel Speed Insights may set cookies. | No consent implementation anywhere in codebase. | Add a lightweight cookie consent banner (e.g., `cookie-consent` library or custom). Gate GTM loading behind consent. | M |

### P1 — High (Significant growth or SEO impact)

| # | Problem | Impact | Evidence | Recommendation | Effort |
|---|---------|--------|----------|----------------|--------|
| P1-1 | **No sticky WhatsApp/contact floating button** | B2B buyers on product pages need instant access to inquiry. Current CTA only appears at page bottom. | No floating element in any layout or component. | Add a fixed-position WhatsApp button (bottom-right) across all pages. Track clicks as GA4 events. | S |
| P1-2 | **No UTM/referrer capture in form submissions** | Cannot attribute leads to marketing campaigns, Google Ads, LinkedIn, etc. | `src/components/ContactForm.tsx` — only captures form fields. No `window.location`, `document.referrer`, or `URLSearchParams` capture. `src/app/api/inquiry/route.ts` — no UTM fields in `InquiryData`. | Capture `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `referrer`, `landing_page` on form mount. Send as hidden fields to API. Store in email body. | S |
| P1-3 | **Product pages missing breadcrumb in categories list** — both product listing and category pages lack breadcrumb when navigating from product detail | Reduced internal linking strength. SEO signal loss for category hierarchy. | `src/app/[locale]/products/page.tsx` — no breadcrumb. Category pages have breadcrumb but product listing index does not. | Add `BreadcrumbList` JSON-LD and visual breadcrumb to `/products` index page. | S |
| P1-4 | **Blog has only 1 article** | Minimal topical authority. Can't rank for long-tail procurement keywords. | `content/blog/en/` contains only `how-to-source-chinese-bearings-overseas.md` | Create content calendar: 10-15 articles targeting keywords like "rolling mill bearing selection guide", "bearing clearance hot rolling", "China bearing supplier comparison", "bearing MOQ guide", etc. | L |
| P1-5 | **No `<Image>` component for product cards** — all product listing cards show generic gear SVG | Product browsing experience is visually identical for all products. Users can't visually differentiate. | `src/app/[locale]/products/page.tsx`, `src/app/[locale]/page.tsx` (home), category page — all show same gear SVG icon. | Replace placeholder SVG with `<Image src={PRODUCT_IMAGES[slug]} ... />`. Add hover zoom. | M |
| P1-6 | **Header logo uses raw `<img>` instead of `<Image>`** | No Next.js optimization (no AVIF/WebP, no responsive srcset, no lazy loading for LCP element). | `src/components/Header.tsx` line: `<img src={'/images/company_log_${locale}.svg'} ... />` with eslint-disable comment. | Replace with `<Image>` component with `priority` prop for LCP optimization. | S |
| P1-7 | **Footer missing "rolling-mill-bearings" in product links** | Rolling mill bearings are the primary product/keyword but not linked from footer. Lost internal linking equity. | `src/components/Footer.tsx`: `productLinks` only includes `ball-bearings` and `roller-bearings`. Missing `rolling-mill-bearings`. | Add `{ href: '/products/rolling-mill-bearings', key: 'rollingMillBearings' }` to `productLinks` array. | S |
| P1-8 | **Home page `useTranslations()` is a client call in what should be a server component** | Home page (`src/app/[locale]/page.tsx`) uses `useTranslations()` which makes it a client component. Loses SSR benefits and increases JS bundle. | `src/app/[locale]/page.tsx` line 1: `import { useTranslations } from 'next-intl'` | Migrate to `getTranslations()` (server) pattern used in other pages. Requires `async` page function. | M |
| P1-9 | **No `<link rel="preconnect">` for external origins** | If GTM/GA or other third-party scripts are added, missing preconnect causes waterfall delays. Currently not needed but should be templated. | `src/app/[locale]/layout.tsx` `<head>` has no preconnect links. | Add preconnect hints when third-party scripts are introduced. | S |
| P1-10 | **"Search" in WebSite schema points to non-existent search endpoint** | Google may try to use the search URL and get 404. | `src/app/[locale]/layout.tsx` WebSite schema: `target: '${SITE_URL}/products?q={search_term_string}'` — but there is no search functionality on `/products`. | Either implement product search or remove the `potentialAction` SearchAction from WebSite schema. | S |

### P2 — Medium (Nice-to-have improvements)

| # | Problem | Impact | Evidence | Recommendation | Effort |
|---|---------|--------|----------|----------------|--------|
| P2-1 | **Loading state says "Loading..." not i18n** | Chinese users see English "Loading..." text. | `src/app/[locale]/loading.tsx` — hardcoded `<p>Loading...</p>` | Either remove text or use a locale-agnostic spinner-only pattern. | S |
| P2-2 | **Error page not localized** | "Something went wrong" in English only. | `src/app/[locale]/error.tsx` — all strings hardcoded in English. | Use `useTranslations` (it's already a client component) to localize error messages. | S |
| P2-3 | **Category CTA in product detail has hardcoded English text** | "Send Drawing / Model / Operating Conditions → Quote Within 24 Hours" appears in English even on Chinese pages. | `src/app/[locale]/products/[slug]/page.tsx` CategoryPage: hardcoded `<h2>` and `<p>` strings in the "Inquiry CTA module". | Move strings to `messages/en.json` and `messages/zh.json` and use `t()`. | S |
| P2-4 | **FAQ heading hardcoded on category page** | "Frequently Asked Questions" in English for rolling mill category, even on zh locale. | `src/app/[locale]/products/[slug]/page.tsx`: `<h2>Frequently Asked Questions</h2>` hardcoded. | Replace with `t('faqTitle')` or equivalent i18n key. | S |
| P2-5 | **`otherCategories` translation uses fallback parameter** | `tc('otherCategories', { fallback: 'Other Categories' })` — `next-intl` doesn't support `fallback` param this way. | `src/app/[locale]/products/[slug]/page.tsx` line in CategoryPage. | Ensure `otherCategories` key exists in both `en.json` and `zh.json`. Remove the invalid fallback parameter. | S |
| P2-6 | **No Sentry or error monitoring** | Production errors are only logged to console. No alerting on form failures. | `src/app/[locale]/error.tsx`: `console.error` only. No Sentry SDK in `package.json`. | Add `@sentry/nextjs` for error monitoring with source maps. | M |
| P2-7 | **In-memory rate limiter resets on cold start** | Serverless functions on Vercel create new instances frequently. Rate limiter provides minimal actual protection. | `src/app/api/inquiry/route.ts`: `rateLimitMap` is a JS `Map()` in module scope. | Upgrade to Vercel KV, Upstash Redis, or Cloudflare rate limiting for production-grade bot protection. | M |
| P2-8 | **No CRM webhook integration** | Leads arrive only by email. No structured lead pipeline. | `src/app/api/inquiry/route.ts` — only sends email via Resend. No webhook, no CRM push. | Add optional webhook POST to CRM (HubSpot, Pipedrive, or Google Sheets) alongside email. | M |
| P2-9 | **Chinese font fallback** | Geist font (Latin) has no CJK glyphs. Chinese pages rely on system font fallback which may cause FOUT. | `src/app/[locale]/layout.tsx`: only loads `Geist` font with `subsets: ['latin']`. | Consider adding `Noto Sans SC` or system CJK font stack for `zh` locale. | M |
| P2-10 | **Product form dropdown options are hardcoded bilingual** | "Ball Bearings / 球轴承" in options regardless of current locale. | `src/components/ContactForm.tsx`: `<option value="ball-bearings">Ball Bearings / 球轴承</option>` | Internationalize option labels using `t()` from the form namespace. | S |
| P2-11 | **`env.local` is in open tab / may be committed** | Security risk if `.env.local` is committed to repo. | `.env.local` appears in VS Code open tabs. `.gitignore` correctly excludes `.env*`. | Verify `.env.local` is NOT committed (`git log --all -- .env.local`). The gitignore rule looks correct. | S |
| P2-12 | **No `rel="noopener noreferrer"` on some external links** | Minor security/performance concern for `target="_blank"` links without `rel` attributes. | Most external links correctly have `rel="noopener noreferrer"`. Verify all instances. | Audit all `target="_blank"` links. | S |

---

## 3. B2B Best-Practice Scorecard (0–5)

| Category | Score | Notes |
|----------|-------|-------|
| **Trust & Credibility** | 3/5 | Good factory stats, ISO badge, trust blocks on home. Missing: product photos, factory photos, customer logos, case studies, certifications page with downloadable certificates. |
| **Lead Capture & Conversion UX** | 3/5 | Excellent RFQ form with industry-specific fields (bearing model, incoterms, quantity). Missing: sticky WhatsApp button, UTM capture, form analytics, catalog download CTA, multi-step form option. |
| **Product Taxonomy & Discovery** | 4/5 | Clean 3-category → 7-product hierarchy. Breadcrumbs and structured data on detail pages. Missing: product search, filtering, related products cross-links, actual product images. |
| **Technical SEO** | 3.5/5 | Strong: sitemap with hreflang alternates, robots.txt, canonical URLs, BreadcrumbList, Organization, WebSite, Product JSON-LD, FAQPage schema. Weak: fake aggregateRating (risk), SearchAction points to non-existent endpoint, single blog article. |
| **Content/Keyword Architecture** | 4/5 | Excellent product descriptions with long-tail keywords naturally embedded. Rolling mill bearing content is particularly strong. Blog is thin (1 article). Industry pages have good keyword coverage. |
| **Performance (Core Web Vitals)** | 4/5 | Good: font swap, AVIF/WebP configured, aggressive cache headers, code splitting, `dynamic()` import for ContactForm. Concerns: Home page is client component (extra JS), no preconnect, no product images to optimize yet. |
| **Accessibility** | 3.5/5 | Good: focus-visible styles, ARIA labels on nav/buttons, min touch targets (44px), semantic HTML. Missing: skip-to-content link, proper heading hierarchy audit, form error announcements for screen readers. |
| **Security & Compliance** | 4/5 | Excellent security headers (CSP, HSTS, X-Frame-Options, etc.), honeypot spam protection, server-side validation, input length limits, rate limiting (basic). Missing: cookie consent, CAPTCHA as backup, error monitoring. |
| **Analytics & Attribution** | 0.5/5 | Only Vercel Speed Insights. No GA4, no GTM, no event tracking, no UTM capture, no CRM integration. Essentially blind. |
| **Internationalization** | 4/5 | Solid next-intl setup, hreflang in sitemap and metadata, locale-specific OG tags. Issues: hardcoded English strings in several places (loading, error, category CTA, FAQ heading), bilingual form options, no CJK font optimization. |

**Overall Weighted Score: 3.4 / 5**

---

## 4. Concrete Code Changes

### 4.1 — P0-1: Render product images on product detail page

**File:** `src/app/[locale]/products/[slug]/page.tsx`

In the `ProductDetailPage` function, after the breadcrumb and before the grid, add the product image:

```tsx
// Add import at top of file
import Image from 'next/image';

// In ProductDetailPage, inside the grid's main content area (lg:col-span-2),
// add before the Overview section:

{/* Product Image */}
<section className="mb-8">
  <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
    <Image
      src={PRODUCT_IMAGES[slug as ProductSlug]}
      alt={name}
      width={500}
      height={500}
      className="object-contain max-h-[400px] w-auto"
      priority
    />
  </div>
</section>
```

Also update product cards in listing pages to use real images instead of gear SVG.

### 4.2 — P0-2: Remove fake structured data

**File:** `src/app/[locale]/products/[slug]/page.tsx`

Remove the `aggregateRating` and `review` properties from `productSchema`:

```diff
- aggregateRating: {
-   '@type': 'AggregateRating',
-   ratingValue: '4.8',
-   reviewCount: '56',
-   bestRating: '5',
-   worstRating: '1',
- },
- review: {
-   '@type': 'Review',
-   ...
- },
```

### 4.3 — P0-3: Add GTM/GA4

**File:** `src/app/[locale]/layout.tsx`

Add in `<head>`:

```tsx
{/* Google Tag Manager */}
{process.env.NEXT_PUBLIC_GTM_ID && (
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
    }}
  />
)}
```

Update CSP in `next.config.ts` to allow GTM:
```diff
- "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
+ "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com",
- "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
+ "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com",
+ "img-src 'self' data: https: https://www.googletagmanager.com",
```

### 4.4 — P0-4: Fix Resend sender domain

**File:** `src/app/api/inquiry/route.ts`

```diff
- from: 'Beiren Bearing <onboarding@resend.dev>',
+ from: `ANDE Bearing <${process.env.RESEND_FROM_EMAIL || 'noreply@andebearing.com'}>`,
```

Add `RESEND_FROM_EMAIL` to `.env.local.example`.

### 4.5 — P1-1: Add floating WhatsApp button

**New file:** `src/components/WhatsAppFloat.tsx`

```tsx
'use client';

import { WHATSAPP_URL } from '@/lib/constants';

export default function WhatsAppFloat() {
  const handleClick = () => {
    // GA4 event tracking (when GTM is set up)
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'whatsapp_click',
        click_location: 'floating_button',
      });
    }
  };

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all group"
      aria-label="Contact us on WhatsApp"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
```

Add to `src/app/[locale]/layout.tsx` inside `<body>` after `<Footer />`:
```tsx
import WhatsAppFloat from '@/components/WhatsAppFloat';
// ...
<Footer />
<WhatsAppFloat />
```

### 4.6 — P1-2: Add UTM capture to contact form

**File:** `src/components/ContactForm.tsx`

```tsx
// Add useEffect to capture UTM params on mount
import { useState, useEffect } from 'react';

// Inside the component, after useState declarations:
const [trackingData, setTrackingData] = useState({
  utmSource: '', utmMedium: '', utmCampaign: '', utmContent: '', utmTerm: '',
  referrer: '', landingPage: '',
});

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  setTrackingData({
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmContent: params.get('utm_content') || '',
    utmTerm: params.get('utm_term') || '',
    referrer: document.referrer || '',
    landingPage: window.location.pathname,
  });
}, []);

// In handleSubmit, include trackingData in the POST body:
body: JSON.stringify({
  ...formFields,
  ...trackingData,
}),
```

Update `src/app/api/inquiry/route.ts` to accept and include UTM fields in email.

### 4.7 — P1-7: Add rolling mill bearings to footer

**File:** `src/components/Footer.tsx`

```diff
  const productLinks = [
    { href: '/products/ball-bearings' as const, key: 'ballBearings' },
    { href: '/products/roller-bearings' as const, key: 'rollerBearings' },
+   { href: '/products/rolling-mill-bearings' as const, key: 'rollingMillBearings' },
  ];
```

### 4.8 — P1-8: Convert home page to server component

**File:** `src/app/[locale]/page.tsx`

```diff
- import { useTranslations } from 'next-intl';
+ import { getTranslations } from 'next-intl/server';
  import { Link } from '@/i18n/navigation';

- export default function HomePage() {
-   const t = useTranslations();
+ export default async function HomePage() {
+   const t = await getTranslations();
```

### 4.9 — P1-10: Remove or fix SearchAction in WebSite schema

**File:** `src/app/[locale]/layout.tsx`

Remove the `potentialAction` property from `websiteSchema` until search is implemented:

```diff
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: isZh ? '安德轴承 | 安德精工轴承' : 'Ande Bearing | ANDE Precision Bearing',
      // ...
-     potentialAction: {
-       '@type': 'SearchAction',
-       target: isZh
-         ? `${SITE_URL}/zh/products?q={search_term_string}`
-         : `${SITE_URL}/products?q={search_term_string}`,
-       'query-input': 'required name=search_term_string',
-     },
    };
```

### 4.10 — P2-3 & P2-4: Fix hardcoded English strings in category pages

**File:** `src/app/[locale]/products/[slug]/page.tsx`

Replace hardcoded strings:

```diff
- <h2 className="text-lg font-bold text-gray-900 mb-1">Send Drawing / Model / Operating Conditions → Quote Within 24 Hours</h2>
- <p className="text-sm text-gray-600">Our engineering team reviews your specifications and provides a detailed quotation with bearing selection recommendations.</p>
+ <h2 className="text-lg font-bold text-gray-900 mb-1">{t('detail.inquiryCta')}</h2>
+ <p className="text-sm text-gray-600">{t('detail.inquiryCtaDescription')}</p>
```

```diff
- <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
+ <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('detail.faqTitle')}</h2>
```

Add corresponding keys to `messages/en.json` and `messages/zh.json` under `products.detail`.

---

## 5. Top 10 Quick Wins

| # | Action | Evidence/File | Impact | Effort |
|---|--------|---------------|--------|--------|
| 1 | **Remove fake aggregateRating from product JSON-LD** | `products/[slug]/page.tsx` | Avoid Google penalty | 5 min |
| 2 | **Add rolling-mill-bearings to footer links** | `Footer.tsx` | Internal linking for primary keyword | 2 min |
| 3 | **Fix Resend sender domain** | `api/inquiry/route.ts` | Email deliverability | 15 min |
| 4 | **Remove SearchAction from WebSite schema** | `[locale]/layout.tsx` | Prevent false search endpoint | 2 min |
| 5 | **Render product images on product detail pages** | `products/[slug]/page.tsx` | Buyer trust & credibility | 30 min |
| 6 | **Fix hardcoded English strings** (category CTA, FAQ heading, loading, error) | 4 files | i18n correctness | 20 min |
| 7 | **Add floating WhatsApp button** | New `WhatsAppFloat.tsx` + layout | Fast-path to lead conversion | 30 min |
| 8 | **Convert home page to server component** | `[locale]/page.tsx` | Reduce JS bundle, improve FCP | 20 min |
| 9 | **Replace Header `<img>` with `<Image>`** | `Header.tsx` | LCP optimization | 10 min |
| 10 | **Add UTM capture to ContactForm** | `ContactForm.tsx` | Lead source attribution | 30 min |

---

## 6. Top 5 Bigger Bets (High Effort, High Return)

| # | Initiative | Impact | Evidence | Effort | Expected Outcome |
|---|-----------|--------|----------|--------|-----------------|
| 1 | **Implement GA4 + GTM with full event tracking** | Enables data-driven marketing decisions. Without this, all SEO and ad spend is unaccountable. | Zero analytics in codebase. No `dataLayer`, no conversion events. | L | Form submit, WhatsApp click, email click, phone click, catalog download all tracked. UTM-based lead attribution in GA4. Conversion rate optimization becomes possible. |
| 2 | **Build 10-15 SEO-optimized blog articles** targeting procurement and technical keywords | Blog currently has 1 article. Content marketing is the #1 organic lead channel for B2B industrial. | `content/blog/en/` has single article. | L | Target keywords: "rolling mill bearing manufacturer China", "bearing clearance guide hot rolling", "how to choose four-row tapered roller bearing", "bearing MOQ China supplier", "Sendzimir mill backing bearing replacement". Each article 1500-2500 words with internal links to product pages. |
| 3 | **Add real product photography and technical drawings** | Currently zero product images rendered. For B2B industrial buyers, seeing the actual product (or engineering drawing) is non-negotiable for trust. | `PRODUCT_IMAGES` map exists in `products.ts` with 4 actual photos, but 3 products reuse the same images. Product pages only render SVG placeholder icons. | L | Photograph all 7 products. Add 2-3 angles per product + a dimensional drawing. Use Next.js `<Image>` with AVIF/WebP. Create a lightbox gallery component. This single change may have the highest impact on RFQ conversion rate. |
| 4 | **Add CRM integration (HubSpot Free / Google Sheets webhook)** | Leads currently only arrive via email. No pipeline visibility, no follow-up automation, no lead scoring. | `api/inquiry/route.ts` only sends email via Resend. | M | POST inquiry data to HubSpot CRM (free tier) or Google Sheets via webhook. Enable sales follow-up tracking, lead aging alerts, and pipeline reporting. Add `utm_source` attribution to CRM records. |
| 5 | **Implement product search and filtering** | B2B buyers often know their bearing model number (e.g., "22316 E") and want to find it immediately. Currently no search functionality exists. | `WebSite` schema declares a SearchAction but no search endpoint exists. Product catalog is small (7 items) but will grow. | L | Add a search bar on `/products` page that filters by name, model, category, and specs. For the current small catalog, client-side filtering suffices. As catalog grows, add Algolia or Meilisearch. This enables the SearchAction schema to work correctly. |

---

## 7. Assumptions & Unknowns

| Item | Status | Note |
|------|--------|------|
| **Vercel deployment** | Assumed | Speed Insights package present. CSP allows `va.vercel-scripts.com`. |
| **Custom domain DNS** | Unknown | Cannot verify SPF/DKIM/DMARC records from codebase. Check via `dig andebearing.com TXT`. |
| **Google Search Console** | Unknown | `GOOGLE_SITE_VERIFICATION` env var exists but value not confirmed. |
| **Actual traffic volume** | Unknown | Cannot assess conversion rates without analytics data. |
| **`.env.local` security** | Likely safe | `.gitignore` excludes `.env*`. Recommend running `git log --all -- .env.local` to confirm. |
| **CMS for blog** | None | Blog posts are markdown files in `content/blog/`. No headless CMS. Content updates require code deployment. |
| **Product catalog growth** | Unknown | Current 7 products may expand. Data architecture (JSON in i18n messages) will become unwieldy at 50+ products. Consider migrating to a CMS or database-backed catalog. |

---

## 8. Implementation Priority Roadmap

### Week 1 (P0 — Stop the bleeding)
- [ ] Remove fake aggregateRating from product JSON-LD (P0-2)
- [ ] Fix Resend sender domain (P0-4)
- [ ] Remove non-functional SearchAction from schema (P1-10)
- [ ] Add product images to product detail pages (P0-1)
- [ ] Fix all hardcoded English strings (P2-3, P2-4, P2-1)

### Week 2 (P1 — Growth infrastructure)
- [ ] Add floating WhatsApp button (P1-1)
- [ ] Add UTM capture to form (P1-2)
- [ ] Convert home page to server component (P1-8)
- [ ] Add rolling-mill-bearings to footer (P1-7)
- [ ] Add breadcrumb to products index page (P1-3)

### Week 3 (Analytics & Compliance)
- [ ] Set up GTM + GA4 with consent banner (P0-3, P0-5)
- [ ] Configure conversion events (form_submit, whatsapp_click, email_click)
- [ ] Set up Google Search Console if not done
- [ ] Add Sentry error monitoring (P2-6)

### Month 2 (Content & CRM)
- [ ] Publish 5 blog articles targeting rolling mill bearing keywords (P1-4)
- [ ] Add CRM webhook integration (P2-8)
- [ ] Upgrade rate limiter to Upstash Redis (P2-7)
- [ ] Add product photography for all 7 products

### Month 3 (Scale)
- [ ] Publish 5 more blog articles
- [ ] Implement product search/filtering
- [ ] Add case studies / customer testimonials page
- [ ] Add downloadable PDF catalog CTA
- [ ] Evaluate migration of product data from JSON to CMS

---

*End of audit. Every recommendation above is tied to a specific file or code pattern in the repository. Prioritize P0 items first — the fake structured data and missing analytics are the highest-risk items for both SEO and business visibility.*
