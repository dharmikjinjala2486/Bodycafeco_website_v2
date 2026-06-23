import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import { getProductImage } from '../assets/productImages';
import { useCart } from '../context/CartContext';
import type { Product, ProductVariant } from '../types';

interface BestSellerCardProps {
  product: Product;
}

const BestSellerCard: React.FC<BestSellerCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find(v => v.isDefault) || product.variants[0]
  );
  const [isHovered, setIsHovered] = useState(false);

  // Sync selected variant if variants change
  useEffect(() => {
    setSelectedVariant(product.variants.find(v => v.isDefault) || product.variants[0]);
  }, [product]);

  return (
    <div 
      className="w-full flex flex-col justify-between items-center bg-[#FFFFFF] p-6 md:p-8 rounded-2xl border border-border-light/60 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-500 ease-[0.16,1,0.3,1] group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="w-full flex justify-center items-center bg-[#F8F7F4] rounded-xl aspect-square overflow-hidden">
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
              <span className="text-xs uppercase tracking-wider text-text-muted">{product.name}</span>
            </div>
          );
        })()}
      </div>

      {/* Info Container to push buttons down and keep alignment */}
      <div className="w-full flex flex-col items-center justify-end flex-grow mt-6">
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
            onClick={() => addToCart(product, selectedVariant, 1, 'one-time')}
            className="w-full bg-[#B51E2E] hover:bg-[#911623] text-white py-3 px-6 rounded-lg text-xs md:text-sm font-semibold tracking-superwide uppercase transition-colors duration-300 shadow-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const BestSellers: React.FC = () => {
  // Retrieve target products in specified order
  const bestSellersIds = ['omega-3-fish-oil', 'creatine-monohydrate', 'vitamin-d3-k2'];
  const bestSellers = bestSellersIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => !!p);

  // Viewport entry animations
  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
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
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      },
    },
  };

  return (
    <motion.section
      className="w-full bg-[#F5F5F5] py-24 md:py-32 border-b border-border-light select-none overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariants}
    >
      <div className="w-full px-6 md:px-12 xl:px-24 max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <motion.h2 
          variants={itemVariants}
          className="font-sans font-black tracking-widest text-center text-3xl sm:text-4xl md:text-5xl uppercase mb-16 md:mb-24 leading-tight text-[#111111]"
        >
          OUR BEST SELLERS
        </motion.h2>

        {/* Static Grid Container */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto justify-items-center"
        >
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="w-full"
            >
              <BestSellerCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BestSellers;
