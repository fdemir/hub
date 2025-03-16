import { configureLocalization } from "@lit/localize";
import { sourceLocale, targetLocales } from "./generated/locale-codes.js";

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => {
    return import(
      // THIS IS INTENDED. VITE CANNOT ANALYZE THE TARGET PATH. NOT A PROBLEM.
      /* @vite-ignore */
      `/src/generated/locales/${locale}.js`
    );
  },
});

export const initLocalization = async () => {
  await setLocale("en");
};
