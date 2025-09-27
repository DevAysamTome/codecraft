'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Code,
  Smartphone,
  Palette,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ServicesPage() {
  const { t, ready } = useTranslation('common');

  // Show loading state if translations aren't ready
  if (!ready) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const services = [
    {
      icon: Code,
      title: t('services.webDevelopment'),
      description: t(
        'services.webDevelopmentDesc',
        'Modern, responsive websites built with the latest technologies including React, Next.js, and Node.js.'
      ),
      features: [
        'Responsive Web Design',
        'E-commerce Solutions',
        'Content Management Systems',
        'API Development',
        'Database Integration',
        'Performance Optimization',
      ],
    },
    {
      icon: Smartphone,
      title: t('services.mobileDevelopment'),
      description: t(
        'services.mobileDevelopmentDesc',
        'Native and cross-platform mobile applications for iOS and Android.'
      ),
      features: [
        'iOS App Development',
        'Android App Development',
        'Cross-platform Solutions',
        'App Store Optimization',
        'Push Notifications',
        'Offline Functionality',
      ],
    },
    {
      icon: Palette,
      title: t('services.uiUxDesign'),
      description: t(
        'services.uiUxDesignDesc',
        'Beautiful, user-centered design solutions that enhance user experience.'
      ),
      features: [
        'User Interface Design',
        'User Experience Research',
        'Prototyping & Wireframing',
        'Brand Identity Design',
        'Design Systems',
        'Usability Testing',
      ],
    },
    {
      icon: Users,
      title: t('services.consulting'),
      description: t(
        'services.consultingDesc',
        'Strategic technology consulting and planning to help your business grow.'
      ),
      features: [
        'Technology Strategy',
        'Digital Transformation',
        'System Architecture',
        'Process Optimization',
        'Team Training',
        'Technical Audits',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('services.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('services.ctaTitle', 'Ready to Get Started?')}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {t(
              'services.ctaDescription',
              "Let's discuss your project and see how we can help bring your vision to life."
            )}
          </p>
          <Button variant="secondary" size="lg" className="group">
            {t('nav.request')}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
}
