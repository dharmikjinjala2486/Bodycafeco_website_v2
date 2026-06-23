import React from 'react';
import { motion } from 'framer-motion';

// Import image assets
import instagram1 from '../assets/instagram_1.png';
import instagram2 from '../assets/instagram_2.png';
import instagram3 from '../assets/instagram_3.png';
import instagram4 from '../assets/instagram_4.png';
import instagram5 from '../assets/instagram_5.png';
import instagram6 from '../assets/instagram_6.png';

interface GalleryItemProps {
  image: string;
  alt: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, alt }) => {
  return (
    <div className="relative overflow-hidden cursor-pointer group w-full h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px]">
      {/* Lifestyle Image */}
      <img 
        src={image} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none pointer-events-none"
      />
      {/* Hover Dark Overlay & Instagram Icon */}
      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export const SocialGallery: React.FC = () => {
  const galleryItems = [
    { image: instagram1, alt: "Omega 3 in hand lifestyle" },
    { image: instagram2, alt: "Creatine canister on counter lifestyle" },
    { image: instagram3, alt: "Vitamin D3 + K2 tray lifestyle" },
    { image: instagram4, alt: "Healthy fitness meal with supplement" },
    { image: instagram5, alt: "Supplement bottle beside gym water bottle" },
    { image: instagram6, alt: "Healthy fruit breakfast bowl wellness" }
  ];

  // Viewport entry animations
  const containerVariants = {
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
      className="w-full bg-white pt-[60px] pb-[60px] md:pt-[80px] md:pb-[80px] lg:pt-[100px] lg:pb-[100px] select-none flex flex-col items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      {/* Section Header */}
      <div className="w-full max-w-4xl px-6 text-center mb-10 md:mb-12 flex flex-col items-center gap-3">
        {/* Main Heading */}
        <motion.h2 
          variants={itemVariants}
          className="font-sans font-black text-[#222222] text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-[1.1] uppercase tracking-tight"
        >
          Backed by Science. Loved by You. @bodycafeco
        </motion.h2>

        {/* Subheading */}
        <motion.p 
          variants={itemVariants}
          className="font-sans font-medium text-[#555555] text-base md:text-lg lg:text-[18px]"
        >
          Follow us @bodycafeco
        </motion.p>
      </div>

      {/* Grid Image Gallery */}
      <motion.div 
        variants={itemVariants}
        className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 overflow-hidden"
      >
        {galleryItems.map((item, idx) => (
          <GalleryItem 
            key={idx} 
            image={item.image} 
            alt={item.alt} 
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default SocialGallery;
