import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { fmt } from '@/data/products';
import type { Product } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { Stars } from '@/components/Stars';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(product.id);

  return (
    <div className="group relative flex flex-col">
      <Link to={`/product/${product.slug}`} className="product-img-zoom relative block overflow-hidden bg-[#f7f7f7]">
        <div className="aspect-[4/5] w-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        {/* badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="bg-neutral-900 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-white">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="bg-gold px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-white">
              New
            </span>
          )}
        </div>
        {/* hover quick add */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id, product.sizes[1] ?? product.sizes[0], product.colors[0].name);
            }}
            className="flex w-full items-center justify-center gap-2 bg-neutral-900/95 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur transition-colors hover:bg-gold"
          >
            <ShoppingBag size={14} /> Add to Cart
          </button>
        </div>
      </Link>

      {/* wishlist */}
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label="Add to wishlist"
        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition-all hover:scale-110 ${wished ? 'text-red-600' : 'text-neutral-700'}`}
      >
        <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
      </button>

      <div className="flex flex-col gap-1 pt-4">
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.25em] text-neutral-400">
          {product.brand}
        </span>
        <Link to={`/product/${product.slug}`} className="text-[0.95rem] font-medium text-neutral-900 transition-colors hover:text-gold">
          {product.name}
        </Link>
        <div className="flex items-center gap-2">
          <Stars rating={product.rating} size={11} />
          <span className="text-[0.68rem] text-neutral-400">({product.reviewCount})</span>
        </div>
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-[0.95rem] font-bold text-neutral-900">{fmt(product.price)}</span>
          {product.compareAt && (
            <span className="text-[0.8rem] text-neutral-400 line-through">{fmt(product.compareAt)}</span>
          )}
        </div>
      </div>
    </div>
  );
};
