import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.beirenbearing.online/'; // Replace with your actual domain

  // Define your routes
  const routes = [
    '',
    '/products',
    '/industries',
    '/services',
    '/about',
    '/contact',
  ];

  // Create sitemap entries for both English and Chinese versions
  const sitemap: MetadataRoute.Sitemap = [];

  // Add English routes
  routes.forEach(route => {
    sitemap.push({
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    });
  });

  // Add Chinese routes
  routes.forEach(route => {
    sitemap.push({
      url: `${baseUrl}/zh${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    });
  });

  return sitemap;
} 