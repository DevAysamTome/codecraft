'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface Project {
  _id: string;
  title: string;
  description: string;
  published: boolean;
  techStack?: string[];
  image?: string;
}

export default function AdminProjectsPage() {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [_showAddModal, setShowAddModal] = useState(false);

  // Fetch projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      const data = await res.json();
      return data.projects || [];
    },
  });

  // Toggle project published status
  const togglePublishedMutation = useMutation({
    mutationFn: async ({
      id,
      published,
    }: {
      id: string;
      published: boolean;
    }) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
    },
  });

  // Delete project
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
    },
  });

  const filteredProjects =
    projects?.filter((project: Project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === 'all' ||
        (filterStatus === 'published' && project.published) ||
        (filterStatus === 'draft' && !project.published);
      return matchesSearch && matchesFilter;
    }) || [];

  const handleTogglePublished = (id: string, currentStatus: boolean) => {
    togglePublishedMutation.mutate({ id, published: !currentStatus });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('admin.projects')}
            </h1>
            <p className="text-gray-600">Manage your projects and portfolio</p>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowAddModal(true)}
            className="flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Projects</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: Project) => (
            <Card key={project._id} className="overflow-hidden">
              <div className="aspect-video bg-gray-200">
                <Image
                  src={project.image || '/api/placeholder/400/300'}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2 ml-2">
                    <button
                      onClick={() =>
                        handleTogglePublished(project._id, project.published)
                      }
                      className={`p-1 rounded ${
                        project.published
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {project.published ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.techStack
                    ?.slice(0, 3)
                    .map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  {project.techStack?.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {project.published ? 'Published' : 'Draft'}
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        /* Edit functionality */
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Plus className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by adding your first project.'}
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                  Add Project
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
