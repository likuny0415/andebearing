'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircleIcon } from '@/components/Icons';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', country: '', phone: '',
    productInterest: '', bearingModel: '', bearingSize: '',
    quantity: '', application: '', incoterms: '', message: '',
    honeypot: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name, email: formData.email, company: formData.company,
          country: formData.country, phone: formData.phone,
          productInterest: formData.productInterest, bearingModel: formData.bearingModel,
          bearingSize: formData.bearingSize, quantity: formData.quantity,
          application: formData.application, incoterms: formData.incoterms,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', country: '', phone: '', productInterest: '', bearingModel: '', bearingSize: '', quantity: '', application: '', incoterms: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <p className="text-green-800 font-medium text-lg">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
      <h2 className="text-xl font-bold text-gray-900 mb-1">{t('title')}</h2>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">{t('error')}</div>
      )}

      {/* Honeypot */}
      <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {/* Section: Contact Details */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('sectionContact')}</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('name')} *</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('email')} *</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">{t('company')} *</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">{t('country')} *</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t('phone')}</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
        </div>
      </fieldset>

      {/* Section: Product & Technical Details */}
      <fieldset className="space-y-4 border-t border-gray-100 pt-4">
        <legend className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('sectionProduct')}</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="productInterest" className="block text-sm font-medium text-gray-700 mb-1">{t('productInterest')}</label>
            <select id="productInterest" name="productInterest" value={formData.productInterest} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
              <option value="">{t('selectProduct')}</option>
              <option value="ball-bearings">Ball Bearings / 球轴承</option>
              <option value="roller-bearings">Roller Bearings / 滚子轴承</option>
              <option value="linear-motion">Linear Motion / 直线运动</option>
              <option value="mounted-units">Mounted Units / 带座轴承</option>
              <option value="accessories">Accessories / 配件</option>
              <option value="custom">Custom / Drawing-based</option>
            </select>
          </div>
          <div>
            <label htmlFor="bearingModel" className="block text-sm font-medium text-gray-700 mb-1">{t('bearingModel')}</label>
            <input type="text" id="bearingModel" name="bearingModel" value={formData.bearingModel} onChange={handleChange} placeholder="e.g. 6205-2RS, 22316 E"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
          <div>
            <label htmlFor="bearingSize" className="block text-sm font-medium text-gray-700 mb-1">{t('bearingSize')}</label>
            <input type="text" id="bearingSize" name="bearingSize" value={formData.bearingSize} onChange={handleChange} placeholder="e.g. 25 x 62 x 17 mm"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
          <div>
            <label htmlFor="application" className="block text-sm font-medium text-gray-700 mb-1">{t('application')}</label>
            <input type="text" id="application" name="application" value={formData.application} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
        </div>
      </fieldset>

      {/* Section: Order Details */}
      <fieldset className="space-y-4 border-t border-gray-100 pt-4">
        <legend className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('sectionOrder')}</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">{t('quantity')}</label>
            <input type="text" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="e.g. 500 pcs, Q2 2025"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
          <div>
            <label htmlFor="incoterms" className="block text-sm font-medium text-gray-700 mb-1">{t('incoterms')}</label>
            <select id="incoterms" name="incoterms" value={formData.incoterms} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
              <option value="">{t('selectIncoterms')}</option>
              <option value="fob">{t('incotermsOptions.fob')}</option>
              <option value="cif">{t('incotermsOptions.cif')}</option>
              <option value="cfr">{t('incotermsOptions.cfr')}</option>
              <option value="ddp">{t('incotermsOptions.ddp')}</option>
              <option value="exw">{t('incotermsOptions.exw')}</option>
              <option value="other">{t('incotermsOptions.other')}</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* Message */}
      <div className="border-t border-gray-100 pt-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t('message')}</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Part numbers, custom specs, packaging requirements, delivery schedule..." />
      </div>

      <p className="text-xs text-gray-500">{t('privacyNote')}</p>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-blue-800 text-white py-3 rounded font-semibold hover:bg-blue-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}