'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';

export default function TestPage() {
  const { t, i18n } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Translation and Button Test Page
        </h1>

        <div className="space-y-6">
          {/* Translation Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Translation Test</h2>
            <div className="space-y-2">
              <p>
                <strong>Current Language:</strong> {i18n.language}
              </p>
              <p>
                <strong>Services Title:</strong> {t('services.title')}
              </p>
              <p>
                <strong>Services Subtitle:</strong> {t('services.subtitle')}
              </p>
              <p>
                <strong>Hero Title:</strong> {t('hero.title')}
              </p>
              <p>
                <strong>Hero Subtitle:</strong> {t('hero.subtitle')}
              </p>
            </div>
          </div>

          {/* Button Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Button Test</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="sm">
                Primary Small
              </Button>
              <Button variant="primary" size="md">
                Primary Medium
              </Button>
              <Button variant="primary" size="lg">
                Primary Large
              </Button>
              <Button variant="secondary" size="md">
                Secondary
              </Button>
              <Button variant="outline" size="md">
                Outline
              </Button>
              <Button variant="ghost" size="md">
                Ghost
              </Button>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Language Switcher</h2>
            <div className="flex gap-4">
              <Button
                variant={i18n.language === 'en' ? 'primary' : 'outline'}
                onClick={() => i18n.changeLanguage('en')}
              >
                English
              </Button>
              <Button
                variant={i18n.language === 'ar' ? 'primary' : 'outline'}
                onClick={() => i18n.changeLanguage('ar')}
              >
                العربية
              </Button>
            </div>
          </div>

          {/* RTL Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">RTL Test</h2>
            <div className="space-y-2">
              <p>
                <strong>Direction:</strong>{' '}
                {i18n.language === 'ar' ? 'RTL' : 'LTR'}
              </p>
              <p>
                <strong>Font:</strong>{' '}
                {i18n.language === 'ar' ? 'Tajawal' : 'Poppins'}
              </p>
              <div className="flex gap-4">
                <span className="bg-blue-100 px-3 py-1 rounded">Left</span>
                <span className="bg-green-100 px-3 py-1 rounded">Center</span>
                <span className="bg-red-100 px-3 py-1 rounded">Right</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
