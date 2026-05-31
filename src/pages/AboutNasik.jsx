import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

// ─────────────────────────────────────────────────────────────────────────────
// Section image map  (index = parsed section index from the txt file)
// ─────────────────────────────────────────────────────────────────────────────
const sectionImages = [
  '/images/Illustrations/Nashik olakh.png',            // 0  Identity of Nasik
  '/images/Illustrations/ram.png',                     // 1  Land Sanctified by Lord Rama
  '/images/Illustrations/Nashikcha Pravas.png',        // 2  Journey from Janasthan to Nasik
  '/images/Illustrations/Rajgharani.png',              // 3  Dynasties of Nasik
  '/images/Illustrations/nashik bhartachi rajdhani.png', // 4  Nasik Would Have Been the Capital
  '/images/Illustrations/krantikaranchya chalvali.png', // 5  Revolutionaries' Movements
  '/images/Illustrations/savarkar bandhu.png',         // 6  Savarkar Brothers
  '/images/Illustrations/ranragini.png',               // 7  Heroines of Nasik
  '/images/Illustrations/samajik vatchal.png',         // 8  Social Journey
  '/images/Illustrations/Dnyanparampara.png',          // 9  Educational Journey
  '/images/Illustrations/Audyogik va krushi.png',      // 10 Industrial & Agricultural Journey
  '/images/Illustrations/sanskrutik vatchal.png',      // 11 Cultural Journey
  '/images/Illustrations/dadasaheb phalke.png',        // 12 Dadasaheb Phalke
  '/images/Illustrations/Goda aarti.png',              // 13 Tradition of Goda Aarti
  '/images/Illustrations/varsa sthal.png',             // 14 Heritage Sites
  '/images/Illustrations/jaivavividhata.png',          // 15 Biodiversity of Nasik
  '/images/Illustrations/khadyasanskruti.png',         // 16 Food Culture of Nasik
  '/images/Illustrations/gudipadwa.png',               // 17 Gudi Padwa and Festivals
  '/images/Illustrations/trambakeshwar 1.png',         // 18 Trimbakeshwar Pilgrimage Site
];

// ─────────────────────────────────────────────────────────────────────────────
// Localization
// ─────────────────────────────────────────────────────────────────────────────
const localT = {
  EN: {
    aboutNasik: 'About Nasik',
    aboutNasikSub: 'Explore the city that hosts Kumbhparv',
    loading: 'Loading About Nasik content…',
    error: 'Unable to load the About Nasik content.',
    carouselLabel: 'Sacred Stories',
    accordionLabel: 'History & Legacy',
    timelineLabel: 'Civilisational Journey',
    editorialLabel: 'Icons of Nasik',
    splitLabel: 'Land & Nature',
  },
  HI: {
    aboutNasik: 'नासिक के बारे में',
    aboutNasikSub: 'कुंभपर्व की मेजबानी करने वाले शहर का अन्वेषण करें',
    loading: 'नासिक के बारे में जानकारी लोड हो रही है…',
    error: 'नासिक के बारे में जानकारी लोड करने में असमर्थ।',
    carouselLabel: 'पवित्र कथाएं',
    accordionLabel: 'इतिहास और विरासत',
    timelineLabel: 'सभ्यता की यात्रा',
    editorialLabel: 'नासिक के महान व्यक्तित्व',
    splitLabel: 'भूमि और प्रकृति',
  },
  MR: {
    aboutNasik: 'नासिक बद्दल',
    aboutNasikSub: 'कुंभपर्वाचे यजमानपद भूषवणाऱ्या शहराचा प्रवास',
    loading: 'नासिक बद्दलची माहिती लोड होत आहे…',
    error: 'नासिक बद्दलची माहिती लोड करण्यात अक्षम.',
    carouselLabel: 'पवित्र कथा',
    accordionLabel: 'इतिहास व वारसा',
    timelineLabel: 'संस्कृतीची वाटचाल',
    editorialLabel: 'नासिकचे महान व्यक्तिमत्त्व',
    splitLabel: 'भूमी आणि निसर्ग',
  },
};

