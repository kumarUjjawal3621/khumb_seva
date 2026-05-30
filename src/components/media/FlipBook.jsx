import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  BookOpen,
  Pause,
  Play,
} from 'lucide-react';
import {
  TOTAL_PAGES,
  NARRATED_PAGES,
  pageImage,
  pageAudio,
  FLIP_SOUND,
  hasNarration,
} from '../../utils/mediaAssets';

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isDesktop;
};

const spreadLeft = (page) => Math.floor((page - 1) / 2) * 2 + 1;

const FlipBook = ({ labels }) => {
  const [activePage, setActivePage] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [narrationPlaying, setNarrationPlaying] = useState(false);
  const [narrationMuted, setNarrationMuted] = useState(false);

  const narrationRef = useRef(null);
  const flipSoundRef = useRef(null);
  const activePageRef = useRef(1);
  const isDesktopRef = useRef(false);
  const narrationMutedRef = useRef(false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    activePageRef.current = activePage;
  }, [activePage]);

  useEffect(() => {
    isDesktopRef.current = isDesktop;
  }, [isDesktop]);

  useEffect(() => {
    narrationMutedRef.current = narrationMuted;
  }, [narrationMuted]);

  const leftPage = spreadLeft(activePage);
  const rightPage = Math.min(leftPage + 1, TOTAL_PAGES);

  const playFlipSound = useCallback(() => {
    const flip = flipSoundRef.current;
    if (!flip) return;
    flip.currentTime = 0;
    flip.play().catch(() => {});
  }, []);

  const stopAndResetNarration = useCallback(() => {
    const audio = narrationRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setNarrationPlaying(false);
  }, []);

  const loadAndPlayNarration = useCallback(
    (page) => {
      const audio = narrationRef.current;
      if (!audio || narrationMuted) return;

      stopAndResetNarration();

      if (!hasNarration(page)) {
        audio.removeAttribute('src');
        return;
      }

      audio.src = pageAudio(page);
      audio.load();
      audio
        .play()
        .then(() => setNarrationPlaying(true))
        .catch(() => setNarrationPlaying(false));
    },
    [narrationMuted, stopAndResetNarration]
  );

  useEffect(() => {
    loadAndPlayNarration(activePage);
  }, [activePage, loadAndPlayNarration]);

  useEffect(() => {
    if (narrationMuted) {
      stopAndResetNarration();
    } else {
      loadAndPlayNarration(activePage);
    }
  }, [narrationMuted]); // eslint-disable-line react-hooks/exhaustive-deps

  const goToPage = useCallback(
    (page, dir, { playSound = true } = {}) => {
      if (isFlipping || page < 1 || page > TOTAL_PAGES || page === activePageRef.current) return;
      setDirection(dir);
      setIsFlipping(true);
      if (playSound) playFlipSound();
      setTimeout(() => {
        setActivePage(page);
        setIsFlipping(false);
      }, 380);
    },
    [isFlipping, playFlipSound]
  );

  const advanceAfterNarration = useCallback(() => {
    if (narrationMutedRef.current) return;

    const page = activePageRef.current;
    const next = page + 1;
    if (next > NARRATED_PAGES) return;

    const left = spreadLeft(page);
    const right = Math.min(left + 1, TOTAL_PAGES);
    const nextOnCurrentSpread = isDesktopRef.current && next <= right;

    if (nextOnCurrentSpread) {
      setActivePage(next);
    } else {
      goToPage(next, 1);
    }
  }, [goToPage]);

  const goNext = () => {
    const step = isDesktop ? (activePage % 2 === 0 ? 1 : 2) : 1;
    const next = Math.min(activePage + step, TOTAL_PAGES);
    if (next !== activePage) goToPage(next, 1);
  };

  const goPrev = () => {
    const step = isDesktop ? (activePage % 2 === 1 ? 2 : 1) : 1;
    const prev = Math.max(activePage - step, 1);
    if (prev !== activePage) goToPage(prev, -1);
  };

  const toggleNarration = () => {
    const audio = narrationRef.current;
    if (!audio || !hasNarration(activePage)) return;

    if (narrationPlaying) {
      audio.pause();
      setNarrationPlaying(false);
    } else {
      audio.play().then(() => setNarrationPlaying(true)).catch(() => {});
    }
  };

  const pageVariants = {
    enter: (dir) => ({
      opacity: 0,
      rotateY: dir > 0 ? -18 : 18,
      x: dir > 0 ? 40 : -40,
      scale: 0.96,
    }),
    center: {
      opacity: 1,
      rotateY: 0,
      x: 0,
      scale: 1,
    },
    exit: (dir) => ({
      opacity: 0,
      rotateY: dir > 0 ? 18 : -18,
      x: dir > 0 ? -40 : 40,
      scale: 0.96,
    }),
  };

  const renderPage = (pageNum, side) => (
    <div
      key={`${side}-${pageNum}`}
      className={`relative overflow-hidden bg-[#f5efe6] shadow-inner ${
        side === 'left' ? 'rounded-l-sm' : 'rounded-r-sm'
      } ${isDesktop ? 'flex-1' : 'w-full'}`}
      style={{ aspectRatio: '3/4' }}
    >
      <img
        src={pageImage(pageNum)}
        alt={`${labels.pageOf} ${pageNum}`}
        className="absolute inset-0 w-full h-full object-contain"
        draggable={false}
      />
      <div
        className={`absolute inset-y-0 w-8 pointer-events-none ${
          side === 'left'
            ? 'right-0 bg-gradient-to-l from-black/10 to-transparent'
            : 'left-0 bg-gradient-to-r from-black/10 to-transparent'
        }`}
      />
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <audio
        ref={narrationRef}
        preload="auto"
        onEnded={() => {
          setNarrationPlaying(false);
          advanceAfterNarration();
        }}
      />
      <audio ref={flipSoundRef} src={FLIP_SOUND} preload="auto" />

      {/* Book stage */}
      <div className="relative perspective-[1400px]">
        <div className="absolute -inset-4 lg:-inset-8 rounded-3xl bg-gradient-to-br from-[var(--color-maroon)]/8 via-transparent to-[var(--color-golden)]/10 blur-2xl pointer-events-none" />

        <div className="relative rounded-2xl lg:rounded-3xl p-3 sm:p-5 lg:p-8 bg-gradient-to-b from-[#2a1515] to-[#1a0d0d] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.45)] border border-[var(--color-golden)]/25">
          {/* Spine */}
          {isDesktop && (
            <div className="absolute left-1/2 top-4 bottom-4 w-3 -translate-x-1/2 z-20 rounded-full bg-gradient-to-r from-black/40 via-[var(--color-golden)]/20 to-black/40 shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]" />
          )}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={isDesktop ? `spread-${leftPage}` : `page-${activePage}`}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className={`flex gap-0 ${isDesktop ? 'flex-row' : 'flex-col'} ${isFlipping ? 'pointer-events-none' : ''}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {isDesktop ? (
                <>
                  {renderPage(leftPage, 'left')}
                  {rightPage !== leftPage && renderPage(rightPage, 'right')}
                </>
              ) : (
                renderPage(activePage, 'single')
              )}
            </motion.div>
          </AnimatePresence>

          {/* Tap zones */}
          <button
            type="button"
            onClick={goPrev}
            disabled={activePage <= 1 || isFlipping}
            className="absolute left-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer disabled:cursor-default opacity-0"
            aria-label={labels.prev}
          />
          <button
            type="button"
            onClick={goNext}
            disabled={activePage >= TOTAL_PAGES || isFlipping}
            className="absolute right-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer disabled:cursor-default opacity-0"
            aria-label={labels.next}
          />
        </div>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 glass-card rounded-2xl p-4 sm:p-5 border border-[var(--color-golden)]/30 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-maroon)] flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-[var(--color-golden)]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--color-maroon)]">
                {labels.pageOf} {activePage} {labels.of} {TOTAL_PAGES}
              </p>
              <p className="text-xs text-[var(--color-text-main)]/60 mt-0.5">
                {hasNarration(activePage)
                  ? `${labels.narration}: ${narrationPlaying ? labels.playing : labels.paused}`
                  : labels.noNarration}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={activePage <= 1 || isFlipping}
              className="w-11 h-11 rounded-full border border-[var(--color-golden)]/40 bg-white/80 text-[var(--color-maroon)] flex items-center justify-center transition-all hover:bg-[var(--color-maroon)] hover:text-[var(--color-golden)] disabled:opacity-30 disabled:hover:bg-white/80 disabled:hover:text-[var(--color-maroon)] shadow-sm"
              aria-label={labels.prev}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={toggleNarration}
              disabled={!hasNarration(activePage) || narrationMuted}
              className="w-11 h-11 rounded-full border border-[var(--color-golden)]/40 bg-[var(--color-maroon)] text-[var(--color-golden)] flex items-center justify-center transition-all hover:bg-[var(--color-maroon-dark)] disabled:opacity-30 shadow-md"
              aria-label={narrationPlaying ? labels.pause : labels.resume}
            >
              {narrationPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setNarrationMuted((m) => !m)}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all shadow-sm ${
                narrationMuted
                  ? 'border-[var(--color-maroon)]/30 text-[var(--color-maroon)]/50 bg-white/60'
                  : 'border-[var(--color-golden)]/40 text-[var(--color-maroon)] bg-white/80 hover:bg-[var(--color-maroon)] hover:text-[var(--color-golden)]'
              }`}
              aria-label={narrationMuted ? 'Unmute narration' : 'Mute narration'}
            >
              {narrationMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={activePage >= TOTAL_PAGES || isFlipping}
              className="w-11 h-11 rounded-full border border-[var(--color-golden)]/40 bg-white/80 text-[var(--color-maroon)] flex items-center justify-center transition-all hover:bg-[var(--color-maroon)] hover:text-[var(--color-golden)] disabled:opacity-30 disabled:hover:bg-white/80 disabled:hover:text-[var(--color-maroon)] shadow-sm"
              aria-label={labels.next}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 rounded-full bg-[var(--color-maroon)]/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-maroon)] to-[var(--color-golden)]"
            initial={false}
            animate={{ width: `${(activePage / TOTAL_PAGES) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        <p className="mt-3 text-center text-[11px] text-[var(--color-text-main)]/45 tracking-wide">
          {labels.flipHint}
        </p>
      </motion.div>
    </div>
  );
};

export default FlipBook;
