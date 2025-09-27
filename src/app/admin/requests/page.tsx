'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, CheckCircle, Clock, X } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Request {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  budgetRange?: string;
  deadline?: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminRequests() {
  const { t: _t } = useTranslation('common');
  const [_selectedRequest, setSelectedRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const queryClient = useQueryClient();

  // Fetch requests
  const { data: requestsData, isLoading } = useQuery({
    queryKey: ['admin-requests', statusFilter],
    queryFn: async () => {
      const url =
        statusFilter === 'all'
          ? '/api/requests'
          : `/api/requests?status=${statusFilter}`;
      const res = await fetch(url);
      return res.json();
    },
  });

  // Update request status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/requests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update request');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-requests'] });
    },
  });

  const handleStatusUpdate = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const requests = requestsData?.requests || [];

  const statusOptions = [
    { value: 'all', label: 'All Requests' },
    { value: 'new', label: 'New' },
    { value: 'in-review', label: 'In Review' },
    { value: 'quoted', label: 'Quoted' },
    { value: 'closed', label: 'Closed' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-orange-100 text-orange-800';
      case 'in-review':
        return 'bg-blue-100 text-blue-800';
      case 'quoted':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Service Requests
            </h1>
            <p className="text-gray-600">Manage and track service requests</p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    statusFilter === option.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requests List */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request: Request) => (
              <Card
                key={request._id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {request.name}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                        >
                          {request.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <p>
                            <strong>Email:</strong> {request.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {request.phone}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Company:</strong> {request.company || 'N/A'}
                          </p>
                          <p>
                            <strong>Budget:</strong>{' '}
                            {request.budgetRange || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Deadline:</strong>{' '}
                            {request.deadline
                              ? new Date(request.deadline).toLocaleDateString()
                              : 'N/A'}
                          </p>
                          <p>
                            <strong>Submitted:</strong>{' '}
                            {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-gray-700">
                          <strong>Message:</strong> {request.message}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRequest(request)}
                        className="flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </Button>
                      <div className="flex space-x-1">
                        {request.status === 'new' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleStatusUpdate(request._id, 'in-review')
                            }
                            className="flex items-center space-x-1"
                          >
                            <Clock className="h-4 w-4" />
                            <span>Review</span>
                          </Button>
                        )}
                        {request.status === 'in-review' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleStatusUpdate(request._id, 'quoted')
                            }
                            className="flex items-center space-x-1"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Quote</span>
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusUpdate(request._id, 'closed')
                          }
                          className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                          <span>Close</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {requests.length === 0 && !isLoading && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No requests found
                </h3>
                <p className="text-gray-500">
                  No service requests match your current filter.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
