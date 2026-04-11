import { Link, useLocation } from 'react-router-dom';
import { useLanguage, getAppTranslations, getSharedTranslations } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';

const LogoMark = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
      <path d="M30 15H55C75 15 90 30 90 50C90 70 75 85 55 85H30V15Z" stroke="url(#logo_gradient_nav)" strokeWidth="8" />
      <path d="M45 50L50 35L55 65L60 45L65 55L70 50" stroke="#E5E5E5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
      <defs>
        <linearGradient id="logo_gradient_nav" x1="30" y1="15" x2="90" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D1D5DB" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default function TopNav() {
  const { lang } = useLanguage();
  const t = getAppTranslations(lang);
  const s = getSharedTranslations(lang);
  const location = useLocation();
  const isHome =
    location.pathname === `/${lang}` || location.pathname === `/${lang}/`;

  const navItems = [
    { label: t.nav.audioProof, id: 'audio-proof' },
    { label: t.nav.problem, id: 'problem' },
    { label: t.nav.methodology, id: 'methodology' },
    { label: t.nav.useCases, id: 'use-cases' },
    { label: t.nav.pricing, id: 'pricing' },
  ];

  const handleBookDemo = () => {
    window.open('https://tidycal.com/rajsuyash/200', '_blank');
  };

  const anchorHref = (id: string) => (isHome ? `#${id}` : `/${lang}/#${id}`);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4">
      <div className="max-w-7xl mx-4 md:mx-auto px-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center h-14">
          <Link
            to={`/${lang}`}
            className="flex items-center space-x-3 cursor-pointer group"
            aria-label="Le Donna home"
          >
            <LogoMark className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-gray-300 transition-colors leading-none">
                Le Donna
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400 font-medium">
                {s.brandSubtitle}
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={anchorHref(item.id)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
              </a>
            ))}
            <Link
              to={`/${lang}/blog`}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
            </Link>
            <LanguageSwitcher />
            <button
              onClick={handleBookDemo}
              className="bg-white text-black px-6 py-2 rounded-full font-medium shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:bg-gray-100 transition-all text-sm"
            >
              {t.nav.bookDemo}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={handleBookDemo}
              className="bg-white text-black px-4 py-2 rounded-full font-medium text-xs shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-gray-100 transition-all"
            >
              {t.nav.bookDemo}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
