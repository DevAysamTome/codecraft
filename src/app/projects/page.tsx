'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ProjectsPage() {
  const { t } = useTranslation('common');

  const projects = [
    {
      title: 'E-commerce Platform',
      description: t(
        'projects.ecommerceDesc',
        'A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.'
      ),
      image: '/api/placeholder/600/400',
      techStack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      title: 'Mobile Banking App',
      description: t(
        'projects.bankingDesc',
        'A secure mobile banking application with biometric authentication and real-time transactions.'
      ),
      image: '/api/placeholder/600/400',
      techStack: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      title: 'Healthcare Management System',
      description: t(
        'projects.healthcareDesc',
        'A comprehensive healthcare management system for patient records and appointment scheduling.'
      ),
      image: '/api/placeholder/600/400',
      techStack: ['React', 'Express.js', 'MySQL', 'Docker'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      title: 'Learning Management System',
      description: t(
        'projects.lmsDesc',
        'An online learning platform with video streaming, quizzes, and progress tracking.'
      ),
      image: '/api/placeholder/600/400',
      techStack: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      title: 'Real Estate Portal',
      description: t(
        'projects.realEstateDesc',
        'A property listing platform with advanced search, virtual tours, and agent management.'
      ),
      image: '/api/placeholder/600/400',
      techStack: ['Angular', 'NestJS', 'MongoDB', 'Cloudinary'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      title: 'Food Delivery App',
      description: t(
        'projects.foodDeliveryDesc',
        'A food delivery application with real-time tracking, payment integration, and restaurant management.'
      ),
      image: '/api/placeholder/600/400',
      techStack: ['Flutter', 'Firebase', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('projects.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('projects.featured', 'Featured Projects')}
            </h2>
            <p className="text-xl text-gray-600">
              {t(
                'projects.featuredDesc',
                'Our most impactful and innovative solutions'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gray-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{project.description}</p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      {t('projects.techStack')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="primary" size="sm" className="group">
                      {t('projects.liveDemo')}
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="sm" className="group">
                      <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('projects.other', 'More Projects')}
            </h2>
            <p className="text-xl text-gray-600">
              {t(
                'projects.otherDesc',
                'Additional projects showcasing our diverse expertise'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gray-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      {t('projects.viewProject')}
                    </Button>
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
            {t('projects.ctaTitle', 'Have a Project in Mind?')}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {t(
              'projects.ctaDescription',
              "Let's work together to create something amazing. Get in touch today."
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
