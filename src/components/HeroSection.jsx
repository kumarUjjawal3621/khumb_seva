import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { homeContent } from '../data/homeContent';

const heroImages = [
  '/images/hero/image1.jpeg',
  '/images/hero/image2.jpeg',
  '/images/hero/image3.jpeg',
  '/images/hero/image4.webp',
  '/images/hero/image5.jpeg',
];

const heroTaglines = [
  {
    EN: 'A sacred confluence on the banks of the holy Godavari.',
    HI: 'पावन गोदावरी के तट पर आस्था का दिव्य संगम।',
    MR: 'पवित्र गोदावरीच्या तीरावर श्रद्धेचा दिव्य संगम.',
  },
  {
    EN: 'A divine gathering where faith flows eternally along the sacred waters of the Godavari.',
    HI: 'पावन गोदावरी की पवित्र धाराओं के संग अनंत श्रद्धा का दिव्य संगम।',
    MR: 'पवित्र गोदावरीच्या जलधारांसोबत अखंड श्रद्धेचा दिव्य संगम.',
  },
  {
    EN: 'A timeless celebration of devotion unfolding on the revered banks of the holy Godavari.',
    HI: 'पावन गोदावरी के पूजनीय तटों पर आस्था और भक्ति का शाश्वत उत्सव।',
    MR: 'पवित्र गोदावरीच्या पूजनीय तीरावर श्रद्धा आणि भक्तीचा शाश्वत उत्सव.',
  },
  {
    EN: 'A spiritual confluence of millions, united by faith beside the blessed Godavari River.',
    HI: 'पुण्यदायिनी गोदावरी के तट पर आस्था के सूत्र में बंधे करोड़ों श्रद्धालुओं का आध्यात्मिक संगम।',
    MR: 'पुण्यसलिला गोदावरीच्या तीरावर श्रद्धेच्या बंधनात एकत्र आलेल्या लाखो भाविकांचा आध्यात्मिक संगम.',
  },
  {
    EN: 'A sacred pilgrimage of enlightenment and tradition flourishing along the holy Godavari\'s shores.',
    HI: 'पावन गोदावरी के तटों पर ज्ञान, परंपरा और आध्यात्मिकता की पवित्र यात्रा।',
    MR: 'पवित्र गोदावरीच्या काठावर ज्ञान, परंपरा आणि अध्यात्माची पावन यात्रा.',
  },
];

const HeroSection = () => {
  const { t, language, setLanguage } = useAppContext();
  const hc = homeContent[language] || homeContent['EN'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-end justify-center px-4 sm:px-10 lg:px-16 overflow-hidden shadow-lg border-b border-[var(--color-golden)]/30">
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none bg-black/80">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={heroImages[currentIndex]}
            alt=""
            aria-hidden
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/35"></div>
      </div>

      <div className="absolute top-4 sm:top-6 left-4 sm:left-10 lg:left-16 z-20">
        <a href="/" className="hover:opacity-90 transition-opacity">
          <img src="/images/logo.png" alt="Kumbhparv Logo" className="h-20 sm:h-24 w-auto object-contain drop-shadow-lg brightness-0 invert" />
        </a>
      </div>

      <div className="absolute top-4 sm:top-6 right-4 sm:right-10 lg:right-16 z-20">
        <div className="flex rounded-xl overflow-hidden border border-white/15 bg-black/40 backdrop-blur-md shadow-lg">
          {['EN', 'HI', 'MR'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-200 tracking-wider ${
                language === lang
                  ? 'bg-[var(--color-golden)] text-[var(--color-maroon)] shadow-inner'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-right max-w-lg sm:max-w-2xl -mt-8 sm:-mt-10 mr-4 sm:mr-10 lg:mr-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.15] tracking-wider font-heading drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        >
          <span className="whitespace-nowrap">{hc.heroTitle.split(' ').slice(0, -1).join(' ')}</span>
          <br />
          <span className="text-[var(--color-golden)]">{hc.heroTitle.split(' ').pop()}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="mt-4 sm:mt-5 flex items-center gap-2 sm:gap-3 justify-end"
        >
          <span className="h-px w-8 sm:w-12 bg-[var(--color-golden)]/60"></span>
          <span className="text-sm sm:text-lg md:text-xl font-semibold text-[var(--color-vanilla)]/90 tracking-[0.25em] font-sans">
            {hc.heroYears}
          </span>
          <span className="h-px w-8 sm:w-12 bg-[var(--color-golden)]/60"></span>
        </motion.div>
      </div>

      <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-10 lg:left-16 z-20">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
            className="px-5 py-3 sm:px-6 sm:py-4"
          >
            <span className="text-lg sm:text-xl md:text-2xl text-white/95 leading-snug font-serif italic tracking-wide max-w-sm block">
              {heroTaglines[currentIndex][language] || heroTaglines[currentIndex]['EN']}
            </span>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSection;
