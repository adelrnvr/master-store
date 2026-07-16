import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LogOut, Package, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const AccountPage: React.FC = () => {
  const { user, logout, orders, wishlist } = useStore();
  const navigate = useNavigate();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="container-ms py-[clamp(2rem,5vw,4rem)]">
      <div className="mx-auto max-w-2xl border p-[clamp(1.5rem,4vw,2.5rem)]">
        <div className="flex items-center gap-5">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 font-display text-2xl font-bold text-neutral-700">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <h1 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold">
              Welcome, <span className="italic">{user.name}</span>
            </h1>
            <p className="text-sm text-neutral-500">{user.phone}</p>
          </div>
        </div>

        <div className="grid gap-4 border-t py-8 sm:grid-cols-3">
          <Link to="/orders" className="flex flex-col items-center gap-2 border p-5 text-center transition-colors hover:border-gold">
            <Package size={20} className="text-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.15em]">My Orders</span>
            <span className="font-display text-xl font-bold">{orders.length}</span>
          </Link>
          <Link to="/wishlist" className="flex flex-col items-center gap-2 border p-5 text-center transition-colors hover:border-gold">
            <Heart size={20} className="text-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.15em]">Wishlist</span>
            <span className="font-display text-xl font-bold">{wishlist.length}</span>
          </Link>
          <Link to="/shop" className="flex flex-col items-center gap-2 border p-5 text-center transition-colors hover:border-gold">
            <ShoppingBag size={20} className="text-gold" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.15em]">Shop</span>
            <span className="font-display text-xl font-bold">→</span>
          </Link>
        </div>

        <div className="border-t pt-6">
          <h2 className="pb-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">Recent Orders</h2>
          {orders.length === 0 ? (
            <p className="border border-dashed py-6 text-center text-sm text-neutral-400">No previous orders</p>
          ) : (
            <div className="flex flex-col gap-2">
              {orders.slice(0, 3).map((o) => (
                <Link key={o.id} to="/orders" className="flex items-center justify-between border px-4 py-3 text-sm transition-colors hover:border-gold">
                  <span className="font-semibold">{o.id}</span>
                  <span className="text-neutral-500">{o.items.length} item{o.items.length > 1 ? 's' : ''}</span>
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-amber-800">{o.status}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => { logout(); navigate('/'); }}
          className="mt-8 flex w-full items-center justify-center gap-2 border border-red-300 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  );
};
