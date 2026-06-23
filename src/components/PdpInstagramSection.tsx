import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Instagram gallery assets
import instagram1 from '../assets/instagram_1.png';
import instagram2 from '../assets/instagram_2.png';
import instagram3 from '../assets/instagram_3.png';
import instagram4 from '../assets/instagram_4.png';
import instagram5 from '../assets/instagram_5.png';
import instagram6 from '../assets/instagram_6.png';

// Additional lifestyle assets
import blogCreatine   from '../assets/blog_creatine.png';
import blogOmega3     from '../assets/blog_omega3.png';
import blogVitaminD3  from '../assets/blog_vitamind3k2.png';
import promiseAbsorption from '../assets/promise_absorption.png';
import quizLifestyle  from '../assets/quiz_lifestyle.png';

interface GalleryImage {
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { src: instagram1,       alt: 'Omega-3 supplement in daily routine' },
  { src: blogCreatine,     alt: 'Creatine supplement performance lifestyle' },
  { src: instagram2,       alt: 'Creatine canister on kitchen counter' },
  { src: blogOmega3,       alt: 'Omega-3 health and wellness lifestyle' },
  { src: instagram3,       alt: 'Vitamin D3 K2 tray lifestyle' },
  { src: promiseAbsorption,alt: 'Supplement absorption and bioavailability lifestyle' },
  { src: instagram4,       alt: 'Healthy fitness meal with supplement' },
  { src: blogVitaminD3,    alt: 'Vitamin D3 K2 daily wellness combination' },
  { src: instagram5,       alt: 'Supplement bottle beside gym water bottle' },
  { src: quizLifestyle,    alt: 'Daily wellness ritual lifestyle' },
  { src: instagram6,       alt: 'Healthy fruit breakfast bowl wellness' },
];

export const PdpInstagramSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  // Scroll to a specific image index
  const scrollToIndex = useCallback((index: number) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const tileWidth = track.scrollWidth / galleryImages.length;
    track.scrollTo({ left: tileWidth * index, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const prev = () => {
    const next = Math.max(0, activeIndex - 1);
    scrollToIndex(next);
  };

  const next = () => {
    const next = Math.min(galleryImages.length - 1, activeIndex + 1);
    scrollToIndex(next);
  };

  // Sync activeIndex on native scroll (touch/mouse drag)
  const onScroll = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const tileWidth = track.scrollWidth / galleryImages.length;
    const newIndex = Math.round(track.scrollLeft / tileWidth);
    setActiveIndex(newIndex);
  };

  // Mouse-drag support for desktop
  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = trackRef.current.scrollLeft;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - dragStartX.current;
    trackRef.current.scrollLeft = dragStartScroll.current - dx;
  };
  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < galleryImages.length - 1;

  return (
    <section className="w-full bg-white py-20 md:py-28 border-t border-[#EAEAEA] select-none overflow-hidden">
      {/* Header */}
      <motion.div
        className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16 flex flex-col items-center text-center mb-10 md:mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Instagram icon row */}
        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#888888]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888888]">@BodyCafeCo</span>
        </div>

        {/* Primary heading */}
        <h2 className="font-logo text-2xl md:text-3xl lg:text-4xl font-bold text-[#111111] uppercase tracking-wide leading-tight mb-3">
          Follow us @BodyCafeCo
        </h2>

        {/* Subtext */}
        <p className="text-sm md:text-base text-[#888888] font-medium">
          Tag{' '}
          <span className="text-[#111111] font-semibold">@BodyCafeCo</span>
          {' '}to be featured in our community
        </p>
      </motion.div>

      {/* Gallery Strip — relative container for overlaid arrows */}
      <div className="relative w-full">

        {/* Left Arrow — overlaid on the gallery edge */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className={`absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-md flex items-center justify-center text-[#222222] transition-all duration-300 hover:bg-white hover:shadow-lg focus:outline-none ${
            canPrev ? 'opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        {/* Scrollable Track */}
        <div
          ref={trackRef}
          className={`flex overflow-x-auto no-scrollbar snap-x snap-mandatory ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 snap-start overflow-hidden
                w-[83vw] sm:w-[calc(100%/3)] lg:w-[calc(100%/5)]
                h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px]
                group"
            >
              <div className="w-full h-full overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow — overlaid on the gallery edge */}
        <button
          onClick={next}
          aria-label="Next image"
          className={`absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-md flex items-center justify-center text-[#222222] transition-all duration-300 hover:bg-white hover:shadow-lg focus:outline-none ${
            canNext ? 'opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {galleryImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to image ${idx + 1}`}
            className={`rounded-full transition-all duration-300 focus:outline-none ${
              idx === activeIndex
                ? 'w-5 h-1.5 bg-[#111111]'
                : 'w-1.5 h-1.5 bg-[#CCCCCC] hover:bg-[#999999]'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default PdpInstagramSection;
