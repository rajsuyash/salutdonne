import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { useLanguage, getBlogTranslations, getSharedTranslations } from '../i18n';
import { blogPosts } from '../content/blog';
import { useBlogPost } from '../hooks/useBlogPost';
import { useMetaTags } from '../hooks/useMetaTags';
import TableOfContents from '../components/blog/TableOfContents';
import BlogCTA from '../components/blog/BlogCTA';
import TopNav from '../components/TopNav';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const t = getBlogTranslations(lang);
  const s = getSharedTranslations(lang);
  const { data, loading, error } = useBlogPost(slug || '', lang);
  const meta = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useMetaTags({
    frontmatter: data?.frontmatter || {
      title: meta?.title[lang] || '',
      description: meta?.description[lang] || '',
      date: meta?.date || '',
      category: meta?.category || '',
      readingTime: `${meta?.readingTime || 0}`,
      keywords: '',
    },
    slug: slug || '',
    lang,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400">{error || 'Post not found'}</p>
        <Link
          to={`/${lang}/blog`}
          className="text-white underline underline-offset-4 hover:text-slate-300"
        >
          {t.backToBlog}
        </Link>
      </div>
    );
  }

  const categoryLabel = t.categories[data.frontmatter.category] || data.frontmatter.category;

  return (
    <div className="min-h-screen bg-black text-white">
      <TopNav />

      {/* Post Header */}
      <section className="pt-32 pb-8 md:pt-40">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            to={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToBlog}
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-slate-300">
              {categoryLabel}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" />
              {data.frontmatter.readingTime} {t.readingTime}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar className="w-3 h-3" />
              {new Date(data.frontmatter.date).toLocaleDateString(lang, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {data.frontmatter.title}
          </h1>
          <p className="text-lg text-slate-400">
            {data.frontmatter.description}
          </p>
        </div>
      </section>

      {/* Content + TOC */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-8">
            {/* Main Content */}
            <article className="max-w-3xl flex-1 min-w-0">
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: data.html }}
              />
              <BlogCTA lang={lang} t={t} />
            </article>

            {/* Sidebar TOC */}
            {data.headings.length > 2 && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <TableOfContents headings={data.headings} title={t.tableOfContents} />
                </div>
              </aside>
            )}
          </div>
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
