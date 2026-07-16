import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { fmt } from '@/data/products';

export const OrdersPage: React.FC = () => {
  const { orders, user } = useStore();

  return (
    <div className="container-ms py-[clamp(2rem,5vw,4rem)]">
      <div className="pb-8">
        <p className="label-caps pb-2">{user ? user.name : 'Guest'}</p>
        <h1 className="heading-section">My Orders</h1>
        <p className="pt-2 text-sm text-neutral-500">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-5 border border-dashed py-24 text-center">
          <Package size={44} className="text-neutral-300" />
          <p className="font-display text-2xl text-neutral-700">No orders yet</p>
          <p className="text-sm text-neutral-500">When you place an order, it will appear here.</p>
          <Link to="/shop" className="btn-navy mt-2">Start Shopping</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((o) => (
            <div key={o.id} className="border">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-neutral-50/60 px-5 py-4">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-1">
                  <div>
                    <p className="label-caps">Order</p>
                    <p className="text-sm font-bold">{o.id}</p>
                  </div>
                  <div>
                    <p className="label-caps">Date</p>
                    <p className="text-sm">{new Date(o.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="label-caps">Ship To</p>
                    <p className="text-sm">{o.wilaya}</p>
                  </div>
                  <div>
                    <p className="label-caps">Payment</p>
                    <p className="text-sm">{o.payment}</p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-amber-800">
                  {o.status}
                </span>
              </div>
              <div className="flex flex-col divide-y">
                {o.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-4">
                    <div className="h-16 w-14 flex-shrink-0 bg-[#f7f7f7]">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-neutral-500">Size {item.size} · {item.color} · Qty {item.qty}</p>
                    </div>
                    <span className="text-sm font-semibold">{fmt(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-8 border-t px-5 py-4 text-sm">
                {o.discount > 0 && <span className="text-gold">Discount -{fmt(o.discount)}</span>}
                <span className="text-neutral-500">Shipping {o.shipping === 0 ? 'Free' : fmt(o.shipping)}</span>
                <span className="font-display text-base font-bold">Total {fmt(o.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
