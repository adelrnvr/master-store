import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';

const ALL_COLORS = ['White', 'Black', 'Navy', 'Grey', 'Ivory', 'Red', 'Royal Blue', 'Forest', 'Sky'];
const ALL_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const BRANDS = ['Master Store'];

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export const ShopPage: React.FC<{ initialCategory?: string }> = ({ initialCategory }) => {
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState(initialCategory ?? params.get('category') ?? 'all');
  const [brand, setBrand] = useState('all');
  const [color, setColor] = useState('all');
  const [size, setSize] = useState('all');
  const [stock, setStock] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState<SortKey>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  React.useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
  }, [initialCategory]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== 'all') list = list.filter((p) => p.category === category);
    if (brand !== 'all') list = list.filter((p) => p.brand === brand);
    if (color !== 'all') list = list.filter((p) => p.colors.some((c) => c.name === color));
    if (size !== 'all') list = list.filter((p) => p.sizes.includes(size));
    if (stock === 'in') list = list.filter((p) => p.stock > 0);
    if (stock === 'low') list = list.filter((p) => p.stock > 0 && p.stock <= 25);
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min)) list = list.filter((p) => p.price >= min);
    if (!isNaN(max)) list = list.filter((p) => p.price <= max);
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'newest': list.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false)); break;
    }
    return list;
  }, [category, brand, color, size, stock, minPrice, maxPrice, sort]);

  const clearAll = () => {
    setCategory('all'); setBrand('all'); setColor('all'); setSize('all'); setStock('all');
    setMinPrice(''); setMaxPrice(''); setSort('featured'); setParams({});
  };

  const FilterBar = (
    <div className="flex flex-wrap items-end gap-x-5 gap-y-4">
      <label className="flex flex-col gap-1.5">
        <span className="label-caps">Category</span>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="select-ms min-w-[7.5rem]">
          <option value="all">All</option>
          {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="label-caps">Brand</span>
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="select-ms min-w-[7.5rem]">
          <option value="all">All</option>
          {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="label-caps">Color</span>
        <select value={color} onChange={(e) => setColor(e.target.value)} className="select-ms min-w-[7rem]">
          <option value="all">All</option>
          {ALL_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="label-caps">Size</span>
        <select value={size} onChange={(e) => setSize(e.target.value)} className="select-ms min-w-[6rem]">
          <option value="all">All</option>
          {ALL_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="label-caps">Stock</span>
        <select value={stock} onChange={(e) => setStock(e.target.value)} className="select-ms min-w-[7rem]">
          <option value="all">All</option>
          <option value="in">In Stock</option>
          <option value="low">Low Stock</option>
        </select>
      </label>
      <div className="flex flex-col gap-1.5">
        <span className="label-caps">Price</span>
        <div className="flex items-center gap-2">
          <input value={minPrice} onChange={(e) => setMinPrice(e.target.value.replace(/\D/g, ''))} placeholder="Min" className="select-ms w-20 normal-case" inputMode="numeric" />
          <span className="text-neutral-400">—</span>
          <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ''))} placeholder="Max" className="select-ms w-20 normal-case" inputMode="numeric" />
        </div>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="label-caps">Sort</span>
        <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="select-ms min-w-[9rem]">
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </label>
      <button onClick={clearAll} className="select-ms flex items-center gap-2 hover:border-neutral-900 hover:text-neutral-900">
        <X size={12} /> Clear
      </button>
    </div>
  );

  return (
    <div className="container-ms py-[clamp(2rem,5vw,4rem)]">
      {/* header */}
      <div className="pb-8">
        <p className="label-caps pb-2">Master Store</p>
        <h1 className="heading-section">
          {initialCategory ? CATEGORIES.find((c) => c.slug === initialCategory)?.name ?? 'Shop' : 'Shop All'}
        </h1>
        <p className="pt-2 text-sm text-neutral-500">
          {initialCategory
            ? CATEGORIES.find((c) => c.slug === initialCategory)?.tagline
            : 'The complete Master Store collection — polos, tees and pants.'}
        </p>
      </div>

      {/* mobile filter toggle */}
      <button onClick={() => setFiltersOpen(!filtersOpen)} className="mb-4 flex items-center gap-2 border border-neutral-300 px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.15em] lg:hidden">
        <SlidersHorizontal size={14} /> Filters
      </button>

      <div className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="border-b pb-6">{FilterBar}</div>
      </div>

      <div className="flex items-center justify-between py-5">
        <p className="text-sm text-neutral-500">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <p className="font-display text-2xl text-neutral-700">No products match your filters</p>
          <button onClick={clearAll} className="btn-navy">Clear Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};
