'use client';

import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Upload,
  Search,
  Grid,
  List,
  Trash2,
  Download,
  Eye,
  Image as ImageIcon,
  File,
} from 'lucide-react';
import Image from 'next/image';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
  uploadedAt: string;
  alt?: string;
}

export default function AdminMediaPage() {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch media files
  const { data: mediaFiles, isLoading } = useQuery({
    queryKey: ['admin-media'],
    queryFn: async () => {
      // This would typically fetch from your media API
      return [
        {
          id: '1',
          name: 'hero-image.jpg',
          url: '/api/placeholder/400/300',
          type: 'image',
          size: '2.4 MB',
          uploadedAt: '2024-01-15',
          alt: 'Hero section image',
        },
        {
          id: '2',
          name: 'project-screenshot.png',
          url: '/api/placeholder/400/300',
          type: 'image',
          size: '1.8 MB',
          uploadedAt: '2024-01-14',
          alt: 'Project screenshot',
        },
        {
          id: '3',
          name: 'company-logo.svg',
          url: '/api/placeholder/400/300',
          type: 'image',
          size: '45 KB',
          uploadedAt: '2024-01-13',
          alt: 'Company logo',
        },
      ];
    },
  });

  // Delete media files
  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      // This would typically call your delete API
      console.log('Deleting files:', ids);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
      setSelectedFiles([]);
    },
  });

  const filteredFiles =
    mediaFiles?.filter((file: MediaFile) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    // Simulate upload process
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/uploads', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }

    setIsUploading(false);
    queryClient.invalidateQueries({ queryKey: ['admin-media'] });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectFile = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map((file: MediaFile) => file.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedFiles.length > 0) {
      if (
        confirm(
          `Are you sure you want to delete ${selectedFiles.length} file(s)?`
        )
      ) {
        deleteMutation.mutate(selectedFiles);
      }
    }
  };

  const getFileIcon = (type: string) => {
    if (type === 'image') {
      return <ImageIcon className="h-6 w-6 text-blue-600" />;
    }
    return <File className="h-6 w-6 text-gray-600" />;
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
              {t('admin.media')}
            </h1>
            <p className="text-gray-600">Manage your media files and assets</p>
          </div>
          <div className="flex items-center space-x-4">
            {selectedFiles.length > 0 && (
              <Button
                variant="outline"
                onClick={handleDeleteSelected}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete ({selectedFiles.length})
              </Button>
            )}
            <Button
              variant="primary"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Upload Files'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Filters and Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search media files..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${
                      viewMode === 'grid'
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${
                      viewMode === 'list'
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {filteredFiles.length > 0 && (
                  <button
                    onClick={handleSelectAll}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    {selectedFiles.length === filteredFiles.length
                      ? 'Deselect All'
                      : 'Select All'}
                  </button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media Files */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFiles.map((file: MediaFile) => (
              <Card
                key={file.id}
                className={`cursor-pointer transition-all ${
                  selectedFiles.includes(file.id)
                    ? 'ring-2 ring-primary-500 bg-primary-50'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => handleSelectFile(file.id)}
              >
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  {file.type === 'image' ? (
                    <Image
                      src={file.url}
                      alt={file.alt || file.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 truncate mb-1">
                    {file.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {file.size} • {file.uploadedAt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedFiles.length === filteredFiles.length &&
                            filteredFiles.length > 0
                          }
                          onChange={handleSelectAll}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Uploaded
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFiles.map((file: MediaFile) => (
                      <tr
                        key={file.id}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedFiles.includes(file.id) ? 'bg-primary-50' : ''
                        }`}
                        onClick={() => handleSelectFile(file.id)}
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.id)}
                            onChange={() => handleSelectFile(file.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {file.type === 'image' ? (
                                <Image
                                  src={file.url}
                                  alt={file.alt || file.name}
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 rounded object-cover"
                                />
                              ) : (
                                <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                                  {getFileIcon(file.type)}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {file.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {file.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {file.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {file.uploadedAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Download className="h-4 w-4" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={e => {
                                e.stopPropagation();
                                if (
                                  confirm(
                                    'Are you sure you want to delete this file?'
                                  )
                                ) {
                                  deleteMutation.mutate([file.id]);
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredFiles.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Upload className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No media files found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? 'Try adjusting your search criteria.'
                  : 'Get started by uploading your first file.'}
              </p>
              {!searchTerm && (
                <Button
                  variant="primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Files
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
