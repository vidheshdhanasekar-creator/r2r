import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, ShieldCheck, Heart, MapPin, X, ArrowUpDown, ChevronDown, HelpCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CREATORS, CATEGORIES } from '../utils/mockData';
import CreatorCard from '../components/CreatorCard';
import SkeletonLoader from '../components/SkeletonLoader';
import AnimatedButton from '../components/AnimatedButton';

export default function DiscoverPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';
  const isFavoritesOnly = searchParams.get('filter') === 'favorites';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxBudget, setMaxBudget] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // rating, price-low, price-high
  
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCreators, setVisibleCreators] = useState(CREATORS);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Favorites tracking (mocking local state)
  const [favorites, setFavorites] = useState(['c1', 'c2']); // Raam and Meenakshi default favorited

  // Update query states on URL param adjustments
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    setSelectedCategory(searchParams.get('category') || '');
  }, [searchParams]);

  // Apply filters on states change (simulating API fetch delays)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...CREATORS];

      // 1. Search Query Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(c =>
          c.name.toLowerCase().includes(query) ||
          c.role.toLowerCase().includes(query) ||
          c.location.toLowerCase().includes(query) ||
          c.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      // 2. Category Filter
      if (selectedCategory) {
        filtered = filtered.filter(c =>
          c.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase()) ||
          c.role.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }

      // 3. Budget Filter
      filtered = filtered.filter(c => c.startingPrice <= maxBudget);

      // 4. Rating Filter
      if (minRating > 0) {
        filtered = filtered.filter(c => c.rating >= minRating);
      }

      // 5. Availability Filter
      if (onlyAvailable) {
        filtered = filtered.filter(c => c.isAvailable);
      }

      // 6. Favorites Filter
      if (isFavoritesOnly) {
        filtered = filtered.filter(c => favorites.includes(c.id));
      }

      // 7. Sort Calculations
      if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.startingPrice - b.startingPrice);
      } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.startingPrice - a.startingPrice);
      }

      setVisibleCreators(filtered);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, maxBudget, minRating, onlyAvailable, sortBy, isFavoritesOnly, favorites]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMaxBudget(50000);
    setMinRating(0);
    setOnlyAvailable(false);
    setSortBy('rating');
    setSearchParams({});
  };

  // Simulate Infinite Scroll Trigger
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);
  const handleLoadMore = () => {
    setIsInfiniteLoading(true);
    setTimeout(() => {
      // Append duplicates to mock infinite scrolling lists
      setVisibleCreators(prev => [
        ...prev,
        ...CREATORS.map(c => ({ ...c, id: `${c.id}-infinite-${Date.now()}` }))
      ]);
      setIsInfiniteLoading(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-transparent pb-24 lg:pl-76">
      {/* Sticky Top Header Filter Bar */}
      <div className="sticky top-18 lg:top-0 left-0 right-0 z-30 glass-panel border-b border-brand-lightBorder dark:border-white/5 py-4 px-6 md:px-12 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Field */}
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-textSec pointer-events-none">
            <Search className="h-4 w-4" />
          </span>
          <input
            id="discover-search-input"
            type="text"
            placeholder="Search by name, tags, or cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl glass-panel text-brand-dark dark:text-white placeholder-zinc-400 dark:placeholder-brand-textSec/70 border border-zinc-200 dark:border-white/10 focus:outline-none focus:border-brand-orange/60 transition-all font-poppins text-xs shadow-inner"
          />
          {searchQuery && (
            <button
              id="clear-search-btn"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-textSec hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Toolbar CTA toggles */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Sorting Dropdown */}
          <div className="relative">
            <select
              id="discover-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-brand-lightCard dark:bg-brand-card border border-brand-lightBorder dark:border-white/10 text-xs text-brand-dark dark:text-white px-4 py-2.5 pr-8 rounded-xl font-poppins font-semibold cursor-pointer outline-none hover:border-brand-orange/40 transition-colors"
            >
              <option value="rating">Sort by: Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-textSec pointer-events-none" />
          </div>

          {/* Trigger filter slide-in on mobile */}
          <button
            id="mobile-filter-toggle-btn"
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center gap-1.5 bg-brand-lightCard dark:bg-brand-card border border-brand-lightBorder dark:border-white/10 px-3.5 py-2.5 rounded-xl text-xs text-brand-dark dark:text-white font-poppins font-semibold"
          >
            <SlidersHorizontal className="h-4 w-4 text-brand-orange" /> Filters
          </button>
        </div>
      </div>

      <div className="px-6 md:px-12 pt-8 max-w-7xl mx-auto flex gap-8 items-start">
        
        {/* DESKTOP FILTER PANEL SIDEBAR */}
        <aside className="hidden lg:flex flex-col gap-6 w-64 shrink-0 glass-panel border border-brand-lightBorder dark:border-white/5 rounded-2xl p-5 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-brand-lightBorder dark:border-white/5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-dark dark:text-white flex items-center gap-1.5 font-poppins">
              <SlidersHorizontal className="h-4 w-4 text-brand-orange" /> Filters
            </h3>
            <button
              id="desktop-reset-filters-btn"
              onClick={handleResetFilters}
              className="text-[10px] uppercase font-bold text-brand-orange hover:underline font-poppins"
            >
              Clear
            </button>
          </div>

          {/* Categories list */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-textSec">Category</span>
            <div className="flex flex-col gap-1.5">
              <button
                id="category-filter-all"
                onClick={() => { setSelectedCategory(''); setSearchParams({}); }}
                className={`text-left text-xs px-3 py-2 rounded-lg font-medium transition-all ${
                  !selectedCategory
                    ? 'bg-brand-orange/15 text-brand-orange border-l-2 border-brand-orange'
                    : 'text-zinc-600 dark:text-brand-textSec hover:text-brand-dark dark:hover:text-white'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  id={`category-filter-${cat.slug}`}
                  onClick={() => { setSelectedCategory(cat.slug); setSearchParams({ category: cat.slug }); }}
                  className={`text-left text-xs px-3 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory.toLowerCase() === cat.slug.toLowerCase()
                      ? 'bg-brand-orange/15 text-brand-orange border-l-2 border-brand-orange'
                      : 'text-zinc-600 dark:text-brand-textSec hover:text-brand-dark dark:hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div className="flex flex-col gap-2 border-t border-brand-lightBorder dark:border-white/5 pt-4">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-brand-textSec">
              <span>Max Starting Budget</span>
              <span className="text-brand-dark dark:text-white font-poppins">₹{maxBudget.toLocaleString('en-IN')}</span>
            </div>
            <input
              id="desktop-budget-range"
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full h-1 bg-zinc-300 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-orange mt-2"
            />
            <div className="flex justify-between text-[9px] text-brand-textSec font-medium mt-1">
              <span>₹1,000</span>
              <span>₹50,000+</span>
            </div>
          </div>

          {/* Ratings filters */}
          <div className="flex flex-col gap-2.5 border-t border-brand-lightBorder dark:border-white/5 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-textSec">Minimum Rating</span>
            <div className="flex gap-1">
              {[0, 4.8, 4.9].map((rating) => (
                <button
                  key={rating}
                  id={`rating-filter-${rating}`}
                  onClick={() => setMinRating(rating)}
                  className={`flex-1 text-[11px] font-bold py-1.5 rounded-lg border font-poppins transition-all ${
                    minRating === rating
                      ? 'bg-brand-orange border-brand-orange text-white'
                      : 'glass-panel border-white/10 text-zinc-600 dark:text-brand-textSec hover:text-brand-dark dark:hover:text-white'
                  }`}
                >
                  {rating === 0 ? 'Any' : `${rating}★`}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center justify-between border-t border-brand-lightBorder dark:border-white/5 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-textSec">Only Available</span>
            <button
              id="desktop-availability-toggle"
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 outline-none ${
                onlyAvailable ? 'bg-brand-orange' : 'bg-zinc-300 dark:bg-zinc-800'
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
                  onlyAvailable ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </aside>

        {/* RESULTS GRID CONTAINER */}
        <main className="flex-1 flex flex-col gap-6 w-full">
          {/* Header count indicators */}
          <div className="flex items-center justify-between text-xs text-brand-textSec font-medium font-poppins">
            <span>
              {isFavoritesOnly ? "Favorites View" : "All Results"} • Showing {visibleCreators.length} creators
            </span>
            {selectedCategory && (
              <span className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider">
                Category: {selectedCategory}
              </span>
            )}
          </div>

          {/* Creator list with animated transitions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                <SkeletonLoader type="card" count={3} />
              ) : (
                visibleCreators.map((creator) => (
                  <motion.div
                    key={creator.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <CreatorCard creator={creator} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Empty search fallback */}
          {!isLoading && visibleCreators.length === 0 && (
            <div className="glass-panel border-white/5 rounded-2xl p-12 text-center flex flex-col items-center gap-3">
              <HelpCircle className="h-12 w-12 text-brand-orange animate-bounce" />
              <h3 className="font-bebas text-2xl text-white">No Creators Located</h3>
              <p className="text-xs text-brand-textSec max-w-xs font-poppins leading-relaxed">
                We couldn't match any cinematic videographers with your specific search query or active filter settings.
              </p>
              <AnimatedButton
                id="reset-filters-fallback-btn"
                variant="outline"
                onClick={handleResetFilters}
                className="mt-2 text-xs"
              >
                Reset All Filters
              </AnimatedButton>
            </div>
          )}

          {/* Infinite Scroll Trigger */}
          {!isLoading && visibleCreators.length > 0 && (
            <div className="flex justify-center mt-8 border-t border-white/5 pt-8">
              {isInfiniteLoading ? (
                <div className="flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-widest font-poppins">
                  <Loader2 className="h-4.5 w-4.5 animate-spin" /> Simulating Scroll Pull...
                </div>
              ) : (
                <AnimatedButton
                  id="load-more-creators-btn"
                  variant="secondary"
                  onClick={handleLoadMore}
                  className="px-8 border border-white/10"
                >
                  Load More Creators
                </AnimatedButton>
              )}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER OVERLAY DRAWER */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Drawer Sliding body */}
            <motion.div
              className="w-80 h-full bg-brand-dark border-l border-brand-lightBorder dark:border-white/5 p-6 flex flex-col gap-6 overflow-y-auto"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <SlidersHorizontal className="h-4 w-4 text-brand-orange" /> Filters
                </h3>
                <button
                  id="close-mobile-filters-btn"
                  onClick={() => setShowMobileFilters(false)}
                  className="text-brand-textSec hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Categories scroll list */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-textSec">Category</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    id="mobile-category-all"
                    onClick={() => { setSelectedCategory(''); setSearchParams({}); }}
                    className={`text-[11px] font-bold px-3 py-2 rounded-lg transition-all ${
                      !selectedCategory
                        ? 'bg-brand-orange text-white'
                        : 'glass-panel text-brand-textSec hover:text-white border-white/10'
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      id={`mobile-category-${cat.slug}`}
                      onClick={() => { setSelectedCategory(cat.slug); setSearchParams({ category: cat.slug }); }}
                      className={`text-[11px] font-bold px-3 py-2 rounded-lg transition-all ${
                        selectedCategory.toLowerCase() === cat.slug.toLowerCase()
                          ? 'bg-brand-orange text-white'
                          : 'glass-panel text-brand-textSec hover:text-white border-white/10'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget slider */}
              <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-brand-textSec">
                  <span>Max Starting Budget</span>
                  <span className="text-white">₹{maxBudget.toLocaleString('en-IN')}</span>
                </div>
                <input
                  id="mobile-budget-range"
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-orange mt-2"
                />
              </div>

              {/* Rating buttons */}
              <div className="flex flex-col gap-2.5 border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-textSec">Minimum Rating</span>
                <div className="flex gap-2">
                  {[0, 4.8, 4.9].map((rating) => (
                    <button
                      key={rating}
                      id={`mobile-rating-filter-${rating}`}
                      onClick={() => setMinRating(rating)}
                      className={`flex-1 text-xs font-bold py-2 rounded-lg border transition-all ${
                        minRating === rating
                          ? 'bg-brand-orange border-brand-orange text-white'
                          : 'glass-panel border-white/10 text-brand-textSec'
                      }`}
                    >
                      {rating === 0 ? 'Any' : `${rating}★`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-textSec">Only Available</span>
                <button
                  id="mobile-availability-toggle"
                  onClick={() => setOnlyAvailable(!onlyAvailable)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 outline-none ${
                    onlyAvailable ? 'bg-brand-orange' : 'bg-zinc-800'
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
                      onlyAvailable ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Close triggers */}
              <div className="mt-auto flex gap-3 pt-6 border-t border-white/5">
                <AnimatedButton
                  id="mobile-filter-clear-btn"
                  variant="secondary"
                  onClick={() => { handleResetFilters(); setShowMobileFilters(false); }}
                  className="flex-1 text-xs py-3 border border-white/10"
                >
                  Reset
                </AnimatedButton>
                <AnimatedButton
                  id="mobile-filter-apply-btn"
                  variant="primary"
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 text-xs py-3 shadow-glow"
                >
                  Apply Filters
                </AnimatedButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
