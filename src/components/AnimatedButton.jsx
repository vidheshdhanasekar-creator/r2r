import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  id,
}) {
  const baseStyle = "relative overflow-hidden font-poppins font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 px-6 py-3 text-sm tracking-wide";
  
  const variants = {
    primary: "bg-gradient-to-r from-brand-orange to-brand-accent text-white shadow-glow hover:shadow-glow-strong border border-transparent",
    secondary: "glass-panel text-white hover:text-brand-orange border border-white/10 dark:border-white/10 border-black/10 dark:text-white text-brand-dark",
    outline: "border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white shadow-transparent hover:shadow-glow",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/30",
  };

  return (
    <motion.button
      id={id}
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Light glow shimmer effect */}
      <span className="absolute inset-0 z-0 bg-white/10 translate-y-full hover:translate-y-0 transition-transform duration-300"></span>
    </motion.button>
  );
}
