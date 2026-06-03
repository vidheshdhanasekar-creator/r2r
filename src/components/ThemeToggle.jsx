import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className="hidden lg:flex fixed bottom-6 right-6 z-50 h-12 w-12 items-center justify-center rounded-full glass-panel shadow-glow border border-brand-orange/30 text-brand-orange outline-none transition-all hover:scale-110 active:scale-95"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle Theme Mode"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5 text-brand-orange" />
        )}
      </motion.div>
    </motion.button>
  );
}
