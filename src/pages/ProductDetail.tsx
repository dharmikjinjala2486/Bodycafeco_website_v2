import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Minus, ShieldCheck, Truck, RefreshCw, ChevronDown, Check, ChevronLeft, ChevronRight, ZoomIn, X, Clock, MapPin, Layers } from 'lucide-react';
import { products, getProductBySlug } from '../data/products';
import { ProductCanvas } from '../components/ProductCanvas';
import { getProductImage } from '../assets/productImages';
import { useCart } from '../context/CartContext';
import { StickyPurchasePanel } from '../components/StickyPurchasePanel';
import { motion, AnimatePresence } from 'framer-motion';
import SupplementQuizSection from '../components/SupplementQuizSection';
import CustomersAlsoBought from '../components/CustomersAlsoBought';
import PdpBlogSection from '../components/PdpBlogSection';
import PdpInstagramSection from '../components/PdpInstagramSection';
import CustomerReviews from '../components/CustomerReviews';

// Lifestyle images for accordions
import promiseAbsorption from '../assets/promise_absorption.png';
import quizLifestyle from '../assets/quiz_lifestyle.png';
import promiseScience from '../assets/promise_science.png';
import menopauseRelief from '../assets/menopause_relief.png';
import promiseEveryday from '../assets/promise_everyday.png';

// Lifestyle image lookup map
const productLifestyleImages: Record<string, string> = {
  'creatine-monohydrate': quizLifestyle,
  'vitamin-d3-k2': promiseScience,
  'omega-3-fish-oil': promiseAbsorption,
  'magnesium-bisglycinate': menopauseRelief,
  'psyllium-husk': promiseEveryday,
  'l-theanine': promiseScience,
  'iron-bisglycinate': promiseAbsorption,
  'affron-saffron': quizLifestyle,
  'berberine-cinnamon': menopauseRelief,
  'beetroot': promiseEveryday,
  'myo-inositol-d-chiro': quizLifestyle,
};

interface DetailedBenefit {
  title: string;
  description: string;
}

const detailedBenefitsMap: Record<string, DetailedBenefit[]> = {
  'omega-3-fish-oil': [
    { title: 'Supports Heart Health', description: 'Helps maintain healthy blood pressure levels and cholesterol profiles already within a normal range, supporting long-term cardiovascular longevity.' },
    { title: 'Provides Antioxidant Support', description: 'Combats oxidative stress and helps protect delicate cellular membranes against free radical damage.' },
    { title: 'May be Beneficial to Statin Users', description: 'Helps maintain healthy cellular lipid balances and metabolic baselines which can be affected by standard therapies.' },
    { title: 'Supports Energy Production', description: 'Crucial for system-wide cellular efficiency, supporting mitochondrial function and cognitive vitality.' }
  ],
  'creatine-monohydrate': [
    { title: 'Supports Physical Output', description: 'Enhances cellular ATP regeneration, enabling higher physical output, power, and muscle recovery.' },
    { title: 'Supports Energy Production', description: 'Essential for cognitive energy demands and maintaining physical endurance during intensive training.' },
    { title: 'Promotes Muscle Hydration', description: 'Attracts water to muscle cells, optimizing cellular hydration, volume, and nutrient delivery.' },
    { title: 'Supports Brain Health', description: 'Acts as a buffer for cognitive function under conditions of mental strain, sleep deprivation, or executive load.' }
  ],
  'vitamin-d3-k2': [
    { title: 'Supports Bone Health', description: 'D3 enhances calcium absorption, while K2 MK-7 directs it into bones and teeth, maintaining structural density.' },
    { title: 'Provides Immune Support', description: 'Modulates critical immune pathways to assist natural systemic defenses year-round.' },
    { title: 'Supports Heart Health', description: 'Prevents calcium buildup in blood vessels, supporting arterial elasticity and cardiovascular function.' },
    { title: 'Supports Energy Production', description: 'Promotes muscle health and mitochondria functioning, directly assisting everyday baseline energy.' }
  ],
  'magnesium-bisglycinate': [
    { title: 'Supports Muscle Recovery', description: 'Promotes muscle fiber relaxation, reducing physical tension, soreness, and nighttime leg cramps.' },
    { title: 'Supports Sleep Cycles', description: 'Glycine acts as a calming neurotransmitter, improving sleep latency, deep sleep, and morning alertness.' },
    { title: 'Supports Heart Health', description: 'Crucial for maintaining a healthy heart rhythm, blood pressure baseline, and vascular compliance.' },
    { title: 'Supports Energy Production', description: 'A critical cofactor in over 300 biochemical reactions, including the synthesis of cellular ATP.' }
  ],
  'psyllium-husk': [
    { title: 'Supports Digestive Regularity', description: 'Forms a gentle, water-absorbing gel that sweeps the digestive tract, assisting natural elimination and bowel rhythm.' },
    { title: 'Supports Heart Health', description: 'Binds to cholesterol in the digestive tract, assisting healthy lipid panels already in the normal range.' },
    { title: 'Supports Blood Sugar Balance', description: 'Helps slow down carbohydrate absorption, promoting a more stable post-meal blood sugar response.' },
    { title: 'Provides Microbiome Support', description: 'Acts as a clean prebiotic source to nourish and diversify beneficial gut bacteria.' }
  ]
};

