import React from 'react';
import { motion } from 'framer-motion';
import { Users, FlaskConical, ShieldCheck, Activity, Calendar, ArrowRight } from 'lucide-react';

interface FeatureBlockProps {
  icon: React.ReactNode;
  title: string;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Outlined Icon inside a thin white square border */}
      <div className="w-14 h-14 flex items-center justify-center border border-white/60 mb-4 text-white">
        {icon}
      </div>
      {/* Title with multi-line support */}
      <h3 className="font-sans font-bold text-xs sm:text-sm tracking-wide uppercase text-white max-w-[200px] leading-snug">
        {title}
      </h3>
    </div>
  );
};

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date }) => {
  return (
    <div className="bg-white p-6 md:p-8 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300 text-left">
      <div>
        {/* Title */}
        <h4 className="font-sans font-bold text-[#111111] text-base md:text-lg lg:text-xl mb-3 leading-snug hover:text-[#B71C2B] transition-colors cursor-pointer">
          {title}
        </h4>
        {/* Excerpt */}
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed line-clamp-3 mb-6">
          {excerpt}
        </p>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-2 text-[10px] sm:text-xs text-text-muted font-medium border-t border-border-light pt-4 mt-auto">
        <Calendar size={12} className="text-[#888888]" />
        <span>{date}</span>
      </div>
    </div>
  );
};

export const BrandBannerAndBlog: React.FC = () => {
  // Viewport stagger entry animations
  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
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
    <div className="w-full flex flex-col select-none">
      
      {/* TOP RED BRAND BANNER */}
      <motion.section
        className="w-full bg-[#B71C2B] py-16 md:py-24 px-6 md:px-12 xl:px-24 flex flex-col items-center justify-center min-h-[380px] lg:min-h-[400px] border-b border-[#A01625]/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10 md:gap-14">
          {/* Headline */}
          <motion.h2 
            variants={itemVariants}
            className="font-sans font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight uppercase tracking-wide"
          >
            Add More Life to Your Years
          </motion.h2>

          {/* Feature Row */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-12 w-full max-w-6xl mx-auto justify-items-center"
          >
            <FeatureBlock 
              icon={<Users size={24} strokeWidth={1.5} />} 
              title="Trusted by Millions" 
            />
            <FeatureBlock 
              icon={<FlaskConical size={24} strokeWidth={1.5} />} 
              title="Clinically Studied Ingredients" 
            />
            <FeatureBlock 
              icon={<ShieldCheck size={24} strokeWidth={1.5} />} 
              title="Backed by Science, Designed for You" 
            />
            <FeatureBlock 
              icon={<Activity size={24} strokeWidth={1.5} />} 
              title="Designed with Absorption in Mind" 
            />
          </motion.div>


        </div>
      </motion.section>

      {/* BLOG SECTION */}
      <motion.section
        className="w-full bg-[#F4F4F4] py-24 md:py-32 px-6 md:px-12 xl:px-24 border-b border-border-light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
          {/* Header Row */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E5E5E5] pb-6"
          >
            {/* Left Title */}
            <h3 className="font-sans font-black text-text-dark text-xl sm:text-2xl md:text-3xl uppercase tracking-editorial">
              Read More on the Blog
            </h3>
            {/* Right Link */}
            <a 
              href="/blog" 
              onClick={(e) => e.preventDefault()} // Pure mock mode
              className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-[#111111] transition-colors"
            >
              <span>View all</span>
              <div className="w-7 h-7 rounded-full border border-border-light bg-white flex items-center justify-center text-text-dark shadow-sm hover:border-[#111111] transition-colors">
                <ArrowRight size={12} strokeWidth={2} />
              </div>
            </a>
          </motion.div>

          {/* Blog Cards Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 w-full"
          >
            <BlogCard 
              title="Curcumin vs Turmeric - What’s the Difference?" 
              excerpt="Understand the key biological variations between curcumin and whole turmeric root. Discover how active curcuminoids optimize inflammatory responses, and why simple powder formulations fall short..."
              date="June 15, 2026"
            />
            <BlogCard 
              title="CoQ10 - What is it and why is it important?" 
              excerpt="Coenzyme Q10 acts as a critical catalyst for cellular mitochondrial energy synthesis. Learn how its levels change as we age, and how active Ubiquinol supports heart muscle elasticity..."
              date="May 28, 2026"
            />
            <BlogCard 
              title="What is Turmeric?" 
              excerpt="A deep dive into the historical sourcing and molecular structure of this powerful golden botanical. We trace its origins and verify how clinical standardization yields true cellular wellness..."
              date="May 10, 2026"
            />
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
};

export default BrandBannerAndBlog;
