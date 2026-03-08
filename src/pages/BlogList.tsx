import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage, getBlogTranslations, getSharedTranslations } from '../i18n';
import { blogPosts } from '../content/blog';
import BlogCard from '../components/blog/BlogCard';
import BlogFilter from '../components/blog/BlogFilter';

export default function BlogList() {
  const { lang } = useLanguage();
  const t = getBlogTranslations(lang);
  const s = getSharedTranslations(lang);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    document.title = `${t.blogTitle} | Salut Donna`;
    window.scrollTo(0, 0);
  }, [t.blogTitle]);

  const categories = [...new Set(blogPosts.map(p => p.category))];
  const filteredPosts = activeCategory
    ? blogPosts.filter(p => p.category === activeCategory)
    : blogPosts;

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to={`/${lang}/`}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-lg font-bold tracking-tight">Salut Donna</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              to={`/${lang}/ledonna`}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Le Donna
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t.blogTitle}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t.blogSubtitle}
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <BlogFilter
              categories={categories}
              active={activeCategory}
              onSelect={setActiveCategory}
              t={t}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map(post => (
              <BlogCard key={post.slug} post={post} lang={lang} t={t} />
            ))}
          </div>

          {sortedPosts.length === 0 && (
            <p className="text-center text-slate-500 py-12">No posts found.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-500">
          {s.footer.copyright}
        </div>
      </footer>
    </div>
  );
}
