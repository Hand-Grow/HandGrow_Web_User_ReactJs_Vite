'use client';

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { createI18nInstance } from './i18n';

const i18nInstance = createI18nInstance();

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
};
