'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function DebugTranslations() {
  const { t, ready, language } = useTranslation('common');

  const testKeys = [
    'services.title',
    'services.subtitle',
    'services.webDevelopment',
    'services.mobileDevelopment',
    'services.uiUxDesign',
    'services.consulting',
  ];

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="font-bold text-yellow-800 mb-2">Translation Debug</h3>
      <p className="text-sm text-yellow-700 mb-2">
        Ready: {ready ? 'Yes' : 'No'} | Language: {language}
      </p>
      <div className="space-y-1">
        {testKeys.map(key => (
          <div key={key} className="text-sm">
            <span className="font-mono text-yellow-600">{key}:</span>{' '}
            <span className="text-yellow-800">{t(key, `[${key}]`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
