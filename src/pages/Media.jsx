import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { mediaContent } from '../data/mediaContent';
import FlipBook from '../components/media/FlipBook';
import AudioBookPlayer from '../components/media/AudioBookPlayer';
import { BookOpen, Headphones, ArrowLeft, Sparkles } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const MediaCard = ({ icon: Icon, title, desc, meta, accent, onOpen, cta, index }) => (
  <motion.button
    type="button"
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="show"
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
    whileTap={{ scale: 0.985 }}
    onClick={onOpen}
    className="group relative w-full text-left rounded-3xl overflow-hidden border border-[var(--color-golden)]/25 shadow-[0_16px_40px_-12px_rgba(123,28,28,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-golden)] focus-visible:ring-offset-2"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-90 transition-opacity group-hover:opacity-100`} />
    <div className="absolute inset-0 bg-[url('/logo.jpeg')] bg-center bg-no-repeat bg-[length:280px] opacity-[0.03] mix-blend-overlay pointer-events-none" />
    <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-2xl group-hover:scale-125 transition-transform duration-700" />

    <div className="relative p-7 sm:p-9 flex flex-col h-full min-h-[260px]">
      <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-[var(--color-golden-light)]" strokeWidth={1.75} />
      </div>

      <h3 className="mt-6 text-2xl sm:text-[1.65rem] font-bold text-[var(--color-vanilla)] font-serif leading-tight">
        {title}
      </h3>
      <p className="mt-3 text-sm sm:text-base text-[var(--color-vanilla)]/75 leading-relaxed flex-1">
        {desc}
      </p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-golden)]/90">
          {meta}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-golden-light)] group-hover:gap-2.5 transition-all">
          {cta}
          <Sparkles className="w-4 h-4 opacity-70" />
        </span>
      </div>
    </div>
  </motion.button>
);

const Media = () => {
  const { language } = useAppContext();
  const labels = mediaContent[language] || mediaContent.EN;
  const [view, setView] = useState(null);

  return (
    <div className="relative min-h-[80vh] overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-golden)]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[var(--color-maroon)]/6 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-10 sm:py-14">
        <AnimatePresence mode="wait">
          {!view ? (
            <motion.div
              key="hub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Header */}
              <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-[var(--color-golden)] uppercase px-5 py-2 rounded-full bg-[var(--color-maroon)]/10 border border-[var(--color-golden)]/30 mb-5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {labels.badge}
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="text-4xl sm:text-5xl font-bold text-[var(--color-maroon)] font-serif mb-4"
                >
                  {labels.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.18 }}
                  className="text-base sm:text-lg text-[var(--color-text-main)]/75 leading-relaxed"
                >
                  {labels.subtitle}
                </motion.p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mx-auto mt-8 w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-golden)] to-transparent origin-center"
                />
              </div>

              {/* Cards */}
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                <MediaCard
                  index={0}
                  icon={BookOpen}
                  title={labels.ebookTitle}
                  desc={labels.ebookDesc}
                  meta={labels.ebookMeta}
                  accent="from-[#5c1515] via-[var(--color-maroon)] to-[#8b2525]"
                  cta={labels.openExperience}
                  onOpen={() => setView('ebook')}
                />
                <MediaCard
                  index={1}
                  icon={Headphones}
                  title={labels.audiobookTitle}
                  desc={labels.audiobookDesc}
                  meta={labels.audiobookMeta}
                  accent="from-[#3a2015] via-[#5c3a20] to-[var(--color-camel)]"
                  cta={labels.openExperience}
                  onOpen={() => setView('audiobook')}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setView(null)}
                className="inline-flex items-center gap-2 mb-8 text-sm font-bold text-[var(--color-maroon)]/70 hover:text-[var(--color-maroon)] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {labels.backToMedia}
              </button>

              {view === 'ebook' ? (
                <FlipBook labels={labels} />
              ) : (
                <AudioBookPlayer labels={labels} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Media;
