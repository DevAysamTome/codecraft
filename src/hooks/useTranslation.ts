import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = (namespace: string = 'common') => {
  const { t, i18n, ready } = useI18nTranslation(namespace);

  // Enhanced translation function with better fallbacks
  const translate = (key: string, fallback?: string) => {
    const translation = t(key);

    // If translation returns the key itself, use fallback or key
    if (translation === key) {
      return fallback || key;
    }

    return translation;
  };

  return {
    t: translate,
    i18n,
    ready,
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
  };
};
