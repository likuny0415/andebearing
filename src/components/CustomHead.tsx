"use client";

import Head from 'next/head';

export default function CustomHead() {
  return (
    <Head>
      <link rel="icon" href="/favicon.png" type="image/png" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-icon.png" />
    </Head>
  );
} 