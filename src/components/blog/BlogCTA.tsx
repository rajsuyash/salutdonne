import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { BlogTranslations } from '../../i18n/types';

interface BlogCTAProps {
  lang: string;
  t: BlogTranslations;
}

export default function BlogCTA({ lang, t }: BlogCTAProps) {
  return (
    <div className="mt-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-12 text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {t.bookDemo}
      </h3>
      <p className="text-slate-300 mb-8 max-w-xl mx-auto">
        {t.bookDemoDesc}
      </p>
      <Link
        to={`/${lang}/#pricing`}
        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20 active:scale-95"
      >
        {t.bookDemoButton}
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
