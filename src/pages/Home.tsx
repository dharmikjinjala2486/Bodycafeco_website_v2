import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import menopauseImage from '../assets/menopause_relief.png';
import { products } from '../data/products';
import { CategoryPackshot } from '../components/CategoryPackshot';
import promiseScience from '../assets/promise_science.png';
import promiseAbsorption from '../assets/promise_absorption.png';
import promiseEveryday from '../assets/promise_everyday.png';
import BestSellers from '../components/BestSellers';
import SupplementQuizSection from '../components/SupplementQuizSection';
import ShopByBenefit from '../components/ShopByBenefit';
import BrandBannerAndBlog from '../components/BrandBannerAndBlog';
import SocialGallery from '../components/SocialGallery';

const DISPLAY_PRODUCT_IDS = [
  { id: 'creatine-monohydrate', displayName: 'Creatine' },
  { id: 'iron-bisglycinate', displayName: 'Iron' },
  { id: 'omega-3-fish-oil', displayName: 'Omega-3' },
  { id: 'vitamin-d3-k2', displayName: 'Vitamin D3 + K2' },
  { id: 'psyllium-husk', displayName: 'Psyllium Husk' },
  { id: 'magnesium-bisglycinate', displayName: 'Magnesium' }
];

const PROMISE_CARDS = [
  {
    image: promiseScience,
    title: 'Science-Backed Formulas',
    description: 'Clinically researched ingredients formulated to support long-term health, performance, and daily wellness.'
  },
  {
    image: promiseAbsorption,
    title: 'Built Around Absorption',
    description: 'Designed with bioavailability in mind so your body can effectively utilize every ingredient.'
  },
  {
    image: promiseEveryday,
    title: 'Created For Everyday Life',
    description: 'Simple, intentional nutrition designed to support your health journey every single day.'
  }
];

const CategoryItem: React.FC<{ id: string; displayName: string }> = ({ id, displayName }) => {
  const product = products.find(p => p.id === id);
  const [isHovered, setIsHovered] = useState(false);

  if (!product) return null;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="flex flex-col items-center justify-center group cursor-pointer w-full text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full flex justify-center items-center mb-6">
        <CategoryPackshot
          name={product.name}
          accentHex={product.accentHex}
          pantone={product.pantone}
          categoryLabel={product.categoryLabel}
          isHovered={isHovered}
          productId={product.id}
        />
      </div>
      <h3 className="font-sans font-semibold text-[#222222] group-hover:text-black transition-colors duration-300 text-base md:text-lg tracking-editorial">
        {displayName}
      </h3>
    </Link>
  );
};


