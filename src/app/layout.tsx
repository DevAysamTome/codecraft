import type { Metadata } from 'next';
import { Poppins, Tajawal } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DynamicLayout from '@/components/layout/DynamicLayout';
import { Providers } from './providers';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const tajawal = Tajawal({
  variable: '--font-tajawal',
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Code Craft Technology - Digital Solutions for Tomorrow',
  description:
    'We create innovative web applications, mobile apps, and digital solutions that drive business growth and enhance user experiences.',
  keywords: [
    'web development',
    'mobile development',
    'UI/UX design',
    'technology consulting',
  ],
  authors: [{ name: 'Code Craft Technology' }],
  openGraph: {
    title: 'Code Craft Technology',
    description: 'Digital Solutions for Tomorrow',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head></head>
      <body
        className={`${poppins.variable} ${tajawal.variable} antialiased font-sans`}
      >
        <Providers>
          <DynamicLayout>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </DynamicLayout>
        </Providers>
      </body>
    </html>
  );
}
