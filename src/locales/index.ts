import { en } from './en/en';
import { vi } from './vi/vi';

export const messages = {
  vi,
  en,
};

export type Lang = 'vi' | 'en';

export const getMessages = (lang: Lang) => {
  return messages[lang] || messages.vi;
};
