'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';
import Button from '@/components/ui/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  const toggleLanguage = (locale: string) => {
    i18n.changeLanguage(locale);
    setIsLangOpen(false);
    // Update the URL to reflect the language change
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/[a-z]{2}\//, `/${locale}/`);
    router.push(newPath);
  };

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">
                Code Craft
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>{i18n.language.toUpperCase()}</span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-20 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      i18n.language === 'en'
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => toggleLanguage('ar')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      i18n.language === 'ar'
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700'
                    }`}
                  >
                    AR
                  </button>
                </div>
              )}
            </div>

            <Link href="/request">
              <Button variant="primary" size="sm">
                {t('nav.request')}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="px-3 py-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`px-3 py-1 text-sm rounded ${
                      i18n.language === 'en'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => toggleLanguage('ar')}
                    className={`px-3 py-1 text-sm rounded ${
                      i18n.language === 'ar'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    AR
                  </button>
                </div>
              </div>

              <div className="px-3 py-2">
                <Link href="/request">
                  <Button variant="primary" size="sm" className="w-full">
                    {t('nav.request')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
