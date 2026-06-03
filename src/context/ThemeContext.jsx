import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_BOOKINGS } from '../utils/mockData';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('r2r-theme');
    if (saved) return saved;
    // Default to dark mode as requested by the Ready2Reel brand guide
    return 'dark';
  });

  const [role, setRole] = useState('client');

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('r2r-bookings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Filter out active bookings to only keep completed/cancelled ones
        return parsed.filter(b => b.status === 'Delivered' || b.status === 'Cancelled');
      } catch (e) {
        console.error("Failed to parse bookings from localStorage", e);
      }
    }
    return MOCK_BOOKINGS;
  });

  const updateBookings = (newBookings) => {
    setBookings(newBookings);
    localStorage.setItem('r2r-bookings', JSON.stringify(newBookings));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('r2r-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme, 
      role, 
      bookings,
      setBookings: updateBookings
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
