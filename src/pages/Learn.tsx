import React, { useState } from 'react';
import { FileText, ArrowRight, Clock } from 'lucide-react';
import type { Article } from '../types';

const learnArticles: Article[] = [
  {
    id: 'art-1',
    title: 'The Synergistic Chemistry of Vitamin D3 and Vitamin K2 (MK-7)',
    slug: 'synergistic-chemistry-d3-k2',
    excerpt: 'Vitamin D3 and Vitamin K2 operate in a locked biological partnership. Understanding how they map calcium into skeletal matrix instead of arterial walls is vital for cardiovascular health.',
    content: '',
    category: 'science',
    readTime: '6 min read',
    date: 'June 10, 2026',
    author: 'Dr. Evelyn Martinez, PhD',
    image: '',
    featured: true
  },
  {
    id: 'art-2',
    title: 'Alpha Brainwave Modulation: How L-Theanine Balances Coffee Jitters',
    slug: 'alpha-brainwave-modulation-theanine',
    excerpt: 'Explore the electroencephalogram (EEG) research proving L-Theanine’s ability to promote alpha wave neural cycles, smoothing the endocrine spikes of caffeine.',
    content: '',
    category: 'science',
    readTime: '4 min read',
    date: 'May 28, 2026',
    author: 'Sarah Chen, Cognitive Analyst',
    image: ''
  },
  {
    id: 'art-3',
    title: 'Habit Saturation: The Neuroscience of Building Unbreakable Daily Rituals',
    slug: 'neuroscience-daily-rituals',
    excerpt: 'How setting consistency triggers, water temperature thresholds, and specific morning routines optimizes biological adaptation and wellness success.',
    content: '',
    category: 'protocols',
    readTime: '5 min read',
    date: 'May 14, 2026',
    author: 'Marcus Vance, Health Coach',
    image: ''
  },
  {
    id: 'art-4',
    title: 'Albion Chelates vs. Magnesium Oxides: Bioavailability Realities',
    slug: 'magnesium-bioavailability-chelates',
    excerpt: 'An objective look at mineral mass absorption data, showing why chelated bisglycinate rings bypass mineral pathways to prevent digestive cramping.',
    content: '',
    category: 'ingredients',
    readTime: '7 min read',
    date: 'April 30, 2026',
    author: 'Dr. Evelyn Martinez, PhD',
    image: ''
  }
];

export const Learn: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'science' | 'protocols' | 'ingredients'>('all');

  const filteredArticles = activeTab === 'all'
    ? learnArticles
    : learnArticles.filter(art => art.category === activeTab);

  const featuredArticle = learnArticles.find(art => art.featured);

  return (
    <div className="bg-bg-soft pt-12 pb-24 px-6 md:px-12 xl:px-24 text-left font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">Body Cafe Journal</span>
          <h1 className="text-editorial-h2">Science & Protocols</h1>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed font-light">
            An educational resource dedicated to clinical literature, compound reviews, and daily habit architecture. We believe high-end health is built upon robust education.
          </p>
        </div>

        {/* Featured Article Layout */}
        {featuredArticle && activeTab === 'all' && (
          <div className="bg-white border border-border-light p-8 md:p-12 mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Image Placeholder canvas */}
            <div className="bg-bg-subtle aspect-[4/3] flex items-center justify-center p-8 border border-border-light relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-vitamind3/5 to-transparent" />
              <FileText size={48} strokeWidth={1} className="text-text-muted relative z-10" />
            </div>

            {/* Content Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider font-bold text-brand-vitamind3">
                <span>Featured Reading</span>
                <span>&bull;</span>
                <span className="text-text-muted">{featuredArticle.category}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-text-dark leading-tight tracking-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 text-[10px] uppercase tracking-wider font-bold text-text-muted">
                <span className="flex items-center gap-1.5"><Clock size={12} /> {featuredArticle.readTime}</span>
                <span>By {featuredArticle.author}</span>
              </div>
            </div>

          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2.5 pb-8 border-b border-border-light mb-12">
          {['all', 'science', 'protocols', 'ingredients'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2.5 text-[10px] uppercase font-bold tracking-wider transition-colors ${
                activeTab === tab
                  ? 'bg-text-dark text-white'
                  : 'bg-white border border-border-light hover:border-text-muted text-text-secondary'
              }`}
            >
              {tab === 'all' ? 'All Research' : tab}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((art) => (
            <div key={art.id} className="bg-white border border-border-light p-6 md:p-8 flex flex-col justify-between hover:border-text-muted transition-all duration-300">
              
              <div className="space-y-4">
                {/* Meta */}
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-text-muted">
                  <span>{art.category}</span>
                  <span>{art.date}</span>
                </div>
                {/* Title */}
                <h3 className="text-base md:text-lg font-light text-text-dark tracking-wide leading-snug">
                  {art.title}
                </h3>
                {/* Excerpt */}
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              {/* Read button */}
              <div className="flex items-center justify-between pt-6 border-t border-border-light mt-6 text-[10px] uppercase tracking-wider font-bold">
                <span className="text-text-dark hover:opacity-75 cursor-pointer flex items-center gap-1">
                  Read Literature <ArrowRight size={10} />
                </span>
                <span className="text-text-muted font-normal">{art.readTime}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
export default Learn;
