import { useLanguage, SUPPORTED_LANGS, getSharedTranslations } from '../i18n';
import type { SupportedLang } from '../i18n';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const s = getSharedTranslations(lang);

  return (
    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/10">
      {SUPPORTED_LANGS.map((l: SupportedLang) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 rounded-full text-xs font-medium uppercase transition-all ${
            l === lang
              ? 'bg-white text-black shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
