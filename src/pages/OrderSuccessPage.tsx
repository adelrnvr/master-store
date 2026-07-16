import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { state } = useLocation() as { state: { orderId?: string } | null };
  return (
    <div className="container-ms flex flex-col items-center gap-5 py-[clamp(4rem,10vw,8rem)] text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
        <CheckCircle2 size={44} className="text-gold" />
      </span>
      <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-bold">Order Confirmed</h1>
      {state?.orderId && (
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">Order № <span className="font-bold text-neutral-900">{state.orderId}</span></p>
      )}
      <p className="max-w-md text-neutral-600">
        Thank you for shopping with Master Store. Our team will call you shortly to confirm your order. Payment is cash on delivery.
      </p>
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Link to="/orders" className="btn-navy">Track My Orders</Link>
        <Link to="/shop" className="btn-outline">Continue Shopping</Link>
      </div>
    </div>
  );
};
