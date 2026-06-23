import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import blogOmega3 from '../assets/blog_omega3.png';
import blogCreatine from '../assets/blog_creatine.png';
import blogVitaminD3K2 from '../assets/blog_vitamind3k2.png';

interface BlogPost {
  image: string;
  imageAlt: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    image: blogOmega3,
    imageAlt: 'Omega-3 Fish Oil with fresh salmon and mackerel on marble surface',
    title: 'Omega-3 Fish Oil Benefits for Heart and Brain Health',
    excerpt:
      'EPA and DHA found in high-potency fish oil play a fundamental role in maintaining cardiovascular integrity and cognitive baseline. Discover how triglyceride-form Omega-3 delivers superior bioavailability versus synthetic ethyl ester alternatives, and why sourcing from wild-caught anchovies matters.',
    date: 'June 18, 2026',
    readTime: '6 min read',
    category: 'Cardiovascular',
  },
  {
    image: blogCreatine,
    imageAlt: 'Creatine Monohydrate powder jar and athlete in background gym',
    title: 'Creatine Monohydrate: More Than Just a Muscle Supplement',
    excerpt:
      'Most people associate creatine with strength athletes — but emerging research reveals its profound benefits for cognitive resilience, brain energy metabolism, and neuroprotection. We explore how Creapure® creatine supports both physical output and mental clarity.',
    date: 'June 10, 2026',
    readTime: '5 min read',
    category: 'Performance',
  },
  {
    image: blogVitaminD3K2,
    imageAlt: 'Vitamin D3 K2 supplement jar with vegetables and natural sunlight',
    title: 'Vitamin D3 + K2: The Perfect Daily Wellness Combination',
    excerpt:
      'Taking Vitamin D3 without K2 can create a calcium imbalance. Learn how MK-7, the most bioavailable form of Vitamin K2, works synergistically with D3 to direct calcium into bones and away from arterial walls — the key to long-term cardiovascular and skeletal health.',
    date: 'May 30, 2026',
    readTime: '7 min read',
    category: 'Daily Wellness',
  },
];

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="flex flex-col bg-white group cursor-pointer overflow-hidden rounded-xl border border-[#EAEAEA] hover:shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1">
      {/* Featured Image */}
      <div className="w-full aspect-[16/10] overflow-hidden rounded-t-xl bg-[#F0EFEA] flex-shrink-0">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-grow p-6 md:p-7">
        {/* Category Tag */}
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] text-[#B51E2E] mb-3">
          {post.category}
        </span>

        {/* Title */}
        <h3 className="font-sans font-bold text-[#111111] text-base md:text-lg leading-snug mb-3 group-hover:text-[#B51E2E] transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs md:text-sm text-[#666666] leading-relaxed line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {/* Meta Footer */}
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-[#EAEAEA]">
          <div className="flex items-center gap-2 text-[11px] text-[#999999] font-medium">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-[#CCCCCC]" />
            <span>{post.readTime}</span>
          </div>
          <ArrowRight
            size={14}
            className="text-[#999999] group-hover:text-[#B51E2E] group-hover:translate-x-1 transition-all duration-300"
          />
        </div>
      </div>
    </article>
  );
};

export const PdpBlogSection: React.FC = () => {
  const sectionVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.section
      className="w-full bg-white py-20 md:py-28 border-t border-[#EAEAEA] select-none overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16">

        {/* Header Row: Left-aligned title + right "View all" link */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 md:mb-14"
        >
          {/* Left: Section Title */}
          <h2 className="font-logo text-2xl md:text-3xl lg:text-4xl font-bold text-[#111111] uppercase tracking-wide leading-tight">
            Learn More from the Blog
          </h2>

          {/* Right: View All Link */}
          <a
            href="/blog"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#555555] hover:text-[#111111] transition-colors duration-300 group flex-shrink-0"
            aria-label="View all blog articles"
          >
            <span>View all</span>
            <div className="w-8 h-8 rounded-full border border-[#CCCCCC] bg-white flex items-center justify-center text-[#444444] shadow-sm group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all duration-300">
              <ArrowRight size={13} strokeWidth={2} />
            </div>
          </a>
        </motion.div>

        {/* Blog Cards Grid: 3 cols desktop, 2 tablet, 1 mobile */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default PdpBlogSection;
