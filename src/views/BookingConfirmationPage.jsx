import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Calendar, MapPin, ShieldCheck, Sparkles, ArrowRight, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedButton from '../components/AnimatedButton';

export default function BookingConfirmationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Fallback defaults if accessed directly without transaction states
  const data = state || {
    creatorName: 'Raam',
    creatorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80',
    pkgName: '1 Hour Reel Shoot',
    date: '2026-06-15',
    time: '14:00 - 18:00',
    location: 'Studio 4, Kodambakkam, Chennai',
    totalPaid: 1999
  };

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Generate confetti indices
  const confettiParticles = Array.from({ length: 40 });

  return (
    <div className="relative min-h-screen bg-transparent pb-28 lg:pl-76 flex items-center justify-center overflow-hidden">
      {/* Cinematic radial glows */}
      <div className="absolute inset-0 bg-gradient-bg-cinematic opacity-80 pointer-events-none" />

      {/* Confetti Particle Overlay animation */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {confettiParticles.map((_, i) => {
          const startX = Math.random() * window.innerWidth;
          const endX = startX + (Math.random() - 0.5) * 200;
          const rotate = Math.random() * 360;
          const delay = Math.random() * 1.5;
          const scale = 0.5 + Math.random() * 0.8;
          const colors = ['#FF6A00', '#FF8C1A', '#FF3B00', '#10B981', '#3B82F6', '#FBBF24'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];

          return (
            <motion.div
              key={i}
              className="absolute h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: randomColor, left: startX, top: -10 }}
              initial={{ opacity: 0.8, y: -20, rotate: 0 }}
              animate={{ 
                opacity: 0, 
                y: window.innerHeight + 100, 
                x: endX,
                rotate: rotate + 360 
              }}
              transition={{
                delay,
                duration: 2.5 + Math.random() * 2,
                ease: 'easeOut'
              }}
            />
          );
        })}
      </div>

      <div className="px-6 w-full max-w-lg relative z-10 flex flex-col items-center text-center py-12">
        
        {/* Animated Pop-in Success Badge */}
        <div className="relative flex items-center justify-center h-44 w-44 mb-8">
          {/* Pulsing ring halos */}
          <motion.div
            className="absolute h-36 w-36 rounded-full border border-emerald-500/20 bg-emerald-500/5"
            animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.6, 0.1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute h-28 w-28 rounded-full border border-emerald-500/30 bg-emerald-500/10"
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />

          {/* Success Checkmark Circle */}
          <motion.div
            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_35px_rgba(16,185,129,0.5)] border-2 border-white/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <Check className="h-10 w-10 text-white stroke-[3.5]" />
          </motion.div>
        </div>

        {/* Celebrate Headlines */}
        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.25em] flex items-center gap-1.5 font-poppins">
          <Sparkles className="h-4 w-4 animate-pulse fill-emerald-500 text-emerald-400" /> Booking Slot Confirmed
        </span>
        <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide mt-2">
          Your Cinema Shoot is Locked!
        </h2>
        <p className="text-xs text-brand-textSec max-w-sm mt-2 font-poppins leading-relaxed">
          Order invoice transaction ID: <span className="text-white font-mono uppercase">#R2R-{Math.floor(100000 + Math.random() * 900000)}</span>. Escrow has successfully locked creator availability.
        </p>

        {/* Transaction Summary Card */}
        <div className="w-full glass-panel border-white/5 rounded-2xl p-5 flex flex-col gap-3 text-left mt-8 font-poppins">
          {/* Creator Profile */}
          <div className="flex items-center gap-3 border-b border-white/5 pb-3.5">
            <div className="h-9 w-9 rounded-full overflow-hidden border border-brand-orange/40 shrink-0">
              <img src={data.creatorAvatar} alt={data.creatorName} className="h-full w-full object-cover" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white leading-none">{data.creatorName}</h4>
              <span className="text-[10px] text-brand-textSec mt-1 block">{data.pkgName}</span>
            </div>
          </div>

          {/* Schedule fields */}
          <div className="flex flex-col gap-2.5 text-xs text-brand-textSec border-b border-white/5 pb-3.5">
            <div className="flex items-start gap-2.5">
              <Calendar className="h-4.5 w-4.5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] uppercase tracking-wider block font-bold">Scheduled Production Slot</span>
                <span className="text-white mt-1 block font-medium">{data.date} ({data.time})</span>
              </div>
            </div>
            
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4.5 w-4.5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] uppercase tracking-wider block font-bold">Shooting Location Coordinates</span>
                <span className="text-white mt-1 block font-medium">{data.location}</span>
              </div>
            </div>
          </div>

          {/* Paid recap */}
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-brand-textSec">Total Escrow Reserved</span>
            <span className="text-lg font-bebas font-bold text-brand-orange tracking-wide">₹{data.totalPaid}</span>
          </div>
        </div>

        {/* escrow safeguard check */}
        <div className="flex items-center gap-2.5 mt-4 bg-emerald-500/10 border border-emerald-500/15 rounded-xl p-3.5 text-left text-emerald-400">
          <ShieldCheck className="h-5 w-5 shrink-0" />
          <p className="text-[10px] font-poppins leading-normal">
            Platform guarantee: funds are secured in escrow. If the creator fails to deliver within the target deadline, you get a full refund instantly.
          </p>
        </div>

        {/* Tracking navigation CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-8">
          <AnimatedButton
            id="confirmation-bookings-btn"
            variant="primary"
            onClick={() => navigate('/bookings')}
            className="flex-1 h-12 text-xs uppercase tracking-wider font-bold"
          >
            Track Project Timeline <ArrowRight className="h-4.5 w-4.5 animate-pulse" />
          </AnimatedButton>
          
          <button
            id="confirmation-home-btn"
            onClick={() => navigate('/home')}
            className="flex-1 h-12 rounded-xl border border-white/10 hover:bg-white/5 text-white text-xs font-poppins font-bold transition-all active:scale-95"
          >
            Return Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
