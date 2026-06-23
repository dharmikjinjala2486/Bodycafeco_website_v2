import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Learn } from './pages/Learn';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { CartPage } from './pages/CartPage';
import { Checkout } from './pages/Checkout';

// Scroll to top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior // instantaneous jump for route changes
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-bg-soft text-text-body font-sans antialiased">
          
          {/* Header Shell */}
          <Header />

          {/* Slide-over Ritual Bag */}
          <CartDrawer />

          {/* Main Routing Container */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>

          {/* Editorial Footer */}
          <Footer />

        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
