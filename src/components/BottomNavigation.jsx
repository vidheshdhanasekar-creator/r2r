import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, Calendar, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useTheme();
  
  const clientNavItems = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Discover', path: '/discover', icon: Compass },
    { name: 'Bookings', path: '/bookings', icon: Calendar },
    { name: 'Favorites', path: '/discover?filter=favorites', icon: Heart },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const creatorNavItems = [
    { name: 'Dashboard', path: '/home', icon: Home },
    { name: 'Manage Shoots', path: '/bookings', icon: Calendar },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  const navItems = role === 'creator' ? creatorNavItems : clientNavItems;

  const isActive = (itemPath) => {
    if (itemPath.startsWith('/discover?filter=favorites')) {
      return location.pathname === '/discover' && location.search.includes('favorites');
    }
    if (itemPath === '/discover') {
      return location.pathname === '/discover' && !location.search.includes('favorites');
    }
    return location.pathname === itemPath;
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-45 px-6 lg:hidden flex justify-center pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-around w-full max-w-sm h-16 rounded-full glass-panel px-3 shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-brand-lightBorder/60 dark:border-white/10">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              id={`bottom-nav-${item.name.toLowerCase()}`}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center justify-center w-12 h-14 rounded-full text-brand-textSec transition-colors outline-none focus:outline-none"
            >
              {/* Dynamic Icon Shift Animation */}
              <motion.div
                animate={active ? { y: -5 } : { y: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className={active ? 'text-brand-orange' : 'text-zinc-500 dark:text-brand-textSec'}
              >
                <Icon className="h-5 w-5" />
              </motion.div>

              {/* Dynamic Text Label */}
              <span className={`text-[9px] font-semibold mt-1 tracking-wide transition-all ${
                active 
                  ? 'text-brand-orange opacity-100 scale-100 font-extrabold' 
                  : 'text-zinc-500 dark:text-brand-textSec opacity-70 scale-95'
              }`}>
                {item.name}
              </span>

              {/* Innovative Sliding Glowing Dot Active Indicator */}
              {active && (
                <motion.div
                  layoutId="activeBottomDot"
                  className="absolute bottom-1 h-1 w-4 rounded-full bg-brand-orange shadow-[0_0_8px_#FF6A00]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
