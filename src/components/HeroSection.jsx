import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { homeContent } from '../data/homeContent';

const heroImages = [
  '/images/hero/Kumbh Certificate.png',
  '/images/hero/Kumbh Certificate (1).png',
  '/images/hero/Kumbh Certificate (2).png',
  '/images/hero/Kumbh Certificate (3).png',
  '/images/hero/Kumbh Certificate (4).png',
  '/images/hero/Kumbh Certificate (5).png',
  '/images/hero/Kumbh Certificate (6).png',
  '/images/hero/Kumbh Certificate (7).png',
  '/images/hero/Kumbh Certificate (8).png'
];

const scrollingImages = [...heroImages, ...heroImages];

const HeroSection = () => {
  const { t, language } = useAppContext();
  const hc = homeContent[language] || homeContent['EN'];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden shadow-lg border-b border-[var(--color-golden)]/30">
      {/* Scrolling Background Banner */}
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none bg-black/80">
        <div className="animate-scroll-infinite flex h-full items-center">
          {scrollingImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt=""
              className="h-full w-auto object-cover flex-shrink-0 mx-2 opacity-90 transition-all duration-300"
            />
          ))}
        </div>
        {/* Softer Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/45 backdrop-blur-[0.5px]"></div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white opacity-[0.04] pointer-events-none select-none">ॐ</div>
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center py-16 px-4 sm:px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--color-golden)] leading-tight tracking-wide font-serif drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] mb-4"
        >
          {hc.heroTitle}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-vanilla)] tracking-widest mb-6 font-sans drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]"
        >
          {hc.heroYears}
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl italic text-[var(--color-vanilla)]/95 mb-10 max-w-2xl font-serif drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] leading-relaxed"
        >
          {hc.heroSubtitle}
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-sm sm:text-base md:text-lg font-bold text-[var(--color-vanilla)]/95 mb-6 font-serif tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] uppercase"
        >
          {t.labels.volunteerRegistration}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-golden)] to-transparent"
        ></motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
