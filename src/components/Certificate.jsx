import React from 'react';
import { useAppContext } from '../context/AppContext';

const Certificate = React.forwardRef(({ overrideData, preview = false }, ref) => {
  const { t, language } = useAppContext();
  const isEnglish = language === 'EN';

  const data = overrideData || { name: 'Participant Name' };

  const today = new Date();
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(isEnglish ? 'en-US' : 'hi-IN', dateOptions);

  const PRIMARY = '#F97316';
  const SECONDARY = '#14B8A6';

  const CornerOrnament = ({ flip }) => (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        width: 'clamp(20px, 4vw, 40px)',
        height: 'clamp(20px, 4vw, 40px)',
        ...(flip === 'none' && { top: '4%', left: '4%' }),
        ...(flip === 'x'   && { top: '4%', right: '4%', transform: 'scaleX(-1)' }),
        ...(flip === 'y'   && { bottom: '4%', left: '4%', transform: 'scaleY(-1)' }),
        ...(flip === 'xy'  && { bottom: '4%', right: '4%', transform: 'scale(-1,-1)' }),
        pointerEvents: 'none',
      }}
    >
      <path d="M2 18 L2 2 L18 2" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" />
      <circle cx="2" cy="2" r="2.5" fill={PRIMARY} />
      <circle cx="8" cy="8" r="1.2" fill={SECONDARY} opacity="0.7" />
    </svg>
  );

  const isFixed = !preview;

  return (
    <div
      style={{
        ...(isFixed
          ? { position: 'absolute', top: '-9999px', left: '-9999px' }
          : {
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 'clamp(8px, 2vw, 32px)',
              boxSizing: 'border-box',
            }),
      }}
    >
      <div
        ref={ref}
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#ffffff',
          boxSizing: 'border-box',
          fontFamily: isEnglish
            ? '"Playfair Display", Georgia, serif'
            : '"Noto Sans Devanagari", Arial, sans-serif',
          color: '#1F2937',
          ...(isFixed
            ? { width: '900px', height: '675px', flexShrink: 0 }
            : {
                width: '100%',
                maxWidth: '860px',
                aspectRatio: '4 / 3',
                borderRadius: 'clamp(6px, 1.2vw, 14px)',
                boxShadow:
                  '0 4px 16px rgba(0,0,0,0.08), 0 24px 56px rgba(249,115,22,0.1)',
              }),
        }}
      >
        {/* Double border */}
        <div style={{ position: 'absolute', inset: '2%', border: `2.5px solid ${PRIMARY}`, borderRadius: 'clamp(4px, 0.8vw, 10px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: '3.2%', border: `1px solid ${SECONDARY}`, borderRadius: 'clamp(2px, 0.5vw, 7px)', pointerEvents: 'none' }} />

        {/* Corners */}
        <CornerOrnament flip="none" />
        <CornerOrnament flip="x" />
        <CornerOrnament flip="y" />
        <CornerOrnament flip="xy" />

        {/* Top accent stripe */}
        <div style={{
          position: 'absolute', top: '3%', left: '50%', transform: 'translateX(-50%)',
          width: '16%', height: '2.5px',
          background: `linear-gradient(90deg, ${SECONDARY}, ${PRIMARY}, ${SECONDARY})`,
          borderRadius: '99px', opacity: 0.65,
        }} />

        {/* Watermark */}
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '38%', height: 'auto', objectFit: 'contain',
            opacity: 0.04, pointerEvents: 'none', userSelect: 'none',
          }}
        />

        {/* Main content */}
        <div style={{
          position: 'relative', zIndex: 10,
          height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'space-between',
          textAlign: 'center',
          padding: '5.5% 8% 5%',
          boxSizing: 'border-box',
        }}>

          {/* TOP — logo + org name */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(3px, 0.7%, 8px)' }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                width: 'clamp(32px, 7%, 62px)',
                height: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 2px 5px rgba(249,115,22,0.22))',
              }}
            />
            <p style={{
              margin: 0,
              fontSize: 'clamp(7px, 1.35%, 13px)',
              color: SECONDARY,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              lineHeight: 1.3,
            }}>
              {t.hero.title}
            </p>
          </div>

          {/* MIDDLE — cert title + recipient name + body */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(4px, 0.9%, 10px)', width: '100%' }}>

            <p style={{
              margin: 0,
              fontSize: 'clamp(6px, 1%, 10px)',
              color: '#9CA3AF',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}>
              {t.labels.certificateSubtitle}
            </p>

            <h1 style={{
              margin: 0,
              fontSize: 'clamp(14px, 3.6%, 36px)',
              color: PRIMARY,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: 1.1,
              textShadow: '0 1px 3px rgba(249,115,22,0.18)',
            }}>
              {t.labels.certificateTitle}
            </h1>

            {/* Ornamental divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px, 1%, 12px)', width: '55%' }}>
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${SECONDARY}70, transparent)` }} />
              <div style={{ width: 'clamp(3px, 0.5%, 5px)', height: 'clamp(3px, 0.5%, 5px)', borderRadius: '50%', background: SECONDARY, flexShrink: 0 }} />
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${SECONDARY}70, transparent)` }} />
            </div>

            <h2 style={{
              margin: 0,
              fontSize: 'clamp(13px, 2.8%, 28px)',
              fontWeight: 700,
              color: '#111827',
              paddingBottom: 'clamp(3px, 0.5%, 7px)',
              borderBottom: `2px solid ${PRIMARY}`,
              lineHeight: 1.2,
              maxWidth: '80%',
            }}>
              {data.name || 'Participant Name'}
            </h2>

            <p style={{
              margin: 0,
              fontSize: 'clamp(6px, 1.05%, 10px)',
              lineHeight: 1.7,
              color: '#4B5563',
              maxWidth: '72%',
            }}>
              {t.labels.certificateBody}
            </p>
          </div>

          {/* BOTTOM — signatures */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '82%',
          }}>

            {/* Kumbh Commission signatory */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(2px, 0.3%, 4px)' }}>
              <span style={{
                fontFamily: '"Dancing Script", cursive',
                fontSize: 'clamp(10px, 1.7%, 17px)',
                color: PRIMARY,
                minWidth: 'clamp(72px, 11%, 120px)',
                textAlign: 'center',
                lineHeight: 1.1,
              }}>
                Kumbh Commission
              </span>
              <div style={{ width: 'clamp(72px, 11%, 120px)', height: '1px', background: '#D1D5DB' }} />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(5px, 0.85%, 8.5px)',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 600,
              }}>
                {t.labels.authSignatory}
              </span>
            </div>

            {/* Centre seal */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 'clamp(26px, 4.5%, 44px)',
                height: 'clamp(26px, 4.5%, 44px)',
                borderRadius: '50%',
                border: `1.5px solid ${PRIMARY}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <img src="/logo.png" alt="Seal" style={{ width: '62%', height: 'auto', objectFit: 'contain', opacity: 0.5 }} />
              </div>
            </div>

            {/* Date */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(2px, 0.3%, 4px)' }}>
              <span style={{
                fontFamily: isEnglish ? '"Playfair Display", serif' : '"Noto Sans Devanagari", sans-serif',
                fontSize: 'clamp(7px, 1.1%, 11px)',
                color: '#374151',
                minWidth: 'clamp(72px, 11%, 120px)',
                textAlign: 'center',
                lineHeight: 1.2,
              }}>
                {formattedDate}
              </span>
              <div style={{ width: 'clamp(72px, 11%, 120px)', height: '1px', background: '#D1D5DB' }} />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(5px, 0.85%, 8.5px)',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 600,
              }}>
                {t.labels.dateText}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
});

Certificate.displayName = 'Certificate';
export default Certificate;