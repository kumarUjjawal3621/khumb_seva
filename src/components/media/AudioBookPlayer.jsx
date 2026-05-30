import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  Headphones,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { NARRATED_PAGES, pageAudio } from '../../utils/mediaAssets';

const SPEEDS = [0.75, 1, 1.25, 1.5];

const AudioBookPlayer = ({ labels }) => {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const audioRef = useRef(null);
  const sequenceActiveRef = useRef(false);
  const chapterRef = useRef(1);

  useEffect(() => {
    chapterRef.current = currentChapter;
  }, [currentChapter]);

  useEffect(() => {
    loadChapter(1, false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatTime = (secs) => {
    if (!secs || !Number.isFinite(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const loadChapter = useCallback(
    (chapter, autoplay = false) => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.pause();
      audio.currentTime = 0;
      audio.src = pageAudio(chapter);
      audio.playbackRate = speed;
      audio.load();
      setCurrentChapter(chapter);
      setProgress(0);
      setIsComplete(false);

      if (autoplay) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(false);
      }
    },
    [speed]
  );

  const handleEnded = useCallback(() => {
    if (!sequenceActiveRef.current) {
      setIsPlaying(false);
      return;
    }

    const chapter = chapterRef.current;
    if (chapter < NARRATED_PAGES) {
      loadChapter(chapter + 1, true);
    } else {
      sequenceActiveRef.current = false;
      setIsPlaying(false);
      setIsComplete(true);
    }
  }, [loadChapter]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => handleEnded();

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, [handleEnded]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  const playAll = () => {
    sequenceActiveRef.current = true;
    setIsComplete(false);
    if (currentChapter === NARRATED_PAGES && !isPlaying) {
      loadChapter(1, true);
    } else {
      const audio = audioRef.current;
      if (audio?.src) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        loadChapter(1, true);
      }
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) pause();
    else playAll();
  };

  const goChapter = (chapter) => {
    sequenceActiveRef.current = isPlaying;
    loadChapter(chapter, isPlaying);
  };

  const overallProgress =
    ((currentChapter - 1 + (duration ? progress / duration : 0)) / NARRATED_PAGES) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <audio ref={audioRef} preload="auto" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl border border-[var(--color-golden)]/30 shadow-[0_20px_50px_-12px_rgba(123,28,28,0.25)]"
      >
        {/* Decorative header */}
        <div className="relative bg-gradient-to-br from-[var(--color-maroon)] via-[#5c1515] to-[#3a0f0f] px-6 sm:px-10 pt-10 pb-16 text-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-bold text-white select-none pointer-events-none">
              ॐ
            </div>
          </div>

          <motion.div
            animate={isPlaying ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            transition={isPlaying ? { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } : {}}
            className="relative mx-auto w-24 h-24 rounded-full bg-[var(--color-golden)]/15 border-2 border-[var(--color-golden)]/50 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.25)]"
          >
            <Headphones className="w-10 h-10 text-[var(--color-golden)]" />
          </motion.div>

          <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-golden)]/80">
            {labels.nowPlaying}
          </p>
          <h3 className="relative mt-2 text-2xl sm:text-3xl font-bold text-[var(--color-vanilla)] font-serif">
            {labels.chapter} {currentChapter}
          </h3>
          {isComplete && (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative inline-block mt-3 text-xs font-bold uppercase tracking-widest text-[var(--color-golden)] bg-[var(--color-golden)]/15 px-4 py-1.5 rounded-full border border-[var(--color-golden)]/30"
            >
              {labels.completed}
            </motion.span>
          )}
        </div>

        {/* Player body */}
        <div className="relative -mt-8 mx-4 sm:mx-8 mb-8 glass-card rounded-2xl p-5 sm:p-7 border border-[var(--color-golden)]/35 shadow-xl">
          {/* Chapter progress */}
          <div className="mb-2 flex justify-between text-xs font-semibold text-[var(--color-text-main)]/55">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--color-maroon)]/10 overflow-hidden mb-1">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-maroon)] to-[var(--color-golden)]"
              style={{ width: duration ? `${(progress / duration) * 100}%` : '0%' }}
            />
          </div>

          {/* Overall progress */}
          <div className="mt-4 mb-6">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-main)]/45 mb-1.5">
              <span>{labels.progress}</span>
              <span>
                {currentChapter} / {NARRATED_PAGES}
              </span>
            </div>
            <div className="h-1 rounded-full bg-[var(--color-maroon)]/8 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[var(--color-camel)]/70"
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => goChapter(Math.max(1, currentChapter - 1))}
              disabled={currentChapter <= 1}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-maroon)] hover:bg-[var(--color-maroon)]/8 transition-colors disabled:opacity-30"
              aria-label={labels.prev}
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="w-16 h-16 rounded-full primary-gradient flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              aria-label={isPlaying ? labels.pause : labels.playAll}
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={() => goChapter(Math.min(NARRATED_PAGES, currentChapter + 1))}
              disabled={currentChapter >= NARRATED_PAGES}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-maroon)] hover:bg-[var(--color-maroon)]/8 transition-colors disabled:opacity-30"
              aria-label={labels.next}
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Speed selector */}
          <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)]/50 text-center sm:text-left">
              {labels.speed}
            </span>
            <div className="flex justify-center gap-2">
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeed(s)}
                  className={`min-w-[3rem] px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    speed === s
                      ? 'bg-[var(--color-maroon)] text-[var(--color-golden)] shadow-md scale-105'
                      : 'bg-white/70 text-[var(--color-maroon)]/70 border border-[var(--color-golden)]/25 hover:border-[var(--color-golden)]/50'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AudioBookPlayer;
