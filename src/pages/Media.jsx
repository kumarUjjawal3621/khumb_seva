import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { mediaContent } from '../data/mediaContent';
import FlipBook from '../components/media/FlipBook';
import AudioBookPlayer from '../components/media/AudioBookPlayer';
import { BookOpen, Headphones, ArrowLeft } from 'lucide-react';

const languages = [
  {
    key: 'MR',
    label: 'Marathi',
    script: 'मराठी',
    sample: 'कुंभपर्व',
    desc: 'Interactive flipbook with narration',
  },
  {
    key: 'EN',
    label: 'English',
    script: 'English',
    sample: 'Kumbhparv',
    desc: 'Interactive flipbook with narration',
  },
  {
    key: 'HI',
    label: 'Hindi',
    script: 'हिन्दी',
    sample: 'कुंभपर्व',
    desc: 'Interactive flipbook with narration',
  },
];

const BookCard = ({ lang, available, onClick, index, bgImage, Icon, title }) => (
  <motion.button
    type="button"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.08 }}
    onClick={available ? onClick : undefined}
    className={`group w-full rounded-2xl text-center transition-all duration-300 ${
      available ? 'cursor-pointer' : 'cursor-default'
    }`}
    style={{ perspective: '800px' }}
  >
    <div
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        available
          ? 'border-[var(--color-golden)]/30 shadow-[0_4px_16px_-6px_rgba(123,28,28,0.12)] hover:shadow-[0_16px_40px_-12px_rgba(123,28,28,0.25)] hover:-translate-y-1.5'
          : 'border-[var(--color-golden)]/15'
      }`}
      style={{ aspectRatio: '3 / 4' }}
    >
      {available ? (
        <>
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 via-40% to-transparent to-60%" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-vanilla)]/30 to-white opacity-60" />
      )}
      <div className="relative flex flex-col items-start justify-end h-full px-4 pb-5">
        <span className={`text-2xl sm:text-3xl font-bold drop-shadow-lg ${
          available ? 'text-white' : 'text-[var(--color-maroon)]/50'
        }`}>
          {title}
        </span>
        <span className={`mt-1.5 text-sm font-bold uppercase drop-shadow-md ${
          available ? 'text-[var(--color-golden)]' : 'text-[var(--color-golden)]/60'
        }`}>
          {lang.script}
        </span>
        <span className={`text-xs mt-1 drop-shadow ${
          available ? 'text-white/80' : 'text-[var(--color-text-main)]/45'
        }`}>
          {lang.label}
        </span>
        {!available && (
          <span className="mt-3 text-[10px] uppercase tracking-widest font-semibold text-[var(--color-text-main)]/35 bg-white/70 px-3 py-1 rounded-full border border-[var(--color-golden)]/20">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  </motion.button>
);

const Media = () => {
  const { language } = useAppContext();
  const labels = mediaContent[language] || mediaContent.EN;
  const [view, setView] = useState(null);

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
          className="text-center text-[var(--color-golden)] text-xl sm:text-2xl lg:text-3xl font-black font-serif uppercase tracking-[0.2em] pt-8 sm:pt-12 mb-16"
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
              className="flex flex-col lg:flex-row gap-10 lg:gap-14"
            >
              {/* Left: Interactive E-Book */}
              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-[var(--color-maroon)]" />
                  <h2 className="text-2xl font-bold text-[var(--color-maroon)]">
                    {labels.ebookTitle}
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {languages.map((lang, i) => (
                    <BookCard
                      key={lang.key}
                      index={i}
                      lang={lang}
                      available={lang.key === 'MR'}
                      onClick={() => setView('ebook')}
                      bgImage="/images/ebook.png"
                      Icon={BookOpen}
                      title={lang.key === 'MR' ? 'ई-बुक' : lang.key === 'HI' ? 'ई-बुक' : 'E-Book'}
                    />
                  ))}
                </div>
              </div>

              {/* Right: Audio Book */}
              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-6">
                  <Headphones className="w-6 h-6 text-[var(--color-maroon)]" />
                  <h2 className="text-2xl font-bold text-[var(--color-maroon)]">
                    {labels.audiobookTitle}
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {languages.map((lang, i) => (
                    <BookCard
                      key={lang.key}
                      index={i + 3}
                      lang={lang}
                      available={lang.key === 'MR'}
                      onClick={() => setView('audiobook')}
                      bgImage="/images/ebook.png"
                      Icon={Headphones}
                      title={lang.key === 'MR' ? 'ऑडिओबुक' : lang.key === 'HI' ? 'ऑडिओबुक' : 'Audiobook'}
                    />
                  ))}
                </div>
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
