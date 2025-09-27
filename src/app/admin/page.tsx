'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Users, FileText, CheckCircle, TrendingUp, Clock } from 'lucide-react';
// AdminLayout is now provided by layout.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

interface Request {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: string;
}

interface Project {
  _id: string;
  published: boolean;
}

export default function AdminDashboard() {
  const { t: _t } = useTranslation('common');
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
      }
    }
  }, []);

  // Fetch dashboard data
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [requestsRes, servicesRes, projectsRes] = await Promise.all([
        fetch('/api/requests'),
        fetch('/api/services'),
        fetch('/api/projects'),
      ]);

      const [requests, services, projects] = await Promise.all([
        requestsRes.json(),
        servicesRes.json(),
        projectsRes.json(),
      ]);

      return {
        totalRequests: requests.pagination?.total || 0,
        newRequests:
          requests.requests?.filter((r: Request) => r.status === 'new')
            .length || 0,
        totalServices: services.pagination?.total || 0,
        totalProjects: projects.pagination?.total || 0,
        publishedProjects:
          projects.projects?.filter((p: Project) => p.published).length || 0,
      };
    },
  });

  const { data: recentRequests } = useQuery({
    queryKey: ['recent-requests'],
    queryFn: async () => {
      const res = await fetch('/api/requests?limit=5');
      const data = await res.json();
      return data.requests || [];
    },
  });

  const statCards = [
    {
      title: 'Total Requests',
      value: stats?.totalRequests || 0,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'New Requests',
      value: stats?.newRequests || 0,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Services',
      value: stats?.totalServices || 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Published Projects',
      value: stats?.publishedProjects || 0,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {mockSession?.user?.name}
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Service Requests
            </h2>
          </CardHeader>
          <CardContent>
            {recentRequests && recentRequests.length > 0 ? (
              <div className="space-y-4">
                {recentRequests.map((request: Request) => (
                  <div
                    key={request._id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {request.name}
                      </h3>
                      <p className="text-sm text-gray-500">{request.email}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {request.message}
                      </p>
                    </div>
                    <div className="ml-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === 'new'
                            ? 'bg-orange-100 text-orange-800'
                            : request.status === 'in-review'
                              ? 'bg-blue-100 text-blue-800'
                              : request.status === 'quoted'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No recent requests
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/admin/services"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900">Manage Services</h3>
                  <p className="text-sm text-gray-500">Add or edit services</p>
                </div>
              </a>
              <a
                href="/admin/projects"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900">Manage Projects</h3>
                  <p className="text-sm text-gray-500">Add or edit projects</p>
                </div>
              </a>
              <a
                href="/admin/requests"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Users className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900">View Requests</h3>
                  <p className="text-sm text-gray-500">
                    Manage service requests
                  </p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
