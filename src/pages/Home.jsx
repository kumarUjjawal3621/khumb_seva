import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { homeContent } from '../data/homeContent';

const Home = () => {
  const { language, setLanguage, t } = useAppContext();
  const content = homeContent[language] || homeContent['EN'];

  const heroImages = [
    '/images/hero/image1.jpeg',
    '/images/hero/image2.jpeg',
    '/images/hero/image3.jpeg',
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

  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex((prev) => (prev >= heroImages.length ? 0 : prev));
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date set to 31 October 2026
    const target = new Date('2026-10-31T00:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const { scrollY } = useScroll();
  const countdownRef = useRef(null);
  const countdownInView = useInView(countdownRef, { once: false, amount: 0.3 });
  const [countdownAnimated, setCountdownAnimated] = useState(false);
  useEffect(() => {
    if (countdownInView && !countdownAnimated) {
      setCountdownAnimated(true);
    }
  }, [countdownInView]);
  const bgY = useTransform(scrollY, [0, 500], [0, -100]);

  const parseDate = (dateStr) => {
    const parts = dateStr.split(' ');
    if (parts.length >= 3) {
      return {
        day: parts[0],
        monthYear: parts.slice(1).join(' ')
      };
    }
    return { day: dateStr, monthYear: '' };
  };

  const getBadgeType = (occasion) => {
    if (occasion.toLowerCase().includes('shahi snan') || occasion.includes('शाही स्नान')) {
      return { label: occasion.split('—')[0].trim(), type: 'shahi' };
    }
    return { label: occasion.split('—')[0].trim(), type: 'parvani' };
  };

  return (
    <div className="w-full pb-20" data-lang={language.toLowerCase()}>
      {/* ─── HERO ─── */}
      <div className="relative min-h-screen flex flex-col items-end justify-center px-4 sm:px-10 lg:px-16 overflow-hidden shadow-lg border-b border-[var(--color-golden)]/30 mb-12">
        <div className="absolute inset-0 overflow-hidden select-none pointer-events-none bg-black">
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
          <div className="absolute inset-0 bg-black/35 z-10" />
        </div>

        {/* Desktop logo top-left */}
        <div className="absolute top-2 sm:top-4 left-4 sm:left-10 lg:left-16 z-20 sm:block hidden">
          <a href="/" className="hover:opacity-90 transition-opacity">
            <img src="/images/logo.png" alt="Kumbhparv Logo" className="h-20 sm:h-24 w-auto object-contain drop-shadow-lg brightness-0 invert" />
          </a>
        </div>

        {/* Desktop lang toggle top-right */}
        <div className="absolute top-8 right-4 sm:right-10 lg:right-16 z-20 sm:block hidden">
          <div className="flex items-center gap-2">
            {[
              { code: 'EN', label: 'English' },
              { code: 'HI', label: 'हिन्दी' },
              { code: 'MR', label: 'मराठी' }
            ].map((lang, idx) => (
              <span key={lang.code} className="flex items-center">
                {idx > 0 && <span className="text-white/20 mx-0.5">|</span>}
                <button
                  onClick={() => setLanguage(lang.code)}
                  className={`text-[11px] sm:text-xs font-bold tracking-wide transition-all duration-200 ${
                    language === lang.code
                      ? 'text-white'
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  {lang.label}
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Mobile logo centered */}
        <div className="absolute top-16 left-0 right-0 z-20 flex items-center justify-center sm:hidden">
          <a href="/" className="hover:opacity-90 transition-opacity">
            <img src="/images/logo.png" alt="Kumbhparv Logo" className="h-20 w-auto object-contain drop-shadow-lg brightness-0 invert" />
          </a>
        </div>

        <div className="relative z-10 text-right max-w-lg sm:max-w-2xl -mt-8 sm:-mt-10 mr-4 sm:mr-10 lg:mr-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.15] tracking-wider font-heading drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
          >
            <span className="whitespace-nowrap">{content.heroTitle.split(' ').slice(0, -1).join(' ')}</span>
            <br />
            <span className="text-[var(--color-golden)]">{content.heroTitle.split(' ').pop()}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="mt-4 sm:mt-5 flex items-center gap-2 sm:gap-3 justify-end"
          >
            <span className="h-px w-8 sm:w-12 bg-[var(--color-golden)]/60"></span>
            <span className="text-sm sm:text-lg md:text-xl font-semibold text-[var(--color-vanilla)]/90 tracking-[0.25em] font-sans">
              {content.heroYears}
            </span>
            <span className="h-px w-8 sm:w-12 bg-[var(--color-golden)]/60"></span>
          </motion.div>

          {/* Mobile CTA below years */}
          <div className="sm:hidden mt-5 flex justify-end">
            <Link
              to="/register"
              className="inline-block px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider bg-[var(--color-golden)] text-[var(--color-maroon)] shadow-lg"
            >
              Volunteer Registration
            </Link>
          </div>
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

      <div className="relative">
        <motion.div
          style={{ y: bgY }}
          animate={{ opacity: countdownInView ? 0.04 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0 flex items-start justify-center pointer-events-none select-none mt-16"
        >
          <span className="text-[min(30vw,16rem)] font-bold text-[var(--color-maroon)] leading-none whitespace-nowrap">
            कुम्भपर्व
          </span>
        </motion.div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* ─── COUNTDOWN ─── */}
        <div ref={countdownRef} className="pt-6 pb-0 text-center relative">
        <p className="type-eyebrow text-[var(--color-maroon-dark)] mb-8">
          {content.countdownText}
        </p>
        <div className="flex justify-center items-center gap-3 sm:gap-6">
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={countdownAnimated ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
            className="text-center"
          >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--color-golden)] drop-shadow-lg leading-none tracking-[0.05em]">
              {String(timeLeft.days).padStart(3, '0')}
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--color-maroon)]/60 mt-1.5 font-medium">Days</div>
          </motion.div>
          <motion.span
            initial={{ y: -80, opacity: 0 }}
            animate={countdownAnimated ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl text-[var(--color-golden)]/40 font-light leading-none self-center mt-2 sm:mt-3"
          >:</motion.span>
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={countdownAnimated ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            className="text-center"
          >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--color-golden)] drop-shadow-lg leading-none tracking-[0.05em]">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--color-maroon)]/60 mt-1.5 font-medium">Hours</div>
          </motion.div>
          <motion.span
            initial={{ y: -80, opacity: 0 }}
            animate={countdownAnimated ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl text-[var(--color-golden)]/40 font-light leading-none self-center mt-2 sm:mt-3"
          >:</motion.span>
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={countdownAnimated ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
            className="text-center"
          >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--color-golden)] drop-shadow-lg leading-none tracking-[0.05em]">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--color-maroon)]/60 mt-1.5 font-medium">Minutes</div>
          </motion.div>
          <motion.span
            initial={{ y: -80, opacity: 0 }}
            animate={countdownAnimated ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            className="text-2xl sm:text-3xl lg:text-4xl text-[var(--color-golden)]/40 font-light leading-none self-center mt-2 sm:mt-3"
          >:</motion.span>
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={countdownAnimated ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.35 }}
            className="text-center"
          >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--color-golden)] drop-shadow-lg leading-none tracking-[0.05em]">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--color-maroon)]/60 mt-1.5 font-medium">Seconds</div>
          </motion.div>
        </div>
        </div>
      </div>

      {/* ─── ABOUT SECTION ─── */}
      <section id="about" className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-8 pt-20 sm:pt-28">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-[var(--color-golden)]/40"></span>
            <span className="h-px w-16 bg-gradient-to-r from-[var(--color-golden)]/60 via-[var(--color-golden)] to-[var(--color-golden)]/60"></span>
            <span className="h-px w-8 bg-[var(--color-golden)]/40"></span>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center text-[var(--color-golden)] text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-4"
          >
            {content.intro.sectionLabel || 'The Divine Story'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="text-center text-[var(--color-maroon)] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
          >
            {content.intro.title}
          </motion.h2>
          <div className="max-w-4xl mx-auto mb-10 mt-6 space-y-6">
            {content.intro.paragraphs.flatMap((para, idx) => {
              const triggers = {
                EN: '30 km',
                HI: 'दो पवित्र केंद्रों',
                MR: 'दोन पवित्र स्थळांवर',
              };
              const isDualSection = para.includes(triggers[language] || triggers.EN);
              const pEl = (
                <motion.p
                  key={`p-${idx}`}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.2 }}
                  className="text-[var(--color-text-main)] text-base sm:text-lg leading-[1.9] font-serif tracking-wide text-center"
                >
                  {para}
                </motion.p>
              );
              if (!isDualSection) return [pEl];
              return [
                pEl,
                <div key="dual-section" className="pt-6 pb-2 w-full">
                  <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">

                    {/* Ramkund */}
                    <div className="flex flex-col items-center gap-2 relative z-10 sm:flex-1 sm:max-w-[45%]">
                      <motion.img
                        src="/images/ramakund.png"
                        alt="Ramkund"
                        initial={{ x: -80, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="w-full h-auto object-contain drop-shadow-xl"
                      />
                      <div className="text-center">
                        <p className="text-[var(--color-maroon)] text-sm sm:text-base font-bold tracking-wide">Ramkund, Panchavati</p>
                        <p className="text-[var(--color-maroon)]/60 text-xs sm:text-sm font-medium">Nasik</p>
                      </div>
                    </div>

                    {/* 30 KM connector line + label */}
                    <div className="relative z-20 flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto py-2 sm:px-0">
                      <div className="sm:hidden h-12 w-px border-l-2 border-dotted border-[var(--color-golden)]/50"></div>
                      <div className="hidden sm:block w-8 h-px border-t-2 border-dotted border-[var(--color-golden)]/50"></div>
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3, type: 'spring' }}
                        className="text-[var(--color-golden)] text-sm sm:text-base font-bold tracking-[0.2em] mx-2"
                      >
                        30 KM
                      </motion.span>
                      <div className="hidden sm:block w-8 h-px border-t-2 border-dotted border-[var(--color-golden)]/50"></div>
                      <div className="sm:hidden h-12 w-px border-l-2 border-dotted border-[var(--color-golden)]/50"></div>
                    </div>

                    {/* Kushavarta */}
                    <div className="flex flex-col items-center gap-2 relative z-10 sm:flex-1 sm:max-w-[45%]">
                      <motion.img
                        src="/images/kushvarta.png"
                        alt="Kushavarta"
                        initial={{ x: 80, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="w-full h-auto object-contain drop-shadow-xl"
                      />
                      <div className="text-center">
                        <p className="text-[var(--color-maroon)] text-sm sm:text-base font-bold tracking-wide">Kushavarta, Trimbakeshwar</p>
                        <p className="text-[var(--color-maroon)]/60 text-xs sm:text-sm font-medium">Nasik</p>
                      </div>
                    </div>
                  </div>
                </div>
              ];
            })}
          </div>

          {/* ─── INFO CARDS ─── */}
          <div className="space-y-12 sm:space-y-16">
            {content.infoCards?.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col justify-center"
              >
                <motion.span
                  initial={{ x: 200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 text-[6rem] sm:text-[10rem] font-bold leading-none text-[var(--color-maroon)]/[0.06] select-none pointer-events-none whitespace-nowrap"
                >
                  {['ॐ', 'अमृतस्य', 'मार्गः'][idx]}
                </motion.span>
                <motion.div
                  initial={{ x: -80, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                  className="relative z-10"
                >
                  <h3 className="text-[var(--color-maroon)] text-2xl sm:text-3xl font-bold mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[var(--color-text-main)] text-base sm:text-lg leading-[1.9] font-serif tracking-wide max-w-4xl">
                    {card.desc}
                  </p>
                  {idx === content.infoCards.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="flex justify-end mt-8"
                    >
                      <Link
                        to="/about-nasik"
                        className="group inline-flex items-center gap-2 text-[var(--color-golden)] hover:text-[var(--color-maroon)] text-sm sm:text-base font-semibold tracking-wide transition-colors duration-300"
                      >
                        <span className="border-b-2 border-current pb-0.5">
                          {language === 'HI' ? 'जानें नासिक के बारे में' : language === 'MR' ? 'जाणून घ्या नासिक बद्दल' : 'Know more about Nasik'}
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DATES SECTION ─── */}
      <section id="dates" className="p-8 sm:p-12">
        <p className="type-eyebrow text-[var(--color-golden)] mb-3 drop-shadow-sm">
          {content.snanPatrika.sectionLabel || "Snan Patrika 2027"}
        </p>
        <h2 className="type-section-title text-[var(--color-maroon)] mb-5">
          {content.snanPatrika.title}
        </h2>
        <p className="type-lead text-[var(--color-text-main)] mb-10 max-w-3xl">
          {content.snanPatrika.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.snanPatrika.dates.map((item, idx) => {
            const { day, monthYear } = parseDate(item.date);
            const { label, type } = getBadgeType(item.occasion);
            const isShahi = type === 'shahi';
            
            return (
              <div key={idx} className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow ${isShahi ? 'border-2 border-[var(--color-maroon)]' : 'border border-[var(--color-camel)]/40'}`}>
                <div className={`type-badge inline-block px-3 py-1 rounded-full mb-4 ${isShahi ? 'bg-[var(--color-maroon)] text-[var(--color-vanilla)] shadow-sm' : 'bg-[var(--color-camel)] text-[var(--color-maroon-dark)]'}`}>
                  {label}
                </div>
                <div className="flex gap-4 items-baseline mb-3">
                  <div className="type-date-day text-[var(--color-maroon)]">{day}</div>
                  <div className="type-body-sm font-bold text-[var(--color-camel)] tracking-wide">
                    <div>{monthYear}</div>
                    <div>{item.day}</div>
                  </div>
                </div>
                <div className="type-card-heading text-[var(--color-maroon-dark)] mb-2">{item.tithi}</div>
                <p className="type-body-sm text-[var(--color-text-main)] mb-4">{item.occasion.split('—')[1] ? item.occasion.split('—')[1].trim() : item.occasion}</p>
                <div className="type-badge text-[var(--color-golden)] border-t border-[var(--color-camel)]/20 pt-3">
                  📍 {item.location}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── TRIKHANDI YOG ─── */}
      <section id="trikhandi" className="p-8 sm:p-12 relative overflow-hidden bg-[var(--color-maroon)]/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-golden)] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h2 className="type-section-title text-[var(--color-maroon)] mb-5">
            {content.trikhandiYog.title}
          </h2>
          <div className="space-y-6 mb-8">
            {content.trikhandiYog.paragraphs.slice(0, 3).map((para, idx) => (
              <p key={idx} className="type-lead text-[var(--color-text-main)]">{para}</p>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {content.trikhandiYog.paragraphs.slice(3, 6).map((para, idx) => {
              let title = '';
              let desc = para;
              const colonIdx = para.indexOf(':');
              const dashIdx = para.indexOf(' \u2014 ');
              if (colonIdx !== -1) {
                title = para.substring(0, colonIdx);
                desc = para.substring(colonIdx + 1).trim();
              } else if (dashIdx !== -1) {
                title = para.substring(0, dashIdx);
                desc = para.substring(dashIdx + 3).trim();
              }
              const extraClass = idx === 2 ? 'sm:col-span-2' : '';
              return (
                <div key={idx} className={`${extraClass} bg-white/60 backdrop-blur-sm border border-[var(--color-golden)]/30 p-5 rounded-2xl shadow-sm`}>
                  {title && <h4 className="type-card-heading text-[var(--color-maroon-dark)] mb-2">{title}</h4>}
                  <p className="type-body-sm text-[var(--color-text-main)]">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Home;
