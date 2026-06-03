import React from 'react';

export default function Logo({ className = "h-12 w-12" }) {
  return (
    <img 
      src="/logo.png" 
      className={`object-contain select-none pointer-events-none ${className}`} 
      alt="Ready2Reel Logo" 
      loading="eager"
    />
  );
}
