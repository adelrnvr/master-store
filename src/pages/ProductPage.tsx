import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Check, ChevronRight, Copy, Facebook, Heart, Minus, Plus,
  RotateCcw, Share2, ShieldCheck, ShoppingBag, Truck, Zap,
} from 'lucide-react';
import { fmt, getProduct, relatedProducts, CATEGORIES } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { Stars } from '@/components/Stars';
import { ProductCard } from '@/components/ProductCard';

interface LocalReview { author: string; rating: number; date: string; comment: string; }

export const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug ?? '');
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const [size, setSize] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<'description' | 'reviews'>('description');
  const [localReviews, setLocalReviews] = useState<LocalReview[]>([]);
  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (product) {
      setSize(product.sizes[1] ?? product.sizes[0]);
      setColor(product.colors[0].name);
      setQty(1);
      setActiveImg(0);
      setTab('description');
      window.scrollTo({ top: 0 });
      try {
        setLocalReviews(JSON.parse(localStorage.getItem(`ms_reviews_${product.id}`) ?? '[]'));
      } catch { setLocalReviews([]); }
    }
  }, [product?.id]);

  const related = useMemo(() => (product ? relatedProducts(product) : []), [product?.id]);

  if (!product) {
    return (
      <div className="container-ms flex flex-col items-center gap-5 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Product not found</h1>
        <Link to="/shop" className="btn-navy">Back to Shop</Link>
      </div>
    );
  }

  const wished = wishlist.includes(product.id);
  const allReviews = [...product.reviews, ...localReviews];
  const categoryName = CATEGORIES.find((c) => c.slug === product.category)?.name ?? '';
  const stockLabel = product.stock <= 20 ? `Low stock — only ${product.stock} left` : 'In Stock';

  const tryAdd = (buyNow: boolean) => {
    if (!size) { setSizeError(true); return; }
    addToCart(product.id, size, color, qty);
    if (buyNow) navigate('/checkout');
  };

  const shareUrl = window.location.href;
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl); } catch { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) return;
    const next = [...localReviews, { author: revName.trim(), rating: revRating, date: new Date().toISOString().slice(0, 10), comment: revComment.trim() }];
    setLocalReviews(next);
    localStorage.setItem(`ms_reviews_${product.id}`, JSON.stringify(next));
    setRevName(''); setRevComment(''); setRevRating(5);
  };

  return (
    <div className="container-ms py-[clamp(1.5rem,4vw,3.5rem)]">
      {/* breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 pb-6 text-[0.7rem] uppercase tracking-[0.15em] text-neutral-500" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-gold">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-gold">Shop</Link>
        <ChevronRight size={12} />
        <Link to={`/category/${product.category}`} className="hover:text-gold">{categoryName}</Link>
        <ChevronRight size={12} />
        <span className="text-neutral-900">{product.name}</span>
      </nav>

      <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900">
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* ───── Gallery ───── */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex gap-3 sm:flex-col">
            {product.gallery.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImg(i)}
                className={`h-20 w-16 flex-shrink-0 overflow-hidden border bg-[#f7f7f7] transition-all sm:h-24 sm:w-20 ${activeImg === i ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-transparent opacity-70 hover:opacity-100'}`}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="product-img-zoom relative flex-1 overflow-hidden bg-[#f7f7f7]">
            <div className="aspect-[4/5]">
              <img src={product.gallery[activeImg]} alt={product.name} className="h-full w-full object-cover" />
            </div>
            {product.compareAt && (
              <span className="absolute left-4 top-4 bg-gold px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white">
                Save {fmt(product.compareAt - product.price)}
              </span>
            )}
          </div>
        </div>

        {/* ───── Info ───── */}
        <div className="animate-fade-up">
          <p className="label-caps">{product.brand}</p>
          <h1 className="pt-2 font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.08] text-neutral-900">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 pt-4">
            <span className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-neutral-900">{fmt(product.price)}</span>
            {product.compareAt && <span className="text-lg text-neutral-400 line-through">{fmt(product.compareAt)}</span>}
          </div>

          <div className="flex items-center gap-2.5 pt-3">
            <Stars rating={product.rating} size={15} />
            <span className="text-sm font-semibold text-neutral-900">{product.rating}</span>
            <button onClick={() => setTab('reviews')} className="text-sm text-neutral-500 underline-offset-4 hover:underline">
              ({product.reviewCount + localReviews.length} reviews)
            </button>
          </div>

          <p className="pt-4 text-[0.95rem] text-neutral-500" dir="rtl">{product.arabicLine}</p>
          <p className="max-w-xl pt-3 leading-relaxed text-neutral-600">{product.description}</p>

          {/* stock */}
          <div className="flex items-center gap-2 pt-5">
            <span className={`h-2 w-2 rounded-full ${product.stock <= 20 ? 'bg-amber-500' : 'bg-green-600'}`} />
            <span className={`text-[0.72rem] font-semibold uppercase tracking-[0.15em] ${product.stock <= 20 ? 'text-amber-600' : 'text-green-700'}`}>
              {stockLabel}
            </span>
          </div>

          {/* size */}
          <div className="pt-7">
            <div className="flex items-center justify-between">
              <span className="label-caps">Size</span>
              {sizeError && <span className="text-xs text-red-600">Please select a size</span>}
            </div>
            <div className="flex flex-wrap gap-2.5 pt-3">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSize(s); setSizeError(false); }}
                  className={`flex h-11 min-w-[3.2rem] items-center justify-center border px-3 text-sm font-medium transition-all ${
                    size === s ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* color */}
          <div className="pt-6">
            <span className="label-caps">Color — <span className="text-neutral-800 normal-case tracking-normal">{color}</span></span>
            <div className="flex flex-wrap gap-3 pt-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  title={c.name}
                  aria-label={`Color ${c.name}`}
                  className={`h-9 w-9 border transition-all ${color === c.name ? 'ring-2 ring-neutral-900 ring-offset-2' : 'ring-1 ring-neutral-300 hover:ring-neutral-500'}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* quantity */}
          <div className="pt-6">
            <span className="label-caps">Quantity</span>
            <div className="mt-3 inline-flex items-center border border-neutral-300">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-neutral-600 hover:bg-neutral-50" aria-label="Decrease quantity"><Minus size={14} /></button>
              <span className="w-12 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-4 py-3 text-neutral-600 hover:bg-neutral-50" aria-label="Increase quantity"><Plus size={14} /></button>
            </div>
          </div>

          {/* CTAs */}
          <div className="grid gap-3 pt-8 sm:grid-cols-2">
            <button onClick={() => tryAdd(false)} className="btn-navy w-full">
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button onClick={() => tryAdd(true)} className="btn-gold w-full">
              <Zap size={16} /> Buy Now
            </button>
          </div>

          <div className="flex items-center gap-5 pt-5">
            <button onClick={() => toggleWishlist(product.id)} className={`flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.15em] transition-colors ${wished ? 'text-red-600' : 'text-neutral-600 hover:text-gold'}`}>
              <Heart size={16} fill={wished ? 'currentColor' : 'none'} /> {wished ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
            <div className="relative">
              <button onClick={() => setShareOpen(!shareOpen)} className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-neutral-600 transition-colors hover:text-gold">
                <Share2 size={16} /> Share
              </button>
              {shareOpen && (
                <div className="absolute left-0 top-full z-20 mt-2 flex gap-2 border bg-white p-2 shadow-lg">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook" className="flex h-9 w-9 items-center justify-center border text-neutral-600 hover:border-gold hover:text-gold">
                    <Facebook size={15} />
                  </a>
                  <a href={`https://wa.me/?text=${encodeURIComponent(product.name + ' — ' + shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on WhatsApp" className="flex h-9 w-9 items-center justify-center border text-neutral-600 hover:border-gold hover:text-gold">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.4 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2.2-.2 3.9 1.2 2.2 3 3.9 5.5 4.9 2 .8 2.7.6 3.6.4.6-.2 1.5-.9 1.7-1.5.2-.6.2-1.1.1-1.2l-.7-.3z"/></svg>
                  </a>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on X" className="flex h-9 w-9 items-center justify-center border text-neutral-600 hover:border-gold hover:text-gold">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.5 22H3.4l7.3-8.3L2.7 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.6 3.9H5.8L17.8 20z"/></svg>
                  </a>
                  <button onClick={copyLink} aria-label="Copy link" className="flex h-9 w-9 items-center justify-center border text-neutral-600 hover:border-gold hover:text-gold">
                    {copied ? <Check size={15} className="text-green-600" /> : <Copy size={15} />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* trust */}
          <div className="mt-8 grid gap-3 border-t pt-6 sm:grid-cols-3">
            {[
              { icon: Truck, text: 'Delivery 24–72h, 58 wilayas' },
              { icon: ShieldCheck, text: 'Cash on Delivery' },
              { icon: RotateCcw, text: '7-day size exchange' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-xs text-neutral-600">
                <Icon size={16} className="flex-shrink-0 text-gold" /> {text}
              </div>
            ))}
          </div>
          <p className="pt-4 text-[0.7rem] uppercase tracking-[0.15em] text-neutral-400">{product.fabric}</p>
        </div>
      </div>

      {/* ───── Tabs: Description / Reviews ───── */}
      <div className="mt-[clamp(3rem,6vw,5rem)] border-t">
        <div className="flex gap-8">
          {(['description', 'reviews'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative py-5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] transition-colors ${tab === t ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-700'}`}
            >
              {t === 'reviews' ? `Reviews (${allReviews.length})` : 'Description'}
              {tab === t && <span className="absolute inset-x-0 -top-px h-0.5 bg-gold" />}
            </button>
          ))}
        </div>

        {tab === 'description' ? (
          <div className="grid gap-10 py-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl font-bold">Product Details</h3>
              <p className="pt-4 leading-relaxed text-neutral-600">{product.description}</p>
              <p className="pt-3 text-neutral-500" dir="rtl">{product.arabicLine}</p>
            </div>
            <ul className="flex flex-col gap-3 text-sm text-neutral-600">
              {[
                ['Fabric', product.fabric],
                ['Fit', product.category === 'tshirts' ? 'Relaxed / Oversized' : 'Regular, true to size'],
                ['Care', 'Machine wash cold, hang dry, do not bleach'],
                ['Sizes available', product.sizes.join(' · ')],
                ['Colors available', product.colors.map((c) => c.name).join(' · ')],
                ['SKU', product.id.toUpperCase() + '-' + product.slug],
              ].map(([k, v]) => (
                <li key={k} className="flex gap-4 border-b border-neutral-100 pb-3">
                  <span className="w-36 flex-shrink-0 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-neutral-400">{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="grid gap-12 py-8 lg:grid-cols-[1fr_380px]">
            <div>
              <div className="flex items-center gap-4 pb-8">
                <span className="font-display text-5xl font-bold">{product.rating}</span>
                <div>
                  <Stars rating={product.rating} size={16} />
                  <p className="pt-1 text-sm text-neutral-500">Based on {product.reviewCount + localReviews.length} reviews</p>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {allReviews.map((r, i) => (
                  <div key={i} className="border-b border-neutral-100 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 font-display text-sm font-bold text-neutral-700">
                          {r.author.charAt(0)}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">{r.author}</p>
                          <Stars rating={r.rating} size={11} />
                        </div>
                      </div>
                      <span className="text-xs text-neutral-400">{r.date}</span>
                    </div>
                    <p className="pt-3 text-sm leading-relaxed text-neutral-600">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* write review */}
            <form onSubmit={submitReview} className="h-fit border bg-neutral-50/60 p-6">
              <h3 className="font-display text-xl font-bold">Write a Review</h3>
              <div className="flex flex-col gap-4 pt-5">
                <div>
                  <span className="label-caps">Your Rating</span>
                  <div className="flex gap-1.5 pt-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button type="button" key={n} onClick={() => setRevRating(n)} aria-label={`${n} stars`}>
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className={n <= revRating ? 'text-gold' : 'text-neutral-300'}>
                          <path d="M12 2l2.9 6.26 6.6.72-4.9 4.55 1.35 6.47L12 16.9 6.05 20l1.35-6.47-4.9-4.55 6.6-.72L12 2z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="label-caps">Name</span>
                  <input value={revName} onChange={(e) => setRevName(e.target.value)} required className="input-ms mt-2" placeholder="Your name" />
                </div>
                <div>
                  <span className="label-caps">Review</span>
                  <textarea value={revComment} onChange={(e) => setRevComment(e.target.value)} required rows={4} className="input-ms mt-2 resize-none" placeholder="Share your experience with this product…" />
                </div>
                <button type="submit" className="btn-navy w-full">Submit Review</button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ───── Related ───── */}
      <section className="mt-[clamp(3rem,6vw,5rem)]">
        <div className="pb-8 text-center">
          <p className="label-caps pb-3">Complete the Look</p>
          <h2 className="heading-section">Related Products</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
};
