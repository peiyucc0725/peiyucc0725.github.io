import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enRes from './locales/en.json';
import zhRes from './locales/zh.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof zhRes;
    };
  }
}

const supportedLanguages = ['zh', 'en'];
const defaultLanguage = 'zh';

const getInitialLanguage = (): string => {
  const savedLanguage = localStorage.getItem('user-language');
  if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  const browserLang = navigator.language.split('-')[0];
  if (supportedLanguages.includes(browserLang)) {
    return browserLang;
  }

  return defaultLanguage;
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enRes },
      zh: { translation: zhRes }
    },
    lng: getInitialLanguage(),
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('user-language', lng);
});

export default i18n;