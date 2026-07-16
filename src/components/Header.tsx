import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, User, X, ChevronDown } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Logo } from '@/components/Logo';
import { CATEGORIES } from '@/data/products';

export const Header: React.FC = () => {
  const { cartCount, wishlist, setCartOpen, user } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  const navLink = ({ isActive }: { isActive: boolean }) =>
    `relative text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors hover:text-gold ${
      isActive ? 'text-gold' : 'text-neutral-800'
    }`;

  return (
    <>
      {/* announcement bar */}
      <div className="bg-neutral-950 py-2.5 text-center">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.3em] text-gold">
          Free delivery on orders over $10,000 — Cash on Delivery across 58 wilayas
        </p>
      </div>

      <header className={`sticky top-0 z-40 border-b bg-white transition-shadow ${scrolled ? 'shadow-[0_2px_24px_rgba(0,0,0,0.07)]' : ''}`}>
        <div className="container-ms flex items-center justify-between gap-4 py-4">
          {/* mobile menu btn */}
          <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>

          {/* desktop nav left */}
          <nav className="hidden items-center gap-8 lg:flex">
            <NavLink to="/" className={navLink} end>Home</NavLink>
            <NavLink to="/shop" className={navLink}>Shop</NavLink>
            <div className="group relative">
              <button className="flex items-center gap-1 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-neutral-800 transition-colors hover:text-gold">
                Categories <ChevronDown size={13} />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-52 translate-y-2 border bg-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {CATEGORIES.map((c) => (
                  <Link key={c.slug} to={`/category/${c.slug}`} className="block px-5 py-3 text-[0.72rem] uppercase tracking-[0.15em] text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-gold">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <NavLink to="/contact" className={navLink}>Contact</NavLink>
          </nav>

          <Logo />

          {/* icons */}
          <div className="flex items-center gap-4 md:gap-5">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="text-neutral-800 transition-colors hover:text-gold">
              <Search size={20} />
            </button>
            <Link to={user ? '/account' : '/login'} aria-label="Account" className="hidden text-neutral-800 transition-colors hover:text-gold sm:block">
              <User size={20} />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative text-neutral-800 transition-colors hover:text-gold">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[0.58rem] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative text-neutral-800 transition-colors hover:text-gold">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[0.58rem] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* search overlay */}
      {searchOpen && (
        <div className="animate-overlay-in fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[15vh]" onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={submitSearch} className="flex items-center border-b-2 border-white">
              <Search size={22} className="text-white" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search polos, tees, pants…"
                className="w-full bg-transparent px-4 py-4 text-lg text-white outline-none placeholder:text-white/60 md:text-2xl"
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="text-white">
                <X size={24} />
              </button>
            </form>
            <p className="pt-3 text-[0.65rem] uppercase tracking-[0.25em] text-white/60">Press Enter to search</p>
          </div>
        </div>
      )}

      {/* mobile nav drawer */}
      {mobileOpen && (
        <div className="animate-overlay-in fixed inset-0 z-50 bg-black/50" onClick={() => setMobileOpen(false)}>
          <div className="animate-drawer-in fixed inset-y-0 left-0 w-[80vw] max-w-xs bg-white p-6" style={{ animationName: 'drawerInLeft' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-6">
              <Logo compact />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={22} /></button>
            </div>
            <nav className="flex flex-col gap-1 border-t pt-4">
              {[
                { to: '/', label: 'Home' },
                { to: '/shop', label: 'Shop' },
                ...CATEGORIES.map((c) => ({ to: `/category/${c.slug}`, label: c.name })),
                { to: '/wishlist', label: 'Wishlist' },
                { to: '/orders', label: 'My Orders' },
                { to: user ? '/account' : '/login', label: user ? 'My Account' : 'Login' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
                <Link
                  key={l.to + l.label}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-neutral-100 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-neutral-800 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
