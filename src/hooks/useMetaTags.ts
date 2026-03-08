import { useEffect } from 'react';
import type { PostFrontmatter } from '../lib/markdown';

interface MetaTagsOptions {
  frontmatter: PostFrontmatter;
  slug: string;
  lang: string;
  siteName?: string;
}

export function useMetaTags({ frontmatter, slug, lang, siteName = 'Salut Donna' }: MetaTagsOptions) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${frontmatter.title} | ${siteName}`;

    const metas: HTMLMetaElement[] = [];
    const setMeta = (property: string, content: string) => {
      const el = document.createElement('meta');
      el.setAttribute(property.startsWith('og:') ? 'property' : 'name', property);
      el.content = content;
      document.head.appendChild(el);
      metas.push(el);
    };

    setMeta('description', frontmatter.description);
    setMeta('keywords', frontmatter.keywords);
    setMeta('og:title', frontmatter.title);
    setMeta('og:description', frontmatter.description);
    setMeta('og:type', 'article');
    setMeta('og:url', `${window.location.origin}/${lang}/blog/${slug}`);
    if (frontmatter.ogImage) {
      setMeta('og:image', frontmatter.ogImage);
    }
    setMeta('article:published_time', frontmatter.date);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: frontmatter.title,
      description: frontmatter.description,
      datePublished: frontmatter.date,
      author: { '@type': 'Organization', name: siteName },
      publisher: { '@type': 'Organization', name: siteName },
      inLanguage: lang,
      url: `${window.location.origin}/${lang}/blog/${slug}`,
    });
    document.head.appendChild(script);

    return () => {
      document.title = prev;
      metas.forEach(el => el.remove());
      script.remove();
    };
  }, [frontmatter, slug, lang, siteName]);
}
