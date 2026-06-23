import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowRight, User, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { AnimatePresence, motion } from 'framer-motion';
import { getProductImage } from '../assets/productImages';

export const Header: React.FC = () => {
  const { toggleCart, cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'shop' | 'learn' | 'about' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);

  // Mobile drawer accordions state
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else if (currentScrollY <= 5) {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const headerRef = useRef<HTMLDivElement>(null);

  // Close overlays on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    setSearchOpen(false);
    setSearchQuery('');
    setAccountOpen(false);
    setMobileShopOpen(false);
    setMobileLearnOpen(false);
    setMobileAboutOpen(false);
  }, [location]);

  // Click outside header to close search or account overlays
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for search
  const searchedProducts = searchQuery.trim() === ''
    ? []
    : products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Fetch products for shop mega menu editorial cards
  const shopEditorialProducts = products.filter(p =>
    ['creatine-monohydrate', 'vitamin-d3-k2', 'omega-3-fish-oil'].includes(p.id)
  );

  const learnCards = [
    {
      title: 'Science Backed Formulas',
      category: 'CLINICAL LITERATURE',
      desc: 'Deep dive into chemical configurations and molecular pathways.',
      link: '/learn?cat=science',
      color: '#B51E2E'
    },
    {
      title: 'Wellness Guides',
      category: 'HEALTH PROTOCOLS',
      desc: 'Step-by-step guides on building long-term physiological resilience.',
      link: '/learn?cat=protocols',
      color: '#222222'
    },
    {
      title: 'Daily Rituals',
      category: 'BEHAVIORAL HABITS',
      desc: 'Integrate pure mineral and botanical compounds into daily habits.',
      link: '/learn?cat=ingredients',
      color: '#222222'
    }
  ];

  const aboutCards = [
    {
      title: 'Our Story',
      category: 'TRANSPARENCY',
      desc: 'The philosophy of active ingredients, clinical dosage, and zero filler.',
      link: '/about',
      color: '#222222'
    },
    {
      title: 'Quality Standards',
      category: 'CLINICAL PURITY',
      desc: 'Third-party validation, organic certification, and heavy metal testing.',
      link: '/about',
      color: '#222222'
    },
    {
      title: 'Manufacturing',
      category: 'SOURCE CONTROL',
      desc: 'Synthesized in specialized German and US pharmaceutical-grade facilities.',
      link: '/about',
      color: '#222222'
    }
  ];

  return (
    <div ref={headerRef} className="sticky top-0 z-50 w-full flex flex-col font-sans">

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <motion.div
        initial={false}
        animate={{ height: isScrolled ? 0 : 48 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="overflow-hidden bg-[#B51E2E] text-white flex items-center justify-center font-semibold text-xs md:text-sm tracking-wider select-none"
      >
        <div className="h-[48px] flex items-center justify-center">
          FREE SHIPPING ON ALL ORDERS ₹999+
        </div>
      </motion.div>

      {/* 2. MAIN HEADER */}
      <header className="w-full bg-white border-b border-[#E5E5E5] h-[85px] relative">
        <div className="max-w-[1440px] h-full mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* LEFT: Body Cafe Co Logo */}
          <div className="flex items-center justify-start flex-shrink-0 lg:w-1/4">
            <Link to="/" className="hover:opacity-85 transition-opacity select-none flex items-center">
              <img
                src="/Logo/Body Cafe Co logo Black.png"
                alt="Body Cafe Co."
                className="h-14 md:h-16 lg:h-18 w-auto object-contain"
              />
            </Link>
          </div>

          {/* CENTER: Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center justify-center gap-10 lg:w-2/4 h-full">
            <Link
              to="/shop"
              onMouseEnter={() => {
                setActiveMegaMenu('shop');
                setSearchOpen(false);
                setAccountOpen(false);
              }}
              className="text-[#222222] hover:text-black font-semibold text-[18px] transition-colors duration-300 py-8 flex items-center gap-1"
            >
              Shop
            </Link>
            <Link
              to="/learn"
              onMouseEnter={() => {
                setActiveMegaMenu('learn');
                setSearchOpen(false);
                setAccountOpen(false);
              }}
              className="text-[#222222] hover:text-black font-semibold text-[18px] transition-colors duration-300 py-8 flex items-center gap-1"
            >
              Learn
            </Link>
            <Link
              to="/about"
              onMouseEnter={() => {
                setActiveMegaMenu('about');
                setSearchOpen(false);
                setAccountOpen(false);
              }}
              className="text-[#222222] hover:text-black font-semibold text-[18px] transition-colors duration-300 py-8 flex items-center gap-1"
            >
              About Us
            </Link>
            <Link
              to="/learn?cat=science"
              onMouseEnter={() => setActiveMegaMenu(null)}
              className="text-[#222222] hover:text-black font-semibold text-[18px] transition-colors duration-300 py-8"
            >
              Science
            </Link>
            <Link
              to="/contact"
              onMouseEnter={() => setActiveMegaMenu(null)}
              className="text-[#222222] hover:text-black font-semibold text-[18px] transition-colors duration-300 py-8"
            >
              Contact
            </Link>
          </nav>

          {/* RIGHT: Actions (Search, Account, Cart) */}
          <div className="flex items-center justify-end gap-6 lg:w-1/4">

            {/* Search Trigger */}
            <button
              onClick={() => {
                setSearchOpen(prev => !prev);
                setAccountOpen(false);
                setActiveMegaMenu(null);
              }}
              className="p-1 text-[#222222] hover:text-black transition-colors"
              aria-label="Search site"
            >
              <Search size={24} strokeWidth={1.5} />
            </button>

            {/* Account Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setAccountOpen(prev => !prev);
                  setSearchOpen(false);
                  setActiveMegaMenu(null);
                }}
                className="p-1 text-[#222222] hover:text-black transition-colors"
                aria-label="User Account"
              >
                <User size={24} strokeWidth={1.5} />
              </button>

              {/* Account Dropdown Overlay */}
              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-60 bg-white border border-[#E5E5E5] shadow-xl z-50 p-4 font-sans text-left"
                  >
                    <div className="border-b border-[#E5E5E5] pb-3 mb-3">
                      <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Portal Access</p>
                      <p className="text-xs text-text-secondary mt-1">Manage your subscriptions and tracker reports.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => { setAccountOpen(false); alert("Account portal is currently offline for system maintenance."); }}
                        className="text-left text-xs uppercase tracking-wide font-bold text-text-dark hover:text-text-secondary transition-colors py-1"
                      >
                        Sign In / Register
                      </button>
                      <button
                        onClick={() => { setAccountOpen(false); alert("Track Batch portal will open in transparency section."); }}
                        className="text-left text-xs uppercase tracking-wide font-bold text-text-dark hover:text-text-secondary transition-colors py-1"
                      >
                        Batch Certificates
                      </button>
                      <Link
                        to="/checkout"
                        onClick={() => setAccountOpen(false)}
                        className="text-left text-xs uppercase tracking-wide font-bold text-text-dark hover:text-text-secondary transition-colors py-1"
                      >
                        My Subscriptions
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Trigger */}
            <button
              onClick={toggleCart}
              className="relative p-1 text-[#222222] hover:text-black transition-colors flex items-center justify-center"
              aria-label="Open Cart"
            >
              <ShoppingBag size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#B51E2E] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger (Below 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-1 text-[#222222] hover:text-black transition-colors"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* 3. SEARCH OVERLAY PANEL */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-full left-0 right-0 w-full bg-white border-b border-[#E5E5E5] shadow-lg z-50 overflow-hidden"
            >
              <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
                <div className="relative flex items-center">
                  <Search size={20} className="absolute left-4 text-text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search our science-backed formulations (e.g. Creatine, Omega)..."
                    className="w-full pl-12 pr-12 py-4 bg-bg-soft border border-[#E5E5E5] text-text-dark font-sans text-sm focus:outline-none focus:border-text-dark transition-colors"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 p-1 text-text-muted hover:text-text-dark transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Search Results Display */}
                {searchQuery && (
                  <div className="flex flex-col text-left max-h-[300px] overflow-y-auto divide-y divide-[#E5E5E5]">
                    {searchedProducts.length > 0 ? (
                      searchedProducts.map(p => (
                        <Link
                          key={p.id}
                          to={`/product/${p.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="py-3 px-4 hover:bg-bg-soft flex items-center justify-between group transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white flex-shrink-0 flex items-center justify-center p-1 border border-[#E5E5E5]">
                              <div className="w-2 h-6 bg-[#3A2312] border-r border-white/5 shadow-sm" />
                            </div>
                            <div>
                              <span className="text-xs uppercase font-bold text-text-dark group-hover:text-text-secondary transition-colors block">{p.name}</span>
                              <span className="text-[10px] text-text-secondary line-clamp-1">{p.tagline}</span>
                            </div>
                          </div>
                          <span className="text-[10px] uppercase font-bold text-text-muted flex items-center gap-1">
                            Explore Formula <ArrowRight size={10} />
                          </span>
                        </Link>
                      ))
                    ) : (
                      <p className="text-xs text-text-muted text-center py-6">No matching formulations found for "{searchQuery}".</p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. DESKTOP MEGA MENUS */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onMouseLeave={() => setActiveMegaMenu(null)}
              className="hidden lg:block absolute top-full left-0 right-0 w-full bg-[#F5F5F5] border-b border-[#E5E5E5] shadow-md z-40 h-[420px] px-20 py-[60px]"
            >
              {activeMegaMenu === 'shop' && (
                <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8 h-full font-sans text-left">

                  {/* Left Column: Featured */}
                  <div className="col-span-3 flex flex-col space-y-6">
                    <h4 className="text-xs font-bold tracking-superwide text-[#B51E2E] uppercase">FEATURED</h4>
                    <div className="flex flex-col space-y-3.5 text-base font-normal">
                      <Link to="/shop" className="text-text-secondary hover:text-black transition-colors">All Products</Link>
                      <Link to="/shop" className="text-text-secondary hover:text-black transition-colors">Best Sellers</Link>
                      <Link to="/shop" className="text-text-secondary hover:text-black transition-colors">New Arrivals</Link>
                      <Link to="/shop" className="text-text-secondary hover:text-black transition-colors">Bundles</Link>
                    </div>
                  </div>

                  {/* Middle Column: Shop by Category */}
                  <div className="col-span-4 flex flex-col space-y-6 border-l border-[#E5E5E5] pl-8">
                    <h4 className="text-xs font-semibold tracking-superwide text-[#222222] uppercase">SHOP BY CATEGORY</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm font-normal">
                      <Link to="/product/creatine-monohydrate" className="text-text-secondary hover:text-black transition-colors">Creatine Monohydrate</Link>
                      <Link to="/product/vitamin-d3-k2" className="text-text-secondary hover:text-black transition-colors">Vitamin D3 + K2</Link>
                      <Link to="/product/omega-3-fish-oil" className="text-text-secondary hover:text-black transition-colors">Omega-3 Fish Oil</Link>
                      <Link to="/product/magnesium-bisglycinate" className="text-text-secondary hover:text-black transition-colors">Magnesium Bisglycinate</Link>
                      <Link to="/product/iron-bisglycinate" className="text-text-secondary hover:text-black transition-colors">Iron Bisglycinate</Link>
                      <Link to="/product/l-theanine" className="text-text-secondary hover:text-black transition-colors">L-Theanine</Link>
                      <Link to="/product/psyllium-husk" className="text-text-secondary hover:text-black transition-colors">Psyllium Husk</Link>
                      <Link to="/product/affron-saffron" className="text-text-secondary hover:text-black transition-colors">Affron Saffron</Link>
                    </div>
                  </div>

                  {/* Right Column: Editorial Product Cards */}
                  <div className="col-span-5 flex flex-col justify-between">
                    <div className="grid grid-cols-3 gap-6 h-full">
                      {shopEditorialProducts.map(p => (
                        <Link
                          key={p.id}
                          to={`/product/${p.slug}`}
                          onClick={() => setActiveMegaMenu(null)}
                          className="group flex flex-col h-full text-left"
                        >
                          <div className="w-full aspect-[3.2/4] bg-white border border-[#E5E5E5] overflow-hidden flex items-center justify-center relative">
                            <div className="w-full h-full transition-transform duration-500 group-hover:scale-105 flex items-center justify-center bg-[#F8F7F4]">
                            {(() => {
                              const src = getProductImage(p.id);
                              return src ? (
                                <img src={src} alt={p.name} className="w-full h-full object-contain p-4" />
                              ) : (
                                <span className="text-[10px] uppercase text-text-muted">{p.name}</span>
                              );
                            })()}
                            </div>
                          </div>
                          <span className="mt-3 text-xs md:text-sm uppercase tracking-wider font-semibold text-text-dark group-hover:opacity-75 transition-opacity text-left">
                            {p.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {activeMegaMenu === 'learn' && (
                <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8 h-full font-sans text-left">

                  {/* Left Column: Learn Categories */}
                  <div className="col-span-3 flex flex-col space-y-6">
                    <h4 className="text-xs font-bold tracking-superwide text-[#B51E2E] uppercase">LEARN</h4>
                    <div className="flex flex-col space-y-3.5 text-base font-normal">
                      <Link to="/learn" className="text-text-secondary hover:text-black transition-colors">Articles</Link>
                      <Link to="/learn?cat=science" className="text-text-secondary hover:text-black transition-colors">Research</Link>
                      <Link to="/learn?cat=ingredients" className="text-text-secondary hover:text-black transition-colors">Ingredient Library</Link>
                      <Link to="/learn?cat=protocols" className="text-text-secondary hover:text-black transition-colors">Health Guides</Link>
                      <Link to="/learn" className="text-text-secondary hover:text-black transition-colors">FAQ</Link>
                    </div>
                  </div>

                  {/* Right Side: Editorial Cards */}
                  <div className="col-span-9 border-l border-[#E5E5E5] pl-8 flex flex-col justify-between">
                    <div className="grid grid-cols-3 gap-6 h-full">
                      {learnCards.map((card, idx) => (
                        <Link
                          key={idx}
                          to={card.link}
                          onClick={() => setActiveMegaMenu(null)}
                          className="group flex flex-col h-full text-left"
                        >
                          <div className="w-full aspect-[4/3] bg-white border border-[#E5E5E5] overflow-hidden flex flex-col justify-between p-5 relative transition-shadow duration-300 hover:shadow-sm">
                            <span className="text-[9px] uppercase tracking-superwide font-bold" style={{ color: card.color }}>
                              {card.category}
                            </span>

                            <div className="space-y-1 relative z-10 transition-transform duration-500 group-hover:scale-105 origin-bottom-left text-left">
                              <h4 className="text-sm font-light text-text-dark leading-tight">{card.title}</h4>
                              <p className="text-[10px] text-text-secondary leading-relaxed font-light">{card.desc}</p>
                            </div>
                          </div>
                          <span className="mt-3 text-xs uppercase tracking-wider font-semibold text-text-dark group-hover:opacity-75 transition-opacity text-left flex items-center gap-1">
                            Explore {card.title} <ArrowRight size={12} />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {activeMegaMenu === 'about' && (
                <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8 h-full font-sans text-left">

                  {/* Left Column: About Us */}
                  <div className="col-span-3 flex flex-col space-y-6">
                    <h4 className="text-xs font-bold tracking-superwide text-[#B51E2E] uppercase">ABOUT US</h4>
                    <div className="flex flex-col space-y-3.5 text-base font-normal">
                      <Link to="/about" className="text-text-secondary hover:text-black transition-colors">Our Story</Link>
                      <Link to="/about" className="text-text-secondary hover:text-black transition-colors">Mission</Link>
                      <Link to="/about" className="text-text-secondary hover:text-black transition-colors">Quality Standards</Link>
                      <Link to="/about" className="text-text-secondary hover:text-black transition-colors">Manufacturing</Link>
                      <Link to="/contact" className="text-text-secondary hover:text-black transition-colors">Contact</Link>
                    </div>
                  </div>

                  {/* Right Side: Brand Imagery Cards */}
                  <div className="col-span-9 border-l border-[#E5E5E5] pl-8 flex flex-col justify-between">
                    <div className="grid grid-cols-3 gap-6 h-full">
                      {aboutCards.map((card, idx) => (
                        <Link
                          key={idx}
                          to={card.link}
                          onClick={() => setActiveMegaMenu(null)}
                          className="group flex flex-col h-full text-left"
                        >
                          <div className="w-full aspect-[4/3] bg-white border border-[#E5E5E5] overflow-hidden flex flex-col justify-between p-5 relative transition-shadow duration-300 hover:shadow-sm">
                            <span className="text-[9px] uppercase tracking-superwide font-bold text-text-muted">
                              {card.category}
                            </span>

                            <div className="space-y-1 relative z-10 transition-transform duration-500 group-hover:scale-105 origin-bottom-left text-left">
                              <h4 className="text-sm font-light text-text-dark leading-tight">{card.title}</h4>
                              <p className="text-[10px] text-text-secondary leading-relaxed font-light">{card.desc}</p>
                            </div>
                          </div>
                          <span className="mt-3 text-xs uppercase tracking-wider font-semibold text-text-dark group-hover:opacity-75 transition-opacity text-left flex items-center gap-1">
                            {card.title} Ethos <ArrowRight size={12} />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 5. MOBILE DRAWER OVERLAY (Below 1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, top: isScrolled ? 85 : 133 }}
            animate={{ 
              opacity: 1, 
              height: isScrolled ? 'calc(100vh - 85px)' : 'calc(100vh - 133px)',
              top: isScrolled ? 85 : 133 
            }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="lg:hidden fixed left-0 right-0 w-full bg-[#F5F5F5] border-t border-[#E5E5E5] shadow-2xl z-40 overflow-y-auto"
          >
            <div className="p-6 flex flex-col gap-6 text-left font-sans">

              {/* Accordion 1: Shop */}
              <div className="border-b border-[#E5E5E5] pb-4">
                <button
                  onClick={() => setMobileShopOpen(prev => !prev)}
                  className="w-full flex items-center justify-between py-2 text-lg font-semibold text-text-dark uppercase tracking-wide"
                >
                  <span>Shop</span>
                  {mobileShopOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {mobileShopOpen && (
                  <div className="flex flex-col gap-3 pl-4 pt-3 text-sm text-text-secondary text-left">
                    <Link to="/shop" className="py-1">All Products</Link>
                    <Link to="/shop" className="py-1">Best Sellers</Link>
                    <Link to="/shop" className="py-1">New Arrivals</Link>
                    <Link to="/shop" className="py-1">Bundles</Link>
                    <hr className="border-[#E5E5E5] my-1" />
                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider block mt-1">Categories</span>
                    <Link to="/product/creatine-monohydrate" className="py-1 pl-2">Creatine Monohydrate</Link>
                    <Link to="/product/vitamin-d3-k2" className="py-1 pl-2">Vitamin D3 + K2</Link>
                    <Link to="/product/omega-3-fish-oil" className="py-1 pl-2">Omega-3 Fish Oil</Link>
                    <Link to="/product/magnesium-bisglycinate" className="py-1 pl-2">Magnesium Bisglycinate</Link>
                    <Link to="/product/iron-bisglycinate" className="py-1 pl-2">Iron Bisglycinate</Link>
                    <Link to="/product/l-theanine" className="py-1 pl-2">L-Theanine</Link>
                    <Link to="/product/psyllium-husk" className="py-1 pl-2">Psyllium Husk</Link>
                    <Link to="/product/affron-saffron" className="py-1 pl-2">Affron Saffron</Link>
                  </div>
                )}
              </div>

              {/* Accordion 2: Learn */}
              <div className="border-b border-[#E5E5E5] pb-4">
                <button
                  onClick={() => setMobileLearnOpen(prev => !prev)}
                  className="w-full flex items-center justify-between py-2 text-lg font-semibold text-text-dark uppercase tracking-wide"
                >
                  <span>Learn</span>
                  {mobileLearnOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {mobileLearnOpen && (
                  <div className="flex flex-col gap-3 pl-4 pt-3 text-sm text-text-secondary text-left">
                    <Link to="/learn" className="py-1">Articles</Link>
                    <Link to="/learn?cat=science" className="py-1">Research</Link>
                    <Link to="/learn?cat=ingredients" className="py-1">Ingredient Library</Link>
                    <Link to="/learn?cat=protocols" className="py-1">Health Guides</Link>
                    <Link to="/learn" className="py-1">FAQ</Link>
                  </div>
                )}
              </div>

              {/* Accordion 3: About Us */}
              <div className="border-b border-[#E5E5E5] pb-4">
                <button
                  onClick={() => setMobileAboutOpen(prev => !prev)}
                  className="w-full flex items-center justify-between py-2 text-lg font-semibold text-text-dark uppercase tracking-wide"
                >
                  <span>About Us</span>
                  {mobileAboutOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {mobileAboutOpen && (
                  <div className="flex flex-col gap-3 pl-4 pt-3 text-sm text-text-secondary text-left">
                    <Link to="/about" className="py-1">Our Story</Link>
                    <Link to="/about" className="py-1">Mission</Link>
                    <Link to="/about" className="py-1">Quality Standards</Link>
                    <Link to="/about" className="py-1">Manufacturing</Link>
                    <Link to="/contact" className="py-1">Contact</Link>
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <div className="border-b border-[#E5E5E5] pb-4">
                <Link
                  to="/learn?cat=science"
                  className="w-full block py-2 text-lg font-semibold text-text-dark uppercase tracking-wide"
                >
                  Science
                </Link>
              </div>

              <div className="border-b border-[#E5E5E5] pb-4">
                <Link
                  to="/contact"
                  className="w-full block py-2 text-lg font-semibold text-text-dark uppercase tracking-wide"
                >
                  Contact
                </Link>
              </div>

              {/* Mobile Account / Meta */}
              <div className="pt-4 flex flex-col gap-4 text-left">
                <div
                  onClick={() => alert("Mobile login currently offline.")}
                  className="flex items-center gap-3 text-xs uppercase tracking-wider font-semibold text-text-secondary cursor-pointer"
                >
                  <User size={16} />
                  <span>My Account</span>
                </div>
                <p className="text-[10px] text-text-muted leading-relaxed uppercase tracking-wider">
                  © 2026 Body Cafe Co. All Rights Reserved.<br />
                  Formulations designed to endure.
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Header;
