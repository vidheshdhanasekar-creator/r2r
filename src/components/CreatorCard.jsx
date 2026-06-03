import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CreatorCard({ creator }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play/Pause portfolio video on hover
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {}); // catch autoplay blocks
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Get primary portfolio video
  const previewVideo = creator.portfolio?.[0] || {
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-40019-large.mp4',
    thumbnail: creator.coverImage
  };

  return (
    <motion.div
      onClick={() => navigate(`/creator/${creator.id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-brand-lightBorder dark:border-white/5 bg-brand-lightCard dark:bg-brand-card transition-all shadow-md hover:shadow-glow hover:border-brand-orange/30 flex flex-col h-full"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Portfolio Video / Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
        {/* Cover Image */}
        <img
          src={previewVideo.thumbnail || creator.coverImage}
          alt={creator.name}
          className={`h-full w-full object-cover transition-opacity duration-500 absolute inset-0 z-10 ${
            isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Dynamic Video Element */}
        <video
          ref={videoRef}
          src={previewVideo.videoUrl}
          loop
          muted
          playsInline
          className="h-full w-full object-cover absolute inset-0 z-0"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-15 pointer-events-none" />

        {/* Floating Badge (e.g. Super Creator) */}
        {creator.badge && (
          <span className="absolute top-3 left-3 z-20 flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-brand-orange text-white shadow-md border border-white/10">
            <Zap className="h-3 w-3 animate-pulse" /> {creator.badge}
          </span>
        )}

        {/* Floating Price */}
        <div className="absolute bottom-3 right-3 z-20 flex flex-col items-end pointer-events-none keep-colors">
          <span className="text-[10px] font-medium text-zinc-400 dark:text-brand-textSec uppercase tracking-wider">Starts at</span>
          <span className="text-lg font-bebas font-bold text-white tracking-wide">₹{creator.startingPrice}</span>
        </div>

        {/* Visual Live Play indicator when hovered */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/10 pointer-events-none">
            <span className="rounded-full bg-brand-orange/95 px-3 py-1 text-[10px] font-bold text-white tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,106,0,0.5)]">
              <span className="h-2 w-2 rounded-full bg-white animate-ping" /> Previewing
            </span>
          </div>
        )}
      </div>

      {/* Creator Details */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          {/* Row 1: Name and Availability */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bebas text-2xl text-brand-dark dark:text-white tracking-wide font-bold group-hover:text-brand-orange transition-colors">
              {creator.name}
            </h3>
            
            {creator.isAvailable ? (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 dark:text-emerald-400 text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                Busy
              </span>
            )}
          </div>

          {/* Row 2: Role / Sub-title */}
          <p className="text-xs text-zinc-500 dark:text-brand-textSec mt-1 font-poppins font-medium">
            {creator.role}
          </p>

          {/* Row 3: Skills / Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {creator.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium text-zinc-600 dark:text-brand-textSec bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 px-2 py-0.5 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Rating, Location & CTA */}
        <div className="pt-3 border-t border-brand-lightBorder dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-4.5 w-4.5 fill-brand-orange text-brand-orange" />
              <span className="text-xs font-bold text-brand-dark dark:text-white">{creator.rating}</span>
              <span className="text-[10px] text-zinc-400 dark:text-brand-textSec">({creator.reviewCount})</span>
            </div>
            
            {/* Location */}
            <div className="flex items-center gap-0.5 text-zinc-500 dark:text-brand-textSec">
              <MapPin className="h-3.5 w-3.5 text-brand-orange" />
              <span className="text-[11px] font-medium">{creator.location}</span>
            </div>
          </div>

          <span className="text-[11px] font-bold text-brand-orange group-hover:underline flex items-center gap-0.5">
            Book <Zap className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
