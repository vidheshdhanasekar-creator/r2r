import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Sparkles, Sliders, Play } from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';
import Logo from '../components/Logo';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Set timeout to dismiss logo splash and enter onboarding
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const onboardingSlides = [
    {
      title: "Discover Elite Cinematic Creators",
      subtitle: "REEL MAKERS. WEDDING FILMMAKERS. BRAND EDITORS.",
      desc: "Connect directly with certified creators who turn raw footage into cinematic stories. Filter by gear, ratings, and turnaround speeds.",
      icon: Play,
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Seamless High-End Collaboration",
      subtitle: "TRANSPARENT PRICING. STANDARD WORKFLOWS.",
      desc: "No back-and-forth negotiations. Choose pre-configured packages, select production slots, and track edits in real-time.",
      icon: Sliders,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Ready to Reel Your Audience?",
      subtitle: "4K DELIVERY. DOLBY MASTERING. VIRAL PACING.",
      desc: "Elevate your business, social campaigns, or wedding records to premium levels. Lock in your slot with secure payment interfaces.",
      icon: Sparkles,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80",
    }
  ];

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      // Proceed to Location Permission screen
      navigate('/location');
    }
  };

  // Generate particle explosion indices
  const particles = Array.from({ length: 24 });

  return (
    <div className="relative min-h-screen w-full bg-transparent overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        {showSplash ? (
          /* Cinematic Splash Screen */
          <motion.div
            key="splash"
            className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50 px-6 text-center"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-gradient-bg-cinematic opacity-80" />

            {/* Particle Burst Container */}
            <div className="absolute relative flex items-center justify-center">
              {particles.map((_, i) => {
                const angle = (i * 360) / particles.length;
                const distance = 100 + Math.random() * 70;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * distance;
                const y = Math.sin(rad) * distance;

                return (
                  <motion.div
                    key={i}
                    className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-accent"
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0.8 }}
                    animate={{ 
                      scale: [0, 1.2, 0.4], 
                      x, 
                      y, 
                      opacity: [0.8, 1, 0] 
                    }}
                    transition={{
                      delay: 1.2,
                      duration: 1.8,
                      ease: [0.1, 0.8, 0.25, 1],
                      repeat: Infinity,
                      repeatDelay: 1.5
                    }}
                  />
                );
              })}

              {/* Central Logo */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0, filter: 'blur(10px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative z-10 flex h-80 w-80 items-center justify-center rounded-3xl"
              >
                <Logo className="h-72 w-72 scale-125 animate-pulse" />
                
                {/* Logo Halo Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-brand-orange/30 scale-90"
                  animate={{ scale: [0.8, 1.15, 0.8], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>

            {/* Glowing bottom indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-10 text-[10px] uppercase tracking-widest text-brand-textSec font-medium"
            >
              Loading Cinematic Experience...
            </motion.div>
          </motion.div>
        ) : (
          /* Modern Onboarding Experience */
          <motion.div
            key="onboarding"
            className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 max-w-6xl mx-auto w-full z-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
          >
            {/* Top Row: Skip */}
            <div className="flex items-center justify-between w-full h-20">
              <div className="h-20 w-44 overflow-hidden">
                <Logo className="h-24 w-24 -ml-3" />
              </div>
              <button
                id="skip-onboarding-btn"
                onClick={() => navigate('/location')}
                className="text-xs uppercase tracking-widest text-brand-textSec hover:text-brand-orange transition-colors font-semibold"
              >
                Skip
              </button>
            </div>

            {/* Slides Content with Parallax Visual Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center my-auto">
              {/* Left Column: Parallax Illustration card */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-glow-strong">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={onboardingSlides[currentSlide].image}
                      alt={onboardingSlides[currentSlide].title}
                      className="w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
                  </motion.div>
                </AnimatePresence>
                
                {/* Floating Micro-badge inside card */}
                <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 px-3.5 py-2">
                  <div className="h-7 w-7 rounded-lg bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                    {React.createElement(onboardingSlides[currentSlide].icon, { className: 'h-4 w-4' })}
                  </div>
                  <div>
                    <div className="text-[10px] text-brand-textSec font-bold uppercase tracking-wider">FEATURED CLIP</div>
                    <div className="text-xs text-white font-bold tracking-wide">Cinematic Mastery</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Descriptions & Details */}
              <div className="flex flex-col justify-center text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-4"
                  >
                    <span className="text-xs font-bold text-brand-orange tracking-[0.25em] uppercase font-poppins">
                      {onboardingSlides[currentSlide].subtitle}
                    </span>
                    
                    <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white leading-none tracking-wide">
                      {onboardingSlides[currentSlide].title}
                    </h2>
                    
                    <p className="text-sm sm:text-base text-zinc-400 dark:text-brand-textSec max-w-lg mt-2 font-poppins leading-relaxed">
                      {onboardingSlides[currentSlide].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Indicators and Nav triggers */}
                <div className="flex items-center gap-6 mt-10">
                  {/* Indicator Chips */}
                  <div className="flex gap-2">
                    {onboardingSlides.map((_, index) => (
                      <span
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                          currentSlide === index ? 'w-8 bg-brand-orange' : 'w-2 bg-white/20'
                        }`}
                      />
                    ))}
                  </div>

                  {/* CTA Next Button */}
                  <AnimatedButton
                    id="onboarding-next-btn"
                    onClick={handleNext}
                    className="px-6 py-3 shrink-0"
                  >
                    {currentSlide === onboardingSlides.length - 1 ? "Let's Go" : "Next"} 
                    <ArrowRight className="h-4.5 w-4.5 animate-pulse" />
                  </AnimatedButton>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="w-full flex items-center justify-between text-[11px] text-brand-textSec border-t border-white/5 pt-4">
              <span>Ready2Reel iOS / Web v1.0</span>
              <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-brand-orange fill-brand-orange" /> Built for creators</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
