import type { BlogTranslations } from '../../i18n/types';

interface BlogFilterProps {
  categories: string[];
  active: string;
  onSelect: (cat: string) => void;
  t: BlogTranslations;
}

export default function BlogFilter({ categories, active, onSelect, t }: BlogFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onSelect('')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          active === ''
            ? 'bg-white text-black shadow-lg'
            : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
        }`}
      >
        {t.allCategories}
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            active === cat
              ? 'bg-white text-black shadow-lg'
              : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
          }`}
        >
          {t.categories[cat] || cat}
        </button>
      ))}
    </div>
  );
}
