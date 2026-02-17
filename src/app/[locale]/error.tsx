'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Page Error]', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong</h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        An unexpected error occurred. Please try again or contact us if the problem persists.
      </p>
      <button
        onClick={reset}
        className="bg-blue-800 text-white px-8 py-3 rounded font-semibold hover:bg-blue-900 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}