import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    cartSubtotal,
    cartCount,
    updateQuantity,
    removeFromCart
  } = useCart();
  const navigate = useNavigate();

  const FREE_SHIPPING_THRESHOLD = 75;
  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingLeft = FREE_SHIPPING_THRESHOLD - cartSubtotal;

  return (
    <div className="bg-bg-soft pt-12 pb-24 text-left font-sans min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24">
        
        {/* Title */}
        <div className="border-b border-border-light pb-6 mb-12 flex items-baseline justify-between">
          <h1 className="text-editorial-h2">Your Ritual Bag</h1>
          <span className="text-xs uppercase tracking-wider font-bold text-text-muted">{cartCount} items</span>
        </div>

        {cartItems.length === 0 ? (
          /* Empty state */
          <div className="text-center py-24 bg-white border border-border-light max-w-2xl mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-bg-subtle flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={24} strokeWidth={1} className="text-text-muted" />
            </div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dark mb-2">No Active Rituals</h2>
            <p className="text-xs text-text-secondary leading-relaxed max-w-xs mx-auto mb-8">
              Your cart is currently empty. Explore our catalog of clean formulas to start your daily health routines.
            </p>
            <Link
              to="/shop"
              className="inline-flex justify-center items-center px-8 py-4 bg-text-dark hover:bg-black text-white text-xs uppercase tracking-superwide font-bold transition-all text-center"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          /* Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => {
                const itemPrice = item.purchaseType === 'subscription' ? item.variant.subscriptionPrice : item.variant.price;
                return (
                  <div 
                    key={`${item.product.id}-${item.variant.id}-${item.purchaseType}`}
                    className="bg-white border border-border-light p-6 md:p-8 flex flex-col sm:flex-row gap-6 justify-between"
                  >
                    {/* Visual & metadata */}
                    <div className="flex gap-4 items-center">
                      {/* Mini canister representation */}
                      <div className="w-20 h-24 bg-bg-subtle border border-border-light flex-shrink-0 flex items-center justify-center p-2">
                        <div className="w-6 h-12 rounded-sm bg-[#3A2312] border-r-2 border-white/5 flex flex-col items-center justify-between p-0.5 shadow-inner">
                          <div className="w-4 h-1 bg-black/60 rounded-t-sm" />
                          <div className="w-4 h-[60%] bg-[#FAFAF8] flex flex-col justify-between py-0.5">
                            <div className="w-full h-[1px] bg-[#EAEAEA]" />
                            <div className="w-full h-1" style={{ backgroundColor: item.product.accentHex }} />
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div>
                        <h3 className="text-xs uppercase font-bold tracking-wider text-text-dark">{item.product.name}</h3>
                        <p className="text-[10px] uppercase tracking-wide text-text-secondary mt-1 font-semibold">{item.variant.name}</p>
                        <span 
                          className="inline-block mt-2 px-2.5 py-0.5 text-[8px] uppercase tracking-wide font-bold text-white"
                          style={{ backgroundColor: item.product.accentHex }}
                        >
                          {item.purchaseType === 'subscription' ? 'Auto-Delivery (Save 15%)' : 'One-Time'}
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls & pricing */}
                    <div className="flex sm:flex-col justify-between items-end gap-4 border-t sm:border-t-0 border-border-light pt-4 sm:pt-0">
                      
                      <button
                        onClick={() => removeFromCart(item.product.id, item.variant.id, item.purchaseType)}
                        className="text-[10px] uppercase font-bold text-text-muted hover:text-text-dark tracking-wider sm:order-first"
                      >
                        Remove
                      </button>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        {/* Selector */}
                        <div className="flex items-center border border-border-light bg-white h-10">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant.id, item.purchaseType, item.quantity - 1)}
                            className="p-1.5 px-3 hover:bg-bg-subtle text-text-secondary transition-colors"
                          >
                            <Minus size={10} strokeWidth={2} />
                          </button>
                          <span className="px-2 text-xs text-text-dark font-semibold select-none">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant.id, item.purchaseType, item.quantity + 1)}
                            className="p-1.5 px-3 hover:bg-bg-subtle text-text-secondary transition-colors"
                          >
                            <Plus size={10} strokeWidth={2} />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right min-w-[70px]">
                          <span className="text-sm font-semibold text-text-dark">${(itemPrice * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

            {/* Right Summary Column */}
            <div className="space-y-6">
              
              {/* Shipping tracker card */}
              <div className="bg-white border border-border-light p-6 text-center space-y-4">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary">
                  {isFreeShipping ? (
                    <span className="text-brand-ltheanine">✓ Complimentary premium shipping applied</span>
                  ) : (
                    <span>Add <span className="text-text-dark font-bold">${shippingLeft.toFixed(2)}</span> for free premium shipping</span>
                  )}
                </p>
                <div className="w-full bg-bg-soft h-1 overflow-hidden">
                  <div
                    className="bg-text-dark h-full transition-all duration-500"
                    style={{ width: `${Math.min((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Order pricing breakdown */}
              <div className="bg-white border border-border-light p-6 md:p-8 space-y-6">
                <h3 className="text-xs uppercase tracking-superwide font-bold text-text-dark">Order Summary</h3>
                
                <div className="space-y-3 text-xs text-text-secondary uppercase tracking-wider font-semibold">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-text-dark">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Premium Shipping</span>
                    <span className="text-text-dark">{isFreeShipping ? 'FREE' : '$10.00'}</span>
                  </div>
                </div>

                <div className="border-t border-border-light pt-6 flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-superwide font-bold text-text-dark">Estimated Total</span>
                  <span className="text-lg font-semibold text-text-dark">
                    ${(cartSubtotal + (isFreeShipping ? 0 : 10)).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full h-14 bg-text-dark hover:bg-black text-white text-xs uppercase tracking-superwide font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  Proceed to Checkout <ArrowRight size={12} strokeWidth={2} />
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
export default CartPage;
