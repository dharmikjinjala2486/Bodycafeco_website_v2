import React, { useState, useRef } from 'react';
import { Star, Search, ChevronDown, Check, ThumbsUp, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import customer/instagram images from assets
import blogCreatine      from '../assets/blog_creatine.png';
import blogOmega3        from '../assets/blog_omega3.png';
import blogVitaminD3     from '../assets/blog_vitamind3k2.png';
import promiseAbsorption from '../assets/promise_absorption.png';
import promiseScience    from '../assets/promise_science.png';
import instagram1 from '../assets/instagram_1.png';
import instagram2 from '../assets/instagram_2.png';
import instagram3 from '../assets/instagram_3.png';
import instagram4 from '../assets/instagram_4.png';
import instagram5 from '../assets/instagram_5.png';
import instagram6 from '../assets/instagram_6.png';

interface Review {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
  title: string;
  content: string;
  date: string;
  locale: string;
  helpfulCount: number;
}

const CUSTOMER_IMAGES = [
  instagram1,
  blogCreatine,
  instagram2,
  blogOmega3,
  instagram3,
  promiseAbsorption,
  instagram4,
  blogVitaminD3,
  instagram5,
  promiseScience,
  instagram6
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'John D.',
    verified: true,
    rating: 5,
    title: 'Purest form and highly effective',
    content: 'Absolutely top tier! Dissolves completely with zero chalky residue. I mix it into my morning recovery ritual and the results are night and day. The cognitive clarity boost is real, and my post-workout fatigue has significantly reduced. Body Cafe Co is on another level with their ingredient quality.',
    date: 'June 20, 2026',
    locale: 'en_US',
    helpfulCount: 24
  },
  {
    id: 'rev-2',
    name: 'Sarah M.',
    verified: true,
    rating: 5,
    title: 'Cleanest formulation I have found',
    content: 'Finally, a supplement with zero fillers. The unflavored profile is genuinely tasteless, which makes it perfect to blend with greens or morning coffee. I love the clean branding and the fact they source Creapure. High quality packaging too!',
    date: 'June 18, 2026',
    locale: 'en_US',
    helpfulCount: 18
  },
  {
    id: 'rev-3',
    name: 'David K.',
    verified: true,
    rating: 4,
    title: 'Superb quality, delivery was a bit slow',
    content: 'The quality of the ingredients is undeniable. I feel much more energetic and focused throughout the day. Only giving 4 stars because the courier service took four days to reach my address, but the product itself is flawless.',
    date: 'June 15, 2026',
    locale: 'en_US',
    helpfulCount: 12
  },
  {
    id: 'rev-4',
    name: 'Priya R.',
    verified: true,
    rating: 5,
    title: 'Highly recommended for daily routines',
    content: 'I love that this brand focuses heavily on absorption. I have a very sensitive stomach and this has caused absolutely no bloating or issues whatsoever. I am recommending this to my entire running club.',
    date: 'June 12, 2026',
    locale: 'en_IN',
    helpfulCount: 9
  },
  {
    id: 'rev-5',
    name: 'Robert H.',
    verified: true,
    rating: 3,
    title: 'Good quality but premium price tag',
    content: 'No doubt this is highly pure, third-party tested, and maps beautifully. However, the price is higher than standard commercial supplements. If you have the budget, go for it. If not, it might feel like a stretch.',
    date: 'June 05, 2026',
    locale: 'en_US',
    helpfulCount: 31
  },
  {
    id: 'rev-6',
    name: 'Emma W.',
    verified: true,
    rating: 5,
    title: 'Absolute daily staple',
    content: 'Game changer. Formulated beautifully. I have been taking this stack alongside my Vitamin D3 + K2 and my immunity and muscle recovery have never been better. Body Cafe Co makes excellent products.',
    date: 'May 28, 2026',
    locale: 'en_US',
    helpfulCount: 14
  },
  {
    id: 'rev-7',
    name: 'Vikram A.',
    verified: true,
    rating: 5,
    title: 'Superior bioavailability',
    content: 'This has become a major pillar in my performance stack. Extremely easy on the system, clean ingredients list, and real science-backed dosage. The absorption rates speak for themselves.',
    date: 'May 19, 2026',
    locale: 'en_IN',
    helpfulCount: 7
  },
  {
    id: 'rev-8',
    name: 'Jessica L.',
    verified: false,
    rating: 4,
    title: 'Noticeable energy and recovery boost',
    content: 'I notice a steady flow of energy when taking this regularly. My muscle soreness is almost non-existent the day after a heavy leg workout. Highly satisfied with the formula, just wish there was a subscription discount option for overseas shipping.',
    date: 'May 10, 2026',
    locale: 'en_CA',
    helpfulCount: 5
  }
];

