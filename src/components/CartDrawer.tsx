import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { fmt } from '@/data/products';

export const CartDrawer: React.FC = () => {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, clearCart, toggleWishlist, applyCoupon, coupon, subtotal, discount, shipping, total, getProduct } = useStore();
  const [code, setCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const navigate = useNavigate();

  if (!cartOpen) return null;

  const tax = Math.round((subtotal - discount) * 0.08);
  const grand = total + tax;

  const submitCoupon = () => {
    if (!code.trim()) return;
    if (applyCoupon(code)) {
      setCouponMsg('Coupon applied: 10% off');
    } else {
      setCouponMsg('Invalid coupon code');
    }
  };

  return (
    <div className="animate-overlay-in fixed inset-0 z-[60] bg-black/50" onClick={() => setCartOpen(false)}>
      <aside
        className="animate-drawer-in fixed inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h3 className="font-display text-2xl font-bold text-neutral-900">
            Your Cart ({cart.reduce((s, i) => s + i.qty, 0)} {cart.reduce((s, i) => s + i.qty, 0) === 1 ? 'item' : 'items'})
          </h3>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart" className="text-neutral-500 transition-colors hover:text-neutral-900">
            <X size={22} />
          </button>
        </div>

        {/* items */}
        <div className="flex-1 overflow-y-auto px-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingCart size={44} className="text-neutral-300" />
              <p className="font-display text-xl text-neutral-700">Your cart is empty</p>
              <button onClick={() => { setCartOpen(false); navigate('/shop'); }} className="btn-navy mt-2">
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item, idx) => {
              const p = getProduct(item.productId);
              if (!p) return null;
              return (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 border-b py-5">
                  <Link to={`/product/${p.slug}`} onClick={() => setCartOpen(false)} className="h-28 w-24 flex-shrink-0 bg-[#f7f7f7]">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link to={`/product/${p.slug}`} onClick={() => setCartOpen(false)} className="text-sm font-semibold text-neutral-900 hover:text-gold">
                          {p.name}
                        </Link>
                        <p className="pt-1 text-xs text-neutral-500">
                          Size: {item.size} &nbsp;·&nbsp; <span className="inline-block h-2.5 w-2.5 rounded-full border align-middle" style={{ backgroundColor: p.colors.find((c) => c.name === item.color)?.hex }} /> {item.color}
                        </p>
                        <p className="pt-1 text-sm text-neutral-700">{fmt(p.price)}.00</p>
                      </div>
                      <span className="text-sm font-bold text-neutral-900">{fmt(p.price * item.qty)}.00</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border">
                        <button onClick={() => updateQty(idx, item.qty - 1)} className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-50" aria-label="Decrease"><Minus size={13} /></button>
                        <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                        <button onClick={() => updateQty(idx, item.qty + 1)} className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-50" aria-label="Increase"><Plus size={13} /></button>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => removeFromCart(idx)} className="flex items-center gap-1 text-xs text-neutral-500 hover:text-red-600" aria-label="Remove">
                          <Trash2 size={13} />
                        </button>
                        <button
                          onClick={() => { toggleWishlist(p.id); removeFromCart(idx); }}
                          className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-gold"
                        >
                          <Heart size={13} /> Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* summary */}
        {cart.length > 0 && (
          <div className="border-t px-6 py-5">
            <div className="flex flex-col gap-2 pb-4 text-sm">
              <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span className="font-medium">{fmt(subtotal)}.00</span></div>
              <div className="flex justify-between"><span className="text-neutral-600">Shipping</span><span className="font-medium">{shipping === 0 ? '$0.00' : fmt(shipping) + '.00'}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-gold"><span>Discount (MASTER10)</span><span>-{fmt(discount)}.00</span></div>
              )}
              <div className="flex justify-between"><span className="text-neutral-600">Tax (8%)</span><span className="font-medium">{fmt(tax)}.00</span></div>
            </div>

            {/* coupon */}
            <div className="flex pb-1">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Coupon code"
                className="input-ms border-r-0 text-sm"
              />
              <button onClick={submitCoupon} className="bg-neutral-900 px-5 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-gold">
                Apply
              </button>
            </div>
            {couponMsg && <p className={`pb-1 pt-1.5 text-xs ${coupon ? 'text-green-600' : 'text-red-600'}`}>{couponMsg}</p>}
            <p className="pb-3 pt-1 text-[0.65rem] text-neutral-400">Try code: MASTER10</p>

            <div className="flex justify-between border-t pt-4">
              <span className="font-display text-lg font-bold">Total</span>
              <span className="font-display text-lg font-bold">{fmt(grand)}.00</span>
            </div>

            <button
              onClick={() => { setCartOpen(false); navigate('/checkout'); }}
              className="btn-gold mt-4 w-full py-4"
            >
              <ShoppingCart size={16} /> Proceed to Checkout
            </button>
            <button onClick={() => setCartOpen(false)} className="w-full py-3 text-center text-sm text-neutral-600 underline-offset-4 hover:underline">
              Continue Shopping
            </button>
            <button onClick={clearCart} className="flex w-full items-center justify-center gap-2 border border-neutral-300 py-3 text-[0.72rem] uppercase tracking-[0.15em] text-neutral-600 transition-colors hover:border-red-500 hover:text-red-600">
              <Trash2 size={14} /> Clear Cart
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
