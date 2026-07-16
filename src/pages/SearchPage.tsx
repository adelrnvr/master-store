import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export const SearchPage: React.FC = () => {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const [input, setInput] = useState(q);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    return PRODUCTS.filter((p) => {
      const hay = `${p.name} ${p.category} ${p.description} ${p.colors.map((c) => c.name).join(' ')}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [q]);

  return (
    <div className="container-ms py-[clamp(2rem,5vw,4rem)]">
      <form
        onSubmit={(e) => { e.preventDefault(); if (input.trim()) navigate(`/search?q=${encodeURIComponent(input.trim())}`); }}
        className="mx-auto flex max-w-xl border border-neutral-300 focus-within:border-neutral-900"
      >
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search the store…" className="w-full px-5 py-3.5 text-sm outline-none" />
        <button type="submit" aria-label="Search" className="bg-neutral-900 px-5 text-white transition-colors hover:bg-gold">
          <Search size={18} />
        </button>
      </form>

      <div className="pt-10">
        {q && (
          <p className="pb-8 text-center">
            <span className="font-display text-2xl font-bold">{results.length}</span>{' '}
            <span className="text-neutral-500">result{results.length !== 1 ? 's' : ''} for “{q}”</span>
          </p>
        )}
        {!q ? (
          <p className="py-16 text-center text-neutral-400">Type something to search the Master Store collection.</p>
        ) : results.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-2xl text-neutral-700">Nothing found</p>
            <p className="pt-2 text-sm text-neutral-500">Try “polo”, “oversized”, “white” or “sweatpants”.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
            {results.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};
