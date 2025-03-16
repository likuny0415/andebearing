"use client";

import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function DynamicTitle() {
  const { language, t } = useLanguage();

  useEffect(() => {
    // Update the document title based on the current language
    document.title = t('metadata.title');
  }, [language, t]);

  // This component doesn't render anything
  return null;
} 