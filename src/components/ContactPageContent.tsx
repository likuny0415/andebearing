"use client";

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPageContent() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('contact.title')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('home.contact.getInTouch')}</h2>
          <p className="text-gray-700 mb-6">
            {t('contact.subtitle')}
          </p>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">{t('contact.locations.headquarters.title')}</h3>
            <p className="text-gray-700">
              {t('contact.locations.headquarters.address').split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">{t('contact.info.title')}</h3>
            <p className="text-gray-700 mb-2">
              <strong>{t('contact.info.phone')}:</strong> <a href={`tel:${t('contact.locations.headquarters.phone')}`} className="text-blue-600 hover:text-blue-800">{t('contact.locations.headquarters.phone')}</a>
            </p>
            <p className="text-gray-700 mb-2">
              <strong>{t('contact.info.email')}:</strong> {t('contact.locations.headquarters.email')}
            </p>
            <p className="text-gray-700">
              <strong>{t('contact.info.businessHours')}:</strong><br />
              {t('contact.info.businessHoursDetails').split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('home.contact.sendUsMessage')}</h2>
          
          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {t('common.thankYou')}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1">{t('contact.form.name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  suppressHydrationWarning
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">{t('contact.form.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  suppressHydrationWarning
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-gray-700 mb-1">{t('contact.form.company')}</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  suppressHydrationWarning
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1">{t('contact.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  suppressHydrationWarning
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                suppressHydrationWarning
              >
                {isSubmitting ? t('common.sending') : t('common.sendMessage')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 