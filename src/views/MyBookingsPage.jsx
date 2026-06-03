import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, MessageSquare, ChevronRight, CheckCircle, Info, Send, X, Video, ShieldCheck, Flame, BookOpen, Check, Play, Clock, AlertTriangle, CalendarDays, ChevronLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import AnimatedButton from '../components/AnimatedButton';

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const { role, bookings, setBookings } = useTheme();
  
  const [activeTab, setActiveTab] = useState('active'); // active, completed/completed-shoots, cancelled/proposals
  const [selectedDate, setSelectedDate] = useState(null); // Selected date from calendar
  
  // Chat Overlay State
  const [selectedChatBooking, setSelectedChatBooking] = useState(null);
  const [chatInput, setChatInput] = useState('');

  // Calendar Month State (5 = June 2026, 6 = July 2026)
  const [calendarMonth, setCalendarMonth] = useState(5); 

  // Milestones config
  const milestones = [
    { key: 'Confirmed', label: 'Confirmed' },
    { key: 'Preparation', label: 'Preparation' },
    { key: 'Shooting', label: 'Shooting' },
    { key: 'Editing', label: 'Editing' },
    { key: 'Delivered', label: 'Delivered' }
  ];

  const getMilestoneIndex = (status) => {
    return milestones.findIndex(m => m.key === status);
  };

  // Filtered bookings based on role & active tab
  const getFilteredBookings = () => {
    const creatorId = 'c1'; // Mock creator Karthik Raja
    
    // Filter by role first
    let list = role === 'creator' 
      ? bookings.filter(b => b.creator.id === creatorId)
      : bookings;

    // Filter by calendar selected date if active
    if (selectedDate) {
      list = list.filter(b => b.scheduledDate === selectedDate);
      return list;
    }

    // Filter by tab
    if (role === 'creator') {
      if (activeTab === 'active') {
        return list.filter(b => b.status !== 'Delivered' && b.status !== 'Confirmed' && b.status !== 'Cancelled');
      }
      if (activeTab === 'proposals') {
        return list.filter(b => b.status === 'Confirmed');
      }
      if (activeTab === 'completed') {
        return list.filter(b => b.status === 'Delivered');
      }
    } else {
      if (activeTab === 'active') {
        return list.filter(b => b.status !== 'Delivered' && b.status !== 'Cancelled');
      }
      if (activeTab === 'completed') {
        return list.filter(b => b.status === 'Delivered');
      }
      if (activeTab === 'cancelled') {
        return list.filter(b => b.status === 'Cancelled');
      }
    }
    return list;
  };

  const handleAcceptOffer = (bookingId) => {
    setBookings(bookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'Preparation', progressPercent: 35 };
      }
      return b;
    }));
  };

  const handleDeclineOffer = (bookingId) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
  };

  const handleAdvanceProgress = (bookingId) => {
    setBookings(bookings.map(b => {
      if (b.id === bookingId) {
        let nextStatus = b.status;
        let nextPercent = b.progressPercent;
        if (b.status === 'Confirmed') {
          nextStatus = 'Preparation';
          nextPercent = 35;
        } else if (b.status === 'Preparation') {
          nextStatus = 'Shooting';
          nextPercent = 60;
        } else if (b.status === 'Shooting') {
          nextStatus = 'Editing';
          nextPercent = 85;
        } else if (b.status === 'Editing') {
          nextStatus = 'Delivered';
          nextPercent = 100;
        }
        return { ...b, status: nextStatus, progressPercent: nextPercent };
      }
      return b;
    }));
  };

  // Simulate Sending Chat Message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const senderRole = role === 'creator' ? 'creator' : 'user';
    const recipientRole = role === 'creator' ? 'user' : 'creator';

    const newMessage = {
      sender: senderRole,
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedBookings = bookings.map(b => {
      if (b.id === selectedChatBooking.id) {
        const updatedChat = [...(b.chatHistory || []), newMessage];
        
        // Simulate reply from the other side
        setTimeout(() => {
          const replyMessage = {
            sender: recipientRole,
            text: role === 'creator' 
              ? "Awesome Karthik! Let me know when the first draft editing is ready for review."
              : "Got it! Checking our schedules. I'll share the final frame outline with you shortly.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          setBookings(bookings.map(b2 => 
            b2.id === selectedChatBooking.id 
              ? { ...b2, chatHistory: [...updatedChat, replyMessage] }
              : b2
          ));

          // Also update overlay state if it's still open
          setSelectedChatBooking(prev => {
            if (prev && prev.id === b.id) {
              return { ...prev, chatHistory: [...updatedChat, replyMessage] };
            }
            return prev;
          });
        }, 1500);

        return { ...b, chatHistory: updatedChat };
      }
      return b;
    });

    setBookings(updatedBookings);
    
    // Sync state for open chat modal
    setSelectedChatBooking(prev => ({
      ...prev,
      chatHistory: [...(prev.chatHistory || []), newMessage]
    }));

    setChatInput('');
  };

  // Helper to check if a calendar date has shoots
  const getShootsOnDate = (dateStr) => {
    const creatorId = 'c1';
    const list = role === 'creator' 
      ? bookings.filter(b => b.creator.id === creatorId)
      : bookings;
    return list.filter(b => b.scheduledDate === dateStr);
  };

  // Calendar Day Generator
  const renderCalendarDays = () => {
    const daysInMonth = calendarMonth === 5 ? 30 : 31; // June = 30, July = 31
    const startingDayIdx = calendarMonth === 5 ? 1 : 3; // June 2026 starts on Mon (1), July starts on Wed (3)
    const monthStr = calendarMonth === 5 ? '06' : '07';
    
    const dayElements = [];
    
    // Empty cells for starting day offset
    for (let i = 0; i < startingDayIdx; i++) {
      dayElements.push(<div key={`empty-${i}`} className="h-9 w-9" />);
    }

    // Days grid
    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = String(day).padStart(2, '0');
      const dateKey = `2026-${monthStr}-${dayStr}`;
      const shoots = getShootsOnDate(dateKey);
      const hasShoots = shoots.length > 0;
      const isSelected = selectedDate === dateKey;

      dayElements.push(
        <button
          key={day}
          onClick={() => {
            if (isSelected) {
              setSelectedDate(null); // Toggle filter off
            } else {
              setSelectedDate(dateKey);
            }
          }}
          className={`h-9 w-9 rounded-full flex flex-col items-center justify-center text-xs font-poppins relative transition-all cursor-pointer ${
            isSelected 
              ? 'bg-brand-orange text-white font-extrabold shadow-glow-sm scale-110 z-10' 
              : hasShoots
              ? 'bg-brand-orange/15 text-brand-orange border border-brand-orange/30 font-bold hover:bg-brand-orange/25'
              : 'hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-300'
          }`}
        >
          <span>{day}</span>
          {hasShoots && !isSelected && (
            <span className="absolute bottom-1 h-1 w-1 rounded-full bg-brand-orange animate-pulse" />
          )}
        </button>
      );
    }

    return dayElements;
  };

  return (
    <div className="relative min-h-screen bg-transparent pb-28 lg:pl-76">
      {/* Radial ambient background glows */}
      <div className="absolute top-0 right-0 w-full max-w-4xl h-[450px] bg-gradient-bg-cinematic opacity-80 pointer-events-none" />

      <div className="px-6 md:px-12 pt-20 lg:pt-8 max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6 text-left">
          <div>
            <span className="text-brand-orange text-xs font-bold uppercase tracking-wider font-poppins">
              {role === 'creator' ? 'CREATOR CONTROL' : 'CLIENT DASHBOARD'}
            </span>
            <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide mt-1">
              {role === 'creator' ? 'Production Schedule & Queue' : 'My Shoot Bookings'}
            </h1>
            <p className="text-xs text-brand-textSec mt-0.5 font-poppins">
              {role === 'creator' 
                ? 'Advance project phases, manage incoming shoots, and coordinate frames with clients.'
                : 'Track editing workflows, review storyboards, and chat with locked-in directors.'
              }
            </p>
          </div>

          {/* Quick stats for creator */}
          {role === 'creator' && (
            <div className="flex gap-3 bg-zinc-900/40 border border-white/5 rounded-2xl p-3 shrink-0">
              <div className="text-center px-3 border-r border-white/5">
                <span className="text-[8px] text-brand-textSec uppercase tracking-wider block">Active Queue</span>
                <span className="font-bebas text-xl text-white font-bold block mt-0.5">
                  {bookings.filter(b => b.creator.id === 'c1' && b.status !== 'Delivered' && b.status !== 'Confirmed').length}
                </span>
              </div>
              <div className="text-center px-3 border-r border-white/5">
                <span className="text-[8px] text-brand-textSec uppercase tracking-wider block">Offers</span>
                <span className="font-bebas text-xl text-brand-orange font-bold block mt-0.5">
                  {bookings.filter(b => b.creator.id === 'c1' && b.status === 'Confirmed').length}
                </span>
              </div>
              <div className="text-center px-3">
                <span className="text-[8px] text-brand-textSec uppercase tracking-wider block">Clear Earnings</span>
                <span className="font-bebas text-xl text-emerald-400 font-bold block mt-0.5">₹1.24L</span>
              </div>
            </div>
          )}
        </div>

        {/* 2-COLUMN VIEW FOR CREATOR: CALENDAR SIDEBAR + BOOKINGS LIST */}
        <div className={`grid grid-cols-1 ${role === 'creator' ? 'lg:grid-cols-3' : 'grid-cols-1'} gap-8 items-start`}>
          
          {/* Calendar Widget Column (Only for Creator) */}
          {role === 'creator' && (
            <div className="glass-panel border-white/5 rounded-3xl p-5 flex flex-col gap-4 text-left order-first lg:order-none">
              <div className="flex items-center justify-between">
                <h3 className="font-bebas text-xl text-white tracking-wide font-bold flex items-center gap-1.5">
                  <CalendarDays className="h-4.5 w-4.5 text-brand-orange" /> Shoot Calendar
                </h3>
                
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setCalendarMonth(5)}
                    className={`p-1 rounded hover:bg-zinc-800 ${calendarMonth === 5 ? 'text-brand-orange font-bold' : 'text-zinc-500'}`}
                  >
                    June
                  </button>
                  <span className="text-zinc-700 text-xs">|</span>
                  <button 
                    onClick={() => setCalendarMonth(6)}
                    className={`p-1 rounded hover:bg-zinc-800 ${calendarMonth === 6 ? 'text-brand-orange font-bold' : 'text-zinc-500'}`}
                  >
                    July
                  </button>
                </div>
              </div>

              {/* Day header */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-zinc-500 uppercase font-poppins">
                <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
              </div>

              {/* Grid Days */}
              <div className="grid grid-cols-7 gap-1.5 justify-items-center">
                {renderCalendarDays()}
              </div>

              <div className="h-px bg-white/5 my-1" />

              {/* Calendar Filter Info */}
              <div className="text-[10px] font-poppins text-brand-textSec flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brand-orange" />
                  <span>Dates with orange dots indicate scheduled shoots.</span>
                </div>
                {selectedDate ? (
                  <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-xl p-2.5 mt-1 flex justify-between items-center text-brand-orange font-semibold">
                    <span>Filtering: {selectedDate}</span>
                    <button 
                      onClick={() => setSelectedDate(null)} 
                      className="text-xs hover:text-white font-bold"
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  <span className="italic">Click a date to filter projects below.</span>
                )}
              </div>
            </div>
          )}

          {/* Bookings Queue Column */}
          <div className={`${role === 'creator' ? 'lg:col-span-2' : 'w-full'} flex flex-col gap-6`}>
            
            {/* Tab selector buttons */}
            <div className="flex border-b border-white/5 pb-px overflow-x-auto no-scrollbar font-poppins text-left">
              {role === 'creator' ? (
                // Creator Tabs
                [
                  { id: 'active', name: 'Active queue' },
                  { id: 'proposals', name: 'Shoot Proposals' },
                  { id: 'completed', name: 'Completed Shoots' }
                ].map((tab) => {
                  const active = activeTab === tab.id;
                  const count = tab.id === 'proposals' 
                    ? bookings.filter(b => b.creator.id === 'c1' && b.status === 'Confirmed').length
                    : tab.id === 'active'
                    ? bookings.filter(b => b.creator.id === 'c1' && b.status !== 'Delivered' && b.status !== 'Confirmed').length
                    : bookings.filter(b => b.creator.id === 'c1' && b.status === 'Delivered').length;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setSelectedDate(null); // Reset date filter on tab switch
                      }}
                      className={`relative px-4 pb-3.5 text-xs font-bold uppercase tracking-wider transition-colors outline-none shrink-0 cursor-pointer ${
                        active ? 'text-brand-orange' : 'text-brand-textSec hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {tab.name}
                        {count > 0 && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${active ? 'bg-brand-orange text-white' : 'bg-zinc-800 text-brand-textSec'}`}>
                            {count}
                          </span>
                        )}
                      </span>
                      {active && (
                        <motion.div
                          layoutId="bookingsTabLine"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
                          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        />
                      )}
                    </button>
                  );
                })
              ) : (
                // Client Tabs
                [
                  { id: 'active', name: 'Active Retainers' },
                  { id: 'completed', name: 'Completed Films' },
                  { id: 'cancelled', name: 'Cancelled' }
                ].map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-4 pb-3.5 text-xs font-bold uppercase tracking-wider transition-colors outline-none shrink-0 cursor-pointer ${
                        active ? 'text-brand-orange' : 'text-brand-textSec hover:text-white'
                      }`}
                    >
                      {tab.name}
                      {active && (
                        <motion.div
                          layoutId="bookingsTabLine"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
                          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Bookings Card List */}
            <div className="flex flex-col gap-6">
              {getFilteredBookings().map((booking) => {
                const statusIdx = getMilestoneIndex(booking.status);
                
                // Creator Proposal Card View
                if (role === 'creator' && booking.status === 'Confirmed') {
                  return (
                    <div key={booking.id} className="glass-panel border-white/10 rounded-3xl p-5 space-y-4 relative overflow-hidden text-left shadow-glow-sm">
                      {/* Orange Glow Sweep */}
                      <div className="absolute -top-12 -right-12 h-24 w-24 bg-brand-orange/10 rounded-full blur-xl pointer-events-none" />
                      
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-brand-orange/15 border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
                            <Flame size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-sm font-bold text-white font-poppins">Shoot Offer #{booking.id}</h4>
                              <span className="text-[8px] uppercase tracking-widest bg-zinc-800 text-brand-textSec px-1.5 py-0.5 rounded font-mono font-bold">Proposal</span>
                            </div>
                            <p className="text-[10px] text-brand-textSec font-poppins mt-0.5">{booking.category} • Client: {booking.clientName || 'Raam'}</p>
                          </div>
                        </div>
                        <span className="text-xl font-extrabold text-brand-orange font-poppins shrink-0">₹{booking.totalPrice}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-brand-textSec font-poppins border-t border-white/5 pt-3.5">
                        <p className="flex items-center gap-1.5"><Calendar size={13} className="text-brand-orange shrink-0" /> Date: <strong>{booking.scheduledDate}</strong> ({booking.scheduledTime})</p>
                        <p className="flex items-center gap-1.5"><MapPin size={13} className="text-brand-orange shrink-0" /> Loc: <strong>{booking.location}</strong></p>
                      </div>

                      {booking.addonsSelected && booking.addonsSelected.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 items-center mt-1">
                          <span className="text-[9px] uppercase font-bold text-zinc-500 font-poppins">Add-ons:</span>
                          {booking.addonsSelected.map((addon, i) => (
                            <span key={i} className="text-[9px] font-semibold bg-brand-orange/10 border border-brand-orange/15 text-brand-orange rounded-md px-2 py-0.5 font-poppins">
                              {addon.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2.5 pt-2 border-t border-white/5">
                        <button
                          onClick={() => handleAcceptOffer(booking.id)}
                          className="flex-1 py-3 rounded-xl bg-brand-orange hover:bg-brand-accent text-white text-[10px] font-bold uppercase tracking-wider font-poppins flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-glow-sm"
                        >
                          <Check size={12} /> Accept Shoot Offer
                        </button>
                        <button
                          onClick={() => handleDeclineOffer(booking.id)}
                          className="py-3 px-5 rounded-xl bg-white/5 border border-white/10 text-brand-textSec hover:text-white text-[10px] font-bold uppercase tracking-wider font-poppins cursor-pointer transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  );
                }

                // Regular/Active Card View (Used for both Creator Active/Completed and Client views)
                return (
                  <div
                    key={booking.id}
                    className="glass-panel border-white/5 rounded-3xl p-6 flex flex-col gap-6 shadow text-left relative overflow-hidden"
                  >
                    {/* Header: Client/Creator profile + Date info */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-5">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full overflow-hidden border border-brand-orange/40 shrink-0">
                          <img 
                            src={role === 'creator' 
                              ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" // Show client avatar to creator
                              : booking.creator.avatar // Show creator avatar to client
                            } 
                            alt="Avatar" 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-bebas text-xl sm:text-2xl text-white tracking-wide font-bold">
                              {role === 'creator' ? `Client: ${booking.clientName || 'Raam'}` : booking.creator.name}
                            </h3>
                            <span className="text-[9px] font-mono bg-zinc-800 text-brand-textSec px-2 py-0.5 rounded font-bold uppercase">
                              {booking.id}
                            </span>
                          </div>
                          <p className="text-[10px] text-brand-textSec font-medium font-poppins">{booking.category} • {booking.packageSelected.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 md:text-right w-full md:w-auto justify-between md:justify-end">
                        <div className="flex flex-col font-poppins">
                          <span className="text-[9px] text-brand-textSec uppercase tracking-wider block">Production Date</span>
                          <span className="text-xs text-white font-bold block mt-0.5">{booking.scheduledDate}</span>
                        </div>
                        
                        <div className="flex flex-col font-poppins">
                          <span className="text-[9px] text-brand-textSec uppercase tracking-wider block font-bold">Budget (Escrow)</span>
                          <span className="text-sm font-bebas font-bold text-brand-orange tracking-wide">₹{booking.totalPrice}</span>
                        </div>
                      </div>
                    </div>

                    {/* PRODUCTION MILESTONE PROGRESS TRACKING TIMELINE */}
                    <div className="flex flex-col gap-3 font-poppins">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold text-brand-textSec">Production Phase</span>
                        <span className="text-[10px] font-bold text-brand-orange">{booking.progressPercent}% Complete</span>
                      </div>
                      
                      {/* Milestones horizontal bar layout */}
                      <div className="relative flex items-center justify-between mt-3 px-1">
                        {/* Background Progress bar line */}
                        <div className="absolute left-2.5 right-2.5 h-0.5 bg-zinc-800 z-0 top-3">
                          <div
                            className="h-full bg-brand-orange transition-all duration-500 rounded"
                            style={{ width: `${(statusIdx / (milestones.length - 1)) * 100}%` }}
                          />
                        </div>

                        {milestones.map((m, idx) => {
                          const completed = idx <= statusIdx;
                          const active = idx === statusIdx;
                          return (
                            <div key={m.key} className="flex flex-col items-center z-10 select-none">
                              <div className={`h-6.5 w-6.5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                                active
                                  ? 'bg-brand-orange border-brand-orange text-white shadow-glow-sm'
                                  : completed
                                  ? 'bg-brand-orange/20 border-brand-orange text-brand-orange'
                                  : 'bg-brand-card border-zinc-700 text-zinc-500'
                              }`}>
                                <span className="text-[9px] font-bebas font-bold">{idx + 1}</span>
                              </div>
                              <span className={`text-[8px] sm:text-[9px] font-bold mt-1.5 uppercase tracking-wider ${
                                active ? 'text-brand-orange font-extrabold' : completed ? 'text-white/80' : 'text-zinc-500'
                              }`}>
                                {m.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Lower block: actions & metadata coordinates */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-5 border-t border-white/5 mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-brand-textSec font-poppins">
                        <MapPin className="h-4 w-4 text-brand-orange shrink-0" />
                        <span className="truncate max-w-xs">{booking.location}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Advance Phase Button (Only for Creator, on Active projects) */}
                        {role === 'creator' && booking.status !== 'Delivered' && (
                          <button
                            onClick={() => handleAdvanceProgress(booking.id)}
                            className="h-10 px-4 rounded-xl bg-brand-orange/20 hover:bg-brand-orange border border-brand-orange/30 text-brand-orange hover:text-white text-xs font-poppins font-bold transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                          >
                            <ArrowRight className="h-3.5 w-3.5" /> Advance Phase
                          </button>
                        )}

                        {/* Completed Status Badge */}
                        {booking.status === 'Delivered' && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl font-bold uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle size={13} /> Complete & Settled
                          </span>
                        )}

                        {role === 'client' && (
                          <div className="relative group/guide">
                            <button
                              id={`prep-guide-btn-${booking.id}`}
                              className="h-10 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-white text-xs font-poppins font-bold transition-all active:scale-95 flex items-center gap-1.5"
                            >
                              <BookOpen className="h-4 w-4 text-brand-orange" /> Prep Guide
                            </button>
                            
                            <div className="absolute bottom-12 left-0 sm:left-auto sm:right-0 z-20 w-64 glass-panel border border-brand-orange/15 rounded-xl p-4 shadow-glow opacity-0 pointer-events-none group-hover/guide:opacity-100 group-hover/guide:pointer-events-auto transition-opacity duration-300 text-left font-poppins">
                              <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1">
                                <Flame className="h-3.5 w-3.5 fill-brand-orange" /> Streetwear Shoot Checklist
                              </h4>
                              <ul className="flex flex-col gap-1.5 mt-2.5 text-[10px] text-brand-textSec">
                                <li className="flex items-start gap-1"><span className="text-brand-orange shrink-0 mt-0.5">•</span> Carry 3 diverse outfits (oversized jackets work best)</li>
                                <li className="flex items-start gap-1"><span className="text-brand-orange shrink-0 mt-0.5">•</span> Select 2 high-contrast neon/outdoor street background slots</li>
                                <li className="flex items-start gap-1"><span className="text-brand-orange shrink-0 mt-0.5">•</span> Synchronize audio transitions list with creator in chat</li>
                              </ul>
                            </div>
                          </div>
                        )}

                        <AnimatedButton
                          id={`chat-creator-btn-${booking.id}`}
                          variant="secondary"
                          onClick={() => setSelectedChatBooking(booking)}
                          className="h-10 text-xs px-4 border border-white/10"
                        >
                          <MessageSquare className="h-4 w-4 text-brand-orange" /> Chat {role === 'creator' ? 'Client' : 'Creator'}
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                );
              })}

              {getFilteredBookings().length === 0 && (
                <div className="glass-panel border-white/5 rounded-2xl p-12 text-center flex flex-col items-center gap-3">
                  <AlertTriangle className="h-11 w-11 text-brand-orange animate-pulse" />
                  <h3 className="font-bebas text-2xl text-white">No Shoots Listed</h3>
                  <p className="text-xs text-brand-textSec font-poppins">
                    {selectedDate 
                      ? `No shoots scheduled on ${selectedDate}.` 
                      : 'You don\'t have any bookings registered under this filter.'
                    }
                  </p>
                  {selectedDate && (
                    <button 
                      onClick={() => setSelectedDate(null)} 
                      className="px-4 py-2 mt-2 rounded-xl bg-brand-orange/20 border border-brand-orange/30 text-brand-orange font-bold uppercase tracking-wider text-[10px] font-poppins hover:bg-brand-orange hover:text-white transition-all cursor-pointer"
                    >
                      Show All Dates
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* CHAT MESSENGER SIMULATION DIALOG OVERLAY DRAWER */}
      <AnimatePresence>
        {selectedChatBooking && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md h-full bg-brand-dark border-l border-white/5 p-5 flex flex-col justify-between"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-3 text-left">
                  <div className="h-9 w-9 rounded-full overflow-hidden border border-brand-orange/40">
                    <img 
                      src={role === 'creator' 
                        ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
                        : selectedChatBooking.creator.avatar
                      } 
                      alt="Profile" 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-none font-poppins">
                      {role === 'creator' ? `Client: ${selectedChatBooking.clientName || 'Raam'}` : selectedChatBooking.creator.name}
                    </h4>
                    <span className="text-[9px] text-emerald-400 font-semibold block mt-1">Online • Chat Safeguarded</span>
                  </div>
                </div>
                
                <button
                  id="close-chat-btn"
                  onClick={() => setSelectedChatBooking(null)}
                  className="text-brand-textSec hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Chat Messages scroll area */}
              <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-3.5 pr-1 font-poppins select-text">
                {(selectedChatBooking.chatHistory || []).map((msg, idx) => {
                  // Message layout changes based on role:
                  // For creator: messages sent by 'creator' are on the right, 'user' on the left.
                  // For client: messages sent by 'user' are on the right, 'creator' on the left.
                  const isSentByMe = (role === 'creator' && msg.sender === 'creator') || (role === 'client' && msg.sender === 'user');
                  
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-[80%] ${isSentByMe ? 'self-end items-end' : 'self-start items-start'}`}
                    >
                      <div className={`p-3 rounded-2xl text-xs leading-normal text-left ${
                        isSentByMe 
                          ? 'bg-brand-orange text-white rounded-br-none shadow-[0_0_8px_rgba(255,106,0,0.15)]' 
                          : 'bg-brand-card border border-white/5 text-white rounded-bl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-brand-textSec mt-1 px-1">{msg.time}</span>
                    </div>
                  );
                })}

                {(selectedChatBooking.chatHistory || []).length === 0 && (
                  <p className="text-[10px] text-brand-textSec italic text-center my-auto">
                    Initiate chat! Send outfit preferences or schedule timing updates below.
                  </p>
                )}
              </div>

              {/* Chat Message Inputs form */}
              <form onSubmit={handleSendMessage} className="relative flex gap-2 border-t border-white/5 pt-4 mt-auto font-poppins">
                <input
                  id="chat-text-input"
                  type="text"
                  placeholder="Send creative coordinates..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 h-11 px-4 rounded-xl glass-panel text-xs text-white border border-white/5 focus:outline-none focus:border-brand-orange/60"
                />
                
                <button
                  id="send-chat-message-btn"
                  type="submit"
                  className="h-11 w-11 rounded-xl bg-brand-orange text-white flex items-center justify-center shadow-glow active:scale-95 transition-transform"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
