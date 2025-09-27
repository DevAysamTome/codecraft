'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  Image,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Globe,
  ChevronDown,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { useRTL } from '@/hooks/useRTL';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { data: _session } = useSession();
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const { isRTL, direction } = useRTL();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const navigation = [
    { name: t('admin.dashboard'), href: '/admin', icon: LayoutDashboard },
    { name: t('admin.services'), href: '/admin/services', icon: FileText },
    { name: t('admin.projects'), href: '/admin/projects', icon: FileText },
    { name: t('admin.requests'), href: '/admin/requests', icon: FileText },
    { name: t('admin.media'), href: '/admin/media', icon: Image },
    { name: t('admin.users'), href: '/admin/users', icon: Users },
    { name: t('admin.settings'), href: '/admin/settings', icon: Settings },
  ];

  const handleSignOut = () => {
    // Clear mock session and redirect to login
    localStorage.removeItem('admin-session');
    router.push('/admin/login');
  };

  const toggleLanguage = (locale: string) => {
    i18n.changeLanguage(locale);
    setIsLangOpen(false);
  };

  // Check for mock session
  interface MockSession {
    user: {
      name: string;
      email?: string;
    };
    // any other fields you store in localStorage
  }
  const [mockSession, setMockSession] = React.useState<MockSession | null>(
    null
  );

  React.useEffect(() => {
    const storedSession = localStorage.getItem('admin-session');
    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession);
        setMockSession(parsedSession);
      } catch (_error) {
        localStorage.removeItem('admin-session');
        router.push('/admin/login');
      }
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  if (!mockSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}
      dir={direction}
    >
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white ${isRTL ? 'ml-auto' : 'mr-auto'}`}
        >
          <div
            className={`absolute top-0 ${isRTL ? 'left-0 -ml-12' : 'right-0 -mr-12'} pt-2`}
          >
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold text-gray-900">
                {t('admin.dashboard')}
              </h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${
                    isRTL ? 'flex-row-reverse' : ''
                  }`}
                >
                  <item.icon className={`${isRTL ? 'ml-4' : 'mr-4'} h-6 w-6`} />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div
            className={`flex flex-col h-0 flex-1 ${isRTL ? 'border-l' : 'border-r'} border-gray-200 bg-white`}
          >
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-gray-900">
                  {t('admin.dashboard')}
                </h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${
                      isRTL ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <item.icon
                      className={`${isRTL ? 'ml-3' : 'mr-3'} h-5 w-5`}
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`${isRTL ? 'lg:pr-64' : 'lg:pl-64'} flex flex-col flex-1`}
      >
        {/* Top navigation */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
          <button
            type="button"
            className={`px-4 ${isRTL ? 'border-l' : 'border-r'} border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden`}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  {t('admin.search', 'Search')}
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div
                    className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} flex items-center pointer-events-none`}
                  >
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    id="search-field"
                    className={`block w-full h-full ${isRTL ? 'pr-8 pl-3' : 'pl-8 pr-3'} py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent`}
                    placeholder={t('admin.search', 'Search...')}
                    type="search"
                    name="search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div
              className={`${isRTL ? 'mr-4' : 'ml-4'} flex items-center ${isRTL ? 'md:mr-6' : 'md:ml-6'}`}
            >
              {/* Language Switcher */}
              <div className="relative mr-3">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>{i18n.language.toUpperCase()}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>

                {isLangOpen && (
                  <div
                    className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-20 bg-white rounded-md shadow-lg border border-gray-200 z-10`}
                  >
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

              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Bell className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <div className={`${isRTL ? 'mr-3' : 'ml-3'} relative`}>
                <div
                  className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}
                >
                  <div className="text-sm">
                    <p className="text-gray-700 font-medium">
                      {mockSession.user?.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {mockSession.user?.email}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className={`flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('admin.logout')}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
