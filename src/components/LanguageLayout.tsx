import { useEffect, useCallback } from 'react';
import { Outlet, useParams, Navigate, useNavigate } from 'react-router-dom';
import { LanguageContext, isSupportedLang, SUPPORTED_LANGS, DEFAULT_LANG } from '../i18n';
import type { SupportedLang } from '../i18n';

export default function LanguageLayout() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();

  if (!lang || !isSupportedLang(lang)) {
    return <Navigate to={`/${DEFAULT_LANG}/`} replace />;
  }

  const setLang = useCallback((newLang: SupportedLang) => {
    localStorage.setItem('lang', newLang);
    const currentPath = window.location.pathname;
    const pathAfterLang = currentPath.replace(`/${lang}`, '');
    navigate(`/${newLang}${pathAfterLang}`);
  }, [lang, navigate]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const existing = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existing.forEach(el => el.remove());

    const currentPath = window.location.pathname.replace(`/${lang}`, '');
    for (const l of SUPPORTED_LANGS) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = l;
      link.href = `${window.location.origin}/${l}${currentPath}`;
      document.head.appendChild(link);
    }

    return () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <Outlet />
    </LanguageContext.Provider>
  );
}
