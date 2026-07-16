import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { StoreProvider } from '@/context/StoreContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { ProductPage } from '@/pages/ProductPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrderSuccessPage } from '@/pages/OrderSuccessPage';
import { LoginPage, RegisterPage, ForgotPasswordPage } from '@/pages/AuthPages';
import { AccountPage } from '@/pages/AccountPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { SearchPage } from '@/pages/SearchPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { ContactPage } from '@/pages/ContactPage';
import { Link } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname, search]);
  return null;
}

function NotFound() {
  return (
    <div className="container-ms flex flex-col items-center gap-5 py-32 text-center">
      <p className="font-display text-7xl font-black text-gold">404</p>
      <h1 className="font-display text-3xl font-bold">Page not found</h1>
      <Link to="/" className="btn-navy">Back to Home</Link>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/category/polos" element={<ShopPage key="polos" initialCategory="polos" />} />
            <Route path="/category/tshirts" element={<ShopPage key="tshirts" initialCategory="tshirts" />} />
            <Route path="/category/pants" element={<ShopPage key="pants" initialCategory="pants" />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <CartDrawer />
    </StoreProvider>
  );
}
