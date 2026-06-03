import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, MapPin, AlignLeft, ShieldCheck, CreditCard, ChevronRight, ChevronLeft, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CREATORS, PACKAGES, UPSELL_ADDONS } from '../utils/mockData';
import AnimatedButton from '../components/AnimatedButton';

export default function BookingPage() {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Selected parameters from query params
  const initialPkgId = searchParams.get('pkg') || 'pkg-reels-1';
  const initialAddons = searchParams.get('addons') ? searchParams.get('addons').split(',') : [];

  // Creator selection
  const creator = CREATORS.find(c => c.id === creatorId) || CREATORS[0];
  const pkgObj = PACKAGES.find(p => p.id === initialPkgId) || PACKAGES[0];

  // Booking form states
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [instructions, setInstructions] = useState('');
  
  // Validation errors
  const [errors, setErrors] = useState({});

  // Helper date lists (next 7 days starting today)
  const generateDates = () => {
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 1; i <= 8; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        dayName: weekdays[d.getDay()],
        dayNum: d.getDate(),
        month: d.toLocaleString('default', { month: 'short' }),
        isoString: d.toISOString().split('T')[0]
      });
    }
    return days;
  };

  const timeSlots = [
    { label: 'Morning Slot', time: '08:00 - 12:00' },
    { label: 'Afternoon Slot', time: '13:00 - 17:00' },
    { label: 'Golden Hour / Evening', time: '17:00 - 21:00' },
    { label: 'Full Production Day', time: '09:00 - 21:00' }
  ];

  const handleNextStep = () => {
    // Basic validation
    let err = {};
    if (step === 1) {
      if (!selectedDate) err.date = 'Select a date';
      if (!selectedTimeSlot) err.time = 'Select a time slot';
    } else if (step === 2) {
      if (!eventLocation.trim()) err.location = 'Provide event shooting location';
    }

    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    setErrors({});
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      // Proceed to fintech checkout
      const selectedAddonsQuery = initialAddons.join(',');
      navigate(`/payment?creatorId=${creator.id}&pkg=${pkgObj.id}&addons=${selectedAddonsQuery}&date=${selectedDate}&time=${selectedTimeSlot}&location=${encodeURIComponent(eventLocation)}&desc=${encodeURIComponent(instructions)}`);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const getAddonsPrice = () => {
    return initialAddons.reduce((acc, addonId) => {
      const addon = UPSELL_ADDONS.find(a => a.id === addonId);
      return acc + (addon ? addon.price : 0);
    }, 0);
  };

  const bookingTotal = pkgObj.price + getAddonsPrice();

  return (
    <div className="relative min-h-screen bg-transparent pb-28 lg:pl-76 flex items-center justify-center">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-full max-w-4xl h-[400px] bg-gradient-bg-cinematic opacity-80 pointer-events-none" />

      <div className="px-6 w-full max-w-3xl pt-20 lg:pt-8 relative z-10 flex flex-col gap-8 text-left">
        
        {/* Stepper Wizard Progress Indicators */}
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto w-full mb-4">
          {[
            { stepNum: 1, label: 'Schedule' },
            { stepNum: 2, label: 'Details' },
            { stepNum: 3, label: 'Review' }
          ].map((st) => (
            <div key={st.stepNum} className="flex items-center gap-2 flex-1 last:flex-none">
              <div className={`h-8 w-8 rounded-full font-bebas text-lg flex items-center justify-center border font-bold transition-all ${
                step >= st.stepNum 
                  ? 'bg-brand-orange border-brand-orange text-white shadow-glow' 
                  : 'glass-panel border-white/10 text-brand-textSec'
              }`}>
                {step > st.stepNum ? <Check className="h-4.5 w-4.5" /> : st.stepNum}
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-widest font-poppins ${
                step >= st.stepNum ? 'text-white' : 'text-brand-textSec'
              }`}>
                {st.label}
              </span>
              {st.stepNum < 3 && <div className={`flex-1 h-0.5 rounded ${step > st.stepNum ? 'bg-brand-orange' : 'bg-zinc-800'}`} />}
            </div>
          ))}
        </div>

        {/* Wizard Main Panel Body */}
        <div className="glass-panel border-white/5 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-glow relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              /* Step 1: Calendar Date Selection */
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <h3 className="font-bebas text-2xl text-white tracking-wide font-bold">Select Date Slot</h3>
                  <p className="text-[10px] text-brand-textSec font-medium mt-0.5">Choose preferred production slot.</p>
                </div>

                {/* Calendar Days horizontal list */}
                <div className="flex gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar select-none">
                  {generateDates().map((date) => {
                    const active = selectedDate === date.isoString;
                    return (
                      <div
                        key={date.isoString}
                        id={`date-card-${date.isoString}`}
                        onClick={() => { setSelectedDate(date.isoString); setErrors({ ...errors, date: null }); }}
                        className={`cursor-pointer rounded-xl p-3 shrink-0 w-16 text-center border flex flex-col gap-1 transition-all ${
                          active
                            ? 'bg-brand-orange border-brand-orange text-white shadow-glow'
                            : 'glass-panel border-white/5 text-brand-textSec hover:border-brand-orange/30'
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider font-poppins">{date.dayName}</span>
                        <span className="text-xl font-bebas font-bold text-white tracking-wide">{date.dayNum}</span>
                        <span className="text-[9px] uppercase tracking-wider font-poppins">{date.month}</span>
                      </div>
                    );
                  })}
                </div>
                {errors.date && <p className="text-rose-500 text-[10px] font-bold font-poppins">{errors.date}</p>}

                {/* Time slot chips selection */}
                <div className="flex flex-col gap-3.5 mt-2">
                  <h4 className="font-bebas text-xl text-white tracking-wide font-bold flex items-center gap-1.5">
                    <Clock className="h-4.5 w-4.5 text-brand-orange" /> Select Production Time
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timeSlots.map((ts) => {
                      const active = selectedTimeSlot === ts.time;
                      return (
                        <div
                          key={ts.time}
                          id={`time-slot-${ts.label.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => { setSelectedTimeSlot(ts.time); setErrors({ ...errors, time: null }); }}
                          className={`cursor-pointer rounded-xl p-4 border flex items-center justify-between transition-all ${
                            active
                              ? 'bg-brand-orange/10 border-brand-orange text-white shadow-[0_0_10px_rgba(255,106,0,0.1)]'
                              : 'glass-panel border-white/5 hover:border-brand-orange/30'
                          }`}
                        >
                          <div className="text-left">
                            <span className={`text-[10px] uppercase font-bold block ${active ? 'text-brand-orange' : 'text-brand-textSec'}`}>{ts.label}</span>
                            <span className="text-xs text-white font-medium block mt-0.5">{ts.time}</span>
                          </div>
                          <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                            active ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/20'
                          }`}>
                            {active && <Check className="h-3 w-3" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.time && <p className="text-rose-500 text-[10px] font-bold font-poppins">{errors.time}</p>}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              /* Step 2: Location Specs Inputs */
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <h3 className="font-bebas text-2xl text-white tracking-wide font-bold">Shooting Location details</h3>
                  <p className="text-[10px] text-brand-textSec font-medium mt-0.5">Please provide exact address coordinates.</p>
                </div>

                {/* Event shooting location */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="booking-location" className="text-[10px] font-bold uppercase tracking-wider text-brand-textSec flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-brand-orange" /> Address
                  </label>
                  <input
                    id="booking-location"
                    type="text"
                    placeholder="Studio, resort, office address details..."
                    value={eventLocation}
                    onChange={(e) => { setEventLocation(e.target.value); setErrors({ ...errors, location: null }); }}
                    className="w-full h-12 px-4 rounded-xl glass-panel text-brand-dark dark:text-white border border-white/5 focus:outline-none focus:border-brand-orange/60 transition-all font-poppins text-xs shadow-inner"
                  />
                  {errors.location && <p className="text-rose-500 text-[10px] font-bold font-poppins">{errors.location}</p>}
                </div>

                {/* Creative directives / special directions */}
                <div className="flex flex-col gap-2 mt-2">
                  <label htmlFor="booking-desc" className="text-[10px] font-bold uppercase tracking-wider text-brand-textSec flex items-center gap-1">
                    <AlignLeft className="h-3.5 w-3.5 text-brand-orange" /> Creative Directions (Optional)
                  </label>
                  <textarea
                    id="booking-desc"
                    placeholder="E.g., Fashion transition guides, dynamic camera movements, raw cuts export, reference reels..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={4}
                    className="w-full p-4 rounded-xl glass-panel text-brand-dark dark:text-white border border-white/5 focus:outline-none focus:border-brand-orange/60 transition-all font-poppins text-xs shadow-inner resize-none"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              /* Step 3: Final Booking Review Summary */
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <h3 className="font-bebas text-2xl text-white tracking-wide font-bold">Review Booking Parameters</h3>
                  <p className="text-[10px] text-brand-textSec font-medium mt-0.5">Please confirm all specifications.</p>
                </div>

                {/* Summary Box */}
                <div className="glass-panel border-white/5 rounded-2xl p-5 flex flex-col gap-4">
                  {/* Creator details summary */}
                  <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-brand-orange/40">
                      <img src={creator.avatar} alt={creator.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-poppins">{creator.name}</h4>
                      <span className="text-[10px] text-brand-textSec font-medium block mt-0.5">{creator.role}</span>
                    </div>
                  </div>

                  {/* Core schedule & package summaries */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-poppins">
                    <div>
                      <span className="text-[9px] text-brand-textSec font-bold uppercase tracking-wider block">Package Tier</span>
                      <span className="text-white font-medium mt-1 block">{pkgObj.name}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-brand-textSec font-bold uppercase tracking-wider block">Production Slot</span>
                      <span className="text-brand-orange font-bold mt-1 block">{selectedDate} ({selectedTimeSlot})</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[9px] text-brand-textSec font-bold uppercase tracking-wider block">Shooting Coordinates</span>
                      <span className="text-white font-medium mt-1 block">{eventLocation}</span>
                    </div>
                    {instructions && (
                      <div className="col-span-2">
                        <span className="text-[9px] text-brand-textSec font-bold uppercase tracking-wider block">Creative Directives</span>
                        <p className="text-white/80 italic mt-1 leading-relaxed">"{instructions}"</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Security checks info */}
                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4">
                  <ShieldCheck className="h-6 w-6 shrink-0" />
                  <div className="text-left font-poppins">
                    <h5 className="text-xs font-bold">Safe Slot Reservation Guarantee</h5>
                    <p className="text-[10px] mt-0.5 text-emerald-400/80">Funds are held in secure escrow. Released only after final cinematic deliverables are sent.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stepper Buttons layout */}
          <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-4">
            <button
              id="booking-prev-step-btn"
              onClick={handlePrevStep}
              className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-brand-textSec hover:text-white transition-all ${
                step === 1 ? 'opacity-0 pointer-events-none' : ''
              }`}
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>

            <div className="flex items-center gap-6">
              {/* Grand price index */}
              <div className="flex flex-col text-right font-poppins">
                <span className="text-[9px] text-brand-textSec font-semibold uppercase tracking-wider">Sub-total</span>
                <span className="text-xl font-bebas font-bold text-white tracking-wide">₹{bookingTotal}</span>
              </div>

              <AnimatedButton
                id="booking-next-step-btn"
                variant="primary"
                onClick={handleNextStep}
                className="px-6 py-2.5 h-11"
              >
                {step === 3 ? (
                  <>
                    Checkout <CreditCard className="h-4 w-4 animate-bounce" />
                  </>
                ) : (
                  <>
                    Continue <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </AnimatedButton>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
