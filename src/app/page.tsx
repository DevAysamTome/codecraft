'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Code,
  Smartphone,
  Palette,
  Users,
  CheckCircle,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function Home() {
  const { t } = useTranslation('common');

  const services = [
    {
      icon: Code,
      title: t('services.webDevelopment'),
      description:
        'Modern, responsive websites built with the latest technologies',
    },
    {
      icon: Smartphone,
      title: t('services.mobileDevelopment'),
      description: 'Native and cross-platform mobile applications',
    },
    {
      icon: Palette,
      title: t('services.uiUxDesign'),
      description: 'Beautiful, user-centered design solutions',
    },
    {
      icon: Users,
      title: t('services.consulting'),
      description: 'Strategic technology consulting and planning',
    },
  ];

  const features = [
    t('home.features.customWeb', 'Custom Web Applications'),
    t('home.features.mobileApp', 'Mobile App Development'),
    t('home.features.uiUx', 'UI/UX Design'),
    t('home.features.consulting', 'Technology Consulting'),
    t('home.features.maintenance', 'Maintenance & Support'),
    t('home.features.support', '24/7 Customer Service'),
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="group">
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                {t('hero.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600">{t('services.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('home.whyChoose', 'Why Choose Code Craft?')}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t(
                  'home.whyChooseDesc',
                  'We combine technical expertise with creative vision to deliver solutions that exceed expectations.'
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('home.readyToStart', 'Ready to Get Started?')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t(
                  'home.readyToStartDesc',
                  "Let's discuss your project and see how we can help bring your vision to life."
                )}
              </p>
              <Button variant="primary" size="lg" className="w-full">
                {t('home.requestQuote', 'Request a Quote')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('home.transformBusiness', 'Ready to Transform Your Business?')}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {t(
              'home.transformBusinessDesc',
              "Let's work together to create something amazing. Get in touch today."
            )}
          </p>
          <Button variant="secondary" size="lg">
            {t('home.getStartedToday', 'Get Started Today')}
          </Button>
        </div>
      </section>
    </div>
  );
}
