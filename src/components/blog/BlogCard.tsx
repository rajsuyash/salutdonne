import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPostMeta } from '../../content/blog';
import type { BlogTranslations } from '../../i18n/types';

interface BlogCardProps {
  post: BlogPostMeta;
  lang: string;
  t: BlogTranslations;
}

export default function BlogCard({ post, lang, t }: BlogCardProps) {
  const title = post.title[lang] || post.title.en;
  const description = post.description[lang] || post.description.en;
  const categoryLabel = t.categories[post.category] || post.category;

  return (
    <Link
      to={`/${lang}/blog/${post.slug}`}
      className="group block bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-slate-300">
            {categoryLabel}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            {post.readingTime} {t.readingTime}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-slate-100 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-slate-400 mb-4 line-clamp-3 flex-1">
          {description}
        </p>

        <div className="flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
          {t.readMore}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
