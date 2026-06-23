import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Plus, Minus, ShieldCheck, Truck, RefreshCw, ChevronDown, Check } from 'lucide-react';
import { products, getProductBySlug } from '../data/products';
import { ProductCanvas } from '../components/ProductCanvas';
import { useCart } from '../context/CartContext';
import { StickyPurchasePanel } from '../components/StickyPurchasePanel';
import { FAQAccordion } from '../components/FAQAccordion';
import { ReviewCard } from '../components/ReviewCard';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="pt-12 pb-24 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-xl uppercase tracking-wider text-text-dark mb-4">Formulation Not Found</h2>
        <Link to="/shop" className="text-xs uppercase tracking-superwide font-bold border-b border-text-dark pb-1 text-text-dark">
          Return to Catalog
        </Link>
      </div>
    );
  }

  // State management
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('subscription');
  const [quantity, setQuantity] = useState(1);
  const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null);
  
  // Sticky panel scroll trigger
  const [stickyVisible, setStickyVisible] = useState(false);
  const buyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Reset inputs on product page change
    setSelectedVariant(product.variants[0]);
    setPurchaseType('subscription');
    setQuantity(1);
    setExpandedIngredient(null);
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      if (buyButtonRef.current) {
        const rect = buyButtonRef.current.getBoundingClientRect();
        // Visible when buy button is scrolled past the top of viewport
        if (rect.bottom < 0) {
          setStickyVisible(true);
        } else {
          setStickyVisible(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [product]);

  // Calculations
  const activePrice = purchaseType === 'subscription' 
    ? selectedVariant.subscriptionPrice 
    : selectedVariant.price;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity, purchaseType);
  };

  // Cross-sell suggestions: get other products excluding this one
  const crossSellProducts = products.filter(p => p.id !== product.id).slice(0, 2);

  // Custom Product FAQs
  const productFAQs = [
    {
      id: `${product.id}-faq-1`,
      question: `When is the optimal time to consume ${product.name}?`,
      answer: product.usageInstructions,
      category: 'science' as const
    },
    {
      id: `${product.id}-faq-2`,
      question: `Are there any synthetic binders or fillers in this ${product.name} formula?`,
      answer: `Absolutely none. Our commitment to absolute transparency means we only pack the active mineral compounds or extract powders. You will not find magnesium stearate, silicon dioxide, or chemical glazes in this recipe.`,
      category: 'science' as const
    }
  ];

  // Specific Product Reviews
  const productReviews = [
    {
      id: `${product.id}-rev-1`,
      author: 'David K., Verified Buyer',
      rating: 5,
      title: 'Premium Integrity',
      content: `The quality of this ${product.name} is incomparable. Dissolves completely, leaves no chemical trace flavors, and the amber glass storage canister looks stunning on my kitchen workspace.`,
      date: 'June 02, 2026',
      verified: true
    },
    {
      id: `${product.id}-rev-2`,
      author: 'Dr. Clara Thorne, Nutritionist',
      rating: 5,
      title: 'Therapeutic Bioavailability',
      content: `I recommend Body Cafe Co's ${product.name} to my clients because of their chelation structure and raw transparency. They don't cut corners with oxide variants. Excellent daily baseline.`,
      date: 'May 11, 2026',
      verified: true
    }
  ];

  return (
    <div className="bg-bg-soft pt-8 pb-32 flex flex-col font-sans text-left">
      
      {/* 1. Hero Block */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 py-12 items-start">
        
        {/* Left Column: Product Visuals */}
        <div className="lg:sticky lg:top-32 w-full">
          <div className="border border-border-light bg-white p-4 overflow-hidden aspect-[4/5] flex items-center justify-center relative">
            <ProductCanvas
              name={product.name}
              accentHex={product.accentHex}
              pantone={product.pantone}
              categoryLabel={product.categoryLabel}
              size="lg"
              active={true}
            />
            {/* Sourcing stamp */}
            <span className="absolute bottom-6 right-6 border border-border-light text-[9px] uppercase tracking-widest px-3 py-1.5 text-text-secondary bg-[#FAFAF8]">
              Trace Tested &bull; {product.highlights[0].value}
            </span>
          </div>
        </div>

        {/* Right Column: Checkout Controls */}
        <div className="space-y-8">
          
          {/* Breadcrumbs & Category */}
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-text-muted font-bold">
            <Link to="/shop" className="hover:text-text-dark transition-colors">Catalog</Link>
            <span>/</span>
            <span className="text-text-dark">{product.categoryLabel}</span>
          </div>

          {/* Title, rating, tagline */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-logo tracking-editorial text-text-dark uppercase leading-tight">
              {product.name}
            </h1>
            <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed">
              {product.subtitle}
            </p>
            
            {/* Rating summary */}
            <div className="flex items-center space-x-2 pt-1 text-text-dark">
              <div className="flex text-text-dark">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-text-secondary mt-0.5">
                {product.rating} &bull; {product.reviewsCount} reviews
              </span>
            </div>
          </div>

          <div className="border-t border-border-light pt-6 space-y-6">
            
            {/* Variant Selector */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold">Select Configuration</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`p-4 border text-left flex flex-col justify-between transition-all duration-300 relative ${
                      selectedVariant.id === v.id
                        ? 'border-text-dark bg-white'
                        : 'border-border-light bg-[#FAFAF8]/50 hover:bg-[#FAFAF8]'
                    }`}
                  >
                    {selectedVariant.id === v.id && (
                      <span className="absolute top-3 right-3 text-text-dark">
                        <Check size={14} />
                      </span>
                    )}
                    <span className="text-xs uppercase font-bold text-text-dark tracking-wide">{v.name}</span>
                    <span className="text-[11px] text-text-secondary mt-1">
                      ${purchaseType === 'subscription' ? v.subscriptionPrice : v.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Model: Subscribe vs One-time */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold">Supply Protocol</span>
              <div className="space-y-2.5">
                
                {/* Subscription Card */}
                <div
                  onClick={() => setPurchaseType('subscription')}
                  className={`p-4 border text-left cursor-pointer transition-all duration-300 flex justify-between items-center ${
                    purchaseType === 'subscription'
                      ? 'border-text-dark bg-white'
                      : 'border-border-light bg-transparent hover:border-text-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      purchaseType === 'subscription' ? 'border-text-dark bg-text-dark' : 'border-border-subtle'
                    }`}>
                      {purchaseType === 'subscription' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-text-dark tracking-wide block">Subscribe & Deliver</span>
                      <span className="text-[10px] text-text-secondary">Delivered every 30 days &bull; Skip or cancel any time</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-text-dark block">${selectedVariant.subscriptionPrice}</span>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-brand-ltheanine">Save 15%</span>
                  </div>
                </div>

                {/* One-time Card */}
                <div
                  onClick={() => setPurchaseType('one-time')}
                  className={`p-4 border text-left cursor-pointer transition-all duration-300 flex justify-between items-center ${
                    purchaseType === 'one-time'
                      ? 'border-text-dark bg-white'
                      : 'border-border-light bg-transparent hover:border-text-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      purchaseType === 'one-time' ? 'border-text-dark bg-text-dark' : 'border-border-subtle'
                    }`}>
                      {purchaseType === 'one-time' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-text-dark tracking-wide block">One-Time Delivery</span>
                      <span className="text-[10px] text-text-secondary">Single apothecary jar allocation</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-text-dark">${selectedVariant.price}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quantity Selector & Buy button */}
            <div className="flex gap-4 pt-2">
              
              {/* Quantity */}
              <div className="flex items-center border border-border-light bg-white h-14">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-4 py-full h-full hover:bg-bg-subtle text-text-secondary transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={12} strokeWidth={2} />
                </button>
                <span className="px-4 text-sm text-text-dark font-semibold select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-4 py-full h-full hover:bg-bg-subtle text-text-secondary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={12} strokeWidth={2} />
                </button>
              </div>

              {/* Buy CTA */}
              <button
                ref={buyButtonRef}
                onClick={handleAddToCart}
                className="flex-1 h-14 uppercase tracking-superwide font-bold text-xs bg-text-dark hover:bg-black text-white transition-colors"
              >
                Add to Ritual Bag — ${(activePrice * quantity).toFixed(2)}
              </button>
            </div>

          </div>

          {/* Key Value Icons */}
          <div className="grid grid-cols-3 gap-4 border-t border-border-light pt-6 text-[10px] uppercase tracking-wider font-semibold text-text-secondary">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-text-dark flex-shrink-0" />
              <span>Lab Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={14} className="text-text-dark flex-shrink-0" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw size={14} className="text-text-dark flex-shrink-0" />
              <span>30-Day Guarantee</span>
            </div>
          </div>

        </div>

      </section>

      {/* 2. Interactive Ingredient Purity Spectrum (Momentous/AG1 layout) */}
      <section className="bg-white border-t border-b border-border-light py-24 px-6 md:px-12 xl:px-24">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">Clinical transparency</span>
            <h2 className="text-3xl font-light text-text-dark tracking-tight">The Formulation Breakdown</h2>
            <p className="text-xs md:text-sm text-text-secondary max-w-lg mx-auto font-light leading-relaxed">
              Click on each compound to view chemical purity extraction guidelines and therapeutic dosing references.
            </p>
          </div>

          <div className="border border-border-light">
            {product.ingredients.map((ing) => {
              const isExpanded = expandedIngredient === ing.name;
              return (
                <div key={ing.name} className={`border-b last:border-0 border-border-light transition-colors ${isExpanded ? 'bg-bg-soft/40' : ''}`}>
                  <button
                    onClick={() => setExpandedIngredient(isExpanded ? null : ing.name)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-wider text-text-dark">{ing.name}</h4>
                      <div className="flex gap-4 mt-1.5 text-[10px] uppercase tracking-wider font-semibold text-text-secondary">
                        <span>Dosage: {ing.amount}</span>
                        {ing.dailyValue && <span>DV: {ing.dailyValue}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span 
                        className="text-[9px] uppercase tracking-widest px-2 py-0.5 text-white font-bold"
                        style={{ backgroundColor: product.accentHex }}
                      >
                        {ing.purpose}
                      </span>
                      <ChevronDown size={14} className={`text-text-secondary transition-transform duration-300 ${isExpanded ? 'rotate-185' : ''}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-xs md:text-sm leading-relaxed text-text-secondary border-t border-border-light/50 pt-4 font-light space-y-3">
                          <p>{ing.description}</p>
                          <p className="italic text-[11px] text-text-muted">Clinical Target: High-bioavailability cell saturation. No chemical synthetic excipients utilized.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Ritual intake & Sourcing split */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-border-light bg-white text-left">
        
        {/* Sourcing */}
        <div className="p-8 md:p-16 lg:p-24 space-y-6 lg:border-r lg:border-border-light">
          <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">Origin Integrity</span>
          <h3 className="text-2xl font-light text-text-dark tracking-tight">Sourcing Documentation</h3>
          <p className="text-xs md:text-sm leading-relaxed text-text-secondary font-light">
            {product.sourcingStory}
          </p>
          <div className="pt-2">
            <span className="inline-flex gap-2 text-[10px] uppercase tracking-wider font-bold text-text-dark border-b border-text-dark pb-0.5">
              Ref: {product.highlights[0].value} &bull; {product.highlights[1].value}
            </span>
          </div>
        </div>

        {/* Integration */}
        <div className="p-8 md:p-16 lg:p-24 space-y-6 bg-bg-soft/50">
          <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">Intake Guidelines</span>
          <h3 className="text-2xl font-light text-text-dark tracking-tight">The Daily Ritual Protocol</h3>
          <p className="text-xs md:text-sm leading-relaxed text-text-secondary font-light">
            {product.usageInstructions}
          </p>
          <div className="space-y-2 text-[10px] uppercase tracking-wider font-semibold text-text-secondary border-t border-border-light pt-4">
            <div className="flex justify-between">
              <span>Optimal Timing</span>
              <span className="text-text-dark font-bold">Consistent daily window</span>
            </div>
            <div className="flex justify-between">
              <span>Carrier medium</span>
              <span className="text-text-dark font-bold">Filtered water or lipid fat meals</span>
            </div>
          </div>
        </div>

      </section>

      {/* 4. Frequently Bought Together (Cross sell) */}
      <section className="py-24 px-6 md:px-12 xl:px-24">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-left space-y-1">
            <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">Ritual Pairing</span>
            <h2 className="text-2xl md:text-3xl font-light text-text-dark tracking-tight">Frequently Bought Together</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {crossSellProducts.map((crossProduct) => {
              const crossVariant = crossProduct.variants[0];
              return (
                <div key={crossProduct.id} className="bg-white border border-border-light p-6 flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Tiny thumbnail */}
                    <div className="w-16 h-20 bg-bg-soft border border-border-light flex-shrink-0 flex items-center justify-center p-1">
                      <div className="w-4 h-9 bg-[#3A2312] border-r border-white/5 shadow-sm" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-text-dark">{crossProduct.name}</h4>
                      <p className="text-[10px] text-text-secondary line-clamp-1 mt-0.5">{crossProduct.tagline}</p>
                      <span className="text-xs font-semibold text-text-dark block mt-1">${crossVariant.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(crossProduct, crossVariant, 1, 'subscription')}
                    className="flex-shrink-0 px-4 py-2.5 text-[10px] uppercase tracking-wider font-bold bg-text-dark hover:bg-black text-white transition-colors"
                  >
                    + Add
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Reviews */}
      <section className="py-24 px-6 md:px-12 xl:px-24 bg-white border-t border-b border-border-light">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">Batch reviews</span>
            <h2 className="text-2xl md:text-3xl font-light text-text-dark tracking-tight">Client Disclosures</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {productReviews.map(r => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Product-Specific FAQs */}
      <section className="py-24 px-6 md:px-12 xl:px-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">Disclosures & Science</span>
            <h2 className="text-2xl md:text-3xl font-light text-text-dark tracking-tight">Formulation FAQ</h2>
          </div>
          <FAQAccordion faqs={productFAQs} />
        </div>
      </section>

      {/* Sticky Panel Controller */}
      <StickyPurchasePanel
        product={product}
        selectedVariant={selectedVariant}
        purchaseType={purchaseType}
        visible={stickyVisible}
        quantity={quantity}
      />

    </div>
  );
};
export default ProductDetail;
