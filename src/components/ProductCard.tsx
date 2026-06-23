import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import type { Product } from '../types';
import { getProductImage } from '../assets/productImages';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  // Find the default variant or fallback to first
  const defaultVariant = product.variants.find(v => v.isDefault) || product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to subscription for AG1/Momentous premium flow
    addToCart(product, defaultVariant, 1, 'subscription');
  };

  return (
    <Link 
      to={`/product/${product.slug}`}
      className="group block bg-bg-pure border border-border-light relative overflow-hidden transition-all duration-500 hover:border-text-dark/20 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-[4/5] w-full border-b border-border-light bg-[#F8F7F4]">
        {(() => {
          const src = getProductImage(product.id);
          return src ? (
            <img
              src={src}
              alt={product.name}
              className={`w-full h-full object-contain p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#F0EFEA]">
              <span className="text-xs uppercase tracking-wider text-text-muted font-semibold">{product.name}</span>
            </div>
          );
        })()}
        
        {/* Floating Tag */}
        <span 
          className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 text-white shadow-sm"
          style={{ backgroundColor: product.accentHex }}
        >
          {product.categoryLabel}
        </span>
      </div>

      {/* Info Content */}
      <div className="p-6 md:p-8 flex flex-col flex-1 bg-white justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2 text-text-dark">
            <div className="flex text-text-dark">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={10} 
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                  strokeWidth={1.5}
                  className="text-text-dark" 
                />
              ))}
            </div>
            <span className="text-[10px] tracking-wide text-text-muted">
              ({product.reviewsCount})
            </span>
          </div>

          {/* Title & Tagline */}
          <h3 className="font-logo text-xs md:text-sm tracking-editorial text-text-dark mb-1 uppercase group-hover:text-text-secondary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-4">
            {product.tagline}
          </p>
        </div>

        <div>
          {/* Pricing Row */}
          <div className="flex justify-between items-baseline mb-5 border-t border-border-light pt-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted block">Subscription</span>
              <span className="text-sm font-semibold text-text-dark">${product.subscriptionPrice}</span>
              <span className="text-[10px] text-text-secondary ml-1">/mo</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-text-muted block">One-Time</span>
              <span className="text-xs text-text-secondary font-medium">${product.price}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="relative overflow-hidden h-11">
            {/* Learn More slide (Default view) */}
            <div className={`absolute inset-0 flex items-center justify-between transition-all duration-300 ${isHovered ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
              <span className="text-xs uppercase tracking-superwide font-bold text-text-dark flex items-center gap-1.5">
                Explore Formula <ArrowRight size={12} strokeWidth={2} />
              </span>
            </div>

            {/* Quick Add slide (Hover view) */}
            <div className={`absolute inset-0 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
              <button
                onClick={handleQuickAdd}
                className="w-full h-full text-center text-xs uppercase tracking-superwide font-bold bg-text-dark hover:bg-black text-white transition-colors flex items-center justify-center"
              >
                + Add to Ritual Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
