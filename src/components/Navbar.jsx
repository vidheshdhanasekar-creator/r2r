import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, Calendar, Heart, User, Flame, Search, Bell, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, role } = useTheme();

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
    <>
      {/* MOBILE HEADER: STRAIGHT TOP BAR WITH CENTER-GRADIENT ORANGE BOTTOM LINE */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-brand-lightCard/95 dark:bg-brand-card/90 backdrop-blur-md flex items-center justify-between pl-3 pr-5 z-40">
        {/* Left: Brand Logomark */}
        <div 
          onClick={() => navigate('/home')} 
          className="flex items-center cursor-pointer h-14 shrink-0 overflow-visible"
        >
          <Logo className="h-14 w-auto scale-[2.2] origin-left -ml-4" />
        </div>
        
        {/* Right: Quick actions (Search, Profile, Notification) */}
        <div className="flex items-center gap-2.5 shrink-0">


          {/* Mobile Search Button */}
          <button 
            id="mobile-nav-search-btn"
            onClick={() => navigate('/discover')}
            className="h-8 w-8 rounded-full bg-zinc-200/50 dark:bg-zinc-800/40 flex items-center justify-center text-brand-orange active:scale-95 transition-transform cursor-pointer"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Mobile Profile Avatar */}
          <div 
            onClick={() => navigate('/profile')}
            className="h-8 w-8 rounded-full border border-brand-orange/45 overflow-hidden cursor-pointer relative active:scale-95 transition-transform"
          >
            <img 
              src={role === 'creator' ? "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80" : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
            {/* Pulsing online status indicator dot */}
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-white" />
          </div>

          {/* Mobile Notification Button */}
          <button 
            id="mobile-nav-notification-btn"
            onClick={() => navigate('/bookings')}
            className="h-8 w-8 rounded-full bg-zinc-200/50 dark:bg-zinc-800/40 flex items-center justify-center text-brand-orange relative active:scale-95 transition-transform cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange animate-ping" />
          </button>
        </div>

        {/* Bottom Orange line with center gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-orange to-transparent" />
      </header>

      {/* DESKTOP SIDE MENU: FLOATING futuristic CONTROL PANEL */}
      <aside className="hidden lg:flex flex-col fixed left-6 top-6 bottom-6 w-64 bg-brand-lightCard/95 dark:bg-brand-card/90 rounded-3xl border border-brand-lightBorder dark:border-white/10 px-5 py-6 z-30 justify-between shadow-glass">
        <div className="flex flex-col gap-8">
          
          {/* Logo Brand Header */}
          <div 
            onClick={() => navigate('/home')} 
            className="flex flex-col items-center cursor-pointer select-none group border-b border-brand-lightBorder dark:border-white/5 pb-4 w-full"
          >
            <Logo className="h-44 w-44 scale-[1.3] group-hover:scale-[1.35] transition-transform duration-300" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  id={`desktop-nav-${item.name.toLowerCase()}`}
                  onClick={() => navigate(item.path)}
                  className={`relative flex items-center gap-4 w-full px-4 py-3.5 rounded-xl font-medium text-sm transition-all text-left outline-none ${
                    active 
                      ? 'text-brand-orange' 
                      : 'text-brand-textSec hover:text-brand-dark dark:hover:text-white'
                  }`}
                >
                  {/* Sliding Active Indicator capsule */}
                  {active && (
                    <motion.div
                      layoutId="desktopActiveNav"
                      className="absolute inset-0 bg-gradient-to-r from-brand-orange/15 to-brand-orange/5 rounded-xl border-l-3 border-brand-orange shadow-[0_0_12px_rgba(255,106,0,0.1)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}

                  <Icon className={`h-5 w-5 relative z-10 transition-transform ${active ? 'text-brand-orange scale-105' : 'text-brand-textSec'}`} />
                  <span className="relative z-10 font-poppins">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Floating Cockpit Footer (Active status, avatar & settings shortcuts) */}
        <div className="flex flex-col gap-4 border-t border-brand-lightBorder dark:border-white/5 pt-4">
          {/* Creator Active Status */}
          <div className="flex items-center justify-between px-2 text-[10px] font-bold text-zinc-500 dark:text-brand-textSec uppercase tracking-wider font-poppins">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> 12 Editors Online
            </span>
            <span className="text-brand-orange">Go Live</span>
          </div>

          {/* Profile details */}
          <div className="flex items-center justify-between bg-zinc-100/50 dark:bg-zinc-900/30 border border-brand-lightBorder dark:border-white/5 rounded-2xl p-3">
            <div 
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="h-8 w-8 rounded-full border border-brand-orange/40 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                <img 
                  src={role === 'creator' ? "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-brand-dark dark:text-white font-poppins leading-tight truncate max-w-[80px]">
                  {role === 'creator' ? 'Karthik Raja' : 'Raam'}
                </span>
                <span className="text-[8px] text-zinc-500 dark:text-brand-textSec font-poppins truncate max-w-[80px]">
                  {role === 'creator' ? 'Marketplace Creator' : 'Creator Client'}
                </span>
              </div>
            </div>
            

          </div>
        </div>
      </aside>
    </>
  );
}
