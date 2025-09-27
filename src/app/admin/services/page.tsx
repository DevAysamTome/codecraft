'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Service {
  _id: string;
  title: string;
  summary: string;
  startingPrice?: number;
  categories?: string[];
  slug: string;
}

export default function AdminServices() {
  const { t: _t } = useTranslation('common');
  const [_isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [_editingService, setEditingService] = useState(null);
  const queryClient = useQueryClient();

  // Fetch services
  const { data: servicesData, isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const res = await fetch('/api/services');
      return res.json();
    },
  });

  // Delete service mutation
  const deleteServiceMutation = useMutation({
    mutationFn: async (slug: string) => {
      const res = await fetch(`/api/services/${slug}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete service');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
    },
  });

  const handleDelete = (slug: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      deleteServiceMutation.mutate(slug);
    }
  };

  const services = servicesData?.services || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Services Management
            </h1>
            <p className="text-gray-600">Manage your services and offerings</p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Service</span>
          </Button>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: Service) => (
              <Card
                key={service._id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {service.summary}
                      </p>
                      {service.startingPrice && (
                        <p className="text-primary-600 font-medium">
                          Starting from ${service.startingPrice}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.categories?.map(
                      (category: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {category}
                        </span>
                      )
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingService(service)}
                      className="flex items-center space-x-1"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(service.slug)}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {services.length === 0 && !isLoading && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No services found
                </h3>
                <p className="text-gray-500 mb-4">
                  Get started by creating your first service.
                </p>
                <Button
                  variant="primary"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Service</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
