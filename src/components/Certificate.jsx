import React, { useRef, useEffect, useImperativeHandle } from 'react';
import { useAppContext } from '../context/AppContext';
import { toDevanagari } from '../utils/transliterate';

const WIDTH = 2000;
const HEIGHT = 1414;

const CONFIG = {
  EN: { img: '/images/certificate/eng_cert.png', x: 1000, y: 604, fontSize: 46, yMin: 567, yMax: 640 },
  HI: { img: '/images/certificate/hindi_cert.png', x: 981, y: 656, fontSize: 46, yMin: 620, yMax: 692 },
  MR: { img: '/images/certificate/marathi_cert.png', x: 977, y: 636, fontSize: 46, yMin: 595, yMax: 676 },
};

const MAX_TEXT_WIDTH = 800;

const Certificate = React.forwardRef(({ overrideData, preview = false }, ref) => {
  const canvasRef = useRef(null);
  const { language } = useAppContext();
  const data = overrideData || { name: 'Participant Name' };
  const participantName = data.name || 'Participant Name';
  const cfg = CONFIG[language] || CONFIG.EN;
  const displayName = ['HI', 'MR'].includes(language) ? toDevanagari(participantName) : participantName;

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
    toDataURL: (type, quality) => canvasRef.current?.toDataURL(type, quality),
    toBlob: (callback, type, quality) => canvasRef.current?.toBlob(callback, type, quality),
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);

      const fontFamily = ['HI', 'MR'].includes(language)
        ? '"Noto Sans Devanagari", "Noto Serif Devanagari", sans-serif'
        : '"Playfair Display", Georgia, serif';

      let fontSize = cfg.fontSize;
      ctx.font = `700 ${fontSize}px ${fontFamily}`;
      let textWidth = ctx.measureText(displayName).width;
      while (textWidth > MAX_TEXT_WIDTH && fontSize > 20) {
        fontSize -= 2;
        ctx.font = `700 ${fontSize}px ${fontFamily}`;
        textWidth = ctx.measureText(displayName).width;
      }

      ctx.fillStyle = '#111827';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(displayName, cfg.x, cfg.y);
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(draw);
      } else {
        draw();
      }
    };
    img.src = cfg.img;
  }, [displayName, language]);

  if (preview) {
    return (
      <div style={{ width: '100%', maxWidth: '860px', margin: '0 auto' }}>
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '14px',
            boxShadow: '0 10px 30px rgba(58,32,21,0.18)',
            display: 'block',
          }}
        />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}
    />
  );
});

Certificate.displayName = 'Certificate';
export default Certificate;
