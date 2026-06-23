import React from 'react';
import type { Product, ProductVariant } from '../types';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface StickyPurchasePanelProps {
  product: Product;
  selectedVariant: ProductVariant;
  purchaseType: 'one-time' | 'subscription';
  visible: boolean;
  quantity: number;
}

export const StickyPurchasePanel: React.FC<StickyPurchasePanelProps> = ({
  product,
  selectedVariant,
  purchaseType,
  visible,
  quantity
}) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, selectedVariant, quantity, purchaseType);
  };

  const convertPrice = (usd: number) => Math.round(usd * 30);
  const activePrice = convertPrice(
    purchaseType === 'subscription' 
      ? selectedVariant.subscriptionPrice 
      : selectedVariant.price
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-t border-border-light shadow-[0_-10px_30px_rgba(0,0,0,0.03)] py-4 font-sans text-left"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
            
            {/* Left: Info */}
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold font-sans">
                Body Cafe Co.
              </span>
              <h4 className="text-xs md:text-sm font-logo tracking-editorial text-text-dark uppercase">
                {product.name}
              </h4>
              <p className="text-[10px] text-text-secondary font-semibold uppercase mt-0.5 line-clamp-1 font-sans">
                {selectedVariant.name} — {purchaseType === 'subscription' ? 'Subscribe' : 'One-Time'}
              </p>
            </div>

            {/* Right: Buy Button & Price */}
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <span className="text-[9px] uppercase tracking-wider text-text-muted block font-sans">Total Price</span>
                <span className="text-sm md:text-base font-semibold text-text-dark font-sans">
                  ₹{(activePrice * quantity).toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={handleAdd}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-superwide bg-[#B51E2E] hover:bg-[#911623] text-white transition-colors shadow-sm font-sans"
              >
                Add to Bag — ₹{(activePrice * quantity).toLocaleString('en-IN')}
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default StickyPurchasePanel;
