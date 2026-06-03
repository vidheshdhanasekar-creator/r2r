import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Navigation, Compass, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CITIES } from '../utils/mockData';
import AnimatedButton from '../components/AnimatedButton';

export default function LocationPermission() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  // Filter cities by search query
  const filteredCities = CITIES.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simulate locating
  const handleAutoLocate = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setSelectedCity('Chennai'); // default simulation choice
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }, 2200);
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setTimeout(() => {
      navigate('/home');
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full bg-transparent flex flex-col justify-center items-center px-6 py-12 overflow-hidden">
      {/* Background radial glowing effects */}
      <div className="absolute inset-0 bg-gradient-bg-cinematic opacity-80 pointer-events-none" />

      {/* Decorative floating camera assets */}
      <div className="absolute top-10 right-10 opacity-5 animate-float pointer-events-none">
        <Compass className="h-64 w-64 text-brand-orange" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
        {/* Animated Pulsing Location Pin Container */}
        <div className="relative flex items-center justify-center h-48 w-48 mb-8">
          {/* Concentric Glow Ripples */}
          <motion.div
            className="absolute h-40 w-40 rounded-full border border-brand-orange/20 bg-brand-orange/5"
            animate={{ scale: [0.9, 1.4, 0.9], opacity: [0.6, 0.1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute h-28 w-28 rounded-full border border-brand-orange/30 bg-brand-orange/10"
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          
          {/* Location Pin */}
          <motion.div
            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange to-brand-accent shadow-[0_0_35px_rgba(255,106,0,0.6)] border border-white/20"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {isLocating ? (
              <Compass className="h-10 w-10 text-white animate-spin" />
            ) : (
              <MapPin className="h-10 w-10 text-white" />
            )}
          </motion.div>
          
          {/* Base Pin Pulse */}
          <div className="absolute bottom-6 h-3 w-16 bg-black/40 rounded-full blur-[3px] scale-x-90" />
        </div>

        {/* Header Text */}
        <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">
          Find Creators Near You
        </h2>
        <p className="text-sm text-zinc-500 dark:text-brand-textSec mt-2 max-w-sm font-poppins leading-relaxed">
          Enable location permissions to discover creators, videographers, and editing studios inside your city.
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3 mt-8">
          <AnimatedButton
            id="gps-locate-btn"
            variant="primary"
            onClick={handleAutoLocate}
            className="w-full h-13"
          >
            {isLocating ? (
              "Discovering GPS Location..."
            ) : (
              <>
                <Navigation className="h-4.5 w-4.5 animate-bounce" />
                Use Current Location
              </>
            )}
          </AnimatedButton>
          
          {/* City Search Bar */}
          <div className="relative w-full mt-4">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-brand-textSec pointer-events-none">
              <Search className="h-4.5 w-4.5" />
            </span>
            <input
              id="city-search-input"
              type="text"
              placeholder="Search cities (e.g. Chennai, Madurai)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-13 pl-12 pr-4 rounded-xl glass-panel text-brand-dark dark:text-white placeholder-zinc-400 dark:placeholder-brand-textSec/70 focus:outline-none focus:border-brand-orange/60 border border-white/5 transition-all text-sm font-poppins shadow-inner"
            />
          </div>
        </div>

        {/* City Chips Selection Grid */}
        <div className="w-full mt-6">
          <div className="text-left text-xs uppercase tracking-widest text-brand-textSec font-bold mb-3 flex items-center gap-1.5 font-poppins">
            <Globe className="h-3.5 w-3.5 text-brand-orange" /> Or Select Popular Cities
          </div>
          
          <div className="flex flex-wrap gap-2 justify-start">
            {filteredCities.map((city) => {
              const active = selectedCity === city;
              return (
                <motion.button
                  key={city}
                  id={`city-chip-${city.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleSelectCity(city)}
                  className={`text-xs px-3.5 py-2.5 rounded-xl font-poppins font-medium transition-all ${
                    active
                      ? 'bg-brand-orange text-white border-brand-orange shadow-glow'
                      : 'glass-panel text-zinc-700 dark:text-brand-textSec hover:border-brand-orange/40 hover:text-white dark:hover:text-white hover:text-brand-dark'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {city}
                </motion.button>
              );
            })}
            
            {filteredCities.length === 0 && (
              <span className="text-xs text-brand-textSec/60 font-poppins italic">No cities match your search.</span>
            )}
          </div>
        </div>

        {/* Auto Locate Simulation Overlay */}
        <AnimatePresence>
          {isLocating && (
            <motion.div
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="h-16 w-16 border-4 border-brand-orange border-t-transparent rounded-full mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              />
              <span className="text-sm font-semibold uppercase tracking-widest text-white animate-pulse font-poppins">
                Scanning Local Frequencies
              </span>
              <span className="text-xs text-brand-textSec mt-1 font-poppins">
                Searching for 5G network location services...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Success Notification Overlay */}
        <AnimatePresence>
          {selectedCity && (
            <motion.div
              className="fixed bottom-10 left-6 right-6 z-50 glass-panel border-brand-orange/30 p-4 rounded-xl flex items-center gap-3 shadow-glow"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="h-9 w-9 bg-brand-orange/20 rounded-lg flex items-center justify-center text-brand-orange shrink-0">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white uppercase tracking-wide font-poppins">City Calibrated!</div>
                <div className="text-[11px] text-brand-textSec font-medium font-poppins">Loading available creators in {selectedCity}...</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
