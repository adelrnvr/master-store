import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Banknote, Lock, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { fmt, WILAYAS } from '@/data/products';

export const CheckoutPage: React.FC = () => {
  const { cart, getProduct, subtotal, discount, shipping, placeOrder, user } = useStore();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [wilaya, setWilaya] = useState('Alger');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('Cash on Delivery');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tax = Math.round((subtotal - discount) * 0.08);
  const grand = subtotal - discount + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="container-ms flex flex-col items-center gap-5 py-32 text-center">
        <ShoppingBag size={44} className="text-neutral-300" />
        <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
        <Link to="/shop" className="btn-navy">Continue Shopping</Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (fullName.trim().length < 3) errs.fullName = 'Please enter your full name';
    if (!/^[0-9+\s]{9,14}$/.test(phone.trim())) errs.phone = 'Please enter a valid phone number';
    if (address.trim().length < 5) errs.address = 'Please enter your full address';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const order = placeOrder({ fullName: fullName.trim(), phone: phone.trim(), wilaya, address: address.trim(), payment });
    navigate('/order-success', { state: { orderId: order.id } });
  };

  return (
    <div className="container-ms py-[clamp(2rem,5vw,4rem)]">
      <div className="pb-8">
        <p className="label-caps pb-2">Secure Checkout</p>
        <h1 className="heading-section">Checkout</h1>
      </div>

      <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_420px]">
        {/* shipping info */}
        <div className="h-fit border p-[clamp(1.25rem,3vw,2.5rem)]">
          <h2 className="font-display text-2xl font-bold">Shipping Information</h2>
          <div className="flex flex-col gap-5 pt-7">
            <div>
              <span className="label-caps">Full Name</span>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="input-ms mt-2" placeholder="Your full name" />
              {errors.fullName && <p className="pt-1 text-xs text-red-600">{errors.fullName}</p>}
            </div>
            <div>
              <span className="label-caps">Phone Number</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input-ms mt-2" placeholder="Phone number" inputMode="tel" />
              {errors.phone && <p className="pt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>
            <div>
              <span className="label-caps">Wilaya</span>
              <select value={wilaya} onChange={(e) => setWilaya(e.target.value)} className="input-ms mt-2">
                {WILAYAS.map((w, i) => <option key={w} value={w}>{String(i + 1).padStart(2, '0')} — {w}</option>)}
              </select>
            </div>
            <div>
              <span className="label-caps">Address</span>
              <input value={address} onChange={(e) => setAddress(e.target.value)} className="input-ms mt-2" placeholder="Your shipping address" />
              {errors.address && <p className="pt-1 text-xs text-red-600">{errors.address}</p>}
            </div>
            <div>
              <span className="label-caps">Payment Method</span>
              <div className="mt-2 flex flex-col gap-2.5">
                <label className={`flex cursor-pointer items-center gap-3 border p-4 transition-colors ${payment === 'Cash on Delivery' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-300'}`}>
                  <input type="radio" name="payment" checked={payment === 'Cash on Delivery'} onChange={() => setPayment('Cash on Delivery')} className="accent-neutral-900" />
                  <Banknote size={18} className="text-gold" />
                  <div>
                    <p className="text-sm font-semibold">Cash on Delivery</p>
                    <p className="text-xs text-neutral-500">Pay in cash when your order arrives</p>
                  </div>
                </label>
                <label className="flex cursor-not-allowed items-center gap-3 border border-neutral-200 p-4 opacity-50">
                  <input type="radio" name="payment" disabled className="accent-neutral-900" />
                  <Lock size={18} className="text-neutral-400" />
                  <div>
                    <p className="text-sm font-semibold">Card Payment (CIB / EDAHABIA)</p>
                    <p className="text-xs text-neutral-500">Coming soon</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* order summary */}
        <div className="h-fit border bg-neutral-50/50 p-[clamp(1.25rem,3vw,2rem)]">
          <h2 className="font-display text-xl font-bold">Order Summary</h2>
          <div className="flex flex-col gap-4 border-b py-5">
            {cart.map((item) => {
              const p = getProduct(item.productId);
              if (!p) return null;
              return (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center gap-3">
                  <div className="relative h-16 w-14 flex-shrink-0 bg-white">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-[0.6rem] font-bold text-white">{item.qty}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight">{p.name}</p>
                    <p className="text-xs text-neutral-500">{item.size} · {item.color}</p>
                  </div>
                  <span className="text-sm font-semibold">{fmt(p.price * item.qty)}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 py-5 text-sm">
            <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span>{fmt(subtotal)}.00</span></div>
            {discount > 0 && <div className="flex justify-between text-gold"><span>Discount (MASTER10)</span><span>-{fmt(discount)}.00</span></div>}
            <div className="flex justify-between"><span className="text-neutral-600">Shipping</span><span>{shipping === 0 ? 'Free' : fmt(shipping) + '.00'}</span></div>
            <div className="flex justify-between"><span className="text-neutral-600">Tax (8%)</span><span>{fmt(tax)}.00</span></div>
          </div>
          <div className="flex justify-between border-t pt-4">
            <span className="font-display text-lg font-bold">Total</span>
            <span className="font-display text-lg font-bold">{fmt(grand)}.00</span>
          </div>
          <button type="submit" className="btn-navy mt-5 w-full py-4">Place Order</button>
          <p className="flex items-center justify-center gap-2 pt-4 text-[0.68rem] uppercase tracking-[0.15em] text-neutral-400">
            <Lock size={12} /> Your information is secure
          </p>
        </div>
      </form>
    </div>
  );
};
