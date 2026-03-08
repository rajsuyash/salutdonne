export type { SupportedLang, SharedTranslations, AppTranslations, LeDonnaTranslations, BlogTranslations } from './types';
export { SUPPORTED_LANGS, DEFAULT_LANG, isSupportedLang, detectLanguage } from './config';
export { LanguageContext, useLanguage } from './LanguageContext';

import type { SupportedLang } from './types';

import { sharedEn } from './shared/en';
import { sharedFr } from './shared/fr';
import { sharedIt } from './shared/it';

import { appEn } from './app/en';
import { appFr } from './app/fr';
import { appIt } from './app/it';

import { ledonnaEn } from './ledonna/en';
import { ledonnaFr } from './ledonna/fr';
import { ledonnaIt } from './ledonna/it';

import { blogEn } from './blog/en';
import { blogFr } from './blog/fr';
import { blogIt } from './blog/it';

const shared = { en: sharedEn, fr: sharedFr, it: sharedIt } as const;
const app = { en: appEn, fr: appFr, it: appIt } as const;
const ledonna = { en: ledonnaEn, fr: ledonnaFr, it: ledonnaIt } as const;
const blog = { en: blogEn, fr: blogFr, it: blogIt } as const;

export function getSharedTranslations(lang: SupportedLang) {
  return shared[lang];
}

export function getAppTranslations(lang: SupportedLang) {
  return app[lang];
}

export function getLeDonnaTranslations(lang: SupportedLang) {
  return ledonna[lang];
}

export function getBlogTranslations(lang: SupportedLang) {
  return blog[lang];
}
