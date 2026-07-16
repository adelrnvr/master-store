import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { CATEGORIES } from '@/data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="container-ms grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo dark />
          <p className="max-w-xs text-sm leading-relaxed text-neutral-400">
            Premium essentials crafted for those who master their style. Polos, tees and pants in heavyweight fabrics — delivered across all 58 wilayas.
          </p>
          <div className="flex gap-3 pt-2">
            {[Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="flex h-9 w-9 items-center justify-center border border-neutral-700 text-neutral-300 transition-colors hover:border-gold hover:text-gold">
                <Icon size={16} />
              </a>
            ))}
            <a href="#" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center border border-neutral-700 text-neutral-300 transition-colors hover:border-gold hover:text-gold">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M19.6 6.7a5.1 5.1 0 0 1-3.4-1.4A5.3 5.3 0 0 1 14.8 2h-3.3v13.6a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.5a6.2 6.2 0 1 0 5.3 6.1V8.6a8.4 8.4 0 0 0 4.8 1.5V6.8z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="pb-4 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold">Shop</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li><Link to="/shop" className="transition-colors hover:text-gold">All Products</Link></li>
            {CATEGORIES.map((c) => (
              <li key={c.slug}><Link to={`/category/${c.slug}`} className="transition-colors hover:text-gold">{c.name}</Link></li>
            ))}
            <li><Link to="/wishlist" className="transition-colors hover:text-gold">Wishlist</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="pb-4 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold">Customer Care</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li><Link to="/account" className="transition-colors hover:text-gold">My Account</Link></li>
            <li><Link to="/orders" className="transition-colors hover:text-gold">Track My Orders</Link></li>
            <li><Link to="/login" className="transition-colors hover:text-gold">Login</Link></li>
            <li><Link to="/register" className="transition-colors hover:text-gold">Create Account</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-gold">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="pb-4 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold">Contact</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-3"><Phone size={15} className="text-gold" /> +213 758 99 65 22</li>
            <li className="flex items-center gap-3"><Mail size={15} className="text-gold" /> contact@masterstore.dz</li>
            <li className="flex items-center gap-3"><MapPin size={15} className="text-gold" /> Algiers, Algeria</li>
          </ul>
          <div className="mt-5 border border-neutral-700 px-4 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-neutral-400">
            Cash on Delivery Available
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="container-ms flex flex-col items-center justify-between gap-3 py-5 text-[0.68rem] uppercase tracking-[0.2em] text-neutral-500 md:flex-row">
          <span>© 2026 Master Store. All rights reserved.</span>
          <span>Crafted with mastery in Algeria</span>
        </div>
      </div>
    </footer>
  );
};
