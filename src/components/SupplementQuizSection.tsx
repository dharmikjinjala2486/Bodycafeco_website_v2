import React from 'react';
import { motion } from 'framer-motion';
import quizLifestyle from '../assets/quiz_lifestyle.png';

export const SupplementQuizSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row lg:h-[550px] overflow-hidden bg-[#B51E2E]">
      
      {/* LEFT COLUMN: Lifestyle Image */}
      <motion.div 
        className="w-full lg:w-1/2 h-[350px] sm:h-[400px] md:h-[480px] lg:h-full overflow-hidden relative"
        initial={{ opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img 
          src={quizLifestyle} 
          alt="Body Cafe Co supplements on workspace desk" 
          className="w-full h-full object-cover object-center select-none pointer-events-none"
        />
      </motion.div>

      {/* RIGHT COLUMN: Content Panel */}
      <motion.div 
        className="w-full lg:w-1/2 flex flex-col justify-center py-16 px-6 sm:px-12 md:py-20 md:px-16 lg:px-20 xl:px-24 text-center lg:text-left items-center lg:items-start lg:h-full text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Headline */}
        <h2 className="font-sans font-black text-white text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-6 max-w-xl uppercase tracking-wider">
          Find the Right Supplements in 60 Seconds
        </h2>

        {/* Description */}
        <p className="font-sans text-white/95 text-sm sm:text-base leading-relaxed mb-8 max-w-md font-light">
          Tell us your goals and we’ll recommend the Body Cafe Co supplements that fit your lifestyle.
        </p>

        {/* Rectangular CTA Button */}
        <div className="w-full sm:w-auto">
          <a
            href="/quiz"
            onClick={(e) => e.preventDefault()} // In pure mock mode
            className="inline-block bg-white text-black py-4 px-10 text-xs sm:text-sm font-bold tracking-superwide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer text-center rounded-none border border-transparent w-full sm:w-auto"
          >
            Take Our Quiz
          </a>
        </div>
      </motion.div>

    </section>
  );
};

export default SupplementQuizSection;
