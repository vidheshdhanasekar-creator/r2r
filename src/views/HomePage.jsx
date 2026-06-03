import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Flame, Shield, Award, Users, Play, Clock, ArrowRight, Star, Heart, Briefcase, Sparkles, Music, Calendar, ShoppingBag, TrendingUp, Coins, MessageSquare, Check, X, ChevronRight, FileText, Camera, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { CATEGORIES, CREATORS } from '../utils/mockData';
import CreatorCard from '../components/CreatorCard';
import AnimatedButton from '../components/AnimatedButton';
import { useTheme } from '../context/ThemeContext';

// Dynamic Icon Loader Helper
const iconMap = {
  Flame, Heart, Briefcase, Sparkles, Music, Users, Calendar, ShoppingBag, TrendingUp
};

export default function HomePage() {
  const navigate = useNavigate();
  const { role, bookings, setBookings } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  
  // Stats counter values
  const [stats, setStats] = useState({ creators: 0, views: 0, cities: 0 });

  const handleAcceptOffer = (bookingId) => {
    setBookings(bookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'Preparation', progressPercent: 35 };
      }
      return b;
    }));
  };

  const handleDeclineOffer = (bookingId) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
  };

  const handleAdvanceProgress = (bookingId) => {
    setBookings(bookings.map(b => {
      if (b.id === bookingId) {
        let nextStatus = b.status;
        let nextPercent = b.progressPercent;
        if (b.status === 'Confirmed') {
          nextStatus = 'Preparation';
          nextPercent = 35;
        } else if (b.status === 'Preparation') {
          nextStatus = 'Shooting';
          nextPercent = 60;
        } else if (b.status === 'Shooting') {
          nextStatus = 'Editing';
          nextPercent = 85;
        } else if (b.status === 'Editing') {
          nextStatus = 'Delivered';
          nextPercent = 100;
        }
        return { ...b, status: nextStatus, progressPercent: nextPercent };
      }
      return b;
    }));
  };

  // Count-up animation simulation on load
  useEffect(() => {
    let creatorsVal = 0;
    let viewsVal = 0;
    let citiesVal = 0;

    const interval = setInterval(() => {
      let updated = false;
      if (creatorsVal < 420) {
        creatorsVal += 14;
        updated = true;
      }
      if (viewsVal < 50) {
        viewsVal += 2;
        updated = true;
      }
      if (citiesVal < 9) {
        citiesVal += 1;
        updated = true;
      }

      setStats({
        creators: Math.min(creatorsVal, 420),
        views: Math.min(viewsVal, 50),
        cities: Math.min(citiesVal, 9)
      });

      if (!updated) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/discover');
    }
  };

  const handleCategoryClick = (slug) => {
    navigate(`/discover?category=${slug}`);
  };

  // Countdown timer for offer banner
  const [countdown, setCountdown] = useState('02:45:12');
  useEffect(() => {
    let seconds = 9912; // ~2hrs 45mins
    const timer = setInterval(() => {
      seconds = seconds > 0 ? seconds - 1 : 9912;
      const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      setCountdown(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // CREATOR SIDE DASHBOARD VIEW
  if (role === 'creator') {
    const creator = CREATORS[0]; // mock as Karthik Raja
    const activeProjects = bookings.filter(b => b.status !== 'Delivered');
    const incomingOffers = bookings.filter(b => b.status === 'Confirmed');

    return (
      <div className="relative min-h-screen bg-transparent pb-24 lg:pl-76">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-full max-w-4xl h-[500px] bg-gradient-bg-cinematic opacity-80 pointer-events-none" />

        <div className="px-6 md:px-12 pt-20 lg:pt-8 max-w-7xl mx-auto flex flex-col gap-8">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div className="text-left space-y-1">
              <span className="text-brand-orange text-xs font-bold uppercase tracking-wider font-poppins">CREATOR PORTAL</span>
              <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide font-bold">Welcome back, {creator.name}</h1>
              <p className="text-xs text-brand-textSec font-poppins">You have {activeProjects.length} active shoots in the production queue today.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-white font-bold uppercase tracking-wider bg-white/5 border border-white/10 rounded-xl px-4 py-2">Escrow Protected</span>
            </div>
          </div>

          {/* 1. METRICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Revenue */}
            <div className="glass-panel border-white/5 rounded-2xl p-5 text-left relative overflow-hidden">
              <div className="absolute top-3 right-3 text-brand-orange bg-brand-orange/15 rounded-lg p-2">
                <Coins className="h-5 w-5" />
              </div>
              <span className="text-[10px] text-brand-textSec font-bold uppercase tracking-wider font-poppins">Escrow Earnings</span>
              <h3 className="font-bebas text-3xl text-white tracking-wide font-bold mt-2">₹1,24,500</h3>
              <p className="text-[9px] text-emerald-400 font-semibold mt-1 flex items-center gap-1 font-poppins">
                +₹8,499 cleared this week
              </p>
            </div>

            {/* Shoots Completed */}
            <div className="glass-panel border-white/5 rounded-2xl p-5 text-left relative overflow-hidden">
              <div className="absolute top-3 right-3 text-brand-orange bg-brand-orange/15 rounded-lg p-2">
                <Play className="h-5 w-5" />
              </div>
              <span className="text-[10px] text-brand-textSec font-bold uppercase tracking-wider font-poppins">Completed Shoots</span>
              <h3 className="font-bebas text-3xl text-white tracking-wide font-bold mt-2">{creator.stats.projects}</h3>
              <p className="text-[9px] text-brand-textSec font-semibold mt-1 font-poppins">
                100% on-time delivery rate
              </p>
            </div>

            {/* Average Rating */}
            <div className="glass-panel border-white/5 rounded-2xl p-5 text-left relative overflow-hidden">
              <div className="absolute top-3 right-3 text-amber-450 bg-amber-400/10 rounded-lg p-2">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-[10px] text-brand-textSec font-bold uppercase tracking-wider font-poppins">Average Rating</span>
              <h3 className="font-bebas text-3xl text-white tracking-wide font-bold mt-2">{creator.rating} ★</h3>
              <p className="text-[9px] text-brand-textSec font-semibold mt-1 font-poppins">
                From {creator.reviewCount} verified client reviews
              </p>
            </div>

            {/* Quick stats response */}
            <div className="glass-panel border-white/5 rounded-2xl p-5 text-left relative overflow-hidden">
              <div className="absolute top-3 right-3 text-brand-orange bg-brand-orange/15 rounded-lg p-2">
                <Clock className="h-5 w-5" />
              </div>
              <span className="text-[10px] text-brand-textSec font-bold uppercase tracking-wider font-poppins">Avg. Turnaround</span>
              <h3 className="font-bebas text-3xl text-white tracking-wide font-bold mt-2">{creator.stats.delivery}</h3>
              <p className="text-[9px] text-brand-textSec font-semibold mt-1 font-poppins">
                Fastest vertical editor in Chennai
              </p>
            </div>
          </div>

          {/* 2. REVENUE TRACKING GRAPH SIMULATOR */}
          <div className="glass-panel border-white/5 rounded-3xl p-6 text-left">
            <h3 className="font-bebas text-2xl text-white tracking-wide font-bold mb-4">Earnings History</h3>
            <div className="h-48 w-full flex items-end justify-between gap-2.5 pt-4 font-poppins relative">
              
              {/* Background scale grid */}
              <div className="absolute left-0 right-0 top-0 h-px bg-white/5" />
              <div className="absolute left-0 right-0 top-16 h-px bg-white/5" />
              <div className="absolute left-0 right-0 top-32 h-px bg-white/5" />

              {/* Graphic bars */}
              {[
                { label: 'Jan', val: 'h-16 bg-white/5' },
                { label: 'Feb', val: 'h-24 bg-white/5' },
                { label: 'Mar', val: 'h-32 bg-white/5' },
                { label: 'Apr', val: 'h-20 bg-white/5' },
                { label: 'May', val: 'h-40 bg-gradient-to-t from-brand-orange/20 to-brand-orange glow-orange-sm' }
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 z-10">
                  <div className={`w-full max-w-[50px] rounded-t-lg transition-all duration-500 ${bar.val}`} />
                  <span className="text-[10px] text-brand-textSec">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. INCOMING SHOOT PROPOSALS */}
          {incomingOffers.length > 0 && (
            <div className="flex flex-col gap-4 text-left">
              <h3 className="font-bebas text-2xl text-white tracking-wide font-bold flex items-center gap-2">
                <Flame className="h-5 w-5 text-brand-orange animate-pulse" /> New Shoot Offers ({incomingOffers.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {incomingOffers.map((offer) => (
                  <div key={offer.id} className="glass-panel border-white/10 rounded-2xl p-5 space-y-4 relative overflow-hidden">
                    {/* Corner gradient */}
                    <div className="absolute -top-12 -right-12 h-24 w-24 bg-brand-orange/10 rounded-full blur-xl" />
                    
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-brand-orange/15 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
                          <FileText size={18} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white font-poppins">Booking #{offer.id}</h4>
                          <span className="text-[9px] text-brand-textSec font-poppins">{offer.category}</span>
                        </div>
                      </div>
                      <span className="text-lg font-extrabold text-brand-orange font-poppins">₹{offer.totalPrice}</span>
                    </div>

                    <div className="space-y-1.5 font-poppins text-xs text-brand-textSec border-t border-white/5 pt-3">
                      <p className="flex items-center gap-1.5"><Calendar size={13} className="text-brand-orange" /> {offer.scheduledDate}</p>
                      <p className="flex items-center gap-1.5"><MapPin size={13} className="text-brand-orange" /> {offer.location}</p>
                    </div>

                    <div className="flex gap-2.5 pt-2">
                      <button
                        onClick={() => handleAcceptOffer(offer.id)}
                        className="flex-1 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-accent text-white text-[10px] font-bold uppercase tracking-wider font-poppins flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Check size={12} /> Accept Offer
                      </button>
                      <button
                        onClick={() => handleDeclineOffer(offer.id)}
                        className="py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-brand-textSec hover:text-white text-[10px] font-bold uppercase tracking-wider font-poppins cursor-pointer transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. ACTIVE PRODUCTION SCHEDULE */}
          <div className="flex flex-col gap-4 text-left font-poppins">
            <h3 className="font-bebas text-2xl text-white tracking-wide font-bold">Production Schedule</h3>
            <div className="space-y-4">
              {bookings.filter(b => b.status !== 'Confirmed').map((booking) => (
                <div key={booking.id} className="glass-panel border-white/5 rounded-2xl p-5 space-y-4">
                  {/* Row 1 details */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Client: Raam (Boutique Reel)</h4>
                      <p className="text-[10px] text-brand-textSec mt-0.5">{booking.packageSelected.name}</p>
                    </div>
                    
                    <div className="flex items-center gap-3 text-[10px] text-brand-textSec font-semibold">
                      <span className="flex items-center gap-1"><Calendar size={12} className="text-brand-orange" /> {booking.scheduledDate}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} className="text-brand-orange" /> {booking.location}</span>
                    </div>
                  </div>

                  {/* Production progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-brand-textSec">Production Stage:</span>
                      <span className="font-bold text-brand-orange uppercase text-[10px] bg-brand-orange/15 border border-brand-orange/20 px-2 py-0.5 rounded-lg tracking-wider">
                        {booking.status}
                      </span>
                    </div>

                    {/* Progress track */}
                    <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex gap-1 p-0.5">
                      <div 
                        className="h-full bg-brand-orange rounded-full transition-all duration-500" 
                        style={{ width: `${booking.progressPercent}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[9px] text-brand-textSec font-semibold">
                        Progress: {booking.progressPercent}%
                      </span>
                      
                      {booking.status !== 'Delivered' ? (
                        <button
                          onClick={() => handleAdvanceProgress(booking.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-brand-orange/20 hover:bg-brand-orange border border-brand-orange/30 text-brand-orange hover:text-white text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                        >
                          Advance Phase
                        </button>
                      ) : (
                        <span className="text-[9px] text-emerald-400 font-bold uppercase flex items-center gap-0.5">
                          ✓ Complete & Paid
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. PORTFOLIO & EQUIPMENT INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Equipment Gear */}
            <div className="glass-panel border-white/5 rounded-3xl p-6 text-left">
              <h3 className="font-bebas text-2xl text-white tracking-wide font-bold border-b border-white/5 pb-2.5 mb-4">
                Hardware & Camera Gear
              </h3>
              <div className="space-y-3 text-xs text-brand-textSec font-poppins">
                <div className="flex items-center gap-3">
                  <Camera className="h-4.5 w-4.5 text-brand-orange shrink-0" />
                  <div>
                    <h4 className="font-bold text-white leading-snug">Sony FX3 Cinema Rig</h4>
                    <p className="text-[9px]">Anamorphic lens adaptors & cage setups</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Camera className="h-4.5 w-4.5 text-brand-orange shrink-0" />
                  <div>
                    <h4 className="font-bold text-white leading-snug">DJI RS3 Pro Gimbal</h4>
                    <p className="text-[9px]">Active follow focus stabilizer</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Camera className="h-4.5 w-4.5 text-brand-orange shrink-0" />
                  <div>
                    <h4 className="font-bold text-white leading-snug">iPhone 15 Pro Max</h4>
                    <p className="text-[9px]">ProRes Log shooting profile</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Escrow safety policies */}
            <div className="glass-panel border-white/5 rounded-3xl p-6 text-left space-y-4">
              <h3 className="font-bebas text-2xl text-white tracking-wide font-bold border-b border-white/5 pb-2.5">
                Escrow Terms & Policies
              </h3>
              <p className="text-xs text-brand-textSec leading-relaxed font-poppins">
                Ready2Reel uses a secure escrow booking system. Funds paid by clients are held in our platform vault.
              </p>
              <div className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-xl p-3.5 text-[11px] font-poppins">
                <strong>Rule:</strong> Accept requests within 24 hours. Keep chats inside secure threads for insurance coverage during shoots.
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // RENDER STANDARD CLIENT SIDE
  return (
    <div className="relative min-h-screen bg-transparent pb-24 lg:pl-76">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-full max-w-4xl h-[500px] bg-gradient-bg-cinematic opacity-80 pointer-events-none" />


      {/* Main Home Container */}
      <div className="px-6 md:px-12 pt-20 lg:pt-8 max-w-7xl mx-auto flex flex-col gap-12">
        


        {/* CATEGORIES SECTION */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bebas text-3xl text-brand-dark dark:text-white tracking-wide font-bold">
              Explore Services
            </h2>
            <span className="text-xs text-zinc-500 dark:text-brand-textSec font-medium">Swipe to navigate</span>
          </div>

          {/* Horizontally scrolling list container */}
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x select-none no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.icon] || Flame;
              return (
                <motion.div
                  key={cat.id}
                  id={`home-category-${cat.slug}`}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="snap-start shrink-0 w-44 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden bg-brand-lightCard dark:bg-brand-card border border-brand-lightBorder dark:border-white/5 cursor-pointer shadow hover:shadow-glow group relative"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                    loading="lazy"
                  />
                  {/* Category Details */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 keep-colors">
                    <div className="h-9 w-9 rounded-lg bg-brand-orange/20 flex items-center justify-center text-brand-orange border border-brand-orange/20 shadow-md">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="font-bebas text-xl sm:text-2xl text-white tracking-wide font-bold group-hover:text-brand-orange transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[9px] sm:text-[10px] text-brand-textSec dark:text-brand-textSec text-zinc-300 mt-0.5 line-clamp-2 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* COUNTER STATS SECTION */}
        <section className="grid grid-cols-3 gap-4 md:gap-8 text-center bg-zinc-100 dark:bg-brand-card/40 border border-brand-lightBorder dark:border-white/5 rounded-2xl py-6 px-4 md:p-8">
          <div className="flex flex-col items-center">
            <span className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-brand-orange tracking-wide font-bold">{stats.creators}+</span>
            <span className="text-[9px] sm:text-xs text-zinc-500 dark:text-brand-textSec font-semibold uppercase tracking-wider mt-1">Verified Creators</span>
          </div>
          <div className="flex flex-col items-center border-x border-brand-lightBorder dark:border-white/5">
            <span className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-brand-dark dark:text-white tracking-wide font-bold">{stats.views}M+</span>
            <span className="text-[9px] sm:text-xs text-zinc-500 dark:text-brand-textSec font-semibold uppercase tracking-wider mt-1">Views Generated</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-brand-orange tracking-wide font-bold">{stats.cities}</span>
            <span className="text-[9px] sm:text-xs text-zinc-500 dark:text-brand-textSec font-semibold uppercase tracking-wider mt-1">Prime Cities</span>
          </div>
        </section>

        {/* PROMOTIONAL OFFER BANNER */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-orange to-brand-accent p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-glow">
          <div className="flex flex-col gap-2 text-left">
            <span className="bg-black/20 border border-white/20 text-white text-[9px] font-bold tracking-widest uppercase rounded px-2.5 py-0.5 w-fit">
              Limited Creator Slots Left
            </span>
            <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide font-bold leading-none mt-1">
              Save 20% On Your First Creator Shoot Retainer
            </h3>
            <p className="text-xs text-white/80 max-w-md font-poppins">
              Lock in premium videographers now and schedule dates within the next 90 days.
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            {/* Clock ticker */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest flex items-center gap-1 font-poppins">
                <Clock className="h-3 w-3 animate-pulse" /> Expiring In
              </span>
              <span className="font-bebas text-2xl sm:text-3xl text-white tracking-wider font-bold">{countdown}</span>
            </div>
            
            <AnimatedButton
              id="promo-claim-btn"
              onClick={() => navigate('/discover')}
              className="bg-white text-brand-orange hover:bg-brand-dark hover:text-white px-5 py-3 border border-transparent shadow-none"
            >
              Claim Slot
            </AnimatedButton>
          </div>
        </section>

        {/* RECOMMENDED CREATORS GRID */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h2 className="font-bebas text-3xl text-brand-dark dark:text-white tracking-wide font-bold">
                Featured Creators
              </h2>
              <p className="text-xs text-zinc-500 dark:text-brand-textSec mt-0.5">
                Handpicked cinematic artists with top ratings.
              </p>
            </div>
            <button
              id="view-all-creators-btn"
              onClick={() => navigate('/discover')}
              className="text-xs font-semibold text-brand-orange flex items-center gap-1 hover:underline"
            >
              See All <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Creators grid adapts responsive: columns scale depending on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CREATORS.slice(0, 3).map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
