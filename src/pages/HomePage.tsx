import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

const MARQUEE = ['Premium Quality', 'Cash on Delivery', '58 Wilayas Delivery', 'Master Store', 'New Collection 2026'];

export const HomePage: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);
  const newArrivals = PRODUCTS.filter((p) => p.isNew);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categoryImages: Record<string, string> = {
    polos: '/images/polo-collection.jpg',
    tshirts: '/images/oversized-tee-white.jpg',
    pants: '/images/essential-joggers.jpg',
  };

  return (
    <div>
      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden bg-[#f4f1ea]">
        <div className="container-ms grid items-center gap-8 py-[clamp(3rem,7vw,6rem)] lg:grid-cols-2">
          <div className="animate-fade-up order-2 lg:order-1">
            <p className="label-caps pb-4 text-gold">New Collection — Summer 2026</p>
            <h1 className="font-display text-[clamp(2.6rem,6.5vw,5.2rem)] font-black leading-[1.02] text-neutral-900">
              Master<br />
              <span className="italic font-semibold text-gold">Your</span> Style
            </h1>
            <p className="max-w-md pt-6 text-[clamp(0.9rem,1.4vw,1.05rem)] leading-relaxed text-neutral-600">
              Premium polos, heavyweight tees and perfected essentials — crafted for those who accept nothing less than mastery. Delivered to your door, paid on arrival.
            </p>
            <div className="flex flex-wrap gap-4 pt-8">
              <Link to="/shop" className="btn-navy">
                Shop Now <ArrowRight size={15} />
              </Link>
              <Link to="/category/polos" className="btn-outline">
                Explore Polos
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-10">
              {[['9+', 'Premium Pieces'], ['58', 'Wilayas Served'], ['4.7★', 'Avg. Rating']].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl font-bold text-neutral-900">{n}</p>
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] text-neutral-500">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="animate-fade-up order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-full w-full border-2 border-gold" />
              <img
                src="/images/polo-white.jpg"
                alt="Master Store Signature Polo"
                className="relative aspect-[4/5] w-full object-cover shadow-2xl"
              />
              <div className="absolute bottom-6 left-6 bg-white/95 px-5 py-3 shadow-lg backdrop-blur">
                <p className="text-[0.6rem] uppercase tracking-[0.25em] text-neutral-500">Signature Polo</p>
                <p className="font-display text-lg font-bold">From $5,900</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <div className="overflow-hidden border-y border-neutral-900 bg-neutral-950 py-3.5">
        <div className="animate-marquee flex w-max gap-0">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {MARQUEE.concat(MARQUEE).map((t, i) => (
                <span key={`${dup}-${i}`} className="flex items-center gap-6 px-6 text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-gold">
                  {t} <span className="text-neutral-600">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ CATEGORIES ══════════ */}
      <section className="container-ms py-[clamp(3.5rem,7vw,6rem)]">
        <div className="pb-10 text-center">
          <p className="label-caps pb-3">Curated For You</p>
          <h2 className="heading-section">Shop by Category</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/category/${c.slug}`} className="product-img-zoom group relative overflow-hidden bg-[#f7f7f7]">
              <div className="aspect-[4/5]">
                <img src={categoryImages[c.slug]} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold">{c.tagline}</p>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold text-white">{c.name}</h3>
                  <span className="flex h-10 w-10 items-center justify-center border border-white/40 text-white transition-all group-hover:border-gold group-hover:bg-gold">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ BEST SELLERS ══════════ */}
      <section className="bg-[#fafafa] py-[clamp(3.5rem,7vw,6rem)]">
        <div className="container-ms">
          <div className="flex flex-wrap items-end justify-between gap-4 pb-10">
            <div>
              <p className="label-caps pb-3">Most Wanted</p>
              <h2 className="heading-section">Best Sellers</h2>
            </div>
            <Link to="/shop" className="group flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-neutral-900">
              View All <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-5">
            {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURE BANNER ══════════ */}
      <section className="relative overflow-hidden bg-navy">
        <div className="container-ms grid items-center gap-10 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-2">
          <div className="product-img-zoom overflow-hidden">
            <img src="/images/polo-collection.jpg" alt="Signature Polo Collection" loading="lazy" className="aspect-[16/11] w-full object-cover" />
          </div>
          <div>
            <p className="label-caps pb-4 text-gold">The Signature Collection</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-bold leading-tight text-white">
              Seven Colors.<br />One Standard.
            </h2>
            <p className="max-w-md pt-5 leading-relaxed text-neutral-300">
              From crisp white to deep forest — every Signature Polo is cut from the same 220 GSM premium piqué cotton and finished with the Master Store crest.
            </p>
            <Link to="/product/polo-collection" className="btn-gold mt-8">
              Discover the Collection <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ NEW ARRIVALS ══════════ */}
      <section className="container-ms py-[clamp(3.5rem,7vw,6rem)]">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-10">
          <div>
            <p className="label-caps pb-3">Just Landed</p>
            <h2 className="heading-section">New Arrivals</h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-neutral-900">
            View All <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ══════════ TRUST ══════════ */}
      <section className="border-y bg-white">
        <div className="container-ms grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Truck, title: 'Fast Delivery', text: 'To all 58 wilayas within 24–72 hours' },
            { icon: BadgeCheck, title: 'Cash on Delivery', text: 'Pay only when your order arrives' },
            { icon: ShieldCheck, title: 'Premium Quality', text: 'Heavyweight fabrics, guaranteed' },
            { icon: RotateCcw, title: 'Easy Exchange', text: 'Size exchange within 7 days' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-gold/40 bg-gold/10 text-gold">
                <Icon size={20} />
              </span>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900">{title}</h4>
                <p className="pt-1 text-sm text-neutral-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ NEWSLETTER ══════════ */}
      <section className="bg-[#f4f1ea] py-[clamp(3.5rem,7vw,5.5rem)]">
        <div className="container-ms max-w-2xl text-center">
          <p className="label-caps pb-3 text-gold">Join the Circle</p>
          <h2 className="heading-section">Get 10% Off Your First Order</h2>
          <p className="pt-4 text-neutral-600">Subscribe to receive new drops, private offers and the code MASTER10.</p>
          {subscribed ? (
            <p className="pt-8 font-display text-xl text-gold">Welcome to the circle — your code is MASTER10 ✦</p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); }}
              className="mx-auto flex max-w-md pt-8"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="input-ms border-r-0"
              />
              <button type="submit" className="bg-neutral-900 px-6 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
