'use client';

import React, { useEffect } from 'react';
import { useRTL } from '@/hooks/useRTL';

interface DynamicLayoutProps {
  children: React.ReactNode;
}

const DynamicLayout = ({ children }: DynamicLayoutProps) => {
  const { isRTL, direction, fontFamily } = useRTL();

  useEffect(() => {
    // Update document direction and language
    document.documentElement.dir = direction;
    document.documentElement.lang = isRTL ? 'ar' : 'en';

    // Update body font family
    document.body.className =
      document.body.className.replace(/font-(poppins|tajawal)/g, '').trim() +
      ` ${fontFamily}`;
  }, [isRTL, direction, fontFamily]);

  return (
    <div className={`min-h-screen ${fontFamily} ${isRTL ? 'rtl' : 'ltr'}`}>
      {children}
    </div>
  );
};

export default DynamicLayout;
