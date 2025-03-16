"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface DynamicHtmlLangProps {
  children: ReactNode;
}

export default function DynamicHtmlLang({ children }: DynamicHtmlLangProps) {
  const pathname = usePathname();
  const lang = pathname?.startsWith('/zh') ? 'zh' : 'en';

  return (
    <html lang={lang}>
      {children}
    </html>
  );
} 