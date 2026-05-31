import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { mediaContent } from '../data/mediaContent';
import FlipBook from '../components/media/FlipBook';
import AudioBookPlayer from '../components/media/AudioBookPlayer';
import { BookOpen, Headphones, ArrowLeft } from 'lucide-react';

const Section = ({ icon: Icon, title, desc, meta, openCta, onClick, index }) => (
  <motion.button
    type="button"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 }}
    onClick={onClick}
    className="group w-full text-left focus:outline-none relative"
  >
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <Icon className="w-48 h-48 sm:w-56 sm:h-56 text-[var(--color-maroon)]/[0.06] group-hover:text-[var(--color-maroon)]/[0.1] transition-all duration-500" strokeWidth={1} />
    </div>
    <div className="relative flex flex-col items-start gap-1">
      <h2 className="text-2xl font-bold text-[var(--color-maroon)] group-hover:text-[var(--color-maroon-dark)] transition-colors">
        {title}
      </h2>
      <p className="text-base text-[var(--color-text-main)]/65 leading-relaxed max-w-sm">
        {desc}
      </p>
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-golden)]/70">
        {meta}
      </span>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-maroon)]/50 group-hover:text-[var(--color-maroon)] transition-colors mt-1">
        {openCta}
        <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-0.5 transition-transform" />
      </span>
    </div>
  </motion.button>
);

const Media = () => {
  const { language } = useAppContext();
  const labels = mediaContent[language] || mediaContent.EN;
  const [view, setView] = useState(null);
  const [hoveredSide, setHoveredSide] = useState(null);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden pt-6 sm:pt-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[var(--color-golden)]/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[var(--color-maroon)]/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center text-[var(--color-golden)] text-xl sm:text-2xl lg:text-3xl font-black font-serif uppercase tracking-[0.2em] pt-8 sm:pt-12 mb-[6.25rem]"
        >
          {language === 'HI' || language === 'MR' ? 'पवित्र मीडिया संग्रह' : 'SACRED MEDIA LIBRARY'}
        </motion.h1>

        <AnimatePresence mode="wait">
          {!view ? (
              <motion.div
              key="hub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-2"
              >
                <div
                  onMouseEnter={() => setHoveredSide('ebook')}
                  onMouseLeave={() => setHoveredSide(null)}
                  className={`flex items-start justify-center px-8 lg:px-12 py-6 transition-all duration-500 ${
                  hoveredSide === 'ebook'
                    ? 'scale-[1.02]'
                    : ''
                }`}
              >
                <Section
                  index={0}
                  icon={BookOpen}
                  title={labels.ebookTitle}
                  desc={labels.ebookDesc}
                  meta={labels.ebookMeta}
                  openCta={labels.openExperience}
                  onClick={() => setView('ebook')}
                />
              </div>
              <div
                onMouseEnter={() => setHoveredSide('audiobook')}
                onMouseLeave={() => setHoveredSide(null)}
                className={`flex items-start justify-center px-8 lg:px-12 py-6 border-t lg:border-t-0 lg:border-l border-[var(--color-golden)]/20 transition-all duration-500 ${
                  hoveredSide === 'audiobook'
                    ? 'scale-[1.02]'
                    : ''
                }`}
              >
                <Section
                  index={1}
                  icon={Headphones}
                  title={labels.audiobookTitle}
                  desc={labels.audiobookDesc}
                  meta={labels.audiobookMeta}
                  openCta={labels.openExperience}
                  onClick={() => setView('audiobook')}
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
              className="w-full"
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
