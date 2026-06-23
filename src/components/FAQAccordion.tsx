import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import type { FAQ } from '../types';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="w-full border-t border-border-light max-w-4xl mx-auto">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="border-b border-border-light">
            <button
              onClick={() => toggle(faq.id)}
              className="w-full flex items-center justify-between py-6 text-left group transition-colors"
            >
              <span className="text-base md:text-lg font-light tracking-wide text-text-dark group-hover:text-text-secondary transition-colors pr-4">
                {faq.question}
              </span>
              <span className="text-text-secondary flex-shrink-0">
                {isOpen ? (
                  <Minus size={18} strokeWidth={1.5} />
                ) : (
                  <Plus size={18} strokeWidth={1.5} />
                )}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-6 text-sm md:text-base leading-relaxed text-text-secondary">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
export default FAQAccordion;
