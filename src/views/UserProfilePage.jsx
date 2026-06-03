import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Calendar, CreditCard, Heart, LogOut, Sun, Moon, Sparkles, ShieldCheck, Camera, Coins, Star, Settings, Check, Plus, Trash2, Award, Zap, Film, Eye, Heart as LucideHeart, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { CREATORS } from '../utils/mockData';
import AnimatedButton from '../components/AnimatedButton';

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { theme, toggleTheme, role, bookings } = useTheme();

  // Active creator profile (Karthik Raja)
  const creatorData = CREATORS[0];

  // Creator state settings
  const [startingPrice, setStartingPrice] = useState(creatorData.startingPrice);
  const [deliveryTime, setDeliveryTime] = useState(creatorData.stats.delivery);
  
  // Custom gear list state
  const [gearList, setGearList] = useState([
    { id: 'g1', name: 'Sony FX3 Cinema Rig', category: 'Camera', owned: true },
    { id: 'g2', name: 'DJI RS3 Pro Gimbal', category: 'Stabilizer', owned: true },
    { id: 'g3', name: 'iPhone 15 Pro Max (ProRes)', category: 'Camera', owned: true },
    { id: 'g4', name: 'Aputure Amaran 200d Light', category: 'Lighting', owned: true },
    { id: 'g5', name: 'Rode Wireless PRO Mic', category: 'Audio', owned: false }
  ]);
  
  const [newGearName, setNewGearName] = useState('');
  const [newGearCat, setNewGearCat] = useState('Camera');

  // Creator portfolio reels list
  const [portfolioReels, setPortfolioReels] = useState(creatorData.portfolio);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newReelTitle, setNewReelTitle] = useState('');
  const [newReelThumbnail, setNewReelThumbnail] = useState('https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=500&q=80');

  // Client info state
  const clientUser = {
    name: 'Raam',
    role: 'Creator Client',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    location: 'Chennai, Tamil Nadu',
    email: 'raam.chennai@gmail.com',
    memberSince: 'May 2026',
    stats: {
      bookings: bookings.length,
      favorites: 2,
      reviews: 1
    }
  };

  const handleAddGear = (e) => {
    e.preventDefault();
    if (!newGearName.trim()) return;
    
    setGearList(prev => [
      ...prev,
      {
        id: `g-${Date.now()}`,
        name: newGearName,
        category: newGearCat,
        owned: true
      }
    ]);
    setNewGearName('');
  };

  const toggleGearOwned = (gearId) => {
    setGearList(prev => prev.map(g => g.id === gearId ? { ...g, owned: !g.owned } : g));
  };

  const handleAddReel = (e) => {
    e.preventDefault();
    if (!newReelTitle.trim()) return;

    const newReel = {
      id: `p-${Date.now()}`,
      title: newReelTitle,
      views: '0',
      likes: '0',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-40019-large.mp4',
      thumbnail: newReelThumbnail
    };

    setPortfolioReels(prev => [newReel, ...prev]);
    setNewReelTitle('');
    setShowUploadModal(false);
  };

  // Creator identity metadata
  const creatorUser = {
    name: creatorData.name,
    role: creatorData.role,
    avatar: creatorData.avatar,
    coverImage: creatorData.coverImage,
    location: creatorData.location + ', India',
    email: 'karthik.films@r2r.com',
    memberSince: 'June 2025',
    stats: {
      shoots: creatorData.stats.projects,
      rating: creatorData.rating,
      active: bookings.filter(b => b.creator.id === 'c1' && b.status !== 'Delivered' && b.status !== 'Cancelled').length
    }
  };

  const activeUser = role === 'creator' ? creatorUser : clientUser;

  return (
    <div className="relative min-h-screen bg-transparent pb-32 lg:pl-76">
      {/* 1. HERO COVER BANNER */}
      <section className="relative h-60 md:h-72 w-full overflow-hidden">
        <img
          src={activeUser.coverImage}
          alt="Cover Banner"
          className="w-full h-full object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-lightBg dark:from-brand-dark via-transparent to-transparent" />
      </section>

      {/* 2. MAIN CONTAINER */}
      <div className="px-6 md:px-12 max-w-5xl mx-auto -mt-20 relative z-10 flex flex-col gap-8">
        
        {/* User Identity Details Card */}
        <div className="glass-panel border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left relative overflow-hidden">
          {/* Decorative orange sweep */}
          <div className="absolute -top-10 -left-10 h-32 w-32 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

          {/* Profile Avatar */}
          <div className="relative shrink-0">
            <div className="h-28 w-28 rounded-full border-4 border-brand-orange overflow-hidden shadow-glow-strong">
              <img src={activeUser.avatar} alt={activeUser.name} className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Identity details */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide font-bold">{activeUser.name}</h2>
                  {role === 'creator' && (
                    <span className="flex items-center gap-0.5 text-[9px] uppercase tracking-wider font-extrabold bg-brand-orange/20 border border-brand-orange/30 text-brand-orange px-2 py-0.5 rounded-full">
                      <Award size={10} /> Super
                    </span>
                  )}
                </div>
                <span className="text-xs text-brand-orange font-bold uppercase tracking-wider font-poppins mt-0.5 block">
                  {activeUser.role}
                </span>
              </div>

              {/* Log out simulation */}
              <button
                id="user-logout-btn"
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl glass-panel border border-white/10 text-brand-textSec hover:text-white text-xs font-poppins font-medium active:scale-95 transition-all cursor-pointer"
              >
                <LogOut className="h-4 w-4 text-brand-orange" /> Sign Out
              </button>
            </div>

            {/* Coordinates */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs font-poppins font-medium text-brand-textSec mt-1">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-brand-orange" /> {activeUser.location}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-brand-orange" /> Member since {activeUser.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Stats Summary Panel */}
        {role === 'creator' ? (
          // Creator Stats
          <div className="grid grid-cols-3 gap-4 bg-zinc-100/50 dark:bg-brand-card/30 border border-brand-lightBorder dark:border-white/5 rounded-2xl p-5 text-center font-poppins">
            <div className="flex flex-col cursor-pointer" onClick={() => navigate('/bookings')}>
              <span className="font-bebas text-2xl sm:text-3xl text-brand-dark dark:text-white tracking-wide font-bold">{activeUser.stats.shoots}</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-textSec mt-0.5">Shoots Finished</span>
            </div>
            <div className="flex flex-col border-x border-white/5 dark:border-x-white/5 border-x-brand-lightBorder">
              <span className="font-bebas text-2xl sm:text-3xl text-brand-orange tracking-wide font-bold">{activeUser.stats.rating} ★</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-textSec mt-0.5">Client Rating</span>
            </div>
            <div className="flex flex-col cursor-pointer" onClick={() => navigate('/bookings')}>
              <span className="font-bebas text-2xl sm:text-3xl text-brand-dark dark:text-white tracking-wide font-bold">{activeUser.stats.active}</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-textSec mt-0.5">Active Shoots</span>
            </div>
          </div>
        ) : (
          // Client Stats
          <div className="grid grid-cols-3 gap-4 bg-zinc-100/50 dark:bg-brand-card/30 border border-brand-lightBorder dark:border-white/5 rounded-2xl p-5 text-center font-poppins">
            <div className="flex flex-col cursor-pointer" onClick={() => navigate('/bookings')}>
              <span className="font-bebas text-2xl sm:text-3xl text-brand-dark dark:text-white tracking-wide font-bold">{activeUser.stats.bookings}</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-textSec mt-0.5">Shoot Bookings</span>
            </div>
            <div className="flex flex-col border-x border-white/5 dark:border-x-white/5 border-x-brand-lightBorder cursor-pointer" onClick={() => navigate('/discover?filter=favorites')}>
              <span className="font-bebas text-2xl sm:text-3xl text-brand-orange tracking-wide font-bold">{activeUser.stats.favorites}</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-textSec mt-0.5">Saved Favorites</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-2xl sm:text-3xl text-brand-dark dark:text-white tracking-wide font-bold">{activeUser.stats.reviews}</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-textSec mt-0.5">Reviews Written</span>
            </div>
          </div>
        )}

        {/* 2-COLUMN SETTINGS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
          
          {/* LEFT COLUMN: ACCOUNT SETTINGS & APPEARANCE */}
          <div className="flex flex-col gap-8">
            {/* General Settings */}
            <div className="glass-panel border-white/5 rounded-3xl p-6 flex flex-col gap-6">
              <h3 className="font-bebas text-2xl text-white tracking-wide font-bold border-b border-white/5 pb-3">
                Account Settings
              </h3>

              {/* Theme appearance settings switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white font-poppins">Appearance Theme</span>
                  <span className="text-xs text-brand-textSec font-poppins mt-0.5">Switch between dark cinematic and light modes.</span>
                </div>
                
                <div className="flex p-0.5 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/40 border border-brand-lightBorder dark:border-white/5 w-fit shrink-0">
                  <button
                    id="profile-theme-light-btn"
                    onClick={() => theme !== 'light' && toggleTheme()}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold font-poppins transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-white text-brand-orange shadow-sm'
                        : 'text-zinc-500 dark:text-brand-textSec hover:text-brand-dark dark:hover:text-white'
                    }`}
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </button>
                  <button
                    id="profile-theme-dark-btn"
                    onClick={() => theme !== 'dark' && toggleTheme()}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold font-poppins transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-brand-orange text-white shadow-[0_0_8px_rgba(255,106,0,0.3)]'
                        : 'text-zinc-500 dark:text-brand-textSec hover:text-brand-dark dark:hover:text-white'
                    }`}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </button>
                </div>
              </div>

              <div className="h-px bg-white/5 w-full" />

              {/* Coordinates info */}
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange font-poppins">Personal Coordinates</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-poppins text-xs">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-brand-textSec">Registered Email</span>
                    <span className="text-white font-medium">{activeUser.email}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-brand-textSec">Phone Coordinates</span>
                    <span className="text-white font-medium">+91 98401 23456</span>
                  </div>
                </div>
              </div>

              {/* Secure Escrow protection validation badge */}
              {role === 'client' && (
                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4">
                  <ShieldCheck className="h-6 w-6 shrink-0" />
                  <div className="text-left font-poppins">
                    <h5 className="text-xs font-bold">Escrow Verification Safeguard</h5>
                    <p className="text-[10px] mt-0.5 text-emerald-400/80">Your profile details are secured. Escrow funds will only release to creators when deliverables match your approval benchmarks.</p>
                  </div>
                </div>
              )}
            </div>

            {/* CREATOR-SPECIFIC RATES & DURATION WIDGET */}
            {role === 'creator' && (
              <div className="glass-panel border-white/5 rounded-3xl p-6 flex flex-col gap-6">
                <h3 className="font-bebas text-2xl text-white tracking-wide font-bold border-b border-white/5 pb-3">
                  Rate & Turnaround Settings
                </h3>

                {/* Starting Price Input */}
                <div className="flex flex-col gap-2 font-poppins">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-white">Starting Price (₹)</span>
                    <span className="font-extrabold text-brand-orange">₹{startingPrice} Baseline</span>
                  </div>
                  <input
                    type="range"
                    min="999"
                    max="19999"
                    step="500"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                  />
                  <p className="text-[9px] text-brand-textSec">Adjust your minimum starting pricing for 1-hour reels.</p>
                </div>

                {/* Turnaround speed Dropdown */}
                <div className="flex flex-col gap-2 font-poppins">
                  <span className="text-xs font-semibold text-white">Guaranteed Turnaround Speed</span>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full h-10 px-3 bg-brand-card/50 border border-white/5 rounded-xl text-xs text-white outline-none focus:border-brand-orange"
                  >
                    <option value="24 Hrs">24 Hours (Lightning Cut)</option>
                    <option value="48 Hrs">48 Hours (Standard)</option>
                    <option value="3 Days">3 Days (Deep Grading)</option>
                    <option value="5 Days">5 Days (Pro Documentary)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: GEAR CHECKLIST OR FAVORITES SUMMARY */}
          <div className="flex flex-col gap-8">
            {role === 'creator' ? (
              // CREATOR GEAR MANAGER WIDGET
              <div className="glass-panel border-white/5 rounded-3xl p-6 flex flex-col gap-5">
                <h3 className="font-bebas text-2xl text-white tracking-wide font-bold border-b border-white/5 pb-3 flex items-center justify-between">
                  <span>Gear & Hardware Kit</span>
                  <span className="text-xs bg-brand-orange/10 border border-brand-orange/20 text-brand-orange px-2 py-0.5 rounded-lg">
                    {gearList.filter(g => g.owned).length} Active
                  </span>
                </h3>

                {/* Gear Checklist */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1 no-scrollbar">
                  {gearList.map((gear) => (
                    <div 
                      key={gear.id} 
                      onClick={() => toggleGearOwned(gear.id)}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                        gear.owned 
                          ? 'bg-brand-orange/10 border-brand-orange/30 text-white' 
                          : 'bg-brand-card/30 border-white/5 text-zinc-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${gear.owned ? 'bg-brand-orange text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                          <Camera size={16} />
                        </div>
                        <div className="text-left font-poppins">
                          <h4 className={`text-xs font-bold ${gear.owned ? 'text-white' : 'text-zinc-400'}`}>{gear.name}</h4>
                          <span className="text-[8px] uppercase tracking-wider block font-bold text-zinc-500">{gear.category}</span>
                        </div>
                      </div>
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                        gear.owned ? 'bg-brand-orange border-brand-orange text-white' : 'border-zinc-700 text-transparent'
                      }`}>
                        <Check size={12} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Custom Gear Form */}
                <form onSubmit={handleAddGear} className="flex gap-2 font-poppins border-t border-white/5 pt-4">
                  <div className="flex-1 flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Add custom gear (e.g. Sony A7SIII)..."
                      value={newGearName}
                      onChange={(e) => setNewGearName(e.target.value)}
                      className="w-full h-10 px-3.5 bg-brand-card/50 border border-white/5 rounded-xl text-xs text-white outline-none focus:border-brand-orange"
                    />
                    <div className="flex gap-2">
                      {['Camera', 'Stabilizer', 'Lighting', 'Audio'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setNewGearCat(cat)}
                          className={`flex-1 py-1 rounded-lg text-[9px] font-bold uppercase transition-all ${
                            newGearCat === cat 
                              ? 'bg-brand-orange text-white' 
                              : 'bg-zinc-800 text-brand-textSec hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="h-10 px-4 rounded-xl bg-brand-orange hover:bg-brand-accent text-white flex items-center justify-center shrink-0 shadow-glow-sm cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </form>
              </div>
            ) : (
              // CLIENT SAVED PREFERENCES / METADATA
              <div className="glass-panel border-white/5 rounded-3xl p-6 flex flex-col gap-4 text-left">
                <h3 className="font-bebas text-2xl text-white tracking-wide font-bold border-b border-white/5 pb-3">
                  Safety Protocols
                </h3>
                <div className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-xl p-3.5 text-xs font-poppins leading-relaxed">
                  <strong>Safe Marketplace Promise:</strong> Ready2Reel requires all communication and deliverables transfers to be locked in inside our app to assure contract insurance coverage.
                </div>
                <div className="text-xs text-brand-textSec font-poppins leading-relaxed space-y-2 border-t border-white/5 pt-3">
                  <p>• Cancel bookings penalty-free up to 48 hours before shoot schedule.</p>
                  <p>• Direct communications with filmmakers are monitored to prevent platform leakage.</p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 3. PORTFOLIO SHOWCASE BLOCK (Only for Creator) */}
        {role === 'creator' && (
          <div className="glass-panel border-white/5 rounded-3xl p-6 md:p-8 flex flex-col gap-6 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <h3 className="font-bebas text-2xl text-white tracking-wide font-bold">
                  Portfolio Reels
                </h3>
                <p className="text-xs text-brand-textSec font-poppins">Manage active cinematic reel assets displayed on your public profile.</p>
              </div>
              
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-accent text-white text-xs font-poppins font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-glow-sm transition-all"
              >
                <Plus size={14} /> Upload Reel
              </button>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-poppins">
              {portfolioReels.map((reel) => (
                <div key={reel.id} className="bg-brand-card border border-white/5 rounded-2xl overflow-hidden group relative">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img 
                      src={reel.thumbnail} 
                      alt={reel.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.7]" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <button className="h-10 w-10 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-glow-sm scale-90 group-hover:scale-100 transition-transform">
                        <Play size={16} fill="white" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 space-y-2 text-left">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{reel.title}</h4>
                    <div className="flex items-center justify-between text-[9px] text-brand-textSec font-bold">
                      <span className="flex items-center gap-1"><Eye size={12} /> {reel.views} Views</span>
                      <span className="flex items-center gap-1 text-brand-orange"><LucideHeart size={10} fill="currentColor" /> {reel.likes} Likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* UPLOAD REEL MODAL */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="w-full max-w-md glass-panel border border-brand-orange/20 rounded-3xl p-6 text-left space-y-6"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="font-bebas text-2xl text-white tracking-wide font-bold">Upload Showcase Reel</h3>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-brand-textSec hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddReel} className="space-y-4 font-poppins text-xs">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-white">Reel Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chennai Local Street Food Transition Vibe"
                    value={newReelTitle}
                    onChange={(e) => setNewReelTitle(e.target.value)}
                    className="w-full h-11 px-4 bg-brand-card border border-white/5 rounded-xl text-white outline-none focus:border-brand-orange"
                  />
                </div>

                {/* Thumbnail select mock */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-white">Select Thumbnail Category</label>
                  <select
                    value={newReelThumbnail}
                    onChange={(e) => setNewReelThumbnail(e.target.value)}
                    className="w-full h-11 px-3 bg-brand-card border border-white/5 rounded-xl text-white outline-none focus:border-brand-orange"
                  >
                    <option value="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=500&q=80">Modern Workspace Promo</option>
                    <option value="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80">Vibrant Studio Lighting Vibe</option>
                    <option value="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80">Outdoor Sunset Portrait Vibe</option>
                    <option value="https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=500&q=80">Neon Tokyo Cyber Vibe</option>
                  </select>
                </div>

                <div className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-xl p-3 text-[10px] leading-relaxed">
                  <strong>Notice:</strong> High definition MP4 formats are converted to vertical 9:16 reels automatically for compatibility.
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-brand-orange hover:bg-brand-accent text-white font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-glow-sm"
                  >
                    Upload and Publish
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="py-3 px-5 rounded-xl bg-white/5 border border-white/10 text-brand-textSec hover:text-white font-bold uppercase tracking-wider text-[10px] cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