export const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  
  // Interactive States
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [localeFilter, setLocaleFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('highest');
  const [visibleCount, setVisibleCount] = useState(5);
  
  // Helpful clicks log to prevent double clicking
  const [clickedHelpful, setClickedHelpful] = useState<Record<string, boolean>>({});

  // Review Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRating, setModalRating] = useState(0);
  const [modalHoverRating, setModalHoverRating] = useState(0);
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [formError, setFormError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Gallery Lightbox Modal States
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);

  // Refs for scroll control
  const galleryRef = useRef<HTMLDivElement>(null);

  // Ratings snapshot data calculations
  const totalReviewCount = 10887;
  const ratingDistribution = [
    { stars: 5, count: 9254, percent: 85 },
    { stars: 4, count: 1088, percent: 10 },
    { stars: 3, count: 326, percent: 3 },
    { stars: 2, count: 110, percent: 1 },
    { stars: 1, count: 109, percent: 1 }
  ];

  // Image scroll functions
  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = 300;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Handle write review submit
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalRating === 0) {
      setFormError('Please select a star rating.');
      return;
    }
    if (!modalName.trim()) {
      setFormError('Please enter your nickname.');
      return;
    }
    if (!modalEmail.trim() || !modalEmail.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!modalTitle.trim()) {
      setFormError('Please enter a review title.');
      return;
    }
    if (!modalContent.trim()) {
      setFormError('Please enter review content.');
      return;
    }

    // Add new review to listing
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name: modalName,
      verified: true, // Auto-verify for simulation
      rating: modalRating,
      title: modalTitle,
      content: modalContent,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' }),
      locale: 'en_US',
      helpfulCount: 0
    };

    setReviews([newRev, ...reviews]);
    setSubmitSuccess(true);
    setFormError('');
    
    // Clear inputs after brief delay
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitSuccess(false);
      setModalRating(0);
      setModalName('');
      setModalEmail('');
      setModalTitle('');
      setModalContent('');
    }, 2000);
  };

  // Toggle helpful click
  const handleHelpfulClick = (reviewId: string) => {
    if (clickedHelpful[reviewId]) return; // disable double submit
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
    setClickedHelpful(prev => ({ ...prev, [reviewId]: true }));
  };

  // Filter reviews
  const filteredReviews = reviews.filter(rev => {
    // Search match
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      rev.title.toLowerCase().includes(searchLower) || 
      rev.content.toLowerCase().includes(searchLower) || 
      rev.name.toLowerCase().includes(searchLower);

    // Rating match
    const matchesRating = ratingFilter === 'all' || rev.rating === ratingFilter;

    // Locale match
    const matchesLocale = localeFilter === 'all' || rev.locale === localeFilter;

    return matchesSearch && matchesRating && matchesLocale;
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortOption === 'highest') {
      return b.rating - a.rating;
    } else if (sortOption === 'lowest') {
      return a.rating - b.rating;
    } else if (sortOption === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOption === 'helpful') {
      return b.helpfulCount - a.helpfulCount;
    }
    return 0;
  });

  return (
    <section className="w-full bg-[#FFFFFF] border-t border-border-light py-20 font-sans text-left">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-24">
        
        {/* Reviews Section Header */}
        <div className="border-b border-[#EAEAEA] pb-8 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111111] uppercase tracking-wider font-logo">
            Reviews
          </h2>
        </div>

        {/* Top Review Summary Area: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-[#EAEAEA] items-start">
          
          {/* Left Column: Rating Snapshot */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-[#111111] mb-1 font-sans">
              Rating Snapshot
            </h3>
            <p className="text-xs text-[#666666] mb-5">
              Select a row below to filter reviews.
            </p>

            <div className="space-y-3">
              {ratingDistribution.map((row) => {
                const isActive = ratingFilter === row.stars;
                return (
                  <button
                    key={row.stars}
                    onClick={() => setRatingFilter(isActive ? 'all' : row.stars)}
                    className={`w-full flex items-center group text-left transition-colors py-1 px-2 -ml-2 rounded hover:bg-[#F9F9F9] ${isActive ? 'bg-[#F0EFEA]' : ''}`}
                  >
                    <span className="w-12 text-xs font-semibold text-[#111111] flex-shrink-0">
                      {row.stars} Stars
                    </span>
                    <div className="flex-grow h-4 bg-[#F2F2F2] mx-3 rounded-none overflow-hidden relative">
                      <div 
                        className="h-full transition-all duration-500 ease-out"
                        style={{ 
                          width: `${row.percent}%`, 
                          backgroundColor: '#B22234' 
                        }} 
                      />
                    </div>
                    <span className="w-12 text-right text-xs font-semibold text-[#555555] group-hover:underline flex-shrink-0">
                      {row.count.toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
            {ratingFilter !== 'all' && (
              <button 
                onClick={() => setRatingFilter('all')}
                className="text-xs font-semibold text-[#B22234] hover:underline text-left mt-4 inline-block"
              >
                Clear Rating Filter
              </button>
            )}
          </div>

          {/* Center Column: Overall Rating */}
          <div className="flex flex-col items-center justify-center text-center px-4 border-y md:border-y-0 md:border-x border-[#EAEAEA] py-8 md:py-0">
            <span className="text-6xl font-black text-[#111111] leading-none mb-2">
              4.8
            </span>
            <div className="flex text-[#B22234] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" stroke="none" />
              ))}
            </div>
            <span className="text-sm font-bold text-[#111111] mb-1">
              {totalReviewCount.toLocaleString()} Reviews
            </span>
            <span className="text-xs text-[#555555] mb-6">
              99% of reviewers recommend this product
            </span>

            <div className="w-full max-w-[260px] text-left pt-6 border-t border-[#EAEAEA]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-4 text-center">
                Average Customer Ratings
              </h4>
              
              {/* Attribute Bars */}
              {['Taste', 'Effectiveness', 'Quality'].map((attr) => (
                <div key={attr} className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-[#555555] w-20 font-medium">{attr}</span>
                  <div className="flex-grow h-2 bg-[#F2F2F2] mx-3 rounded-none overflow-hidden relative">
                    <div className="h-full bg-[#111111]" style={{ width: '96%' }} />
                  </div>
                  <span className="text-xs font-semibold text-[#111111] w-6 text-right">4.8</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Review This Product */}
          <div className="flex flex-col h-full justify-between items-center md:items-start text-center md:text-left">
            <div className="w-full">
              <h3 className="text-lg font-bold text-[#111111] mb-4 font-sans uppercase tracking-wide">
                Review this Product
              </h3>
              <p className="text-xs text-[#555555] mb-6 leading-relaxed">
                Share your thoughts with other customers.
              </p>
              
              {/* Outlined Star Picker */}
              <div className="flex space-x-2 justify-center md:justify-start mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      setModalRating(star);
                      setIsModalOpen(true);
                    }}
                    onMouseEnter={() => setModalHoverRating(star)}
                    onMouseLeave={() => setModalHoverRating(0)}
                    className="text-[#CCCCCC] hover:text-[#B22234] transition-colors p-1"
                    aria-label={`Rate ${star} Stars`}
                  >
                    <Star 
                      size={32} 
                      fill={(modalHoverRating || modalRating) >= star ? '#B22234' : 'none'} 
                      stroke={(modalHoverRating || modalRating) >= star ? '#B22234' : 'currentColor'}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#888888] font-light max-w-[280px] leading-relaxed border-t border-[#EAEAEA] pt-4 w-full">
              Adding a review will require a valid email for verification
            </p>
          </div>

        </div>

        {/* Customer Images & Videos Carousel */}
        <div className="py-16 border-b border-[#EAEAEA]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider text-[#111111]">
              Customer Images and Videos
            </h3>
            {/* Nav Arrows */}
            <div className="flex space-x-3">
              <button 
                onClick={() => scrollGallery('left')}
                className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center text-text-dark hover:border-text-dark transition-colors"
                aria-label="Previous images"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => scrollGallery('right')}
                className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center text-text-dark hover:border-text-dark transition-colors"
                aria-label="Next images"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Carousel snap-x wrapper */}
          <div 
            ref={galleryRef}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {CUSTOMER_IMAGES.map((imgSrc, index) => (
              <div 
                key={index}
                onClick={() => setActiveGalleryIndex(index)}
                className="flex-shrink-0 w-48 h-48 bg-[#F8F7F4] border border-[#EAEAEA] snap-start cursor-pointer overflow-hidden relative group"
              >
                <img 
                  src={imgSrc} 
                  alt={`Customer uploaded ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] uppercase font-bold text-white tracking-widest bg-black/40 px-2 py-1">Zoom</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Filters & Search Section */}
        <div className="py-10 border-b border-[#EAEAEA] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Search bar and Filters Left Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-grow max-w-4xl">
            {/* Search Input */}
            <div className="relative flex-grow max-w-sm">
              <input
                type="text"
                placeholder="Search topics and reviews"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(5); // reset page count
                }}
                className="w-full bg-[#FFFFFF] border border-[#CCCCCC] pl-10 pr-4 py-2.5 text-sm text-text-dark font-medium focus:outline-none focus:border-[#111111]"
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#888888]">
                <Search size={16} />
              </div>
            </div>

            {/* Filter Dropdown: Rating */}
            <div className="relative">
              <select
                value={ratingFilter}
                onChange={(e) => {
                  const val = e.target.value;
                  setRatingFilter(val === 'all' ? 'all' : Number(val));
                  setVisibleCount(5);
                }}
                className="bg-white border border-[#CCCCCC] px-4 py-2.5 rounded-none text-xs md:text-sm text-text-dark font-medium tracking-wide focus:outline-none appearance-none cursor-pointer pr-10 w-full sm:w-44"
              >
                <option value="all">Rating: All Stars</option>
                <option value="5">5 Stars Only</option>
                <option value="4">4 Stars Only</option>
                <option value="3">3 Stars Only</option>
                <option value="2">2 Stars Only</option>
                <option value="1">1 Star Only</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#888888]">
                <ChevronDown size={14} />
              </div>
            </div>

            {/* Filter Dropdown: Locale */}
            <div className="relative">
              <select
                value={localeFilter}
                onChange={(e) => {
                  setLocaleFilter(e.target.value);
                  setVisibleCount(5);
                }}
                className="bg-white border border-[#CCCCCC] px-4 py-2.5 rounded-none text-xs md:text-sm text-text-dark font-medium tracking-wide focus:outline-none appearance-none cursor-pointer pr-10 w-full sm:w-44"
              >
                <option value="all">Locale: All Locales</option>
                <option value="en_US">English (US)</option>
                <option value="en_IN">English (India)</option>
                <option value="en_CA">English (Canada)</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#888888]">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* Sort Dropdown Right Group */}
          <div className="relative flex-shrink-0 self-end lg:self-auto">
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setVisibleCount(5);
              }}
              className="bg-white border border-[#CCCCCC] px-4 py-2.5 rounded-none text-xs md:text-sm text-text-dark font-medium tracking-wide focus:outline-none appearance-none cursor-pointer pr-10 w-52"
            >
              <option value="highest">Highest to Lowest Rating</option>
              <option value="lowest">Lowest to Highest Rating</option>
              <option value="recent">Most Recent</option>
              <option value="helpful">Most Helpful</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#888888]">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        {/* Reviews Listing Area */}
        <div className="py-8 divide-y divide-[#EAEAEA]">
          {sortedReviews.length === 0 ? (
            <div className="py-16 text-center text-text-muted">
              No reviews match the current filters. Try resetting search or select filters.
            </div>
          ) : (
            sortedReviews.slice(0, visibleCount).map((rev) => (
              <div key={rev.id} className="py-8 first:pt-0 last:pb-0 flex flex-col md:flex-row gap-6 justify-between items-start">
                
                {/* Left Side: Name and Rating Info */}
                <div className="w-full md:w-1/4">
                  <div className="font-bold text-text-dark text-sm md:text-base flex items-center gap-1.5 mb-1.5">
                    {rev.name}
                  </div>
                  {rev.verified && (
                    <div className="flex items-center text-emerald-700 text-[10px] uppercase font-bold tracking-wider mb-3">
                      <Check size={12} className="mr-1 stroke-[3]" /> Verified Purchase
                    </div>
                  )}
                  <span className="text-[11px] text-text-secondary font-medium block">
                    {rev.date}
                  </span>
                </div>

                {/* Center Side: Review Content */}
                <div className="w-full md:w-3/5 flex-grow">
                  <div className="flex text-[#B22234] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < rev.rating ? 'currentColor' : 'none'} 
                        stroke={i < rev.rating ? 'none' : 'currentColor'} 
                      />
                    ))}
                  </div>
                  <h4 className="font-sans font-bold text-text-dark text-base md:text-lg mb-2">
                    {rev.title}
                  </h4>
                  <p className="text-xs md:text-sm text-[#444444] leading-relaxed font-light mb-4">
                    {rev.content}
                  </p>
                </div>

                {/* Right Side: Helpful Action */}
                <div className="w-full md:w-auto flex md:flex-col justify-between items-center md:items-end border-t md:border-t-0 border-[#F5F5F5] pt-4 md:pt-0">
                  <button
                    onClick={() => handleHelpfulClick(rev.id)}
                    disabled={clickedHelpful[rev.id]}
                    className={`flex items-center gap-2 border px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
                      clickedHelpful[rev.id] 
                        ? 'bg-[#F2F2F2] border-[#EAEAEA] text-[#AAAAAA] cursor-default' 
                        : 'border-[#CCCCCC] hover:border-black text-[#111111]'
                    }`}
                  >
                    <ThumbsUp size={12} />
                    <span>Helpful {rev.helpfulCount > 0 && `(${rev.helpfulCount})`}</span>
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Load More Pagination */}
        {sortedReviews.length > visibleCount && (
          <div className="w-full flex justify-center pt-8 border-t border-[#EAEAEA]">
            <button
              onClick={() => setVisibleCount(prev => prev + 5)}
              className="bg-[#111111] hover:bg-[#000000] text-white text-xs font-bold tracking-superwide uppercase px-8 py-3.5 transition-colors"
            >
              Load More Reviews
            </button>
          </div>
        )}

      </div>

      {/* Review Submission Modal (Write a Review) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white max-w-lg w-full p-6 md:p-8 border border-border-light relative shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-text-dark"
                aria-label="Close review modal"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-text-dark font-logo mb-6 pb-2 border-b border-[#EAEAEA]">
                Write a Review
              </h3>

              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
                    <Check size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-[#111111] mb-2">Review Submitted!</h4>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Thank you. Your review has been submitted for validation and verification.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4 text-left">
                  {/* Form Star Rating */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-text-dark tracking-wider mb-2">
                      Your Rating *
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setModalRating(star)}
                          onMouseEnter={() => setModalHoverRating(star)}
                          onMouseLeave={() => setModalHoverRating(0)}
                          className="text-[#CCCCCC] hover:text-[#B22234] transition-colors p-1"
                        >
                          <Star 
                            size={24} 
                            fill={(modalHoverRating || modalRating) >= star ? '#B22234' : 'none'} 
                            stroke={(modalHoverRating || modalRating) >= star ? '#B22234' : 'currentColor'}
                            strokeWidth={1.5}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nickname Input */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-text-dark tracking-wider mb-2">
                      Nickname *
                    </label>
                    <input 
                      type="text" 
                      placeholder="Example: WellnessLover23" 
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#CCCCCC] px-3 py-2 text-sm text-text-dark focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-text-dark tracking-wider mb-1">
                      Email Address *
                    </label>
                    <span className="block text-[10px] text-text-secondary mb-2 leading-tight">
                      Will require email verification before publication.
                    </span>
                    <input 
                      type="email" 
                      placeholder="Example: name@domain.com" 
                      value={modalEmail}
                      onChange={(e) => setModalEmail(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#CCCCCC] px-3 py-2 text-sm text-text-dark focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  {/* Review Title */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-text-dark tracking-wider mb-2">
                      Review Title *
                    </label>
                    <input 
                      type="text" 
                      placeholder="Summarize your review" 
                      value={modalTitle}
                      onChange={(e) => setModalTitle(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#CCCCCC] px-3 py-2 text-sm text-text-dark focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-text-dark tracking-wider mb-2">
                      Review Body *
                    </label>
                    <textarea 
                      rows={4}
                      placeholder="Write details of your experience with the product..." 
                      value={modalContent}
                      onChange={(e) => setModalContent(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#CCCCCC] px-3 py-2 text-sm text-text-dark focus:outline-none focus:border-[#111111] resize-none"
                    />
                  </div>

                  {/* Errors display */}
                  {formError && (
                    <p className="text-xs text-[#B22234] font-semibold">
                      {formError}
                    </p>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-4 pt-2">
                    <button
                      type="submit"
                      className="bg-[#B22234] hover:bg-[#911623] text-white text-xs font-bold tracking-superwide uppercase px-6 py-3 transition-colors flex-grow text-center"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="border border-[#CCCCCC] hover:border-black text-[#111111] text-xs font-bold tracking-superwide uppercase px-6 py-3 transition-colors text-center"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Customer Images Lightbox Modal */}
      <AnimatePresence>
        {activeGalleryIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
            {/* Close Button */}
            <button 
              onClick={() => setActiveGalleryIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-50"
              aria-label="Close gallery lightbox"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            {/* Left Nav Arrow */}
            <button 
              onClick={() => setActiveGalleryIndex(prev => prev !== null ? (prev - 1 + CUSTOMER_IMAGES.length) % CUSTOMER_IMAGES.length : null)}
              className="absolute left-6 text-white/50 hover:text-white p-3 transition-colors z-40"
              aria-label="Previous customer image"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            {/* Main Lightbox Content */}
            <div className="w-full max-w-3xl max-h-[80vh] p-4 flex items-center justify-center">
              <img 
                src={CUSTOMER_IMAGES[activeGalleryIndex]} 
                alt={`Customer review item detail ${activeGalleryIndex + 1}`} 
                className="max-w-full max-h-[80vh] object-contain border border-white/10"
              />
            </div>

            {/* Right Nav Arrow */}
            <button 
              onClick={() => setActiveGalleryIndex(prev => prev !== null ? (prev + 1) % CUSTOMER_IMAGES.length : null)}
              className="absolute right-6 text-white/50 hover:text-white p-3 transition-colors z-40"
              aria-label="Next customer image"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>
            
            {/* Bottom Counter */}
            <div className="absolute bottom-6 text-white/70 text-xs font-bold uppercase tracking-wider">
              {activeGalleryIndex + 1} / {CUSTOMER_IMAGES.length}
            </div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default CustomerReviews;
