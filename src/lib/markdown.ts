import { marked } from 'marked';

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  keywords: string;
  ogImage?: string;
}

export function parseFrontmatter(raw: string): { frontmatter: PostFrontmatter; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return {
      frontmatter: { title: '', description: '', date: '', category: '', readingTime: '', keywords: '' },
      content: raw,
    };
  }

  const meta: Record<string, string> = {};
  match[1].split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      meta[key] = value;
    }
  });

  return {
    frontmatter: meta as unknown as PostFrontmatter,
    content: match[2],
  };
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const text = m[2];
    const id = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({ id, text, level: m[1].length });
  }
  return headings;
}

const renderer = new marked.Renderer();

renderer.heading = function ({ text, depth }: { text: string; depth: number }) {
  const id = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '');
  return `<h${depth} id="${id}">${text}</h${depth}>`;
};

renderer.link = function ({ href, text }: { href: string; text: string }) {
  const isExternal = href.startsWith('http');
  const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${href}"${attrs}>${text}</a>`;
};

marked.setOptions({ renderer, gfm: true, breaks: false });

export function renderMarkdown(content: string): string {
  return marked.parse(content) as string;
}