export const Home: React.FC = () => {
  // Framer Motion variants for stagger load animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const, // premium easeOutExpo ease curve
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.04, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Framer Motion variants for category section staggered fade-up
  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const categoryItemVariants = {
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
    <div className="w-full flex flex-col pt-0">

      {/* HERO SECTION */}
      <div className="flex flex-col lg:flex-row w-full min-h-[80vh] lg:min-h-[85vh] xl:min-h-[90vh] bg-bg-soft overflow-hidden select-none">

        {/* LEFT COLUMN: Clean Lifestyle/Product Image */}
        <div className="w-full lg:w-1/2 min-h-[40vh] sm:min-h-[50vh] lg:min-h-[80vh] xl:min-h-[90vh] bg-[#F3F3F3] overflow-hidden relative flex items-center justify-center">
          <motion.div
            className="w-full h-full"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            <img
              src={menopauseImage}
              alt="Body Cafe Co. Menopause Relief Supplement"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Premium Deep Purple Gradient Layout */}
        <div className="w-full lg:w-1/2 min-h-[50vh] sm:min-h-[60vh] lg:min-h-[80vh] xl:min-h-[90vh] bg-premium-purple-gradient text-white flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 xl:px-24 py-16 lg:py-24 relative select-none">

          {/* Subtle Radial Glow & Wave Patterns */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Ambient Radial Glow Blobs */}
            <div className="absolute -top-[30%] -right-[20%] w-[85%] h-[85%] rounded-full bg-gradient-to-br from-[#8B5CF6]/20 to-transparent blur-[130px] animate-slow-flow-1" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[75%] h-[75%] rounded-full bg-gradient-to-tr from-[#EC4899]/15 to-transparent blur-[110px] animate-slow-flow-2" />
            <div className="absolute top-[30%] left-[20%] w-[55%] h-[55%] rounded-full bg-[#A855F7]/10 blur-[120px] animate-slow-flow-1" style={{ animationDelay: '-6s' }} />

            {/* Flowing Wave Overlay */}
            <svg
              className="absolute bottom-0 left-0 w-full h-[60%] opacity-15 transform translate-y-12 animate-wave-flow"
              viewBox="0 0 1440 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0,288L80,266.7C160,245,320,203,480,202.7C640,203,800,245,960,256C1120,267,1280,245,1360,234.7L1440,224L1440,600L1360,600C1280,600,1120,600,960,600C800,600,640,600,480,600C320,600,160,600,80,600L0,600Z"
                fill="url(#waveGrad)"
              />
              <defs>
                <linearGradient id="waveGrad" x1="720" y1="200" x2="720" y2="600" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EC4899" stopOpacity="0.25" />
                  <stop offset="0.5" stopColor="#8B5CF6" stopOpacity="0.1" />
                  <stop offset="1" stopColor="#090314" stopOpacity="0.9" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Center-Aligned Content Container */}
          <motion.div
            className="w-full max-w-lg text-center flex flex-col items-center justify-center z-10 space-y-6 sm:space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Eyebrow Heading: "Introducing" */}
            <motion.div
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl font-bold italic tracking-wide text-white select-none"
            >
              Introducing
            </motion.div>

            {/* Main Heading: "Menopause Relief" */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] premium-text-glow select-none"
            >
              Creatine<br /> Monohydrate
            </motion.h1>

            {/* Description Details */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl font-medium text-white/90 leading-relaxed max-w-md select-none"
            >
              Pure Creapure® Creatine<br />for Strength, Power & Recovery<br />Visible Performance Support Daily
            </motion.p>

            {/* CTA Button: Pill pink gradient */}
            <motion.div
              variants={itemVariants}
              className="pt-4 sm:pt-6 w-full flex justify-center"
            >
              <Link
                to="/shop"
                className="btn-pink-gradient inline-flex justify-center items-center py-4 px-10 md:px-12 text-sm md:text-base font-bold tracking-superwide text-white uppercase rounded-full select-none text-center w-full sm:w-auto max-w-[280px] sm:max-w-none"
              >
                SHOP NOW
              </Link>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* PREMIUM CATEGORY NAVIGATION SECTION */}
      <motion.section
        className="w-full bg-white py-24 md:py-32 border-b border-border-light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="w-full px-6 md:px-12 xl:px-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-16 md:gap-x-12 lg:gap-x-16 xl:gap-x-20 justify-items-center items-start max-w-[1600px] mx-auto">
            {DISPLAY_PRODUCT_IDS.map((item) => (
              <motion.div
                key={item.id}
                variants={categoryItemVariants}
                className="w-full flex justify-center"
              >
                <CategoryItem id={item.id} displayName={item.displayName} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* BRAND PROMISE SECTION */}
      <motion.section
        className="w-full bg-[#B51E2E] py-24 md:py-32 text-white overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <div className="w-full px-6 md:px-12 xl:px-24 max-w-7xl mx-auto">
          {/* Section Heading */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            className="font-sans font-black tracking-widest text-center text-3xl sm:text-4xl md:text-5xl uppercase mb-16 md:mb-24 leading-tight text-white"
          >
            BODY CAFE CO PROMISE
          </motion.h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-12 lg:gap-x-16 justify-items-center">
            {PROMISE_CARDS.map((card, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className={`flex flex-col items-center text-center group cursor-pointer transition-transform duration-500 ease-[0.16,1,0.3,1] hover:-translate-y-2 w-full ${idx === 2 ? 'md:col-span-2 md:w-1/2 md:mx-auto lg:col-span-1 lg:w-full' : 'w-full'
                  }`}
              >
                {/* Lifestyle Image Wrapper with Hover Scaling */}
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8 shadow-lg">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] select-none pointer-events-none"
                  />
                </div>

                {/* Card Title */}
                <h3 className="font-sans font-black text-xl md:text-2xl mb-4 tracking-wide uppercase text-white">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="font-sans text-white/80 leading-relaxed text-sm max-w-sm font-normal">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* BEST SELLERS SECTION */}
      <BestSellers />

      {/* SUPPLEMENT QUIZ SECTION */}
      <SupplementQuizSection />

      {/* SHOP BY HEALTH BENEFIT SECTION */}
      <ShopByBenefit />

      {/* BRAND BANNER AND BLOG SECTION */}
      <BrandBannerAndBlog />

      {/* SOCIAL PROOF GALLERY SECTION */}
      <SocialGallery />

    </div>
  );
};

export default Home;
