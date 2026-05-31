import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import es from '../../public/locales/es/translation.json';
import esYukigo from '../../public/locales/es/yukigo.json';
import enYukigo from '../../public/locales/en/yukigo.json';
import ptYukigo from '../../public/locales/pt/yukigo.json';
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'es',
    debug: true,
    fallbackLng: 'en',
    resources: {
      es: { translation: es, yukigo: esYukigo },
    },
    interpolation: {
      escapeValue: false,
    },
  });


export default i18n;
