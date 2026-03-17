import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from '../locales/en/en';
import { vi } from '../locales/vi/vi';

export const createI18nInstance = () => {
  if (!i18n.isInitialized) {
    let lang =
      typeof window !== 'undefined'
        ? localStorage.getItem('lang') || 'en'
        : 'en';

    i18n.use(initReactI18next).init({
      fallbackLng: 'en',
      debug: false,
      lng: lang,
      interpolation: {
        escapeValue: false,
      },
      resources: {
        en: { translation: en },
        vi: { translation: vi },
      },
    });
  }

  return i18n;
};
