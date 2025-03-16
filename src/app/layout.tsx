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
  title: "Suzhou Bei Ren Bearing Sales Co., Ltd. | 苏州北人轴承销售有限公司",
  description: "Suzhou Bei Ren Bearing Sales Co., Ltd. provides high-quality precision bearings and related products for automotive, manufacturing, energy, agriculture, and other industries. 苏州北人轴承销售有限公司为汽车、制造业、能源、农业和其他行业提供高质量精密轴承和相关产品。",
  keywords: ["bearings", "Suzhou bearings", "Bei Ren bearings", "precision bearings", "industrial bearings", "轴承", "苏州轴承", "北人轴承", "精密轴承", "工业轴承", "ball bearings", "roller bearings", "深沟球轴承", "滚子轴承"],
  authors: [{ name: "Suzhou Bei Ren Bearing Sales Co., Ltd." }],
  creator: "Suzhou Bei Ren Bearing Sales Co., Ltd.",
  publisher: "Suzhou Bei Ren Bearing Sales Co., Ltd.",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    title: "Suzhou Bei Ren Bearing Sales Co., Ltd. | 苏州北人轴承销售有限公司",
    description: "High-quality precision bearings for every industry | 为各行业提供高质量精密轴承",
    siteName: "Suzhou Bei Ren Bearing Sales Co., Ltd.",
    images: [
      {
        url: "/images/og-image.jpg", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "Suzhou Bei Ren Bearing Sales Co., Ltd. logo and products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suzhou Bei Ren Bearing Sales Co., Ltd. | 苏州北人轴承销售有限公司",
    description: "High-quality precision bearings for every industry | 为各行业提供高质量精密轴承",
    images: ["/images/twitter-image.jpg"], // You'll need to create this image
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
    canonical: "https://beiren-bearing.com", // Replace with your actual domain
    languages: {
      'en': 'https://beiren-bearing.com/en',
      'zh': 'https://beiren-bearing.com/zh',
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
