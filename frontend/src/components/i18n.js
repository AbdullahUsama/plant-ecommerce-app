// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import translationEN from ".././locales/en/translation.json";
import translationUR from ".././locales/ur/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  ur: {
    translation: translationUR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
