export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f9fafb' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: '#111827', marginBottom: '0.5rem' }}>404 — Page Not Found</h1>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <a href="/" style={{ background: '#1e40af', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: 600 }}>
            Go to Homepage
          </a>
        </div>
      </body>
    </html>
  );
}
