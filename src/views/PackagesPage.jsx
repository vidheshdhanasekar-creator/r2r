import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Info, Shield, HelpCircle, ArrowRight, Zap, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { PACKAGES, UPSELL_ADDONS } from '../utils/mockData';
import AnimatedButton from '../components/AnimatedButton';

export default function PackagesPage() {
  const navigate = useNavigate();
  
  // Local state to track selected package and upsells for pre-configured rates
  const [selectedPkg, setSelectedPkg] = useState('pkg-reels-1');
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Toggle upsells selection
  const handleToggleAddon = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId) 
        : [...prev, addonId]
    );
  };

  const getPackagePrice = (pkgId) => {
    const pkg = PACKAGES.find(p => p.id === pkgId);
    return pkg ? pkg.price : 0;
  };

  const getAddonsTotal = () => {
    return selectedAddons.reduce((acc, addonId) => {
      const addon = UPSELL_ADDONS.find(a => a.id === addonId);
      return acc + (addon ? addon.price : 0);
    }, 0);
  };

  const currentPkgObj = PACKAGES.find(p => p.id === selectedPkg) || PACKAGES[0];
  const grandTotal = currentPkgObj.price + getAddonsTotal();

  const handleBookSelected = () => {
    // Navigate to booking page of default creator Raam (c1) with query params
    const addonsParam = selectedAddons.join(',');
    navigate(`/booking/c1?pkg=${selectedPkg}&addons=${addonsParam}`);
  };

  return (
    <div className="relative min-h-screen bg-transparent pb-28 lg:pl-76">
      {/* Background radial effects */}
      <div className="absolute top-0 right-0 w-full max-w-4xl h-[450px] bg-gradient-bg-cinematic opacity-80 pointer-events-none" />

      <div className="px-6 md:px-12 pt-20 lg:pt-8 max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Page Header */}
        <div className="text-left max-w-xl">
          <h1 className="font-bebas text-4xl sm:text-5xl text-brand-dark dark:text-white tracking-wide">
            Cinematic Packages
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-brand-textSec mt-1 font-poppins leading-relaxed">
            Choose pre-configured creator slots or bundle dynamic visual retainers matching your production benchmarks.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PACKAGES.map((pkg) => {
            const isSelected = selectedPkg === pkg.id;
            return (
              <motion.div
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg.id)}
                className={`cursor-pointer rounded-2xl p-6 text-left flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  isSelected 
                    ? 'bg-gradient-to-b from-brand-card to-black border-2 border-brand-orange shadow-glow' 
                    : 'glass-panel border-white/5 bg-brand-card/60 hover:border-white/10 shadow'
                }`}
                whileHover={{ y: -4 }}
              >
                {pkg.isRecommended && (
                  <span className="absolute top-0 right-0 bg-brand-orange text-white text-[9px] font-bold tracking-widest uppercase rounded-bl px-2.5 py-0.5">
                    RECOMMENDED
                  </span>
                )}
                
                {/* Checkbox badge visual */}
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-brand-orange uppercase tracking-wider">{pkg.badge}</span>
                    <h3 className="font-bebas text-2xl text-white tracking-wide font-bold">{pkg.name}</h3>
                  </div>
                  <div className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/20'
                  }`}>
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                </div>

                <div className="border-y border-white/5 py-4 my-4">
                  <span className="text-[10px] text-brand-textSec uppercase tracking-widest block font-poppins">Starting Rate</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bebas font-bold text-white tracking-wide">₹{pkg.price}</span>
                    <span className="text-xs text-brand-textSec font-poppins">/ slot</span>
                  </div>
                  <p className="text-[10px] text-brand-orange font-semibold font-poppins mt-2">{pkg.duration}</p>
                </div>

                {/* Features details list */}
                <ul className="flex flex-col gap-2.5 mb-6">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="text-xs text-brand-textSec flex items-start gap-2 leading-tight">
                      <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                      <span className="font-poppins">{feat}</span>
                    </li>
                  ))}
                </ul>

                <AnimatedButton
                  id={`pkg-select-btn-${pkg.id}`}
                  variant={isSelected ? "primary" : "secondary"}
                  onClick={(e) => { e.stopPropagation(); setSelectedPkg(pkg.id); }}
                  className="w-full text-xs font-semibold py-2.5 shadow-none mt-auto"
                >
                  {isSelected ? "Selected" : "Select Tier"}
                </AnimatedButton>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic add-on up-sells checklists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start border-t border-white/5 pt-10">
          
          {/* Addons Selection checklist (Left columns) */}
          <div className="lg:col-span-2 flex flex-col gap-4 text-left">
            <h3 className="font-bebas text-2xl text-brand-dark dark:text-white tracking-wide font-bold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-brand-orange animate-bounce" /> Upgrade Your Deliverables
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {UPSELL_ADDONS.map((addon) => {
                const checked = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    id={`addon-card-${addon.id}`}
                    onClick={() => handleToggleAddon(addon.id)}
                    className={`cursor-pointer rounded-xl p-4 border flex items-center justify-between gap-4 transition-all duration-300 ${
                      checked
                        ? 'bg-brand-orange/5 border-brand-orange shadow-[0_0_10px_rgba(255,106,0,0.1)]'
                        : 'glass-panel border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white font-poppins">{addon.name}</h4>
                      <p className="text-[10px] text-brand-textSec mt-0.5 font-poppins">{addon.desc}</p>
                    </div>
                    <div className="flex flex-col items-end shrink-0 gap-1.5">
                      <span className="text-sm font-bebas font-bold text-brand-orange tracking-wide">+₹{addon.price}</span>
                      <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center ${
                        checked ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/20'
                      }`}>
                        {checked && <Check className="h-3 w-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Billing checkout widgets (Right column) */}
          <aside className="glass-panel border border-brand-orange/15 rounded-2xl p-6 shadow-glow text-left flex flex-col gap-4">
            <h3 className="font-bebas text-xl text-white tracking-wide font-bold">Estimated Retainer</h3>
            
            <div className="flex flex-col gap-2.5 border-b border-white/5 pb-4 mt-2">
              <div className="flex justify-between text-xs text-brand-textSec">
                <span>{currentPkgObj.name}</span>
                <span className="text-white font-semibold">₹{currentPkgObj.price}</span>
              </div>
              
              {selectedAddons.map(addonId => {
                const addObj = UPSELL_ADDONS.find(a => a.id === addonId);
                return (
                  <div key={addonId} className="flex justify-between text-xs text-brand-textSec">
                    <span>+ {addObj?.name}</span>
                    <span className="text-white font-semibold">₹{addObj?.price}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-baseline pt-2">
              <span className="text-xs font-bold uppercase text-brand-textSec">Grand Total</span>
              <span className="text-2xl font-bebas font-bold text-brand-orange tracking-wide">₹{grandTotal}</span>
            </div>

            <AnimatedButton
              id="packages-book-submit-btn"
              variant="primary"
              onClick={handleBookSelected}
              className="w-full mt-4 h-12"
            >
              Continue to Schedule <ArrowRight className="h-4.5 w-4.5 animate-pulse" />
            </AnimatedButton>
            
            <span className="text-[9px] text-center text-brand-textSec block">
              Bundle parameters can be updated before checkout is finalized.
            </span>
          </aside>
        </div>

      </div>
    </div>
  );
}
