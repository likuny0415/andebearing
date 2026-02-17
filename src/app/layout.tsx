import type { ReactNode } from 'react';

// Root layout: minimal wrapper. Actual HTML/body is in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}