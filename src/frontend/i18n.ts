import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import es from '../../public/locales/es/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'es',
    debug: true,
    fallbackLng: 'en',
    resources: {
      es: { translation: es },
    },
    interpolation: {
      escapeValue: false,
    },
  });


export default i18n;
