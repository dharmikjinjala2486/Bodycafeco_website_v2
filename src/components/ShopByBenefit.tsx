import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import { getProductImage } from '../assets/productImages';
import { useCart } from '../context/CartContext';
import type { Product, ProductVariant } from '../types';

interface BenefitCategory {
  id: string;
  name: string;
  productIds: string[];
}

const BENEFIT_CATEGORIES: BenefitCategory[] = [
  { id: 'daily-wellness', name: 'Daily Wellness', productIds: ['vitamin-d3-k2', 'magnesium-bisglycinate'] },
  { id: 'brain-health', name: 'Brain Health', productIds: ['omega-3-fish-oil', 'l-theanine'] },
  { id: 'bone-health', name: 'Bone Health', productIds: ['vitamin-d3-k2', 'magnesium-bisglycinate'] },
  { id: 'heart-health', name: 'Heart Health', productIds: ['omega-3-fish-oil', 'iron-bisglycinate'] },
  { id: 'energy-performance', name: 'Energy & Performance', productIds: ['creatine-monohydrate', 'beetroot'] },
  { id: 'digestion', name: 'Digestion', productIds: ['psyllium-husk', 'berberine-cinnamon'] }
];

interface BenefitProductCardProps {
  product: Product;
}

const BenefitProductCard: React.FC<BenefitProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find(v => v.isDefault) || product.variants[0]
  );
  const [isHovered, setIsHovered] = useState(false);

  // Sync selected variant on product changes
  React.useEffect(() => {
    setSelectedVariant(product.variants.find(v => v.isDefault) || product.variants[0]);
  }, [product]);

  return (
    <Link 
      to={`/product/${product.slug}`}
      className="w-full flex flex-col justify-between items-center bg-[#FFFFFF] p-6 md:p-8 rounded-none border border-transparent transition-all duration-300 group h-full text-left block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image centered */}
      <div className="w-full flex justify-center items-center bg-[#F8F7F4] aspect-square overflow-hidden rounded-none">
        {(() => {
          const src = getProductImage(product.id);
          return src ? (
            <img
              src={src}
              alt={product.name}
              className={`w-full h-full object-contain p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? 'scale-105' : 'scale-100'}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center py-12">
              <span className="text-xs uppercase tracking-wider text-text-muted">{product.name}</span>
            </div>
          );
        })()}
      </div>

      {/* Info Content Area */}
      <div className="w-full flex flex-col items-center justify-end flex-grow mt-6">
        
        {/* Rating and Review Count */}
        <div className="flex items-center space-x-1.5 mb-2 text-[#111111] justify-center">
          <div className="flex text-[#111111]">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                strokeWidth={1.5}
                className="text-[#111111]" 
              />
            ))}
          </div>
          <span className="text-[10px] tracking-wide text-text-muted">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-sans font-semibold text-[#111111] text-base md:text-lg tracking-editorial text-center line-clamp-1">
          {product.name}
        </h3>

        {/* Dynamic Price */}
        <p className="font-sans font-medium text-[#555555] text-sm md:text-base text-center mt-1">
          ${selectedVariant.price}
        </p>

        {/* Variant Dropdown & Add To Cart Button */}
        <div className="mt-5 w-full max-w-[260px] flex flex-col gap-3">
          {/* Variant Selector */}
          <div className="relative w-full">
            <select
              value={selectedVariant.id}
              onChange={(e) => {
                const variant = product.variants.find(v => v.id === e.target.value);
                if (variant) setSelectedVariant(variant);
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-full bg-white border border-[#E5E5E5] px-4 py-2.5 rounded-lg text-xs md:text-sm text-text-dark font-medium tracking-wide focus:outline-none focus:border-text-dark transition-colors appearance-none cursor-pointer pr-10"
            >
              {product.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#888888]">
              <ChevronDown size={16} />
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, selectedVariant, 1, 'one-time');
            }}
            className="w-full bg-[#B51E2E] hover:bg-[#911623] text-white py-3 px-6 rounded-lg text-xs md:text-sm font-semibold tracking-superwide uppercase transition-colors duration-300 shadow-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export const ShopByBenefit: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BenefitCategory>(BENEFIT_CATEGORIES[0]);

  // Fetch the mapped products for current category
  const activeProducts = activeCategory.productIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => !!p);

  // Viewport stagger entry animations
  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.section
      className="w-full bg-white py-24 md:py-32 border-b border-border-light select-none overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariants}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-24 flex flex-col items-center">
        {/* Section Heading */}
        <motion.h2 
          variants={itemVariants}
          className="font-sans font-black tracking-widest text-center text-3xl sm:text-4xl md:text-5xl uppercase mb-12 leading-tight text-[#111111]"
        >
          SHOP BY HEALTH BENEFIT
        </motion.h2>

        {/* Categories Tab Navigation */}
        <motion.div 
          variants={itemVariants}
          className="w-full relative border-b border-[#E5E5E5] mb-16"
        >
          {/* Scrollable Tabs Wrapper */}
          <div className="overflow-x-auto no-scrollbar flex justify-start md:justify-center whitespace-nowrap scroll-smooth pb-0.5">
            <div className="flex space-x-6 md:space-x-8 lg:space-x-12 px-4 md:px-0">
              {BENEFIT_CATEGORIES.map((cat) => {
                const isActive = cat.id === activeCategory.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative py-4 text-xs sm:text-sm font-semibold tracking-superwide uppercase transition-colors duration-300 focus:outline-none ${
                      isActive ? 'text-[#B51E2E]' : 'text-text-secondary hover:text-[#111111]'
                    }`}
                  >
                    {cat.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B51E2E]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Grid Display Area */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-5xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full justify-items-center"
            >
              {activeProducts.map((product) => (
                <div 
                  key={product.id}
                  className="w-full border border-border-light/60 p-4 md:p-6"
                >
                  <BenefitProductCard product={product} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ShopByBenefit;
