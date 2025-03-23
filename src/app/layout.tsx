import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LanguageProvider } from "../context/LanguageContext";
import DynamicHtmlLang from "../components/DynamicHtmlLang";
import DynamicTitle from "../components/DynamicTitle";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// This metadata is used as a fallback and for SEO
export const metadata: Metadata = {
  title: "Ande Precision Bearing | 安德精工轴承",
  description: "Precision Bearings for Every Industry. Delivering high-quality bearings and solutions that keep your machinery running smoothly and efficiently.",
  keywords: ["bearings", "ANDE bearings", "precision bearings", "industrial bearings", "轴承", "安德轴承", "精密轴承", "工业轴承", "ball bearings", "roller bearings", "深沟球轴承", "滚子轴承"],
  authors: [{ name: "ANDE Precision Bearing Technology Co., Ltd." }],
  creator: "ANDE Precision Bearing Technology Co., Ltd.",
  publisher: "ANDE Precision Bearing Technology Co., Ltd.",
  icons: {
    icon: [
      { url: '/images/company_log.png', type: 'image/png' }
    ]
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    title: "Ande Precision Bearing | 安德精工轴承",
    description: "Precision Bearings for Every Industry | 为各行业提供高质量精密轴承",
    siteName: "Ande Precision Bearing",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ANDE - Precision Bearing Technology Co., Ltd. logo and products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ande Precision Bearing | 安德精工轴承",
    description: "Precision Bearings for Every Industry | 为各行业提供高质量精密轴承",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://ande-bearing.com", // Replace with your actual domain
    languages: {
      'en': 'https://ande-bearing.com/en',
      'zh': 'https://ande-bearing.com/zh',
    },
  },
  verification: {
    google: "google-site-verification-code", // Replace with your actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DynamicHtmlLang>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        <LanguageProvider>
          <DynamicTitle />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </DynamicHtmlLang>
  );
}
