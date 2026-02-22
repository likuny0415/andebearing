'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to home page for any non-existent page
    router.replace('/');
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <p className="text-lg text-gray-600">Redirecting to home page...</p>
    </div>
  );
}