import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '@/data/products';
import type { Product } from '@/data/products';

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  qty: number;
}

export interface OrderItem extends CartItem {
  name: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  fullName: string;
  phone: string;
  wilaya: string;
  address: string;
  payment: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Delivered';
}

export interface User {
  name: string;
  phone: string;
  password: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  cartOpen: boolean;
  coupon: string | null;
  setCartOpen: (open: boolean) => void;
  addToCart: (productId: string, size: string, color: string, qty?: number) => void;
  updateQty: (index: number, qty: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  applyCoupon: (code: string) => boolean;
  register: (name: string, phone: string, password: string) => { ok: boolean; error?: string };
  login: (phone: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  placeOrder: (info: { fullName: string; phone: string; wilaya: string; address: string; payment: string }) => Order;
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  getProduct: (id: string) => Product | undefined;
}

const StoreContext = createContext<StoreState | null>(null);

const load = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => load('ms_cart', []));
  const [wishlist, setWishlist] = useState<string[]>(() => load('ms_wishlist', []));
  const [user, setUser] = useState<User | null>(() => load('ms_user', null));
  const [orders, setOrders] = useState<Order[]>(() => load('ms_orders', []));
  const [cartOpen, setCartOpen] = useState(false);
  const [coupon, setCoupon] = useState<string | null>(null);

  useEffect(() => localStorage.setItem('ms_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('ms_wishlist', JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem('ms_user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('ms_orders', JSON.stringify(orders)), [orders]);

  const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

  const addToCart = (productId: string, size: string, color: string, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.productId === productId && i.size === size && i.color === color);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { productId, size, color, qty }];
    });
    setCartOpen(true);
  };

  const updateQty = (index: number, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((_, i) => i !== index);
      const next = [...prev];
      next[index] = { ...next[index], qty };
      return next;
    });
  };

  const removeFromCart = (index: number) => setCart((prev) => prev.filter((_, i) => i !== index));
  const clearCart = () => { setCart([]); setCoupon(null); };

  const toggleWishlist = (productId: string) =>
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));

  const applyCoupon = (code: string) => {
    if (code.trim().toUpperCase() === 'MASTER10') {
      setCoupon('MASTER10');
      return true;
    }
    return false;
  };

  const register = (name: string, phone: string, password: string) => {
    const users: User[] = load('ms_users', []);
    if (users.some((u) => u.phone === phone)) return { ok: false, error: 'An account with this phone number already exists.' };
    const u = { name, phone, password };
    localStorage.setItem('ms_users', JSON.stringify([...users, u]));
    setUser(u);
    return { ok: true };
  };

  const login = (phone: string, password: string) => {
    const users: User[] = load('ms_users', []);
    const found = users.find((u) => u.phone === phone && u.password === password);
    if (!found) return { ok: false, error: 'Invalid phone number or password.' };
    setUser(found);
    return { ok: true };
  };

  const logout = () => setUser(null);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + (getProduct(item.productId)?.price ?? 0) * item.qty, 0),
    [cart]
  );
  const discount = coupon === 'MASTER10' ? Math.round(subtotal * 0.1) : 0;
  const shipping = cart.length === 0 ? 0 : subtotal - discount >= 10000 ? 0 : 500;
  const total = Math.max(0, subtotal - discount + shipping);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const placeOrder: StoreState['placeOrder'] = (info) => {
    const items: OrderItem[] = cart.map((i) => {
      const p = getProduct(i.productId)!;
      return { ...i, name: p.name, price: p.price, image: p.image };
    });
    const order: Order = {
      id: 'MS-' + Date.now().toString(36).toUpperCase(),
      date: new Date().toISOString(),
      ...info,
      items,
      subtotal,
      shipping,
      discount,
      total,
      status: 'Pending',
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    return order;
  };

  const value: StoreState = {
    cart, wishlist, user, orders, cartOpen, coupon,
    setCartOpen, addToCart, updateQty, removeFromCart, clearCart, toggleWishlist,
    applyCoupon, register, login, logout, placeOrder,
    cartCount, subtotal, discount, shipping, total, getProduct,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
};
