import { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  title: string;
}

export default function TableOfContents({ headings, title }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
      <h4 className="text-sm font-semibold text-white mb-3">{title}</h4>
      <ul className="space-y-1.5">
        {headings.map(h => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? '1rem' : 0 }}>
            <a
              href={`#${h.id}`}
              onClick={e => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block text-sm py-0.5 transition-colors duration-200 ${
                activeId === h.id
                  ? 'text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
