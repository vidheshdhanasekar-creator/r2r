import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Zap, ShieldCheck, Video, Heart, Check, Users, Trophy, Play, MessageSquare, Camera, Sparkles, ChevronRight, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CREATORS, PACKAGES } from '../utils/mockData';
import AnimatedButton from '../components/AnimatedButton';

export default function CreatorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find creator or default to c1
  const creator = CREATORS.find(c => c.id === id) || CREATORS[0];
  
  const [activeTab, setActiveTab] = useState('portfolio'); // portfolio, packages, reviews, gear
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Video Theater Modal State
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // Simulated Scroll Top on render
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Video hover controllers inside profile grid
  const PortfolioVideoCard = ({ item }) => {
    const videoRef = useRef(null);
    const [hovering, setHovering] = useState(false);

    const startPlay = () => {
      setHovering(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };

    const stopPlay = () => {
      setHovering(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };

    return (
      <div
        onMouseEnter={startPlay}
        onMouseLeave={stopPlay}
        onClick={() => setSelectedVideo(item)}
        className="group relative rounded-2xl overflow-hidden bg-zinc-950 aspect-[9/16] cursor-pointer border border-white/5 shadow-md hover:shadow-glow hover:border-brand-orange/30 transition-all duration-300"
      >
        {/* Cover image placeholder */}
        <img
          src={item.thumbnail}
          alt={item.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-10 ${
            hovering ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Video preview */}
        <video
          ref={videoRef}
          src={item.videoUrl}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-15 pointer-events-none" />

        {/* Text descriptions */}
        <div className="absolute bottom-4 left-4 right-4 z-20 text-left pointer-events-none keep-colors">
          <span className="text-[9px] font-bold bg-brand-orange text-white px-2 py-0.5 rounded uppercase tracking-widest">
            {item.views} Views
          </span>
          <h4 className="font-bebas text-lg text-white mt-1.5 tracking-wide line-clamp-1 group-hover:text-brand-orange transition-colors">
            {item.title}
          </h4>
          <p className="text-[10px] text-brand-textSec mt-0.5 flex items-center gap-1 font-poppins">
            <Heart className="h-3 w-3 text-brand-orange fill-brand-orange" /> {item.likes} Likes
          </p>
        </div>

        {/* Hover indication */}
        {!hovering && (
          <div className="absolute top-4 right-4 z-20 h-7 w-7 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white keep-colors">
            <Play className="h-3.5 w-3.5 fill-white ml-0.5" />
          </div>
        )}
      </div>
    );
  };

  // Find packages matching this creator's tags
  const matchingPackages = PACKAGES.filter(
    pkg => creator.tags.some(tag => pkg.category.includes(tag)) || pkg.id === 'pkg-reels-1'
  );

  return (
    <div className="relative min-h-screen bg-transparent pb-32 lg:pl-76">
      {/* Back button for mobile */}
      <div className="lg:hidden absolute top-4 left-4 z-30">
        <button
          id="profile-back-btn"
          onClick={() => navigate(-1)}
          className="h-10 w-10 rounded-full glass-panel border-white/10 flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>



      {/* 1. HERO COVER COVER BANNER WITH PARALLAX */}
      <section className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src={creator.coverImage}
          alt={creator.name}
          className="w-full h-full object-cover brightness-[0.45] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
      </section>

      {/* 2. MAIN GRID LAYOUT */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto -mt-16 relative z-10 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* LEFT COLUMN: Profile info, tabs & detailed showcases */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          
          {/* Main profile card */}
          <div className="glass-panel border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left relative overflow-hidden">
            {/* Glow sweep backdrop */}
            <div className="absolute -top-10 -left-10 h-32 w-32 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

            {/* Profile Avatar */}
            <div className="relative shrink-0">
              <div className="h-28 w-28 rounded-full border-4 border-brand-orange overflow-hidden shadow-glow-strong">
                <img src={creator.avatar} alt={creator.name} className="h-full w-full object-cover" />
              </div>
              <span className="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-emerald-500 border-2 border-brand-card flex items-center justify-center text-white shadow-md">
                <Check className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* Profile text data */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide font-bold">{creator.name}</h2>
                    {creator.badge && (
                      <span className="text-[9px] font-bold tracking-widest uppercase bg-brand-orange text-white px-2 py-0.5 rounded border border-white/10 shadow-md">
                        {creator.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-brand-orange font-bold uppercase tracking-wider font-poppins mt-0.5">{creator.role}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">

                  {/* Heart wishlist CTA */}
                  <button
                    id="profile-favorite-btn"
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`h-11 w-11 rounded-xl glass-panel border border-white/10 flex items-center justify-center transition-all ${
                      isFavorited ? 'text-rose-500 scale-105 border-rose-500/20' : 'text-brand-textSec hover:text-white'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Location & Rating */}
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs font-poppins font-medium text-brand-textSec">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-brand-orange" /> {creator.location}</span>
                <span className="flex items-center gap-1 font-bold text-white"><Star className="h-4 w-4 fill-brand-orange text-brand-orange" /> {creator.rating} <span className="font-medium text-brand-textSec">({creator.reviewCount} Reviews)</span></span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-500 dark:text-brand-textSec leading-relaxed font-poppins mt-2">
                {creator.about}
              </p>

              {/* Tag Badges list */}
              <div className="flex flex-wrap gap-1.5 justify-center md:justify-start mt-2">
                {creator.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-medium text-brand-orange bg-brand-orange/10 border border-brand-orange/15 px-2.5 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>


            </div>
          </div>

          {/* Quick stats counters */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 bg-zinc-100 dark:bg-brand-card/30 border border-brand-lightBorder dark:border-white/5 rounded-2xl p-5 text-center">
            <div className="flex flex-col">
              <span className="font-bebas text-2xl sm:text-3xl text-brand-dark dark:text-white tracking-wide font-bold">{creator.stats.projects}</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-textSec mt-0.5">Projects Done</span>
            </div>
            <div className="flex flex-col border-x border-white/5 dark:border-x-white/5 border-x-brand-lightBorder">
              <span className="font-bebas text-2xl sm:text-3xl text-brand-orange tracking-wide font-bold">{creator.stats.experience}</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-textSec mt-0.5">Experience</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-2xl sm:text-3xl text-brand-dark dark:text-white tracking-wide font-bold">{creator.stats.delivery}</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-textSec mt-0.5">Avg Delivery</span>
            </div>
          </div>

          {/* VIEW TABS TOOLBAR */}
          <div className="flex border-b border-brand-lightBorder dark:border-white/5 pb-px overflow-x-auto no-scrollbar font-poppins">
            {[
              { id: 'portfolio', name: 'Portfolio Reels', count: creator.portfolio.length },
              { id: 'packages', name: 'Pricing Packages', count: matchingPackages.length },
              { id: 'reviews', name: 'Client Reviews', count: creator.reviews.length },
              { id: 'gear', name: 'Stats & Gear', count: null }
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`profile-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 pb-3.5 text-xs font-bold uppercase tracking-wider shrink-0 transition-colors ${
                    active ? 'text-brand-orange' : 'text-brand-textSec hover:text-white'
                  }`}
                >
                  {tab.name} {tab.count !== null && <span className="text-[9px] ml-0.5 opacity-60">({tab.count})</span>}
                  {active && (
                    <motion.div
                      layoutId="profileTabLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* TAB CONTENTS PANELS */}
          <div className="min-h-[250px]">
            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {creator.portfolio.map((item) => (
                  <PortfolioVideoCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {activeTab === 'packages' && (
              <div className="flex flex-col gap-4">
                {matchingPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="glass-panel border-white/5 rounded-2xl p-5 md:p-6 text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden"
                  >
                    {pkg.isRecommended && (
                      <span className="absolute top-0 right-0 bg-brand-orange text-white text-[9px] font-bold tracking-widest uppercase rounded-bl px-2.5 py-0.5">
                        RECOMMENDED
                      </span>
                    )}
                    <div className="flex flex-col gap-1.5 max-w-lg">
                      <h4 className="font-bebas text-2xl text-white tracking-wide font-bold">{pkg.name}</h4>
                      <p className="text-[10px] text-brand-orange font-bold uppercase tracking-wider">{pkg.duration}</p>
                      
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mt-3.5">
                        {pkg.features.slice(0, 4).map((feat, idx) => (
                          <li key={idx} className="text-xs text-brand-textSec flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange shrink-0" /> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col items-end shrink-0 gap-2 w-full md:w-auto">
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] text-brand-textSec font-medium uppercase tracking-wider">Price Package</span>
                        <span className="text-2xl font-bebas font-bold text-white tracking-wide">₹{pkg.price}</span>
                      </div>
                      <AnimatedButton
                        id={`profile-book-pkg-${pkg.id}`}
                        onClick={() => navigate(`/booking/${creator.id}?pkg=${pkg.id}`)}
                        className="text-xs px-4 py-2.5 shadow-none"
                      >
                        Book Package <Zap className="h-3 w-3" />
                      </AnimatedButton>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="flex flex-col gap-4">
                {creator.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="glass-panel border-white/5 rounded-2xl p-5 text-left flex flex-col gap-3"
                  >
                    {/* Header: client details */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full overflow-hidden border border-white/10 bg-zinc-800">
                          <img src={review.avatar} alt={review.clientName} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">{review.clientName}</h5>
                          <span className="text-[10px] text-brand-textSec">{review.date} • {review.projectType}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded border border-brand-orange/10">
                        <Star className="h-3.5 w-3.5 fill-brand-orange" />
                        <span className="text-[11px] font-bold">{review.rating}</span>
                      </div>
                    </div>
                    {/* Testimonial text */}
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-brand-textSec font-poppins leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>
                ))}

                {creator.reviews.length === 0 && (
                  <p className="text-xs text-brand-textSec italic text-center">No review testimonials posted yet.</p>
                )}
              </div>
            )}

            {activeTab === 'gear' && (
              <div className="glass-panel border-white/5 rounded-2xl p-6 text-left flex flex-col gap-6">
                <div>
                  <h4 className="font-bebas text-xl text-white tracking-wide font-bold flex items-center gap-1.5">
                    <Camera className="h-4.5 w-4.5 text-brand-orange" /> Production Gear Kit
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                      <span className="text-[10px] text-brand-textSec font-bold uppercase tracking-wider block">Cameras</span>
                      <span className="text-xs text-white mt-1 block">Sony FX3 Cinema Rig + RED Komodo 6K</span>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                      <span className="text-[10px] text-brand-textSec font-bold uppercase tracking-wider block">Lenses</span>
                      <span className="text-xs text-white mt-1 block">Sirui Anamorphic & Sony G-Master Primes</span>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                      <span className="text-[10px] text-brand-textSec font-bold uppercase tracking-wider block">Gimbal & Drone</span>
                      <span className="text-xs text-white mt-1 block">DJI RS4 Pro Gimbal + DJI Mavic 3 Pro Cine</span>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                      <span className="text-[10px] text-brand-textSec font-bold uppercase tracking-wider block">Editing Softwares</span>
                      <span className="text-xs text-white mt-1 block">DaVinci Resolve Studio (Full License)</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-5">
                  <h4 className="font-bebas text-xl text-white tracking-wide font-bold flex items-center gap-1.5">
                    <Trophy className="h-4.5 w-4.5 text-brand-orange" /> Certifications & Achievements
                  </h4>
                  <ul className="flex flex-col gap-2 mt-3 text-xs text-brand-textSec font-poppins">
                    {creator.certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" /> {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Desktop Sticky Booking Widget (Airbnb style) */}
        <aside className="hidden lg:block w-1/3 sticky top-24 glass-panel border border-brand-orange/15 rounded-3xl p-6 shadow-glow">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[10px] text-brand-textSec font-medium uppercase tracking-wider">Session Rates</span>
              <span className="text-3xl font-bebas font-bold text-white tracking-wide">₹{creator.startingPrice} <span className="text-xs text-brand-textSec font-poppins font-medium">starting</span></span>
            </div>
            
            <div className="flex items-center gap-1 rounded bg-brand-orange/10 border border-brand-orange/20 text-brand-orange px-2 py-1 font-bold text-xs">
              <Star className="h-4 w-4 fill-brand-orange" /> {creator.rating}
            </div>
          </div>

          <div className="flex flex-col gap-3.5 border-t border-white/5 pt-5 mt-5">
            <div className="bg-black/20 rounded-xl p-3 border border-white/5 text-left">
              <span className="text-[9px] text-brand-textSec font-bold uppercase tracking-widest block">Primary Service</span>
              <span className="text-sm font-semibold text-white mt-1 block font-poppins">{creator.role}</span>
            </div>
            
            <div className="bg-black/20 rounded-xl p-3 border border-white/5 text-left">
              <span className="text-[9px] text-brand-textSec font-bold uppercase tracking-widest block">Project Retainer Slots</span>
              <span className="text-xs text-emerald-400 font-semibold mt-1 block font-poppins">Available for next 14 Days</span>
            </div>
          </div>

          <AnimatedButton
            id="desktop-profile-book-btn"
            variant="primary"
            onClick={() => navigate(`/booking/${creator.id}`)}
            className="w-full mt-6 h-13"
          >
            Confirm & Book Session <Zap className="h-4.5 w-4.5" />
          </AnimatedButton>
          
          <p className="text-[10px] text-center text-brand-textSec mt-3 font-poppins">
            No immediate charges. You will configure options next.
          </p>
        </aside>
      </div>

      {/* 3. MOBILE FIXED BOOKING ACTION DOCK */}
      <div className="lg:hidden fixed bottom-18 left-0 right-0 z-30 px-6 pointer-events-none">
        <div className="pointer-events-auto w-full glass-panel border border-brand-orange/15 rounded-2xl p-4 flex items-center justify-between shadow-glow">
          <div className="flex flex-col text-left">
            <span className="text-[9px] text-brand-textSec font-medium uppercase tracking-wider">Starts At</span>
            <span className="text-xl font-bebas font-bold text-white tracking-wide">₹{creator.startingPrice}</span>
          </div>

          <AnimatedButton
            id="mobile-profile-book-btn"
            variant="primary"
            onClick={() => navigate(`/booking/${creator.id}`)}
            className="px-5 py-2.5 h-11"
          >
            Book <Zap className="h-3.5 w-3.5" />
          </AnimatedButton>
        </div>
      </div>

      {/* 4. CINEMATIC VIDEO THEATER POPUP MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full max-w-xl aspect-[9/16] max-h-[85vh] bg-black rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-end shadow-glow-strong">
              
              {/* Close button */}
              <button
                id="close-media-theater-btn"
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-40 h-10 w-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white outline-none active:scale-95 transition-transform"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Autoplaying cinema video */}
              <video
                src={selectedVideo.videoUrl}
                autoPlay
                controls
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Theater text Overlay details */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 z-20 text-left pointer-events-none keep-colors">
                <span className="text-[9px] font-bold bg-brand-orange text-white px-2 py-0.5 rounded uppercase tracking-widest font-poppins">
                  {selectedVideo.views} Views
                </span>
                <h3 className="font-bebas text-2xl text-white mt-1.5 tracking-wide">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs text-brand-textSec font-medium mt-1 font-poppins flex items-center gap-1.5">
                  <Camera className="h-3.5 w-3.5 text-brand-orange" /> Directed by {creator.name}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
