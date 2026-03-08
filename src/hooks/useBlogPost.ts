import { useState, useEffect } from 'react';
import type { SupportedLang } from '../i18n/types';
import { parseFrontmatter, renderMarkdown, extractHeadings } from '../lib/markdown';
import type { PostFrontmatter } from '../lib/markdown';

interface BlogPostData {
  frontmatter: PostFrontmatter;
  html: string;
  headings: { id: string; text: string; level: number }[];
}

const postModules: Record<string, () => Promise<{ default: string }>> = import.meta.glob(
  '../content/blog/**/*.md',
  { query: '?raw', import: 'default', eager: false }
) as Record<string, () => Promise<{ default: string }>>;

export function useBlogPost(slug: string, lang: SupportedLang) {
  const [data, setData] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const key = Object.keys(postModules).find(k => k.includes(`/${lang}/${slug}.md`));

    if (!key) {
      setError('Post not found');
      setLoading(false);
      return;
    }

    (postModules[key]() as unknown as Promise<string>)
      .then((raw) => {
        const rawStr = typeof raw === 'string' ? raw : (raw as { default: string }).default;
        const { frontmatter, content } = parseFrontmatter(rawStr);
        const html = renderMarkdown(content);
        const headings = extractHeadings(content);
        setData({ frontmatter, html, headings });
      })
      .catch(() => setError('Failed to load post'))
      .finally(() => setLoading(false));
  }, [slug, lang]);

  return { data, loading, error };
}
