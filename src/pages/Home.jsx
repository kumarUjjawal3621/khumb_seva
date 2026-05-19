import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { homeContent } from '../data/homeContent';

const Home = () => {
  const { language } = useAppContext();
  const content = homeContent[language] || homeContent['EN'];

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date('2027-08-02T05:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) return;

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
    <div className="w-full space-y-12 pb-20">
      {/* ─── HERO ─── */}
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-3xl mt-4 bg-[var(--color-camel)] shadow-lg border border-[var(--color-golden)]/30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-maroon)]/40 pointer-events-none mix-blend-multiply"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-[var(--color-maroon)] opacity-10 pointer-events-none animate-pulse">ॐ</div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[var(--color-maroon-dark)] mb-6 uppercase"
          >
            ॥ हर हर गंगे · जय गोदावरी · हर हर महादेव ॥
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-[var(--color-maroon)] mb-4 leading-tight tracking-wide font-serif"
          >
            {content.heroTitle}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl italic text-[var(--color-maroon-dark)]/90 mb-8 font-serif"
          >
            {content.heroSubtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-golden)] to-transparent mb-8"
          ></motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-[var(--color-maroon-dark)]/80 max-w-2xl leading-relaxed mb-10 font-medium"
          >
            {content.intro.paragraphs[0]}
          </motion.p>
          
          <Link 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            to="/register" 
            className="primary-gradient px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] transition-all border border-[var(--color-golden)]/50"
          >
            Volunteer Registration
          </Link>
        </div>
      </div>

      {/* ─── COUNTDOWN ─── */}
      <div className="glass-card py-8 px-4 rounded-2xl shadow-sm text-center border-t-4 border-[var(--color-maroon)]">
        <div className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-maroon-dark)] mb-4">
          {content.countdownText}
        </div>
        <div className="flex justify-center items-center gap-4 sm:gap-8 flex-wrap">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-[var(--color-maroon)] leading-none font-serif">{String(timeLeft.days).padStart(3, '0')}</div>
            <div className="text-[10px] tracking-widest uppercase text-[var(--color-maroon)]/60 mt-2 font-bold">Days</div>
          </div>
          <div className="text-3xl text-[var(--color-golden)] font-bold mb-5">:</div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-[var(--color-maroon)] leading-none font-serif">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-[10px] tracking-widest uppercase text-[var(--color-maroon)]/60 mt-2 font-bold">Hours</div>
          </div>
          <div className="text-3xl text-[var(--color-golden)] font-bold mb-5">:</div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-[var(--color-maroon)] leading-none font-serif">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-[10px] tracking-widest uppercase text-[var(--color-maroon)]/60 mt-2 font-bold">Minutes</div>
          </div>
          <div className="text-3xl text-[var(--color-golden)] font-bold mb-5">:</div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-[var(--color-maroon)] leading-none font-serif">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-[10px] tracking-widest uppercase text-[var(--color-maroon)]/60 mt-2 font-bold">Seconds</div>
          </div>
        </div>
      </div>

      {/* ─── ABOUT SECTION ─── */}
      <section id="about" className="glass-card rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] text-[var(--color-golden)] uppercase mb-3 drop-shadow-sm">The Divine Story</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-maroon)] mb-5 leading-tight font-serif">{content.intro.title}</h2>
            <div className="w-20 h-1 bg-[var(--color-golden)] mb-8 rounded-full"></div>
            
            <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
              {content.intro.paragraphs.slice(1, 4).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-5">
            {content.infoCards?.map((card, idx) => (
              <div key={idx} className="border-l-4 border-[var(--color-maroon)] p-5 bg-[var(--color-camel)]/10 rounded-r-xl border-y border-r border-[var(--color-camel)]/30 shadow-sm">
                <h4 className="text-sm font-bold tracking-wider text-[var(--color-maroon)] mb-2 uppercase">{card.title}</h4>
                <p className="text-[var(--color-text-main)] text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DATES SECTION ─── */}
      <section id="dates" className="glass-card rounded-3xl p-8 sm:p-12 shadow-sm bg-white/40">
        <div className="text-[11px] font-bold tracking-[0.2em] text-[var(--color-golden)] uppercase mb-3 drop-shadow-sm">Snan Patrika 2027</div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-maroon)] mb-5 leading-tight font-serif">{content.snanPatrika.title.split('—')[0]}</h2>
        <div className="w-20 h-1 bg-[var(--color-golden)] mb-8 rounded-full"></div>
        <p className="text-gray-700 text-lg mb-10 max-w-3xl leading-relaxed">
          The Shahi Snans are the most sacred bathing processions, led by the Akhadas in full ceremonial grandeur. Bathing on these dates during the prescribed Muhurta is considered supremely auspicious — a once-in-twelve-years opportunity for liberation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.snanPatrika.dates.map((item, idx) => {
            const { day, monthYear } = parseDate(item.date);
            const { label, type } = getBadgeType(item.occasion);
            const isShahi = type === 'shahi';
            
            return (
              <div key={idx} className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow ${isShahi ? 'border-2 border-[var(--color-maroon)]' : 'border border-[var(--color-camel)]/40'}`}>
                <div className={`inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 ${isShahi ? 'bg-[var(--color-maroon)] text-[var(--color-vanilla)] shadow-sm' : 'bg-[var(--color-camel)] text-[var(--color-maroon-dark)]'}`}>
                  {label}
                </div>
                <div className="flex gap-4 items-baseline mb-3">
                  <div className="text-4xl sm:text-5xl font-bold text-[var(--color-maroon)] leading-none font-serif">{day}</div>
                  <div className="text-sm font-bold text-[var(--color-camel)] tracking-wide">
                    <div>{monthYear}</div>
                    <div>{item.day}</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-[var(--color-maroon-dark)] mb-2 font-serif">{item.tithi}</div>
                <div className="text-sm text-gray-700 leading-relaxed mb-4">{item.occasion.split('—')[1] ? item.occasion.split('—')[1].trim() : item.occasion}</div>
                <div className="text-xs font-bold tracking-wide text-[var(--color-golden)] uppercase border-t border-[var(--color-camel)]/20 pt-3">
                  📍 {item.location}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── TRIKHANDI YOG ─── */}
      <section id="trikhandi" className="glass-card rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden bg-[var(--color-maroon)]/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-golden)] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <div className="text-[11px] font-bold tracking-[0.2em] text-[var(--color-golden)] uppercase mb-3 drop-shadow-sm">The Celestial Science</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-maroon)] mb-5 leading-tight font-serif">{content.trikhandiYog.title.split('—')[0]} <span className="text-[var(--color-camel)] font-sans">— त्रिखंडी योग</span></h2>
          <div className="w-20 h-1 bg-[var(--color-golden)] mb-10 rounded-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-6 text-[var(--color-text-main)] text-lg leading-relaxed">
              {content.trikhandiYog.paragraphs.slice(0, 3).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
              <div className="mt-8 p-6 bg-[var(--color-camel)]/10 border border-[var(--color-camel)]/30 rounded-2xl">
                <p className="italic text-center text-[var(--color-maroon)] font-serif text-xl">"{content.trikhandiYog.footer}"</p>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col gap-5">
              {content.trikhandiYog.paragraphs.slice(3, 6).map((para, idx) => {
                const parts = para.split(':');
                const title = parts[0];
                const desc = parts.slice(1).join(':').trim();
                return (
                  <div key={idx} className="bg-white/60 backdrop-blur-sm border border-[var(--color-golden)]/30 p-5 rounded-2xl shadow-sm">
                    <h4 className="text-lg font-bold text-[var(--color-maroon-dark)] mb-2 font-serif">{title}</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{desc || para}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
