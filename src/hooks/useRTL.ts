'use client';

import { useTranslation } from 'react-i18next';

export const useRTL = () => {
  const { i18n } = useTranslation();

  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const fontFamily = isRTL ? 'font-tajawal' : 'font-poppins';

  return {
    isRTL,
    direction,
    fontFamily,
    language: i18n.language,
  };
};
