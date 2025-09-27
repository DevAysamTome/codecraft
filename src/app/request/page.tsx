'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import ServiceRequestForm from '@/components/forms/ServiceRequestForm';

export default function RequestPage() {
  const { t: _t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceRequestForm />
      </div>
    </div>
  );
}
