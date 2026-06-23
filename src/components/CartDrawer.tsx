import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount
  } = useCart();

  const navigate = useNavigate();

  // Prevent background scrolling when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Shipping logic
  const FREE_SHIPPING_THRESHOLD = 75;
  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingLeft = FREE_SHIPPING_THRESHOLD - cartSubtotal;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end font-sans">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-md md:max-w-lg h-full bg-bg-soft border-l border-border-light shadow-2xl flex flex-col justify-between z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border-light bg-white">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-text-dark" />
                <h3 className="text-xs uppercase tracking-superwide font-bold text-text-dark">
                  Ritual Bag
                </h3>
                <span className="text-[10px] bg-text-dark text-white rounded-full px-2 py-0.5 font-bold">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 hover:text-text-dark text-text-secondary transition-colors"
                aria-label="Close cart drawer"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Tracker */}
            {cartItems.length > 0 && (
              <div className="bg-bg-pure px-6 py-4 border-b border-border-light text-center">
                <p className="text-[11px] uppercase tracking-wider text-text-secondary">
                  {isFreeShipping ? (
                    <span className="text-brand-ltheanine font-semibold">✓ You qualify for complimentary premium shipping</span>
                  ) : (
                    <span>
                      Add <span className="font-semibold text-text-dark">${shippingLeft.toFixed(2)}</span> more for free premium shipping
                    </span>
                  )}
                </p>
                <div className="w-full bg-bg-subtle h-1 mt-2.5 overflow-hidden">
                  <div
                    className="bg-text-dark h-full transition-all duration-500"
                    style={{ width: `${Math.min((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Scrollable Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                /* Empty state */
                <div className="h-full flex flex-col justify-center items-center text-center py-12 px-4">
                  <div className="w-16 h-16 rounded-full bg-bg-subtle flex items-center justify-center mb-6">
                    <ShoppingBag size={24} strokeWidth={1} className="text-text-muted" />
                  </div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-text-dark mb-2">
                    Your Bag is Empty
                  </h4>
                  <p className="text-xs text-text-secondary max-w-[280px] leading-relaxed mb-8">
                    Your daily health rituals start here. Browse our science-backed formulations to begin.
                  </p>
                  <Link
                    to="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex justify-center items-center px-6 py-3.5 text-xs font-bold uppercase tracking-superwide bg-text-dark hover:bg-black text-white transition-colors"
                  >
                    Shop Formulas
                  </Link>
                </div>
              ) : (
                /* Items List */
                cartItems.map((item) => {
                  const itemPrice = item.purchaseType === 'subscription' ? item.variant.subscriptionPrice : item.variant.price;
                  return (
                    <div key={`${item.product.id}-${item.variant.id}-${item.purchaseType}`} className="flex gap-4 border-b border-border-light pb-6 last:border-b-0 last:pb-0">
                      {/* Product Thumbnail representation */}
                      <div className="w-20 h-24 bg-bg-subtle border border-border-light flex-shrink-0 flex items-center justify-center p-2 relative overflow-hidden">
                        {/* Mini visual mockup of container */}
                        <div className="w-6 h-12 rounded-sm bg-[#3A2312] border-r-2 border-white/5 flex flex-col items-center justify-between p-0.5 shadow-inner">
                          <div className="w-4 h-1 bg-black/60 rounded-t-sm" />
                          <div className="w-4 h-[60%] bg-[#FAFAF8] flex flex-col justify-between py-0.5">
                            <div className="w-full h-[1px] bg-[#EAEAEA]" />
                            {/* colored accent stripe */}
                            <div className="w-full h-1" style={{ backgroundColor: item.product.accentHex }} />
                          </div>
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs uppercase font-bold tracking-wider text-text-dark">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.variant.id, item.purchaseType)}
                              className="text-[10px] uppercase text-text-muted hover:text-text-dark font-semibold tracking-wider transition-colors ml-2"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="text-[10px] uppercase tracking-wide text-text-secondary mt-1 font-semibold">
                            {item.variant.name}
                          </p>
                          <span
                            className="inline-block mt-1.5 px-2 py-0.5 text-[8px] uppercase tracking-wide font-bold text-white"
                            style={{ backgroundColor: item.product.accentHex }}
                          >
                            {item.purchaseType === 'subscription' ? 'Auto-Delivery (Save 15%)' : 'One-Time Purchase'}
                          </span>
                        </div>

                        {/* Controls & Price Row */}
                        <div className="flex justify-between items-center mt-3 pt-2">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-border-light bg-white">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variant.id, item.purchaseType, item.quantity - 1)}
                              className="p-1.5 hover:bg-bg-subtle text-text-secondary transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={10} strokeWidth={2} />
                            </button>
                            <span className="px-3.5 text-xs text-text-dark font-semibold select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variant.id, item.purchaseType, item.quantity + 1)}
                              className="p-1.5 hover:bg-bg-subtle text-text-secondary transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={10} strokeWidth={2} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <span className="text-xs font-semibold text-text-dark">
                              ${(itemPrice * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="bg-white border-t border-border-light p-6 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-superwide font-bold text-text-secondary">Subtotal</span>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-text-dark">${cartSubtotal.toFixed(2)}</span>
                    <p className="text-[10px] text-text-muted mt-0.5">Calculated at next step</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="flex items-center justify-center px-4 py-3.5 border border-text-dark hover:bg-bg-subtle text-text-dark transition-all text-xs uppercase tracking-superwide font-semibold text-center"
                  >
                    View Bag
                  </Link>
                  <button
                    onClick={handleCheckoutClick}
                    className="flex items-center justify-center gap-1 px-4 py-3.5 bg-text-dark hover:bg-black text-white transition-all text-xs uppercase tracking-superwide font-semibold text-center"
                  >
                    Checkout <ArrowRight size={12} strokeWidth={2} />
                  </button>
                </div>

                <p className="text-[9px] text-text-muted text-center leading-relaxed">
                  Complimentary standard shipping on subscription orders. Cruelty free, 100% trace-tested ingredients.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default CartDrawer;
