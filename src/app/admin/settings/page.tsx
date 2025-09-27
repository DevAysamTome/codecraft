'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Globe, Mail, Shield, Palette } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

export default function AdminSettingsPage() {
  const { t } = useTranslation('common');
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Code Craft Technology',
    siteDescription: 'Building digital solutions for tomorrow',
    contactEmail: 'hello@codecraft.tech',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Tech Street, Digital City, DC 12345',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
    seo: {
      metaTitle: 'Code Craft Technology - Digital Solutions',
      metaDescription:
        'We create innovative web applications, mobile apps, and digital solutions.',
      keywords: 'web development, mobile development, UI/UX design',
    },
    appearance: {
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      logoUrl: '/logo.png',
    },
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    // Show success message
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('admin.settings')}
            </h1>
            <p className="text-gray-600">
              Manage your website settings and configuration
            </p>
          </div>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              General Settings
            </h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <Input
                  value={settings.siteName}
                  onChange={e =>
                    setSettings(prev => ({ ...prev, siteName: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <Input
                  value={settings.contactEmail}
                  onChange={e =>
                    setSettings(prev => ({
                      ...prev,
                      contactEmail: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Description
              </label>
              <Textarea
                value={settings.siteDescription}
                onChange={e =>
                  setSettings(prev => ({
                    ...prev,
                    siteDescription: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Contact Information
            </h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  value={settings.contactPhone}
                  onChange={e =>
                    setSettings(prev => ({
                      ...prev,
                      contactPhone: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <Input
                  value={settings.address}
                  onChange={e =>
                    setSettings(prev => ({ ...prev, address: e.target.value }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Social Media Links
            </h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <Input
                  value={settings.socialMedia.facebook}
                  onChange={e =>
                    handleInputChange('socialMedia', 'facebook', e.target.value)
                  }
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter
                </label>
                <Input
                  value={settings.socialMedia.twitter}
                  onChange={e =>
                    handleInputChange('socialMedia', 'twitter', e.target.value)
                  }
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <Input
                  value={settings.socialMedia.linkedin}
                  onChange={e =>
                    handleInputChange('socialMedia', 'linkedin', e.target.value)
                  }
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <Input
                  value={settings.socialMedia.instagram}
                  onChange={e =>
                    handleInputChange(
                      'socialMedia',
                      'instagram',
                      e.target.value
                    )
                  }
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              SEO Settings
            </h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title
              </label>
              <Input
                value={settings.seo.metaTitle}
                onChange={e =>
                  handleInputChange('seo', 'metaTitle', e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <Textarea
                value={settings.seo.metaDescription}
                onChange={e =>
                  handleInputChange('seo', 'metaDescription', e.target.value)
                }
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords
              </label>
              <Input
                value={settings.seo.keywords}
                onChange={e =>
                  handleInputChange('seo', 'keywords', e.target.value)
                }
                placeholder="web development, mobile development, UI/UX design"
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Palette className="mr-2 h-5 w-5" />
              Appearance
            </h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={e =>
                      handleInputChange(
                        'appearance',
                        'primaryColor',
                        e.target.value
                      )
                    }
                    className="w-12 h-10 rounded border border-gray-300"
                  />
                  <Input
                    value={settings.appearance.primaryColor}
                    onChange={e =>
                      handleInputChange(
                        'appearance',
                        'primaryColor',
                        e.target.value
                      )
                    }
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.appearance.secondaryColor}
                    onChange={e =>
                      handleInputChange(
                        'appearance',
                        'secondaryColor',
                        e.target.value
                      )
                    }
                    className="w-12 h-10 rounded border border-gray-300"
                  />
                  <Input
                    value={settings.appearance.secondaryColor}
                    onChange={e =>
                      handleInputChange(
                        'appearance',
                        'secondaryColor',
                        e.target.value
                      )
                    }
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo URL
                </label>
                <Input
                  value={settings.appearance.logoUrl}
                  onChange={e =>
                    handleInputChange('appearance', 'logoUrl', e.target.value)
                  }
                  placeholder="/logo.png"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
