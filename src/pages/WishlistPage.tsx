import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-ms py-[clamp(2rem,5vw,4rem)]">
      <div className="pb-8">
        <p className="label-caps pb-2">Saved For Later</p>
        <h1 className="heading-section">My Wishlist</h1>
        <p className="pt-2 text-sm text-neutral-500">{items.length} item{items.length !== 1 ? 's' : ''}</p>
      </div>
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-5 border border-dashed py-24 text-center">
          <Heart size={44} className="text-neutral-300" />
          <p className="font-display text-2xl text-neutral-700">Your wishlist is empty</p>
          <p className="text-sm text-neutral-500">Tap the heart on any product to save it here.</p>
          <Link to="/shop" className="btn-navy mt-2">Discover Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};