const getDetailedBenefits = (productId: string, basicBenefits: string[]): DetailedBenefit[] => {
  const custom = detailedBenefitsMap[productId];
  if (custom) return custom;
  
  return basicBenefits.map((b) => {
    const splitRegex = / (for|by|under|via|to|and|in) /i;
    const match = b.match(splitRegex);
    if (match && match.index) {
      const title = b.substring(0, match.index).trim();
      const description = b.substring(match.index).trim();
      return { title, description };
    }
    const words = b.split(' ');
    const titleWords = words.slice(0, Math.min(3, words.length)).join(' ');
    return {
      title: titleWords,
      description: b.substring(titleWords.length).trim()
    };
  });
};

const faqItems = [
  {
    question: 'Why is this ingredient considered the "active" form of CoQ10?',
    answer: 'Ubiquinol is the active, antioxidant form of CoQ10. Standard CoQ10 (ubiquinone) must be converted by the body into ubiquinol before it can be used. As we age, our body\'s ability to perform this conversion declines. Supplementing directly with Ubiquinol bypasses this pathway, providing a highly bioavailable form of CoQ10 that is ready for immediate cellular use.'
  },
  {
    question: 'Why is taking CoQ10 beneficial if I\'m on a statin?',
    answer: 'Cholesterol-lowering statin drugs function by blocking the pathway in the liver that produces cholesterol. However, this same pathway is also responsible for the natural synthesis of CoQ10. Consequently, statins can deplete natural CoQ10 levels in the body, leading to symptoms like muscle discomfort and fatigue. Supplementing with CoQ10 helps restore these depleted stores and supports heart muscle health.'
  },
  {
    question: 'How should I take Creatine Monohydrate?',
    answer: 'Take 1 scoop (5g) of Creatine Monohydrate daily. It can be mixed easily into water, juice, or your preferred pre-workout/post-workout shake. Consistency is critical: taking it at the same time each day maintains muscle saturation. A loading phase is not strictly necessary; a steady daily intake of 5g will fully saturate muscle tissues within 3 to 4 weeks.'
  },
  {
    question: 'How does Creatine support physical performance?',
    answer: 'Creatine is converted into phosphocreatine within muscle cells, which acts as a rapid-release reservoir to regenerate ATP (adenosine triphosphate) during explosive movements. This supports higher power output, increases cellular hydration, delays lactic acid onset, and accelerates muscle recovery between intense sets.'
  }
];

// Metadata mapping for product servings & labels
const servingMetadata: Record<string, { size: string; countSuffix: string }> = {
  'creatine-monohydrate': { size: '1 scoop (5g)', countSuffix: 'servings per container' },
  'vitamin-d3-k2': { size: '1 softgel daily', countSuffix: 'softgels per bottle' },
  'omega-3-fish-oil': { size: '2 softgels daily', countSuffix: 'softgels per bottle' },
  'magnesium-bisglycinate': { size: '2 capsules daily', countSuffix: 'servings per container' },
  'psyllium-husk': { size: '1 tablespoon (5g)', countSuffix: 'servings per container' },
  'l-theanine': { size: '1 capsule daily', countSuffix: 'capsules per bottle' },
  'iron-bisglycinate': { size: '1 capsule daily', countSuffix: 'capsules per bottle' },
  'affron-saffron': { size: '1 capsule daily', countSuffix: 'capsules per bottle' },
  'berberine-cinnamon': { size: '1 capsule daily', countSuffix: 'capsules per bottle' },
  'beetroot': { size: '2 capsules daily', countSuffix: 'capsules per bottle' },
  'myo-inositol-d-chiro': { size: '1 scoop daily', countSuffix: 'servings per container' },
};

const getServingsCount = (variantId: string): number => {
  const id = variantId.toLowerCase();
  if (id.includes('100g')) return 20;
  if (id.includes('250g')) return 50;
  if (id.includes('500g')) return 100;
  if (id.includes('300g')) return 60;
  if (id.includes('600g')) return 120;
  if (id.includes('60')) return 60;
  if (id.includes('120')) {
    if (id.includes('mag')) return 60;
    if (id.includes('beet')) return 60;
    return 120;
  }
  if (id.includes('powder')) return 40;
  if (id.includes('refill')) return 120;
  return 60;
};

// Sub-component for rendering high-fidelity interactive gallery slides
interface GallerySlideProps {
  index: number;
  product: any;
  selectedVariant: any;
  isLightbox?: boolean;
}

