import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Input } from '../components/UI/Input';
import { Button } from '../components/UI/Button';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Address shipping state
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    email: '',
    cardNum: '',
    cardExp: '',
    cardCvc: ''
  });

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Simulate luxury verification delay
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCheckoutComplete(true);
      clearCart(); // clear state
    }, 1500);
  };

  const FREE_SHIPPING_THRESHOLD = 75;
  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping ? 0 : 10;
  const grandTotal = cartSubtotal + shippingCost;

  if (checkoutComplete) {
    return (
      <div className="pt-12 pb-24 px-6 min-h-[70vh] flex flex-col justify-center items-center font-sans text-center bg-bg-soft">
        <div className="max-w-md bg-white border border-border-light p-8 md:p-12 space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-brand-ltheanine/10 flex items-center justify-center mx-auto text-brand-ltheanine">
            <CheckCircle2 size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-xl uppercase tracking-wider text-text-dark font-bold">Ritual Protocol Confirmed</h1>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light">
            Your laboratory-tested formulations are now locked. We have dispatched a confirmation receipt along with batch lookup links to your email address.
          </p>
          <div className="border-t border-border-light pt-6">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3.5 bg-text-dark hover:bg-black text-white text-xs font-bold uppercase tracking-superwide transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-soft pt-12 pb-24 text-left font-sans min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24">
        
        <div className="border-b border-border-light pb-6 mb-12">
          <h1 className="text-editorial-h2">Checkout Protocol</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white border border-border-light">
            <p className="text-xs uppercase tracking-wider text-text-secondary mb-4">No active formulas in cart</p>
            <Button onClick={() => navigate('/shop')} variant="outline" size="sm">Browse shop</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
            
            {/* Left: Input Details */}
            <div className="space-y-8 bg-white border border-border-light p-8 md:p-10">
              
              {/* Shipping section */}
              <div>
                <h3 className="text-xs uppercase tracking-superwide font-bold text-text-dark mb-6">1. Delivery Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    required
                    value={shippingData.firstName}
                    onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                  />
                  <Input
                    label="Last Name"
                    required
                    value={shippingData.lastName}
                    onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                  />
                </div>
                <Input
                  label="Shipping Address"
                  required
                  placeholder="Street name and unit number"
                  value={shippingData.address}
                  onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    required
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                  />
                  <Input
                    label="ZIP / Postal Code"
                    required
                    value={shippingData.zip}
                    onChange={(e) => setShippingData({ ...shippingData, zip: e.target.value })}
                  />
                </div>
                <Input
                  label="Contact Email"
                  type="email"
                  required
                  placeholder="For batch tracking reports"
                  value={shippingData.email}
                  onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                />
              </div>

              {/* Payment details */}
              <div className="border-t border-border-light pt-8">
                <h3 className="text-xs uppercase tracking-superwide font-bold text-text-dark mb-6">2. Payment Method</h3>
                <Input
                  label="Card Number"
                  required
                  placeholder="0000 0000 0000 0000"
                  value={shippingData.cardNum}
                  onChange={(e) => setShippingData({ ...shippingData, cardNum: e.target.value })}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Expiration Date"
                    required
                    placeholder="MM / YY"
                    value={shippingData.cardExp}
                    onChange={(e) => setShippingData({ ...shippingData, cardExp: e.target.value })}
                  />
                  <Input
                    label="Security Code (CVC)"
                    required
                    placeholder="123"
                    value={shippingData.cardCvc}
                    onChange={(e) => setShippingData({ ...shippingData, cardCvc: e.target.value })}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="border-t border-border-light pt-8 space-y-4">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={loading}
                  className="h-14 text-xs font-bold uppercase tracking-superwide"
                >
                  Verify & Pay — ${grandTotal.toFixed(2)}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-[10px] text-text-muted uppercase tracking-wider font-bold">
                  <ShieldCheck size={14} className="text-text-dark" />
                  <span>Encrypted SSL payment pipeline</span>
                </div>
              </div>

            </div>

            {/* Right: Order Summary */}
            <div className="space-y-6">
              <div className="bg-white border border-border-light p-8 space-y-6">
                <h3 className="text-xs uppercase tracking-superwide font-bold text-text-dark">Review Bag</h3>
                
                {/* Items loop */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {cartItems.map((item) => {
                    const price = item.purchaseType === 'subscription' ? item.variant.subscriptionPrice : item.variant.price;
                    return (
                      <div key={`${item.product.id}-${item.variant.id}-${item.purchaseType}`} className="flex justify-between items-start text-xs border-b border-border-light pb-4 last:border-0 last:pb-0">
                        <div className="text-left space-y-1">
                          <span className="font-bold text-text-dark uppercase block">{item.product.name}</span>
                          <span className="text-[10px] text-text-secondary uppercase block">{item.variant.name} &bull; Qty {item.quantity}</span>
                          <span 
                            className="inline-block px-1.5 py-0.5 text-[8px] uppercase tracking-wide font-bold text-white"
                            style={{ backgroundColor: item.product.accentHex }}
                          >
                            {item.purchaseType === 'subscription' ? 'Auto-Delivery' : 'One-time'}
                          </span>
                        </div>
                        <span className="font-semibold text-text-dark">${(price * item.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Pricing summary */}
                <div className="border-t border-border-light pt-6 space-y-3 text-xs uppercase tracking-wider font-semibold text-text-secondary">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-text-dark">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-text-dark">{isFreeShipping ? 'FREE' : '$10.00'}</span>
                  </div>
                </div>

                <div className="border-t border-border-light pt-6 flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-superwide font-bold text-text-dark">Grand Total</span>
                  <span className="text-lg font-semibold text-text-dark">${grandTotal.toFixed(2)}</span>
                </div>

              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
export default Checkout;
