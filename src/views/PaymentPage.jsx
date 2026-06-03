import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, CreditCard, Landmark, CheckCircle, Info, Ticket, Lock, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CREATORS, PACKAGES, UPSELL_ADDONS } from '../utils/mockData';
import AnimatedButton from '../components/AnimatedButton';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Selected parameters from query params
  const creatorId = searchParams.get('creatorId') || 'c1';
  const pkgId = searchParams.get('pkg') || 'pkg-reels-1';
  const addonsSelected = searchParams.get('addons') ? searchParams.get('addons').split(',') : [];
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '';
  const location = searchParams.get('location') || '';
  const desc = searchParams.get('desc') || '';

  const creator = CREATORS.find(c => c.id === creatorId) || CREATORS[0];
  const pkgObj = PACKAGES.find(p => p.id === pkgId) || PACKAGES[0];

  // Payment states
  const [activeTab, setActiveTab] = useState('card'); // card, upi, netbanking
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponStatus, setCouponStatus] = useState('');
  
  // Card states
  const [cardNo, setCardNo] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [processState, setProcessState] = useState('Connecting gateway...');

  // Coupon check logic
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'CREATOR20' || couponCode.toUpperCase() === 'WELCOME20') {
      setDiscountPercent(20);
      setCouponStatus('success');
    } else {
      setCouponStatus('invalid');
      setDiscountPercent(0);
    }
  };

  const getAddonsTotal = () => {
    return addonsSelected.reduce((acc, addonId) => {
      const addon = UPSELL_ADDONS.find(a => a.id === addonId);
      return acc + (addon ? addon.price : 0);
    }, 0);
  };

  // Math totals
  const subtotal = pkgObj.price + getAddonsTotal();
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const escrowFee = 15; // default transaction platform charge
  const grandTotal = subtotal - discountAmount + escrowFee;

  // Process payment simulation
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const states = [
      'Initiating 256-bit SSL transaction channel...',
      'Conducting secure escrow vault authorizations...',
      'Verifying bank authorization tokens...',
      'Securing calendar slot allocations...',
      'Payment confirmed!'
    ];

    states.forEach((msg, idx) => {
      setTimeout(() => {
        setProcessState(msg);
        if (idx === states.length - 1) {
          // Route to Booking Confirmation view
          setTimeout(() => {
            navigate('/confirmation', {
              state: {
                creatorName: creator.name,
                creatorAvatar: creator.avatar,
                pkgName: pkgObj.name,
                date,
                time,
                location,
                totalPaid: grandTotal
              }
            });
          }, 600);
        }
      }, (idx + 1) * 800);
    });
  };

  return (
    <div className="relative min-h-screen bg-transparent pb-28 lg:pl-76 flex items-center justify-center">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-full max-w-4xl h-[450px] bg-gradient-bg-cinematic opacity-80 pointer-events-none" />

      <div className="px-6 w-full max-w-5xl pt-20 lg:pt-8 relative z-10 flex flex-col lg:flex-row gap-8 text-left items-start">
        
        {/* LEFT COLUMN: Payment options inputs */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6">
          <div>
            <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">
              Secure Escrow Checkout
            </h1>
            <p className="text-xs text-brand-textSec mt-0.5 font-poppins">
              Funds are reserved in escrow and released only after cinematic reel files are approved by you.
            </p>
          </div>

          {/* Payment Tabs selector */}
          <div className="flex border-b border-white/5 pb-px overflow-x-auto no-scrollbar font-poppins">
            {[
              { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
              { id: 'upi', name: 'UPI Gateway', icon: Sparkles },
              { id: 'netbanking', name: 'Net Banking', icon: Landmark }
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`payment-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 pb-3.5 text-xs font-bold uppercase tracking-wider shrink-0 transition-colors ${
                    active ? 'text-brand-orange' : 'text-brand-textSec hover:text-white'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.name}
                  {active && (
                    <motion.div
                      layoutId="paymentTabLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Card Form & 3D card layout */}
          {activeTab === 'card' && (
            <div className="flex flex-col gap-6">
              
              {/* Interactive Card Canvas perspective box */}
              <div className="perspective-1000 flex justify-center py-2 select-none">
                <motion.div
                  className="w-full max-w-sm aspect-[1.58/1] rounded-2xl p-6 bg-gradient-to-br from-zinc-800 via-brand-card to-zinc-900 border border-white/10 text-white flex flex-col justify-between shadow-glow-strong relative overflow-hidden"
                  whileHover={{ rotateY: 10, rotateX: -5, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  {/* Glowing highlights overlay */}
                  <div className="absolute -top-10 -right-10 h-36 w-36 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

                  {/* Row 1: Chip & Logo */}
                  <div className="flex justify-between items-center relative z-10">
                    <div className="h-9 w-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg border border-white/15" />
                    <span className="font-bebas text-2xl tracking-widest text-white">READY<span className="text-brand-orange">2</span>REEL</span>
                  </div>

                  {/* Row 2: Card Number display */}
                  <div className="relative z-10 text-center font-poppins text-lg sm:text-xl tracking-[0.25em] font-medium py-3 text-glow">
                    {cardNo ? cardNo : '•••• •••• •••• ••••'}
                  </div>

                  {/* Row 3: Name & Expiry */}
                  <div className="flex justify-between items-end relative z-10 font-poppins">
                    <div className="flex flex-col text-left">
                      <span className="text-[8px] text-brand-textSec uppercase tracking-widest">Card Holder</span>
                      <span className="text-xs font-bold tracking-wide truncate max-w-[180px]">{cardName ? cardName.toUpperCase() : 'CREATOR CUSTOMER'}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[8px] text-brand-textSec uppercase tracking-widest">Expires</span>
                      <span className="text-xs font-bold tracking-wide">{cardExpiry ? cardExpiry : 'MM/YY'}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Card Inputs Form */}
              <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-4 font-poppins text-left">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="card-number" className="text-[10px] font-bold uppercase tracking-wider text-brand-textSec">Card Number</label>
                  <input
                    id="card-number"
                    type="text"
                    required
                    maxLength={19}
                    placeholder="4111 2222 3333 4444"
                    value={cardNo}
                    onChange={(e) => setCardNo(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                    className="w-full h-11 px-4 rounded-xl glass-panel text-brand-dark dark:text-white border border-white/5 focus:outline-none focus:border-brand-orange/60 transition-all text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="card-name" className="text-[10px] font-bold uppercase tracking-wider text-brand-textSec">Cardholder Name</label>
                  <input
                    id="card-name"
                    type="text"
                    required
                    placeholder="Rajesh Kumar"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl glass-panel text-brand-dark dark:text-white border border-white/5 focus:outline-none focus:border-brand-orange/60 transition-all text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="card-expiry" className="text-[10px] font-bold uppercase tracking-wider text-brand-textSec">Expiry Date</label>
                    <input
                      id="card-expiry"
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.length === 2 && !val.includes('/')) {
                          setCardExpiry(val + '/');
                        } else {
                          setCardExpiry(val);
                        }
                      }}
                      className="w-full h-11 px-4 rounded-xl glass-panel text-brand-dark dark:text-white border border-white/5 focus:outline-none focus:border-brand-orange/60 transition-all text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="card-cvv" className="text-[10px] font-bold uppercase tracking-wider text-brand-textSec">CVV Code</label>
                    <input
                      id="card-cvv"
                      type="password"
                      required
                      maxLength={3}
                      placeholder="•••"
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl glass-panel text-brand-dark dark:text-white border border-white/5 focus:outline-none focus:border-brand-orange/60 transition-all text-xs"
                    />
                  </div>
                </div>

                <AnimatedButton
                  id="card-pay-submit-btn"
                  type="submit"
                  variant="primary"
                  className="w-full h-12 mt-4 shadow-glow font-bold uppercase tracking-wider text-sm"
                >
                  Lock In Escrow Vault - ₹{grandTotal}
                </AnimatedButton>
              </form>
            </div>
          )}

          {activeTab === 'upi' && (
            /* UPI gateway options */
            <div className="flex flex-col gap-5 text-left font-poppins">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-textSec">Select UPI Application</span>
              
              <div className="grid grid-cols-2 gap-3">
                {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map((app) => (
                  <div
                    key={app}
                    id={`upi-choice-${app.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={handlePaymentSubmit}
                    className="cursor-pointer rounded-xl p-4 glass-panel border border-white/5 hover:border-brand-orange/30 hover:bg-brand-orange/5 text-center transition-all flex items-center justify-center gap-2 group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-brand-orange transition-colors">{app}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 my-2 text-brand-textSec">
                <span className="flex-1 h-px bg-white/5" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Or enter UPI ID</span>
                <span className="flex-1 h-px bg-white/5" />
              </div>

              <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-4">
                <input
                  id="upi-id-input"
                  type="text"
                  required
                  placeholder="example@okaxis"
                  className="w-full h-12 px-4 rounded-xl glass-panel text-white border border-white/5 focus:outline-none focus:border-brand-orange/60 transition-all text-xs"
                />
                
                <AnimatedButton
                  id="upi-pay-submit-btn"
                  type="submit"
                  variant="primary"
                  className="w-full h-12 mt-2 shadow-glow"
                >
                  Pay via UPI - ₹{grandTotal}
                </AnimatedButton>
              </form>
            </div>
          )}

          {activeTab === 'netbanking' && (
            <p className="text-xs text-brand-textSec italic text-center py-6">Net Banking connections are currently unavailable.</p>
          )}

          {/* Secure Transaction PCI DSS indications */}
          <div className="flex items-center gap-2.5 bg-black/20 border border-white/5 rounded-xl p-3 justify-center">
            <Lock className="h-4 w-4 text-emerald-400" />
            <span className="text-[10px] text-brand-textSec font-poppins">
              SSL Encrypted Checkout • PCI-DSS Compliant • 3D Secure Authorization
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Booking invoice details & Coupon controls */}
        <aside className="w-full lg:w-2/5 flex flex-col gap-6 text-left">
          
          {/* Coupon inputs card */}
          <div className="glass-panel border-white/5 rounded-2xl p-5 shadow-inner flex flex-col gap-3 font-poppins">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Ticket className="h-4 w-4 text-brand-orange" /> Promo Code
            </h4>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                id="coupon-code-input"
                type="text"
                placeholder="Try: WELCOME20"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 h-10 px-3 rounded-lg glass-panel text-xs text-white border border-white/5 focus:outline-none uppercase"
              />
              <button
                id="apply-coupon-btn"
                type="submit"
                className="h-10 px-4 rounded-lg bg-brand-orange text-white text-xs font-bold hover:bg-brand-accent transition-colors"
              >
                Apply
              </button>
            </form>
            
            {couponStatus === 'success' && (
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" /> Coupon Valid! 20% discount applied.
              </span>
            )}
            {couponStatus === 'invalid' && (
              <span className="text-[10px] text-rose-400 font-bold">Invalid coupon parameter.</span>
            )}
          </div>

          {/* Billing invoice card */}
          <div className="glass-panel border border-brand-orange/15 rounded-3xl p-6 shadow-glow flex flex-col gap-4 font-poppins">
            <h3 className="font-bebas text-2xl text-white tracking-wide font-bold">Billing Review</h3>

            {/* Creator specs */}
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="h-9 w-9 rounded-full overflow-hidden border border-brand-orange/40 shrink-0">
                <img src={creator.avatar} alt={creator.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-none">{creator.name}</h4>
                <span className="text-[10px] text-brand-textSec mt-1 block">{pkgObj.name}</span>
              </div>
            </div>

            {/* Line items invoice */}
            <div className="flex flex-col gap-2.5 border-b border-white/5 pb-4">
              <div className="flex justify-between text-xs text-brand-textSec">
                <span>{pkgObj.name} Base Rate</span>
                <span className="text-white font-semibold">₹{pkgObj.price}</span>
              </div>
              
              {addonsSelected.map(addonId => {
                const add = UPSELL_ADDONS.find(a => a.id === addonId);
                return (
                  <div key={addonId} className="flex justify-between text-xs text-brand-textSec">
                    <span>+ {add?.name}</span>
                    <span className="text-white font-semibold">₹{add?.price}</span>
                  </div>
                );
              })}

              {discountPercent > 0 && (
                <div className="flex justify-between text-xs text-emerald-400 font-bold">
                  <span>Coupon Discount (20%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-xs text-brand-textSec">
                <span>Secure Escrow Protection Fee</span>
                <span className="text-white font-semibold">₹{escrowFee}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-2">
              <span className="text-xs font-bold uppercase text-brand-textSec">Total Escrow Reserve</span>
              <span className="text-2xl font-bebas font-bold text-brand-orange tracking-wide">₹{grandTotal}</span>
            </div>

            {/* Platform details tag */}
            <div className="bg-black/20 rounded-xl p-3 border border-white/5 flex items-start gap-2">
              <Info className="h-4.5 w-4.5 text-brand-orange shrink-0 mt-0.5" />
              <p className="text-[9px] text-brand-textSec leading-normal">
                You will review production editing stages on the My Bookings page. Payment is only released to creator upon final clip delivery authorization.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* FULL-SCREEN PAYMENT PROCESSING OVERLAY */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="h-16 w-16 border-4 border-brand-orange border-t-transparent rounded-full mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />
            <h3 className="font-bebas text-3xl text-white tracking-wider animate-pulse">Securing Transaction</h3>
            <span className="text-xs text-brand-textSec mt-1 font-poppins font-medium">{processState}</span>
            
            <span className="absolute bottom-10 text-[9px] text-brand-textSec uppercase tracking-widest">
              Please do not close this window or tap back
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
