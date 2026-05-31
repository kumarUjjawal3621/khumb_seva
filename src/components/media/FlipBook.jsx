import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Repeat,
} from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';
import {
  TOTAL_PAGES,
  pageImage,
  pageAudio,
  FLIP_SOUND,
  hasNarration,
} from '../../utils/mediaAssets';

const Page = forwardRef(({ pageNum }, ref) => (
  <div
    ref={ref}
    className="relative w-full h-full overflow-hidden bg-[#f5efe6]"
  >
    <img
      src={pageImage(pageNum)}
      alt={`Page ${pageNum}`}
      className="absolute inset-0 w-full h-full object-contain"
      draggable={false}
    />
  </div>
));
Page.displayName = 'Page';

const FlipBook = ({ labels }) => {
  const [activePage, setActivePage] = useState(0);
  const [narrationPlaying, setNarrationPlaying] = useState(false);
  const [narrationMuted, setNarrationMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [orientation, setOrientation] = useState(null);
  const [pageFocus, setPageFocus] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const isLandscape = orientation === 'landscape';

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const flipRef = useRef(null);
  const narrationRef = useRef(null);
  const flipSoundRef = useRef(null);
  const narrationMutedRef = useRef(false);

  useEffect(() => {
    narrationMutedRef.current = narrationMuted;
  }, [narrationMuted]);

  const stopAndResetNarration = useCallback(() => {
    const audio = narrationRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setNarrationPlaying(false);
  }, []);

  const loadNarration = useCallback(
    (page) => {
      const audio = narrationRef.current;
      if (!audio || narrationMutedRef.current) return;

      stopAndResetNarration();

      if (!hasNarration(page)) {
        audio.removeAttribute('src');
        return;
      }

      audio.src = pageAudio(page);
      audio.load();
    },
    [stopAndResetNarration]
  );

  const startNarration = useCallback(
    (page) => {
      const audio = narrationRef.current;
      if (!audio || narrationMutedRef.current) return;

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
    [stopAndResetNarration]
  );

  const narrationPage = Math.min(activePage + 1 + pageFocus, TOTAL_PAGES);

  useEffect(() => {
    if (!isReady) return;
    loadNarration(narrationPage);
  }, [narrationPage, isReady]);

  useEffect(() => {
    if (!autoPlay || !isReady) return;
    if (!hasNarration(narrationPage) || narrationMuted) return;
    const audio = narrationRef.current;
    if (!audio || !audio.src) return;
    if (narrationPlaying) return;
    audio.play()
      .then(() => setNarrationPlaying(true))
      .catch(() => {});
  }, [narrationPage, autoPlay, isReady]);

  const handleFlip = useCallback((e) => {
    setActivePage(e.data);
    setPageFocus(0);
    const flip = flipSoundRef.current;
    if (flip) {
      flip.currentTime = 0;
      flip.play().catch(() => {});
    }
  }, []);

  const handleInit = useCallback((e) => {
    setActivePage(e.data.page);
    setOrientation(e.data.mode);
    setIsReady(true);
  }, []);

  const handleOrientation = useCallback((e) => {
    setOrientation(e.data);
    setPageFocus(0);
  }, []);

  const handleChangeState = useCallback(() => {}, []);

  const pages = [];
  for (let i = 0; i < TOTAL_PAGES; i++) {
    pages.push(<Page key={i} pageNum={i + 1} />);
  }

  const goNext = () => {
    flipRef.current?.pageFlip()?.flipNext();
  };

  const goPrev = () => {
    flipRef.current?.pageFlip()?.flipPrev();
  };

  const rightPageNum = Math.min(activePage + 2, TOTAL_PAGES);

  const toggleNarration = () => {
    const audio = narrationRef.current;
    if (!audio || !hasNarration(narrationPage)) return;

    if (narrationPlaying) {
      audio.pause();
      setNarrationPlaying(false);
    } else {
      if (audio.src) {
        audio.play().then(() => setNarrationPlaying(true)).catch(() => {});
      } else {
        startNarration(narrationPage);
      }
    }
  };

  const toggleAutoPlay = () => setAutoPlay((p) => !p);

  const bookContent = (
    <>
      <audio
        ref={narrationRef}
        preload="auto"
        onEnded={() => {
          setNarrationPlaying(false);
          setPageFocus(0);
          if (autoPlay && narrationPage < TOTAL_PAGES) {
            flipRef.current?.pageFlip()?.flipNext();
          }
        }}
      />
      <audio ref={flipSoundRef} src={FLIP_SOUND} preload="auto" />

      {/* Book stage */}
      <div className="relative perspective-[1400px]">
        <div className={`relative ${isMobile ? 'max-w-[350px] mx-auto' : ''}`}>
          <HTMLFlipBook
            ref={flipRef}
            width={300}
            height={400}
            size="stretch"
            minWidth={200}
            maxWidth={700}
            minHeight={266}
            maxHeight={1400}
            drawShadow
            flippingTime={600}
            usePortrait
            startZIndex={10}
            autoSize
            maxShadowOpacity={0.8}
            showCover={false}
            mobileScrollSupport
            swipeDistance={30}
            clickEventForward
            useMouseEvents
            showPageCorners={false}
            disableFlipByClick={false}
            onFlip={handleFlip}
            onInit={handleInit}
            onChangeOrientation={handleOrientation}
            onChangeState={handleChangeState}
            style={{}}
            className=""
          >
            {pages}
          </HTMLFlipBook>

          {/* Center play overlay */}
          {!narrationPlaying && !narrationMuted && hasNarration(narrationPage) && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <button
                type="button"
                onClick={() => startNarration(narrationPage)}
                className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/50 hover:bg-black/65 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xl"
                aria-label="Play narration"
              >
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1" />
              </button>
            </div>
          )}

          {/* Audio overlay on book */}
          <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-center pb-2 sm:pb-3 lg:pb-4 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-sm px-2 py-1.5 sm:px-3 sm:py-2 border border-white/10 shadow-lg">
              <button
                type="button"
                onClick={goPrev}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors"
                aria-label={labels.prev}
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70" />
              </button>

              {isLandscape ? (
                <div className="flex items-center gap-0.5 px-1 select-none">
                  <button
                    type="button"
                    onClick={() => setPageFocus(0)}
                    className={`text-[10px] sm:text-xs font-medium tabular-nums rounded px-1 py-0.5 transition-colors ${
                      pageFocus === 0
                        ? 'text-white'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {activePage + 1}
                  </button>
                  <span className="text-white/20 mx-0.5 text-[10px] sm:text-xs">/</span>
                  <button
                    type="button"
                    onClick={() => setPageFocus(1)}
                    className={`text-[10px] sm:text-xs font-medium tabular-nums rounded px-1 py-0.5 transition-colors ${
                      pageFocus === 1
                        ? 'text-white'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {rightPageNum}
                  </button>
                </div>
              ) : (
                <span className="text-[10px] sm:text-xs text-white/70 font-medium px-1 select-none tabular-nums">
                  {narrationPage}
                </span>
              )}

              <span className="w-px h-4 bg-white/15 mx-0.5" />

              <button
                type="button"
                onClick={toggleNarration}
                disabled={!hasNarration(narrationPage) || narrationMuted}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 hover:bg-white/25 disabled:opacity-30 flex items-center justify-center transition-colors"
                aria-label={narrationPlaying ? labels.pause : labels.resume}
              >
                {narrationPlaying ? (
                  <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                ) : (
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setNarrationMuted((m) => !m)}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors"
                aria-label={narrationMuted ? 'Unmute narration' : 'Mute narration'}
              >
                {narrationMuted ? (
                  <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/50" />
                ) : (
                  <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/70" />
                )}
              </button>

              <button
                type="button"
                onClick={toggleAutoPlay}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-colors ${
                  autoPlay
                    ? 'bg-[var(--color-golden)]/30 text-[var(--color-golden)]'
                    : 'hover:bg-white/15 text-white/50'
                }`}
                aria-label={autoPlay ? 'Disable auto-play' : 'Enable auto-play'}
              >
                <Repeat className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>

              <span className="w-px h-4 bg-white/15 mx-0.5" />

              <button
                type="button"
                onClick={goNext}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors"
                aria-label={labels.next}
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      {bookContent}
    </div>
  );
};

export default FlipBook;
