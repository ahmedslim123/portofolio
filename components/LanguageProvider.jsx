"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { locales } from "@/content/site";

/**
 * Site-wide language. Renders English first (matching SSR), then upgrades to a
 * saved preference after mount — so there's no hydration mismatch. Every
 * consumer re-renders instantly when the language changes.
 */
const I18nContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "fr" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const change = (next) => {
    setLang(next);
    try {
      localStorage.setItem("lang", next);
    } catch {}
  };

  const active = locales[lang] || locales.en;
  const value = { lang, setLang: change, ...active };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (ctx) return ctx;
  // Fallback (e.g. a component rendered outside the provider): default to EN.
  return { lang: "en", setLang: () => {}, ...locales.en };
}
