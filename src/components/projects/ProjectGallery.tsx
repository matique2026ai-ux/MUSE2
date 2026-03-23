'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectGalleryProps {
  images: string[];
  title: string;
  titleLabel: string;
  isRTL: boolean;
}

export default function ProjectGallery({ images, title, titleLabel, isRTL }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Cinematic Parallax & Scale Transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isRTL ? -1000 : 1000) : (isRTL ? 1000 : -1000),
      scale: 1.1,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      scale: 1,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? (isRTL ? -300 : 300) : (isRTL ? 300 : -300), // Slower exit = parallax effect
      scale: 0.95, // Slight shrink
      opacity: 0,
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <section className="bg-[#0A0A0A] pt-24 pb-8 md:pt-32 md:pb-12 w-full overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className={`mb-12 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-[#A67C52]">
              {titleLabel}
            </h2>
            <span className="h-px w-24 bg-[#1a1a1a]" />
          </div>
          
          {/* Subtle Navigation Indicators */}
          <div className="flex items-center gap-4 text-stone-500 font-mono text-sm tracking-[0.2em]">
            <span className="text-white">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-[#333]">/</span>
            <span>{String(images.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Cinematic Full-bleed Container */}
      <div className="relative w-full h-[60vh] md:h-[85vh] bg-[#0A0A0A] group border-y border-[#1a1a1a]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.8 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(isRTL ? -1 : 1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(isRTL ? 1 : -1);
              }
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} - Gallery Image ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              quality={100} // Max quality for cinematic
              priority={currentIndex === 0}
            />
            {/* Museum Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/20" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
          </motion.div>
        </AnimatePresence>

        {/* Premium Invisible Hit Zones for Navigation */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex">
          {/* Left Hit Zone */}
          <div 
            className="w-1/4 h-full pointer-events-auto cursor-pointer flex items-center justify-start group/left"
            onClick={() => paginate(isRTL ? 1 : -1)}
          >
            <div className={`ml-8 md:ml-16 opacity-0 group-hover/left:opacity-100 transition-all duration-500 transform -translate-x-4 group-hover/left:translate-x-0`}>
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d={isRTL ? "M9 18L15 12L9 6" : "M15 18L9 12L15 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Center Spacer */}
          <div className="flex-1 h-full pointer-events-none" />

          {/* Right Hit Zone */}
          <div 
            className="w-1/4 h-full pointer-events-auto cursor-pointer flex items-center justify-end group/right"
            onClick={() => paginate(isRTL ? -1 : 1)}
          >
            <div className={`mr-8 md:mr-16 opacity-0 group-hover/right:opacity-100 transition-all duration-500 transform translate-x-4 group-hover/right:translate-x-0`}>
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d={isRTL ? "M15 18L9 12L15 6" : "M9 18L15 12L9 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 mt-8 md:mt-12">
        {/* Sleek Line Progress Indicators */}
        <div className={`flex gap-2 overflow-x-auto no-scrollbar justify-center items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`relative h-[2px] transition-all duration-700 overflow-hidden ${idx === currentIndex ? 'w-24 bg-white' : 'w-8 bg-[#333] hover:bg-[#555]'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
