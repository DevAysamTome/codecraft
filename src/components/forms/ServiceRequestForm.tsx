'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Upload, X, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Card, CardContent } from '@/components/ui/Card';

const serviceRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budgetRange: z.string().optional(),
  deadline: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  attachments: z.array(z.string()).optional(),
});

type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;

const ServiceRequestForm = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceRequestFormData>({
    resolver: zodResolver(serviceRequestSchema),
  });

  const services = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Technology Consulting',
    'Maintenance & Support',
  ];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ServiceRequestFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('company', data.company || '');
      formData.append('service', data.service);
      formData.append('budgetRange', data.budgetRange || '');
      formData.append('deadline', data.deadline || '');
      formData.append('message', data.description);

      attachments.forEach((file, index) => {
        formData.append(`attachment_${index}`, file);
      });

      const response = await fetch('/api/requests', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setAttachments([]);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('request.success')}
          </h2>
          <p className="text-gray-600">
            We&apos;ll get back to you within 24 hours with a detailed proposal.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('request.title')}
          </h2>
          <p className="text-gray-600">{t('request.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={t('request.name')}
              {...register('name')}
              error={errors.name?.message}
              required
            />
            <Input
              label={t('request.email')}
              type="email"
              {...register('email')}
              error={errors.email?.message}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={t('request.phone')}
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
              required
            />
            <Input
              label={t('request.company')}
              {...register('company')}
              error={errors.company?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('request.service')} *
              </label>
              <select
                {...register('service')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select a service</option>
                {services.map(service => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.service.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('request.budget')}
              </label>
              <select
                {...register('budgetRange')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select budget range</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label={t('request.deadline')}
            type="date"
            {...register('deadline')}
            error={errors.deadline?.message}
          />

          <Textarea
            label={t('request.description')}
            rows={4}
            {...register('description')}
            error={errors.description?.message}
            required
            placeholder="Please describe your project requirements, goals, and any specific features you need..."
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('request.attachments')}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drop files here or click to upload
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Choose Files
              </label>
            </div>

            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="w-full"
          >
            {t('request.submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceRequestForm;