const sideNavDefs = {
  EN: [
    { id: 'identity',   label: 'Identity' },
    { id: 'carousel',   label: 'Sacred Stories' },
    { id: 'accordion',  label: 'History & Legacy' },
    { id: 'timeline',   label: 'Civilisational Journey' },
    { id: 'editorial',  label: 'Icons of Nasik' },
    { id: 'split',      label: 'Land & Nature' },
  ],
  HI: [
    { id: 'identity',   label: 'पहचान' },
    { id: 'carousel',   label: 'पवित्र कथाएं' },
    { id: 'accordion',  label: 'इतिहास' },
    { id: 'timeline',   label: 'यात्रा' },
    { id: 'editorial',  label: 'महान व्यक्तित्व' },
    { id: 'split',      label: 'भूमि व प्रकृति' },
  ],
  MR: [
    { id: 'identity',   label: 'ओळख' },
    { id: 'carousel',   label: 'पवित्र कथा' },
    { id: 'accordion',  label: 'इतिहास' },
    { id: 'timeline',   label: 'वाटचाल' },
    { id: 'editorial',  label: 'महान व्यक्तिमत्त्व' },
    { id: 'split',      label: 'भूमी व निसर्ग' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Text file parser
// ─────────────────────────────────────────────────────────────────────────────
const parseAboutText = (rawText, language) => {
  const engIdx  = rawText.search(/1\.\s*English/i);
  const hinIdx  = rawText.search(/2\.\s*Hindi/i);
  const marIdx  = rawText.search(/3\.\s*Marathi/i);

  let start = -1, end = rawText.length;
  if (language === 'EN' && engIdx !== -1) { start = engIdx + rawText.match(/1\.\s*English/i)[0].length; end = hinIdx !== -1 ? hinIdx : rawText.length; }
  else if (language === 'HI' && hinIdx !== -1) { start = hinIdx + rawText.match(/2\.\s*Hindi/i)[0].length; end = marIdx !== -1 ? marIdx : rawText.length; }
  else if (language === 'MR' && marIdx !== -1) { start = marIdx + rawText.match(/3\.\s*Marathi/i)[0].length; }

  if (start === -1) return [];
  const lines = rawText.slice(start, end).trim().split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const sections = [];
  for (let i = 0; i < lines.length; i += 2) {
    if (lines[i]) sections.push({ title: lines[i], text: lines[i + 1] ?? '' });
  }
  return sections;
};

// ─────────────────────────────────────────────────────────────────────────────
// Shared Section Header
// ─────────────────────────────────────────────────────────────────────────────
const SectionHeader = ({ label, title, light = false }) => (
  <div className="max-w-3xl space-y-4 mb-12">
    {label && (
      <span className={`inline-block text-xs font-bold uppercase tracking-widest font-serif
        ${light
          ? 'text-[var(--color-vanilla)]/75'
          : 'text-[var(--color-golden)]'}`}>
        {label}
      </span>
    )}
    <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[0.98]
      ${light ? 'text-[var(--color-vanilla)]' : 'text-[var(--color-maroon)]'}`}>
      {title}
    </h2>
    <div className={`h-px w-32 ${light ? 'bg-[var(--color-golden)]/60' : 'bg-[var(--color-golden)]/70'}`} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Temple Divider
// ─────────────────────────────────────────────────────────────────────────────
const TempleDivider = () => (
  <div className="my-16">
    <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-golden)]/45 to-transparent" />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// UI Family 1 — HERO / IMMERSIVE BANNER
// ─────────────────────────────────────────────────────────────────────────────
const HeroBanner = ({ title, text, imageUrl, tagline, subtitle, id }) => (
  <section id={id} className="relative w-full overflow-hidden shadow-2xl border-b border-[var(--color-golden)]/25 flex items-center -mt-16 sm:-mt-20 pt-16 sm:pt-20 min-h-[calc(100vh+4rem)] sm:min-h-[calc(100vh+5rem)]">
    <div className="absolute inset-0 z-0">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover object-center scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-10" />
    </div>

    <div className="relative z-20 w-full px-8 sm:px-14 lg:px-20 space-y-4 max-w-5xl">
      {tagline && (
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[var(--color-golden)]/20 text-[var(--color-golden)] text-[11px] font-bold uppercase tracking-[0.18em] border border-[var(--color-golden)]/35 backdrop-blur-sm">
          <span className="w-1 h-1 rounded-full bg-[var(--color-golden)] animate-pulse" />
          {tagline}
        </span>
      )}
      {subtitle && (
        <p className="text-[var(--color-camel-light)] font-serif italic text-lg sm:text-xl drop-shadow-md">{subtitle}</p>
      )}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[var(--color-vanilla)] leading-tight drop-shadow-2xl">
        {title}
      </h1>
      <p className="text-[var(--color-vanilla)]/88 text-base sm:text-lg lg:text-xl leading-8 max-w-3xl drop-shadow font-medium">
        {text}
      </p>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// UI Family 2 — CAROUSEL / FULL-BLEED SLIDES
// Sections: Rama(1), Goda Aarti(13), Gudi Padwa(17), Trimbakeshwar(18)
// ─────────────────────────────────────────────────────────────────────────────
const CarouselSection = ({ slides, id, label }) => {
  const [[active, direction], setActive] = useState([0, 1]);
  const timer = useRef(null);

  const go = (idx, nextDirection = 1) => {
    setActive([(idx + slides.length) % slides.length, nextDirection]);
  };

  useEffect(() => {
    timer.current = setInterval(() => go(active + 1, 1), 6000);
    return () => clearInterval(timer.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const slide = slides[active];

  return (
    <section id={id} className="space-y-0">
      <SectionHeader title={label} />

      <div className="relative w-full overflow-hidden" style={{ minHeight: '540px' }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            initial={(dir) => ({ x: `${dir * 100}%` })}
            animate={{ x: '0%' }}
            exit={(dir) => ({ x: `${dir * -100}%` })}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
          >
            <img src={slide.imageUrl} alt={slide.title} className="absolute inset-0 w-full h-full object-contain object-right" />
            <div className="relative z-10 w-full h-full flex items-center px-8 sm:px-14 lg:px-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-xl space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--color-golden)]" />
                  <span className="text-[var(--color-golden)] text-[10px] font-bold">{label}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--color-maroon)] leading-tight">
                  {slide.title}
                </h2>
                <p className="text-[var(--color-maroon)]/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
                  {slide.text}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Text overlay — directly on the image, left side */}
        {/* Prev / Next arrows */}
        <button
          onClick={() => go(active - 1, -1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[var(--color-maroon)]/80 border border-[var(--color-golden)]/40 flex items-center justify-center text-[var(--color-golden)] hover:bg-[var(--color-maroon)] transition-colors shadow-lg backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          onClick={() => go(active + 1, 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[var(--color-maroon)]/80 border border-[var(--color-golden)]/40 flex items-center justify-center text-[var(--color-golden)] hover:bg-[var(--color-maroon)] transition-colors shadow-lg backdrop-blur-sm"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Dot nav */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i >= active ? 1 : -1)}
              className={`rounded-full transition-all duration-300 border border-[var(--color-golden)]/50 ${i === active ? 'bg-[var(--color-golden)] w-6 h-2.5' : 'bg-white/30 w-2.5 h-2.5 hover:bg-[var(--color-golden)]/60'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// UI Family 3 — ACCORDION / COLLAPSIBLE
// Sections: Janasthan(2), Dynasties(3), Capital(4)
// ─────────────────────────────────────────────────────────────────────────────
const AccordionItem = ({ title, text, imgUrl, isOpen, onToggle }) => (
  <div className="border-b border-[var(--color-golden)]/25 overflow-hidden transition-all duration-300">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-6 text-left"
    >
      <span className="font-serif font-bold text-2xl sm:text-3xl text-[var(--color-maroon)] leading-tight pr-4">{title}</span>
      <span className={`flex-shrink-0 w-8 h-8 rounded-full border border-[var(--color-golden)]/50 flex items-center justify-center text-[var(--color-golden)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px]' : 'max-h-0'}`}>
      <div className="flex flex-col sm:flex-row gap-8 pb-8">
        {imgUrl && (
          <div className="sm:w-64 flex-shrink-0 overflow-hidden">
            <img src={imgUrl} alt={title} className="w-full h-52 sm:h-full object-cover rounded-xl" />
          </div>
        )}
        <div className="flex-1">
          <p className="text-[var(--color-text-main)] text-base sm:text-lg leading-8 font-medium">{text}</p>
        </div>
      </div>
    </div>
  </div>
);

const AccordionSection = ({ sections, imgIndices, id, label }) => {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id={id} className="space-y-0">
      <SectionHeader title={label} />
      <div className="max-w-5xl">
        {sections.map((sec, i) => (
          <AccordionItem
            key={sec.title}
            title={sec.title}
            text={sec.text}
            imgUrl={sectionImages[imgIndices[i]]}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// UI Family 4 — TIMELINE / HISTORY BLOCKS
// Sections: Social(8), Educational(9), Industrial(10), Cultural(11)
// ─────────────────────────────────────────────────────────────────────────────
const TimelineSection = ({ sections, imgIndices, id, label }) => (
  <section id={id} className="space-y-0">
    <SectionHeader title={label} />
    <div className="relative max-w-7xl mx-auto">
      <div className="absolute left-3.5 sm:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--color-golden)]/15 sm:-translate-x-1/2" />
      <div className="space-y-12 sm:space-y-16">
        {sections.map((sec, idx) => {
          const isEven = idx % 2 === 0;
          const imagePanel = (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="w-full overflow-hidden rounded-xl"
            >
              <img
                src={sectionImages[imgIndices[idx]]}
                alt={sec.title}
                className="h-52 sm:h-64 w-full object-cover object-center"
              />
            </motion.div>
          );
          const textPanel = (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full px-0 sm:px-2 py-2 sm:py-4"
            >
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[var(--color-maroon)] leading-tight">{sec.title}</h3>
              <div className="my-3 sm:my-4 h-[2px] w-14 bg-[var(--color-golden)]/70" />
              <p className="text-[var(--color-text-main)] text-base sm:text-lg leading-7 sm:leading-8">{sec.text}</p>
            </motion.div>
          );
          return (
            <div key={sec.title} className="relative pl-10 sm:pl-0">
              {idx > 0 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute left-3.5 sm:left-1/2 -top-12 sm:-top-16 h-12 sm:h-16 w-[2px] origin-top bg-[var(--color-golden)] sm:-translate-x-1/2"
                />
              )}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35 }}
                className="absolute left-3.5 sm:left-1/2 top-2 sm:top-1/2 sm:-translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[var(--color-vanilla)] border-[3px] border-[var(--color-maroon)] z-10 shadow-md flex items-center justify-center"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-golden)]" />
              </motion.div>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-[4.5rem]">
                {isEven ? (
                  <>
                    <div className="w-full sm:w-[calc(50%-2.25rem)] sm:ml-auto">{imagePanel}</div>
                    <div className="w-full sm:w-[calc(50%-2.25rem)]">{textPanel}</div>
                  </>
                ) : (
                  <>
                    <div className="w-full sm:w-[calc(50%-2.25rem)] order-2 sm:order-1">{textPanel}</div>
                    <div className="w-full sm:w-[calc(50%-2.25rem)] sm:ml-auto order-1 sm:order-2">{imagePanel}</div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// UI Family 5 — CULTURAL / EDITORIAL SHOWCASE
// Sections: Revolutionaries(5), Savarkar(6), Heroines(7), Phalke(12)
// ─────────────────────────────────────────────────────────────────────────────
const EditorialCard = ({ title, text, imgUrl }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    }}
    className="space-y-5"
  >
    <motion.div
      initial={{ opacity: 0, scale: 1.08 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden"
    >
      <img src={imgUrl} alt={title} className="w-full h-80 object-contain object-center" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      className="space-y-3 max-w-lg"
    >
      <h3 className="text-2xl font-serif font-bold text-[var(--color-maroon)] leading-tight">{title}</h3>
      <div className="h-px w-10 bg-[var(--color-golden)]" />
      <p className="text-[var(--color-text-main)] text-sm sm:text-base leading-relaxed">{text}</p>
    </motion.div>
  </motion.div>
);

const EditorialSection = ({ sections, imgIndices, id, label }) => (
  <section id={id} className="space-y-0">
    <SectionHeader title={label} />
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: { opacity: 1 },
        visible: { transition: { staggerChildren: 0.15 } },
      }}
      className="grid gap-14 md:grid-cols-2"
    >
      {sections.map((sec, i) => (
        <EditorialCard
          key={sec.title}
          title={sec.title}
          text={sec.text}
          imgUrl={sectionImages[imgIndices[i]]}
        />
      ))}
    </motion.div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// UI Family 6 — SPLIT STORYTELLING
// Sections: Heritage(14), Biodiversity(15), Food Culture(16)
// ─────────────────────────────────────────────────────────────────────────────
const SplitStory = ({ title, text, imgUrl, isReversed, id }) => (
  <div id={id} className={`flex flex-col ${isReversed ? 'sm:flex-row-reverse' : 'sm:flex-row'} gap-6 sm:gap-12 items-stretch sm:items-center border-t border-[var(--color-golden)]/25 pt-10`}>
    <div className="w-full sm:w-[45%] flex-shrink-0">
      <img
        src={imgUrl}
        alt={title}
        className="w-full h-72 sm:h-[28rem] object-contain object-center"
      />
    </div>
    <div className="flex-1 flex flex-col justify-center space-y-5">
      <div className="flex items-center gap-3">
        <span className="h-[2px] w-8 bg-[var(--color-golden)]" />
        <span className="text-[var(--color-golden)] text-xs font-bold uppercase tracking-widest font-serif">Nasik</span>
      </div>
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--color-maroon)] leading-tight">{title}</h3>
      <p className="text-[var(--color-text-main)] text-base lg:text-lg leading-8 border-l-2 border-[var(--color-golden)]/40 pl-5 py-1 italic">{text}</p>
    </div>
  </div>
);

const SplitSection = ({ sections, imgIndices, id, label }) => (
  <section id={id} className="space-y-0">
    <SectionHeader title={label} />
    <div className="space-y-14">
      {sections.map((sec, i) => (
        <SplitStory
          key={sec.title}
          title={sec.title}
          text={sec.text}
          imgUrl={sectionImages[imgIndices[i]]}
          isReversed={i % 2 !== 0}
        />
      ))}
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// Sticky Side Navigation
// ─────────────────────────────────────────────────────────────────────────────
const SideNav = ({ items, activeSection }) => (
  <nav className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 bg-[var(--color-maroon)]/90 backdrop-blur-md border border-[var(--color-golden)]/30 p-4 rounded-full shadow-2xl">
    {items.map((item) => {
      const isActive = activeSection === item.id;
      return (
        <button
          key={item.id}
          onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          className="group relative flex items-center justify-center w-4 h-4 rounded-full"
          aria-label={`Scroll to ${item.label}`}
        >
          <span className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive ? 'bg-[var(--color-golden)] scale-125 shadow-[0_0_8px_var(--color-golden)]' : 'bg-[var(--color-vanilla)]/35 group-hover:bg-[var(--color-golden)]/60'}`} />
          <span className="absolute right-7 py-1 px-3 bg-[var(--color-maroon)] border border-[var(--color-golden)]/40 rounded-lg text-xs font-serif font-bold text-[var(--color-golden)] whitespace-nowrap opacity-0 pointer-events-none translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-md">
            {item.label}
          </span>
        </button>
      );
    })}
  </nav>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────────────────────────────────────
const AboutNasik = () => {
  const { language } = useAppContext();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const t = localT[language] || localT.EN;

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(encodeURI('/about nasik content.txt'))
      .then(r => { if (!r.ok) throw new Error(); return r.text(); })
      .then(raw => setSections(parseAboutText(raw, language)))
      .catch(() => setError(t.error))
      .finally(() => setLoading(false));
  }, [language, t.error]);

  const hasData = sections.length >= 19;

  // ── Grouped section data ─────────────────────────────────────────────────
  // Family 2 — Carousel slides
  const carouselSlides = hasData ? [
    { title: sections[1].title,  text: sections[1].text,  imageUrl: sectionImages[1]  },  // Rama
    { title: sections[13].title, text: sections[13].text, imageUrl: sectionImages[13] },  // Goda Aarti
    { title: sections[17].title, text: sections[17].text, imageUrl: sectionImages[17] },  // Gudi Padwa
  ] : [];

  // Family 3 — Accordion
  const accordionSections = hasData ? [sections[2], sections[3], sections[4], sections[18]] : [];
  const accordionImages   = [2, 3, 4, 18];

  // Family 4 — Timeline
  const timelineSections = hasData ? [sections[8], sections[9], sections[10], sections[11]] : [];
  const timelineImages   = [8, 9, 10, 11];

  // Family 5 — Editorial Showcase
  const editorialSections = hasData ? [sections[5], sections[6], sections[7], sections[12]] : [];
  const editorialImages   = [5, 6, 7, 12];

  // Family 6 — Split Storytelling
  const splitSections = hasData ? [sections[14], sections[15], sections[16]] : [];
  const splitImages   = [14, 15, 16];

  return (
    <div className="relative w-full">
      {loading ? (
        <div className="max-w-7xl mx-auto py-8 sm:py-14 px-4 lg:px-6">
          <div className="rounded-3xl border border-[var(--color-golden)]/20 bg-white/90 p-20 text-center shadow-sm">
            <div className="inline-block h-9 w-9 animate-spin rounded-full border-4 border-solid border-[var(--color-maroon)] border-r-transparent mb-5" />
            <p className="text-[var(--color-maroon)] font-semibold">{t.loading}</p>
          </div>
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto py-8 sm:py-14 px-4 lg:px-6">
          <div className="rounded-3xl border border-red-300 bg-red-50 p-10 text-center text-red-700 shadow-sm">
            <p className="font-semibold">{error}</p>
          </div>
        </div>
      ) : hasData ? (
        <div className="space-y-4 w-full">

          {/* ── 1. HERO BANNER — Identity of Nasik (index 0) ──────────── */}
          <HeroBanner
            id="identity"
            title={sections[0].title}
            text={sections[0].text}
            imageUrl={sectionImages[0]}
            subtitle={t.aboutNasikSub}
          />

          <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-14 space-y-4">
          <TempleDivider />

          {/* ── 2. CAROUSEL — Rama, Goda Aarti, Gudi Padwa, Trimbakeshwar ─ */}
          <CarouselSection
            id="carousel"
            label={t.carouselLabel}
            slides={carouselSlides}
          />

          <TempleDivider />

          {/* ── 3. ACCORDION — Janasthan, Dynasties, Capital ───────────── */}
          <AccordionSection
            id="accordion"
            label={t.accordionLabel}
            sections={accordionSections}
            imgIndices={accordionImages}
          />

          <TempleDivider />

          {/* ── 4. TIMELINE — Social, Educational, Industrial, Cultural ─── */}
          <TimelineSection
            id="timeline"
            label={t.timelineLabel}
            sections={timelineSections}
            imgIndices={timelineImages}
          />

          <TempleDivider />

          {/* ── 5. EDITORIAL SHOWCASE — Revolutionaries, Savarkar, Heroines, Phalke */}
          <EditorialSection
            id="editorial"
            label={t.editorialLabel}
            sections={editorialSections}
            imgIndices={editorialImages}
          />

          <TempleDivider />

          {/* ── 6. SPLIT STORYTELLING — Heritage, Biodiversity, Food ───── */}
          <SplitSection
            id="split"
            label={t.splitLabel}
            sections={splitSections}
            imgIndices={splitImages}
          />
          </div>

        </div>
      ) : (
        <div className="max-w-7xl mx-auto py-8 sm:py-14 px-4 lg:px-6">
          <div className="rounded-3xl border border-red-300 bg-red-50 p-10 text-center text-red-700 shadow-sm">
            <p className="font-semibold">{t.error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutNasik;