const GallerySlide: React.FC<GallerySlideProps> = ({
  index,
  product,
  selectedVariant,
  isLightbox = false
}) => {
  const containerClass = `w-full h-full flex items-center justify-center bg-white ${
    isLightbox ? 'max-h-[80vh] p-8' : 'p-6'
  }`;

  switch (index) {
    case 0: {
      const src = getProductImage(product.id);
      return (
        <div className={containerClass}>
          {src ? (
            <img
              src={src}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <ProductCanvas
              name={product.name}
              accentHex={product.accentHex}
              pantone={product.pantone}
              categoryLabel={product.categoryLabel}
              size="lg"
              active={true}
            />
          )}
        </div>
      );
    }
    
    case 1: {
      const servings = getServingsCount(selectedVariant.id);
      const metadata = servingMetadata[product.id] || { size: '1 serving daily', countSuffix: 'servings per container' };
      return (
        <div className={`${containerClass} flex flex-col justify-start overflow-y-auto text-text-dark font-sans select-text border border-border-light shadow-sm`}>
          <div className="w-full max-w-md mx-auto py-4 px-2">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-left leading-none border-b-8 border-text-dark pb-1.5 font-logo">
              Supplement Facts
            </h3>
            <div className="text-xs font-semibold py-1.5 border-b border-text-dark/40 flex justify-between">
              <span>Serving Size: {metadata.size}</span>
              <span>Servings Per Container: {servings}</span>
            </div>
            
            <div className="w-full mt-2.5 font-bold text-[10px] uppercase flex justify-between border-b-4 border-text-dark pb-0.5">
              <span>Amount Per Serving</span>
              <span>% Daily Value</span>
            </div>

            <div className="space-y-2 mt-2">
              {product.ingredients.map((ing: any) => (
                <div key={ing.name} className="border-b border-border-light pb-2">
                  <div className="flex justify-between items-baseline text-xs font-bold">
                    <span>{ing.name}</span>
                    <div className="flex gap-4 text-right">
                      <span>{ing.amount}</span>
                      <span className="min-w-[45px]">{ing.dailyValue || '*'}</span>
                    </div>
                  </div>
                  <div className="text-[9px] text-text-secondary italic mt-0.5 font-light">
                    Purpose: {ing.purpose}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[9.5px] border-t-8 border-text-dark pt-2.5 mt-4 leading-relaxed font-light text-text-secondary text-left">
              * Daily Value not established.
              <br />
              <span className="font-semibold text-text-dark">Other Ingredients:</span> None. 100% trace-tested botanical or mineral extracts. Free of synthetic binders, flow agents, or chemical glazes.
            </div>
          </div>
        </div>
      );
    }

    case 2:
      return (
        <div className={`${containerClass} flex flex-col justify-center border border-border-light shadow-sm px-8`}>
          <div className="w-full max-w-md mx-auto space-y-6 text-left">
            <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">Target Outputs</span>
            <h3 className="text-xl md:text-2xl font-logo tracking-editorial text-text-dark uppercase">
              Formulation Benefits
            </h3>
            <div className="space-y-4 pt-2">
              {product.benefits.map((b: string, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-border-light flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check size={12} className="text-[#B51E2E] stroke-[3]" />
                  </div>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light font-sans">
                    {b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className={`${containerClass} flex flex-col justify-center border border-border-light shadow-sm px-8`}>
          <div className="w-full max-w-md mx-auto space-y-6 text-left relative">
            <div className="absolute -top-4 right-0 border border-text-dark/10 p-2 rounded-full opacity-10">
              <ShieldCheck size={72} strokeWidth={0.5} />
            </div>
            
            <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted font-sans">Purity Assay</span>
            <h3 className="text-xl md:text-2xl font-logo tracking-editorial text-text-dark uppercase">
              Lab Verification
            </h3>
            
            <div className="border border-border-light bg-bg-soft p-4 rounded space-y-3.5 mt-4">
              <div className="flex justify-between items-center border-b border-border-light/50 pb-2">
                <span className="text-[10px] uppercase font-bold text-text-secondary font-sans">ICP-MS Heavy Metals</span>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 font-sans">PASS</span>
              </div>
              <div className="flex justify-between items-center border-b border-border-light/50 pb-2">
                <span className="text-[10px] uppercase font-bold text-text-secondary font-sans">Microbial Profile</span>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 font-sans">PASS</span>
              </div>
              <div className="flex justify-between items-center border-b border-border-light/50 pb-2">
                <span className="text-[10px] uppercase font-bold text-text-secondary font-sans">Glyphosate & Pesticides</span>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 font-sans">ND</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-text-secondary font-sans">Active Compound Purity</span>
                <span className="text-[10px] uppercase font-bold text-text-dark bg-white px-2 py-0.5 border border-border-light font-sans">100% VERIFIED</span>
              </div>
            </div>

            <p className="text-[10px] text-text-secondary leading-relaxed font-light mt-2 font-sans">
              Each batch is trace-tested at receipt and verified by third-party laboratories. Clean chemical extraction pathways only. Scan the QR code on your canister to view specific lot COAs.
            </p>
          </div>
        </div>
      );

    case 4:
      return (
        <div className={`${containerClass} flex flex-col justify-center border border-border-light shadow-sm px-8`}>
          <div className="w-full max-w-md mx-auto space-y-5 text-left">
            <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted font-sans">Origin Integrity</span>
            <h3 className="text-xl md:text-2xl font-logo tracking-editorial text-text-dark uppercase">
              Sourcing Story
            </h3>
            
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light font-sans mt-2">
              {product.sourcingStory}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border-light text-[10px] uppercase font-bold text-text-secondary mt-2">
              <div>
                <span className="text-text-muted font-normal block text-[9px] mb-0.5 font-sans">Sourcing Location</span>
                <span className="text-text-dark font-sans">{product.highlights[0]?.value}</span>
              </div>
              <div>
                <span className="text-text-muted font-normal block text-[9px] mb-0.5 font-sans">Standardization</span>
                <span className="text-text-dark font-sans">{product.highlights[1]?.value}</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 5:
      return (
        <div className={`${containerClass} flex flex-col justify-center border border-border-light shadow-sm px-8`}>
          <div className="w-full max-w-md mx-auto space-y-6 text-left">
            <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted font-sans">Intake Schedule</span>
            <h3 className="text-xl md:text-2xl font-logo tracking-editorial text-text-dark uppercase">
              Daily Protocol
            </h3>
            
            <div className="space-y-4 mt-2">
              <div className="border-l border-text-dark/20 pl-4 py-0.5 relative">
                <div className="absolute top-1.5 -left-1 w-2 h-2 rounded-full bg-text-dark" />
                <span className="text-[9.5px] uppercase font-bold text-text-muted block font-sans">Dosage</span>
                <span className="text-xs text-text-secondary font-light font-sans">{servingMetadata[product.id]?.size || '1 serving'}</span>
              </div>
              <div className="border-l border-text-dark/20 pl-4 py-0.5 relative">
                <div className="absolute top-1.5 -left-1 w-2 h-2 rounded-full bg-text-dark" />
                <span className="text-[9.5px] uppercase font-bold text-text-muted block font-sans">Optimal Window</span>
                <span className="text-xs text-text-secondary font-light font-sans">Integrated into your daily baseline routine</span>
              </div>
              <div className="border-l border-text-dark/20 pl-4 py-0.5 relative">
                <div className="absolute top-1.5 -left-1 w-2 h-2 rounded-full bg-text-dark" />
                <span className="text-[9.5px] uppercase font-bold text-text-muted block font-sans">Instructions</span>
                <span className="text-xs text-text-secondary font-light font-sans">{product.usageInstructions}</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 6:
      return (
        <div className={`${containerClass} flex flex-col justify-center border border-border-light shadow-sm px-8`}>
          <div className="w-full max-w-md mx-auto space-y-5 text-left">
            <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted font-sans">Storage Science</span>
            <h3 className="text-xl md:text-2xl font-logo tracking-editorial text-text-dark uppercase">
              Amber Glass Jar
            </h3>
            
            <div className="space-y-4 mt-2">
              <div>
                <h4 className="text-[11px] uppercase font-bold text-text-dark mb-0.5 font-sans">UV Light Protection</h4>
                <p className="text-[10px] text-text-secondary leading-relaxed font-light font-sans">
                  Amber glass filters out ultraviolet rays to protect delicate chemical bonds from breakdown, keeping compounds active.
                </p>
              </div>
              <div>
                <h4 className="text-[11px] uppercase font-bold text-text-dark mb-0.5 font-sans">Ecological Stewardship</h4>
                <p className="text-[10px] text-text-secondary leading-relaxed font-light font-sans">
                  A heavy, high-grade permanent apothecary jar designed to be filled continuously with light, low-carbon paper refill bags.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case 7:
      return (
        <div className={`${containerClass} flex flex-col justify-center border border-border-light shadow-sm px-8`}>
          <div className="w-full max-w-md mx-auto space-y-5 text-left">
            <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted font-sans">Client Guarantee</span>
            <h3 className="text-xl md:text-2xl font-logo tracking-editorial text-text-dark uppercase">
              Brand Guarantees
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="border border-border-light p-3.5 text-left bg-bg-soft">
                <Truck size={18} strokeWidth={1.5} className="text-text-dark mb-2" />
                <h5 className="text-[10px] uppercase font-bold text-text-dark mb-0.5 font-sans">Free Shipping</h5>
                <p className="text-[9px] text-text-secondary leading-normal font-light font-sans">
                  Complimentary delivery on all orders above ₹999.
                </p>
              </div>
              <div className="border border-border-light p-3.5 text-left bg-bg-soft">
                <RefreshCw size={18} strokeWidth={1.5} className="text-text-dark mb-2" />
                <h5 className="text-[10px] uppercase font-bold text-text-dark mb-0.5 font-sans">30-Day Ritual</h5>
                <p className="text-[9px] text-text-secondary leading-normal font-light font-sans">
                  Full refund if formulation doesn't align with your body.
                </p>
              </div>
            </div>
            <p className="text-[10px] text-text-muted leading-relaxed font-light mt-2 text-center font-sans">
              We stand behind our chemical standards and biological outputs.
            </p>
          </div>
        </div>
      );

    default:
      return <div className={containerClass}>Slide Error</div>;
  }
};

const renderThumbnailIcon = (index: number, product: any) => {
  switch (index) {
    case 0:
      return (
        <div className="w-5 h-9 rounded-sm bg-[#3A2312] border-r border-white/5 flex flex-col items-center justify-between p-0.5 shadow-inner scale-[0.8]">
          <div className="w-3.5 h-1 bg-black/60 rounded-t-sm" />
          <div className="w-3.5 h-[60%] bg-[#FAFAF8] flex flex-col justify-between py-0.5">
            <div className="w-full h-[0.5px] bg-[#EAEAEA]" />
            <div className="w-full h-0.5" style={{ backgroundColor: product.accentHex }} />
          </div>
        </div>
      );
    case 1:
      return (
        <div className="w-8 h-8 flex flex-col gap-0.5 scale-[0.8] opacity-60">
          <div className="h-1.5 bg-text-dark/80 w-full" />
          <div className="h-[1px] bg-text-dark/40 w-full" />
          <div className="h-1 bg-text-secondary/20 w-full" />
          <div className="h-1 bg-text-secondary/20 w-full" />
          <div className="h-1 bg-text-secondary/20 w-full" />
          <div className="h-[1.5px] bg-text-dark/80 w-full" />
        </div>
      );
    case 2:
      return (
        <div className="w-8 h-8 flex flex-col gap-1 scale-[0.8] justify-center items-start opacity-70">
          <div className="flex gap-1 items-center w-full">
            <Check size={8} className="text-[#B51E2E]" />
            <div className="h-1 bg-text-secondary/20 w-full rounded-sm" />
          </div>
          <div className="flex gap-1 items-center w-full">
            <Check size={8} className="text-[#B51E2E]" />
            <div className="h-1 bg-text-secondary/20 w-full rounded-sm" />
          </div>
          <div className="flex gap-1 items-center w-full">
            <Check size={8} className="text-[#B51E2E]" />
            <div className="h-1 bg-text-secondary/20 w-full rounded-sm" />
          </div>
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col items-center justify-center scale-[0.8] opacity-70">
          <ShieldCheck size={14} strokeWidth={2} className="text-text-dark" />
          <span className="text-[7px] font-bold uppercase tracking-tight mt-0.5">COA</span>
        </div>
      );
    case 4:
      return (
        <div className="flex flex-col items-center justify-center scale-[0.8] opacity-70">
          <MapPin size={14} strokeWidth={2} className="text-text-dark" />
          <span className="text-[7px] font-bold uppercase tracking-tight mt-0.5">Origin</span>
        </div>
      );
    case 5:
      return (
        <div className="flex flex-col items-center justify-center scale-[0.8] opacity-70">
          <Clock size={14} strokeWidth={2} className="text-text-dark" />
          <span className="text-[7px] font-bold uppercase tracking-tight mt-0.5">Daily</span>
        </div>
      );
    case 6:
      return (
        <div className="flex flex-col items-center justify-center scale-[0.8] opacity-70">
          <Layers size={14} strokeWidth={2} className="text-text-dark" />
          <span className="text-[7px] font-bold uppercase tracking-tight mt-0.5">Jar</span>
        </div>
      );
    case 7:
      return (
        <div className="flex flex-col items-center justify-center scale-[0.8] opacity-70">
          <Truck size={14} strokeWidth={2} className="text-text-dark" />
          <span className="text-[7px] font-bold uppercase tracking-tight mt-0.5">Trust</span>
        </div>
      );
    default:
      return null;
  }
};

// Sub-component for rendering cross-sell recommendation cards
interface PairProductCardProps {
  product: any;
  addToCart: any;
  convertPrice: (usd: number) => number;
}

const PairProductCard: React.FC<PairProductCardProps> = ({
  product,
  addToCart,
  convertPrice
}) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  useEffect(() => {
    setSelectedVariant(product.variants[0]);
  }, [product]);

  const currentPrice = convertPrice(selectedVariant.price);

  return (
    <div className="bg-white border border-[#EAEAEA] p-4 flex flex-col justify-between text-center select-none rounded-none">
      {/* Product Image Area */}
      <div className="w-full aspect-[4/5] bg-[#F8F7F4] flex items-center justify-center border-b border-[#EAEAEA] mb-4 overflow-hidden">
        {(() => {
          const src = getProductImage(product.id);
          return src ? (
            <img src={src} alt={product.name} className="w-full h-full object-contain p-5" />
          ) : (
            <ProductCanvas
              name={product.name}
              accentHex={product.accentHex}
              pantone={product.pantone}
              categoryLabel={product.categoryLabel}
              size="sm"
              active={false}
            />
          );
        })()}
      </div>

      {/* Product Name */}
      <h4 className="text-[13px] font-bold text-text-dark tracking-wide line-clamp-2 h-9 flex items-center justify-center font-sans mb-1 uppercase">
        {product.name}
      </h4>

      {/* Price */}
      <p className="text-[14px] font-bold text-text-dark font-sans mb-3">
        ₹{currentPrice.toLocaleString('en-IN')}
      </p>

      {/* Variant Dropdown */}
      <div className="relative w-full mb-3">
        <select
          value={selectedVariant.id}
          onChange={(e) => {
            const v = product.variants.find((varItem: any) => varItem.id === e.target.value);
            if (v) setSelectedVariant(v);
          }}
          className="bg-white border border-[#CCCCCC] rounded-none px-3 h-[40px] text-xs font-semibold text-text-dark focus:outline-none focus:border-text-dark cursor-pointer w-full appearance-none pr-8 font-sans text-left"
        >
          {product.variants.map((v: any) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-text-secondary">
          <ChevronDown size={12} />
        </div>
      </div>

      {/* Add To Cart Button */}
      <button
        onClick={() => addToCart(product, selectedVariant, 1, 'one-time')}
        className="w-full h-[40px] bg-[#B51E2E] hover:bg-[#911623] text-white text-xs font-bold uppercase tracking-wider transition-colors duration-300 rounded-none flex items-center justify-center"
      >
        Add to Cart
      </button>
    </div>
  );
};

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
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [deliveryFrequency, setDeliveryFrequency] = useState('30 days');
  const [expandedSection, setExpandedSection] = useState<'benefits' | 'how-to-use' | 'ingredients' | null>('benefits');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  
  // Sticky panel scroll trigger
  const [stickyVisible, setStickyVisible] = useState(false);
  const buyButtonRef = useRef<HTMLButtonElement>(null);

  // Swiping state for mobile touch
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setActiveSlideIndex((prev) => (prev + 1) % 8);
    } else if (isRightSwipe) {
      setActiveSlideIndex((prev) => (prev - 1 + 8) % 8);
    }
  };

  useEffect(() => {
    // Reset inputs on product page change
    setSelectedVariant(product.variants[0]);
    setPurchaseType('subscription');
    setQuantity(1);
    setActiveSlideIndex(0);
    setDeliveryFrequency('30 days');
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

  // Pricing calculations (scaled dynamically by 30 to reflect domestic Indian Rupee value)
  const convertPrice = (usd: number) => Math.round(usd * 30);
  const oneTimePrice = convertPrice(selectedVariant.price);
  const subscriptionPrice = convertPrice(selectedVariant.subscriptionPrice);
  const activePrice = purchaseType === 'subscription' ? subscriptionPrice : oneTimePrice;

  const handleAddToCart = () => {
    // Submit original USD pricing structures to CartContext to preserve logic
    addToCart(product, selectedVariant, quantity, purchaseType);
  };

  // Cleaned up unused data sections

  const servings = getServingsCount(selectedVariant.id);
  const pricePerServing = (activePrice / servings).toFixed(2);
  const showDiscount = purchaseType === 'subscription';

  return (
    <div className="bg-bg-pure flex flex-col font-sans text-left">
      
      {/* 1. Hero Block */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-[60px] pb-[80px] bg-white grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 items-start">
        
        {/* Left Column: Product Visuals */}
        <div className="md:sticky md:top-[100px] w-full md:h-[calc(100vh-160px)] md:max-h-[640px] md:min-h-[450px]">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 w-full h-full items-stretch">
            {/* Stacked thumbnails - hidden on mobile, vertical strip on desktop */}
            <div className="hidden md:flex flex-col gap-2 w-16 lg:w-20 flex-shrink-0 h-full justify-between">
              {[...Array(8)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlideIndex(i)}
                  className={`w-full flex-grow flex-shrink min-h-0 border bg-white flex items-center justify-center p-1 cursor-pointer transition-all duration-200 ${
                    activeSlideIndex === i 
                      ? 'border-text-dark shadow-sm ring-1 ring-text-dark'
                      : 'border-border-light hover:border-text-muted'
                  }`}
                  aria-label={`Show slide ${i + 1}`}
                >
                  {renderThumbnailIcon(i, product)}
                </button>
              ))}
            </div>

            {/* Center area - Large product view */}
            <div className="flex-1 bg-white border border-border-light relative overflow-hidden aspect-[4/5] md:aspect-auto h-auto md:h-full flex items-center justify-center p-4">
              {/* Active View Transition */}
              <div 
                className="w-full h-full"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlideIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                  >
                    <GallerySlide
                      index={activeSlideIndex}
                      product={product}
                      selectedVariant={selectedVariant}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setActiveSlideIndex(prev => (prev - 1 + 8) % 8)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-bg-soft/80 text-text-dark rounded-full transition-colors z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft size={36} strokeWidth={1} />
              </button>
              <button
                onClick={() => setActiveSlideIndex(prev => (prev + 1) % 8)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-bg-soft/80 text-text-dark rounded-full transition-colors z-10"
                aria-label="Next slide"
              >
                <ChevronRight size={36} strokeWidth={1} />
              </button>

              {/* Lightbox / Zoom Button (Bottom-Right) */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full border border-border-light bg-white flex items-center justify-center text-text-secondary hover:text-text-dark hover:border-text-secondary transition-colors z-10 shadow-sm"
                aria-label="Zoom image"
              >
                <ZoomIn size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Mobile bullets */}
          <div className="flex md:hidden justify-center gap-1.5 mt-4">
            {[...Array(8)].map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlideIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeSlideIndex === i ? 'bg-text-dark w-4' : 'bg-border-subtle'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Checkout Controls */}
        <div className="space-y-6">
          {/* Category */}
          <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">
            {product.categoryLabel}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-[#111111] leading-[1.08] tracking-tight uppercase">
            {product.name}
          </h1>

          {/* Pricing Area */}
          <div className="flex flex-col text-left font-sans mt-4">
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl md:text-4xl font-bold text-text-dark">₹{activePrice.toLocaleString('en-IN')}</span>
              {showDiscount && (
                <>
                  <span className="text-lg text-text-secondary line-through">₹{oneTimePrice.toLocaleString('en-IN')}</span>
                  <span className="text-sm font-bold text-[#B51E2E]">You save 15%</span>
                </>
              )}
            </div>
            <span className="text-xs md:text-sm text-text-muted mt-1.5 font-semibold">
              ₹{pricePerServing} / serving
            </span>
          </div>

          {/* Description */}
          <p className="text-base md:text-xl lg:text-[21px] text-text-secondary leading-relaxed font-light font-sans mt-5">
            {product.subtitle}
          </p>

          <div className="w-full h-[1px] bg-border-light my-6" />

          {/* Variant Selector */}
          <div>
            <span className="text-xs uppercase tracking-wider text-text-muted font-bold block mb-3">Select Variant</span>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-5 py-3 border text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    selectedVariant.id === v.id
                      ? 'border-text-dark text-text-dark bg-white shadow-sm'
                      : 'border-border-light text-text-secondary hover:border-text-muted bg-transparent'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>

            {/* Serving Size Info */}
            <div className="mt-4 text-xs tracking-wide text-text-secondary">
              <span className="font-bold text-text-dark">Serving Size:</span>{' '}
              {servingMetadata[product.id]?.size || '1 serving daily'}{' '}
              ({servings} {servingMetadata[product.id]?.countSuffix || 'servings per container'})
            </div>
          </div>

          {/* Purchase Protocols (Subscribe vs One-Time) */}
          <div className="space-y-4 pt-4">
            
            {/* Subscribe Box */}
            <div
              onClick={() => setPurchaseType('subscription')}
              className={`w-full bg-white cursor-pointer transition-all duration-300 p-5 rounded-none ${
                purchaseType === 'subscription'
                  ? 'border-2 border-text-dark'
                  : 'border border-[#EAEAEA] hover:border-text-muted'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className={`w-[16px] h-[16px] rounded-full border flex items-center justify-center flex-shrink-0 ${
                    purchaseType === 'subscription' ? 'border-[#0073e6] bg-white' : 'border-[#CCCCCC] bg-white'
                  }`}>
                    {purchaseType === 'subscription' && <div className="w-[8px] h-[8px] rounded-full bg-[#0073e6]" />}
                  </div>
                  <span className="text-[14px] font-bold text-text-dark tracking-wider font-sans">
                    SUBSCRIBE & SAVE 15%
                  </span>
                </div>
                <span className="text-[16px] font-bold text-[#B51E2E] font-sans">
                  ₹{subscriptionPrice.toLocaleString('en-IN')}
                </span>
              </div>
              
              {purchaseType === 'subscription' && (
                <div className="mt-4 border-t border-[#EAEAEA] pt-4 text-left">
                  <span className="text-[11px] font-bold text-[#888888] tracking-wider block font-sans">
                    DELIVERY FREQUENCY
                  </span>
                  <div className="mt-2 relative w-full max-w-[250px]">
                    <select
                      value={deliveryFrequency}
                      onChange={(e) => setDeliveryFrequency(e.target.value)}
                      className="bg-white border border-[#CCCCCC] rounded-none px-4 h-[48px] text-[13px] font-semibold text-text-dark focus:outline-none focus:border-text-dark cursor-pointer w-full appearance-none pr-10 font-sans"
                    >
                      <option value="30 days">Deliver every 30 days</option>
                      <option value="45 days">Deliver every 45 days</option>
                      <option value="60 days">Deliver every 60 days</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-text-secondary">
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* One-Time Row */}
            <div
              onClick={() => setPurchaseType('one-time')}
              className={`w-full bg-white border cursor-pointer transition-all duration-300 h-[56px] flex items-center justify-between px-5 rounded-none ${
                purchaseType === 'one-time'
                  ? 'border-2 border-text-dark'
                  : 'border border-[#EAEAEA] hover:border-text-muted'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-[16px] h-[16px] rounded-full border flex items-center justify-center flex-shrink-0 ${
                  purchaseType === 'one-time' ? 'border-[#0073e6] bg-white' : 'border-[#CCCCCC] bg-white'
                }`}>
                  {purchaseType === 'one-time' && <div className="w-[8px] h-[8px] rounded-full bg-[#0073e6]" />}
                </div>
                <span className="text-[14px] font-bold text-text-dark tracking-wider font-sans">
                  ONE-TIME PURCHASE
                </span>
              </div>
              <span className="text-[16px] font-bold text-text-dark font-sans">
                ₹{oneTimePrice.toLocaleString('en-IN')}
              </span>
            </div>

          </div>

          {/* Quantity & CTA */}
          <div className="flex gap-3 mt-6 items-center">
            {/* Quantity */}
            <div className="flex items-center justify-between border border-[#CCCCCC] bg-white h-[56px] w-[130px] rounded-none px-2.5 flex-shrink-0">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="w-8 h-8 flex items-center justify-center hover:bg-bg-subtle text-text-secondary transition-colors text-lg"
                aria-label="Decrease quantity"
              >
                <Minus size={14} strokeWidth={2} />
              </button>
              <span className="text-sm text-text-dark font-bold select-none font-sans">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-bg-subtle text-text-secondary transition-colors text-lg"
                aria-label="Increase quantity"
              >
                <Plus size={14} strokeWidth={2} />
              </button>
            </div>

            {/* CTA */}
            <button
              ref={buyButtonRef}
              onClick={handleAddToCart}
              className="flex-grow h-[56px] bg-[#B51E2E] hover:bg-[#911623] text-white text-sm uppercase tracking-[0.15em] font-bold transition-colors rounded-none flex items-center justify-center"
            >
              ADD TO CART
            </button>
          </div>

            {/* Shipping Message */}
            <p className="text-center text-[12px] text-text-secondary mt-3 font-medium tracking-wide font-sans">
              Free Shipping on Orders ₹999+
            </p>

            {/* Pair It With Section */}
            <div className="mt-12 pt-8 border-t border-border-light text-left">
              <h3 className="text-center text-[18px] font-bold text-text-dark uppercase tracking-wider mb-6 font-sans">
                Pair it With
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products
                  .filter((p) => p.id !== product.id)
                  .slice(0, 2)
                  .map((pairProduct) => (
                    <PairProductCard
                      key={pairProduct.id}
                      product={pairProduct}
                      addToCart={addToCart}
                      convertPrice={convertPrice}
                    />
                  ))}
              </div>
            </div>

          </div>

      </section>

      {/* 2. Product Information Accordion & Lifestyle Image Section */}
      <section className="w-full bg-[#F7F7F7] border-t border-border-light py-16 md:py-24">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[55%_45%] items-stretch gap-0">
          
          {/* Left Column: White Box containing Accordion */}
          <div className="bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center border border-border-light select-none">
            <h2 className="text-2xl md:text-3xl font-bold text-[#222] uppercase tracking-wider mb-8 font-logo">
              Product Information
            </h2>
            
            <div className="space-y-4">
              {/* Accordion Item 1: Benefits */}
              <div className="border-b border-[#EAEAEA] pb-4">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'benefits' ? null : 'benefits')}
                  className="w-full flex items-center justify-between py-2 text-left hover:text-[#B51E2E] transition-colors focus:outline-none"
                  aria-expanded={expandedSection === 'benefits'}
                >
                  <span className="text-base md:text-lg font-bold text-[#222] uppercase tracking-wide font-sans">
                    Benefits
                  </span>
                  <div className="w-6 h-6 rounded-full border border-text-dark/15 flex items-center justify-center text-text-dark font-sans flex-shrink-0 transition-transform duration-300">
                    {expandedSection === 'benefits' ? <Minus size={12} strokeWidth={2.5} /> : <Plus size={12} strokeWidth={2.5} />}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {expandedSection === 'benefits' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-6">
                        {getDetailedBenefits(product.id, product.benefits).map((b, i) => (
                          <div key={i} className="text-left">
                            <h4 className="text-sm font-bold text-[#222] uppercase tracking-wide font-sans mb-1">
                              {b.title}
                            </h4>
                            <p className="text-xs md:text-sm text-[#444] leading-relaxed font-light font-sans">
                              {b.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion Item 2: How To Use */}
              <div className="border-b border-[#EAEAEA] pb-4">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'how-to-use' ? null : 'how-to-use')}
                  className="w-full flex items-center justify-between py-2 text-left hover:text-[#B51E2E] transition-colors focus:outline-none"
                  aria-expanded={expandedSection === 'how-to-use'}
                >
                  <span className="text-base md:text-lg font-bold text-[#222] uppercase tracking-wide font-sans">
                    How to Use
                  </span>
                  <div className="w-6 h-6 rounded-full border border-text-dark/15 flex items-center justify-center text-text-dark font-sans flex-shrink-0 transition-transform duration-300">
                    {expandedSection === 'how-to-use' ? <Minus size={12} strokeWidth={2.5} /> : <Plus size={12} strokeWidth={2.5} />}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {expandedSection === 'how-to-use' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 text-left">
                        <h4 className="text-sm font-bold text-[#222] uppercase tracking-wide font-sans mb-2">
                          Daily Protocol
                        </h4>
                        <p className="text-xs md:text-sm text-[#444] leading-relaxed font-light font-sans">
                          {product.usageInstructions}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion Item 3: Ingredients */}
              <div className="pb-2">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'ingredients' ? null : 'ingredients')}
                  className="w-full flex items-center justify-between py-2 text-left hover:text-[#B51E2E] transition-colors focus:outline-none"
                  aria-expanded={expandedSection === 'ingredients'}
                >
                  <span className="text-base md:text-lg font-bold text-[#222] uppercase tracking-wide font-sans">
                    Ingredients
                  </span>
                  <div className="w-6 h-6 rounded-full border border-text-dark/15 flex items-center justify-center text-text-dark font-sans flex-shrink-0 transition-transform duration-300">
                    {expandedSection === 'ingredients' ? <Minus size={12} strokeWidth={2.5} /> : <Plus size={12} strokeWidth={2.5} />}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {expandedSection === 'ingredients' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 text-left space-y-4">
                        <h4 className="text-sm font-bold text-[#222] uppercase tracking-wide font-sans mb-1">
                          Supplement Facts
                        </h4>
                        <div className="border border-border-light bg-[#FAF9F6] p-4 rounded-none font-sans">
                          <div className="w-full font-bold text-xs uppercase flex justify-between border-b border-text-dark pb-2 mb-2">
                            <span>Active Compound</span>
                            <span>Amount</span>
                          </div>
                          {product.ingredients.map((ing: any) => (
                            <div key={ing.name} className="flex justify-between items-baseline text-xs font-bold border-b border-border-light py-2 last:border-0 text-text-dark">
                              <div className="flex flex-col">
                                <span>{ing.name}</span>
                                <span className="text-[10px] text-text-secondary font-normal italic mt-0.5">{ing.purpose}</span>
                              </div>
                              <span>{ing.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* Right Column: Full-height Lifestyle Image */}
          <div className="relative w-full h-full min-h-[400px] lg:min-h-0 border-y lg:border-y-0 border-border-light">
            <img 
              src={productLifestyleImages[product.id] || promiseAbsorption} 
              alt={`${product.name} lifestyle`} 
              className="absolute inset-0 w-full h-full object-cover rounded-none shadow-none"
            />
          </div>

        </div>
      </section>

      {/* 3. FAQ Section */}
      <section className="w-full bg-white py-16 md:py-24 border-t border-border-light">
        <div className="w-full max-w-[850px] mx-auto px-6 md:px-12 select-none">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] uppercase tracking-wider text-center mb-12 font-logo">
            FAQs
          </h2>

          {/* FAQ Accordion List */}
          <div className="border-t border-[#EAEAEA]">
            {faqItems.map((faq, index) => {
              const isOpen = expandedFaqIndex === index;
              return (
                <div key={index} className="border-b border-[#EAEAEA]">
                  <button
                    onClick={() => setExpandedFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between py-6 text-left hover:text-[#B51E2E] transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base md:text-lg font-semibold text-[#222] font-sans pr-8 leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-[#666] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-text-dark' : 'rotate-0'
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-xs md:text-sm text-[#444] leading-relaxed font-light font-sans max-w-[800px]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Quiz Section (Home Page Quiz Component) */}
      <SupplementQuizSection />

      {/* 5. Customers Also Bought Section */}
      <CustomersAlsoBought />

      {/* 6. Learn More from the Blog Section */}
      <PdpBlogSection />

      {/* 7. Instagram / Social Gallery */}
      <PdpInstagramSection />

      {/* 8. Customer Reviews Section */}
      <CustomerReviews />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
            {/* Close Button */}
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-50"
              aria-label="Close zoom modal"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            {/* Left Nav Arrow */}
            <button 
              onClick={() => setActiveSlideIndex(prev => (prev - 1 + 8) % 8)}
              className="absolute left-6 text-white/50 hover:text-white p-3 transition-colors z-40 hidden md:block"
              aria-label="Previous slide in zoom"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            {/* Main Content Area */}
            <div className="w-full max-w-4xl max-h-[85vh] p-4 flex items-center justify-center">
              <GallerySlide 
                index={activeSlideIndex} 
                product={product} 
                selectedVariant={selectedVariant} 
                isLightbox={true}
              />
            </div>

            {/* Right Nav Arrow */}
            <button 
              onClick={() => setActiveSlideIndex(prev => (prev + 1) % 8)}
              className="absolute right-6 text-white/50 hover:text-white p-3 transition-colors z-40 hidden md:block"
              aria-label="Next slide in zoom"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>
            
            {/* Bottom dots */}
            <div className="absolute bottom-6 flex gap-2">
              {[...Array(8)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlideIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeSlideIndex === i ? 'bg-white w-4' : 'bg-white/30'
                  }`}
                  aria-label={`Go to slide ${i + 1} in zoom`}
                />
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

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
