import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="bg-blue-800 text-white px-8 py-3 rounded font-semibold hover:bg-blue-900 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/products"
          className="border-2 border-blue-800 text-blue-800 px-8 py-3 rounded font-semibold hover:bg-blue-50 transition-colors"
        >
          View Products
        </Link>
      </div>
    </div>
  );
}