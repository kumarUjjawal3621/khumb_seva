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
    <div className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-3xl mt-4 shadow-lg border border-[var(--color-golden)]/30">
      {/* Scrolling Background Banner */}
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
        <div className="animate-scroll-infinite flex h-full">
          {scrollingImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt=""
              className="h-full w-[280px] sm:w-[350px] object-cover flex-shrink-0 opacity-80"
            />
          ))}
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]"></div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white opacity-[0.04] pointer-events-none select-none">ॐ</div>
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center py-12 px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--color-golden)] leading-tight tracking-wide font-serif drop-shadow-lg text-center"
        >
          {hc.heroTitle}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-vanilla)] tracking-widest mt-3 mb-5 font-sans drop-shadow-md text-center"
        >
          {hc.heroYears}
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--color-vanilla)]/95 mb-4 font-serif tracking-wide drop-shadow-sm text-center uppercase"
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
