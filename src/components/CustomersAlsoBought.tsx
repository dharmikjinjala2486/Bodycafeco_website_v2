import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { getProductImage } from '../assets/productImages';
import { useCart } from '../context/CartContext';
import type { Product, ProductVariant } from '../types';

interface BoughtProductCardProps {
  product: Product;
}

const BoughtProductCard: React.FC<BoughtProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find(v => v.isDefault) || product.variants[0]
  );
  const [isHovered, setIsHovered] = useState(false);

  // Sync selected variant if the product changes
  useEffect(() => {
    setSelectedVariant(product.variants.find(v => v.isDefault) || product.variants[0]);
  }, [product]);

  const convertPrice = (usd: number) => Math.round(usd * 30);
  const currentPrice = convertPrice(selectedVariant.price);

  return (
    <div 
      className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-white border border-[#EAEAEA] p-6 flex flex-col justify-between items-center text-center select-none rounded-none transition-all duration-300 group h-full snap-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <div className="w-full aspect-[4/5] bg-[#F8F7F4] flex items-center justify-center border-b border-[#EAEAEA] mb-6 overflow-hidden">
        {(() => {
          const src = getProductImage(product.id);
          return src ? (
            <img
              src={src}
              alt={product.name}
              className={`w-full h-full object-contain p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? 'scale-105' : 'scale-100'}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs uppercase tracking-wider text-text-muted text-center px-4">{product.name}</span>
            </div>
          );
        })()}
      </div>

      {/* Info Content Area */}
      <div className="w-full flex flex-col items-center justify-end flex-grow">
        {/* Product Name */}
        <h3 className="font-sans font-bold text-text-dark text-sm md:text-base tracking-wide text-center uppercase line-clamp-2 h-10 flex items-center justify-center mb-1 font-logo">
          {product.name}
        </h3>

        {/* Dynamic Price */}
        <p className="font-sans font-bold text-[#111111] text-sm md:text-base text-center mb-4">
          ₹{currentPrice.toLocaleString('en-IN')}
        </p>

        {/* Variant Selector */}
        <div className="relative w-full mb-3">
          <select
            value={selectedVariant.id}
            onChange={(e) => {
              const variant = product.variants.find(v => v.id === e.target.value);
              if (variant) setSelectedVariant(variant);
            }}
            className="bg-white border border-[#CCCCCC] rounded-none px-4 h-[48px] text-[13px] font-semibold text-text-dark focus:outline-none focus:border-text-dark cursor-pointer w-full appearance-none pr-10 font-sans text-left"
          >
            {product.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-text-secondary">
            <ChevronDown size={14} />
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product, selectedVariant, 1, 'one-time')}
          className="w-full h-[48px] bg-[#B51E2E] hover:bg-[#911623] text-white text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 rounded-none flex items-center justify-center font-sans"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export const CustomersAlsoBought: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Target products: Omega-3 Fish Oil, Creatine Monohydrate, Vitamin D3 + K2, Affron® Saffron Extract
  const targetProductIds = [
    'omega-3-fish-oil',
    'creatine-monohydrate',
    'vitamin-d3-k2',
    'affron-saffron'
  ];

  const boughtProducts = targetProductIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => !!p);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollButtons);
      // Wait a brief moment for layout/mounting to complete before initial check
      const timer = setTimeout(updateScrollButtons, 100);
      window.addEventListener('resize', updateScrollButtons);
      
      return () => {
        el.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <section className="w-full bg-[#F7F7F7] py-20 md:py-28 border-t border-border-light select-none overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16 flex flex-col items-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#111111] uppercase tracking-wider text-center mb-12 font-logo">
          Customers Also Bought
        </h2>

        {/* Carousel Container */}
        <div className="relative w-full">
          {/* Circular Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className={`absolute -left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-[#EAEAEA] hover:border-text-dark hover:bg-[#FAF9F6] text-text-dark flex items-center justify-center transition-all duration-300 shadow-sm focus:outline-none hidden md:flex ${
              canScrollLeft ? 'opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          
          {/* Scrollable list */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-6 w-full pb-4"
          >
            {boughtProducts.map((product) => (
              <BoughtProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Circular Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className={`absolute -right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-[#EAEAEA] hover:border-text-dark hover:bg-[#FAF9F6] text-text-dark flex items-center justify-center transition-all duration-300 shadow-sm focus:outline-none hidden md:flex ${
              canScrollRight ? 'opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default CustomersAlsoBought;
