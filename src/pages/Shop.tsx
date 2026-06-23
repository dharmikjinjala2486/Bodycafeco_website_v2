import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('cat') || 'all';
  const [sortBy, setSortBy] = useState('default');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Sync category filter
  useEffect(() => {
    let result = [...products];

    // Filter category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sort products
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [activeCategory, sortBy]);

  const handleCategoryChange = (cat: string) => {
    if (cat === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', cat);
    }
    setSearchParams(searchParams);
  };

  const categories = [
    { id: 'all', label: 'All Formulations' },
    { id: 'daily', label: 'Daily Rituals' },
    { id: 'cognitive', label: 'Cognitive Health' },
    { id: 'essential', label: 'Core Essentials' }
  ];

  return (
    <div className="bg-bg-soft pt-12 pb-24 px-6 md:px-12 xl:px-24 text-left font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Title */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-superwide font-bold text-text-muted">Apothecary Collection</span>
          <h1 className="text-editorial-h2">The Wellness Catalog</h1>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed font-light">
            Every formulation represents a standalone pathway for cellular health. Sourced transparently, trace-verified through lab testing, and packaged inside reusable pharmaceutical-grade amber glass.
          </p>
        </div>

        {/* Filter / Sort Row */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center pb-8 border-b border-border-light mb-12">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2.5 text-[10px] uppercase font-bold tracking-wider transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-text-dark text-white'
                    : 'bg-white border border-border-light hover:border-text-muted text-text-secondary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-border-light pt-4 lg:pt-0">
            <div className="flex items-center gap-2 text-text-secondary text-xs uppercase font-semibold tracking-wider">
              <SlidersHorizontal size={14} />
              <span>Sort By</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-border-light px-3 py-2 text-xs font-semibold uppercase tracking-wider text-text-dark focus:outline-none focus:border-text-dark"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

        </div>

        {/* Count */}
        <div className="mb-6 text-[10px] uppercase tracking-wider text-text-muted font-bold">
          Showing {filteredProducts.length} Formulations
        </div>

        {/* Grid Catalog */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-border-light">
            <p className="text-sm text-text-secondary font-light">No formulations found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
export default Shop;
