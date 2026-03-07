import type { SupportedLang } from './types';

export const SUPPORTED_LANGS: SupportedLang[] = ['en', 'fr', 'it'];
export const DEFAULT_LANG: SupportedLang = 'en';

export function isSupportedLang(lang: string): lang is SupportedLang {
  return SUPPORTED_LANGS.includes(lang as SupportedLang);
}

export function detectLanguage(): SupportedLang {
  const stored = localStorage.getItem('lang');
  if (stored && isSupportedLang(stored)) return stored;

  const browserLang = navigator.language.split('-')[0];
  if (isSupportedLang(browserLang)) return browserLang;

  return DEFAULT_LANG;
}
