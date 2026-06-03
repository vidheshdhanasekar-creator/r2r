import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Component Imports
import Navbar from './components/Navbar';
import BottomNavigation from './components/BottomNavigation';

// View / Page Imports
import SplashScreen from './views/SplashScreen';
import LocationPermission from './views/LocationPermission';
import HomePage from './views/HomePage';
import DiscoverPage from './views/DiscoverPage';
import CreatorProfilePage from './views/CreatorProfilePage';
import PackagesPage from './views/PackagesPage';
import BookingPage from './views/BookingPage';
import PaymentPage from './views/PaymentPage';
import BookingConfirmationPage from './views/BookingConfirmationPage';
import MyBookingsPage from './views/MyBookingsPage';
import UserProfilePage from './views/UserProfilePage';

export default function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine if navigation bars should be displayed
  const hideNavigationPaths = ['/', '/location'];
  const showNavigation = !hideNavigationPaths.includes(currentPath);

  return (
    <div className="min-h-screen bg-brand-lightBg dark:bg-brand-dark transition-colors duration-500 ease-in-out text-brand-dark dark:text-white">
      {/* Conditionally Render Navigation Panels */}
      {showNavigation && (
        <>
          <Navbar />
          <BottomNavigation />
        </>
      )}

      {/* Pages Container with animation transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/location" element={<LocationPermission />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/creator/:id" element={<CreatorProfilePage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/booking/:creatorId" element={<BookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<BookingConfirmationPage />} />
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
