import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// This function is not needed anymore as we're using a static PNG file
// The icon is now defined in the layout.tsx metadata
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src="/favicon.png" width="32" height="32" alt="ADB Logo" />
      </div>
    ),
    {
      ...size,
    }
  );
} 