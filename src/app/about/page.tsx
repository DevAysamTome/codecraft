'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Users, Target, Award, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function AboutPage() {
  const { t } = useTranslation('common');

  const values = [
    {
      icon: Users,
      title: t('about.values.teamwork', 'Teamwork'),
      description: t(
        'about.values.teamworkDesc',
        'We believe in the power of collaboration and working together towards common goals.'
      ),
    },
    {
      icon: Target,
      title: t('about.values.innovation', 'Innovation'),
      description: t(
        'about.values.innovationDesc',
        'We constantly seek new ways to solve problems and create better solutions.'
      ),
    },
    {
      icon: Award,
      title: t('about.values.quality', 'Quality'),
      description: t(
        'about.values.qualityDesc',
        'We are committed to delivering the highest quality solutions that exceed expectations.'
      ),
    },
    {
      icon: Clock,
      title: t('about.values.reliability', 'Reliability'),
      description: t(
        'about.values.reliabilityDesc',
        'We deliver on time and maintain long-term relationships with our clients.'
      ),
    },
  ];

  const team = [
    {
      name: 'Ahmed Hassan',
      role: t('about.team.ceo', 'CEO & Founder'),
      image: '/api/placeholder/300/300',
      description: t(
        'about.team.ceoDesc',
        '10+ years in software development and business strategy.'
      ),
    },
    {
      name: 'Sarah Johnson',
      role: t('about.team.cto', 'CTO'),
      image: '/api/placeholder/300/300',
      description: t(
        'about.team.ctoDesc',
        'Expert in full-stack development and system architecture.'
      ),
    },
    {
      name: 'Mohammed Ali',
      role: t('about.team.leadDesigner', 'Lead Designer'),
      image: '/api/placeholder/300/300',
      description: t(
        'about.team.leadDesignerDesc',
        'Creative designer with expertise in UI/UX and brand identity.'
      ),
    },
    {
      name: 'Emily Chen',
      role: t('about.team.projectManager', 'Project Manager'),
      image: '/api/placeholder/300/300',
      description: t(
        'about.team.projectManagerDesc',
        'Experienced in managing complex projects and client relationships.'
      ),
    },
  ];

  const stats = [
    {
      number: '50+',
      label: t('about.stats.projects', 'Projects Completed'),
      icon: CheckCircle,
    },
    {
      number: '30+',
      label: t('about.stats.clients', 'Happy Clients'),
      icon: Users,
    },
    {
      number: '5+',
      label: t('about.stats.years', 'Years Experience'),
      icon: Award,
    },
    {
      number: '24/7',
      label: t('about.stats.support', 'Support Available'),
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('about.ourStory', 'Our Story')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('about.description')}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                {t(
                  'about.additionalInfo',
                  'Founded in 2019, Code Craft Technology has grown from a small startup to a trusted technology partner for businesses worldwide. We specialize in creating digital solutions that drive growth and innovation.'
                )}
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t('about.mission')}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {t('about.missionText')}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t('about.vision')}
              </h3>
              <p className="text-lg text-gray-600">{t('about.visionText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.ourNumbers', 'Our Numbers')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('about.numbersDesc', "The impact we've made over the years")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.ourValues', 'Our Values')}
            </h2>
            <p className="text-xl text-gray-600">
              {t(
                'about.valuesDesc',
                'The principles that guide everything we do'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.ourTeam', 'Meet Our Team')}
            </h2>
            <p className="text-xl text-gray-600">
              {t(
                'about.teamDesc',
                'The talented individuals behind our success'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600">{member.description}</p>
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
            {t('about.workWithUs', 'Ready to Work With Us?')}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {t(
              'about.workWithUsDesc',
              "Let's discuss your project and see how we can help bring your vision to life."
            )}
          </p>
          <Button variant="secondary" size="lg">
            {t('nav.contact')}
          </Button>
        </div>
      </section>
    </div>
  );
}
