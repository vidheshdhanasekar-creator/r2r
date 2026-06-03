import React from 'react';

export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <>
        {items.map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl bg-brand-card dark:bg-brand-card bg-zinc-200 border border-zinc-300 dark:border-white/5 p-5 flex flex-col gap-4 w-full h-[320px] overflow-hidden"
          >
            {/* Aspect Ratio Block */}
            <div className="bg-zinc-300 dark:bg-zinc-800 rounded-xl h-44 w-full shimmer relative overflow-hidden" />
            
            {/* Title Line */}
            <div className="h-6 bg-zinc-300 dark:bg-zinc-800 rounded-lg w-2/3" />
            
            {/* Paragraph Line */}
            <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded-lg w-full" />
            
            {/* Footer Row */}
            <div className="flex items-center justify-between mt-auto">
              <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded-lg w-1/3" />
              <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded-lg w-1/4" />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'profile') {
    return (
      <div className="animate-pulse w-full max-w-5xl mx-auto flex flex-col gap-8">
        <div className="h-64 bg-zinc-800 dark:bg-zinc-800 bg-zinc-200 rounded-3xl shimmer relative" />
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="h-32 w-32 rounded-full bg-zinc-800 dark:bg-zinc-800 bg-zinc-200 border-4 border-black shrink-0" />
          <div className="flex-1 flex flex-col gap-3 w-full">
            <div className="h-8 bg-zinc-800 dark:bg-zinc-800 bg-zinc-200 rounded w-1/3" />
            <div className="h-4 bg-zinc-800 dark:bg-zinc-800 bg-zinc-200 rounded w-1/2" />
            <div className="h-16 bg-zinc-800 dark:bg-zinc-800 bg-zinc-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
