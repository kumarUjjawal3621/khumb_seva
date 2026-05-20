import React from 'react';
import { useAppContext } from '../context/AppContext';

const certificateCopy = {
  EN: {
    title: 'Nasik Kumbhparv Pledge Certificate',
    certify: 'This is to certify that',
    body:
      'has taken the Nashik Kumbhparv Pledge and remains committed to promoting social harmony, preserving Indian traditions and cultural values, maintaining cleanliness and environmental sustainability, protecting sacred rivers, practicing responsible civic conduct, supporting local communities and artisans, ensuring safety and discipline, and serving pilgrims and society with dedication, compassion, and unity.',
    cmName: 'Devendra Fadnavis',
    cmTitle: 'Chief Minister',
    government: 'Government of Maharashtra',
  },
  HI: {
    title: 'नासिक कुंभपर्व संकल्प प्रमाणपत्र',
    certify: 'यह प्रमाणित किया जाता है कि',
    body:
      'ने नासिक कुंभपर्व संकल्प लिया है और सामाजिक सद्भाव को बढ़ावा देने, भारतीय परंपराओं और सांस्कृतिक मूल्यों के संरक्षण, स्वच्छता और पर्यावरणीय स्थिरता बनाए रखने, पवित्र नदियों की रक्षा करने, जिम्मेदार नागरिक आचरण का पालन करने, स्थानीय समुदायों और कारीगरों का समर्थन करने, सुरक्षा और अनुशासन सुनिश्चित करने तथा श्रद्धालुओं और समाज की सेवा समर्पण, करुणा और एकता के साथ करने के लिए प्रतिबद्ध हैं।',
    cmName: 'देवेंद्र फडणवीस',
    cmTitle: 'मुख्यमंत्री',
    government: 'महाराष्ट्र शासन',
  },
  MR: {
    title: 'नाशिक कुंभपर्व संकल्प प्रमाणपत्र',
    certify: 'हे प्रमाणित करण्यात येते की',
    body:
      'यांनी नाशिक कुंभपर्व संकल्प घेतला आहे आणि सामाजिक सलोखा वाढवणे, भारतीय परंपरा व सांस्कृतिक मूल्यांचे जतन करणे, स्वच्छता व पर्यावरणीय शाश्वतता राखणे, पवित्र नद्यांचे संरक्षण करणे, जबाबदार नागरी आचरण पाळणे, स्थानिक समुदाय व कारागीरांना पाठबळ देणे, सुरक्षा व शिस्त सुनिश्चित करणे आणि भाविक व समाजाची सेवा समर्पण, करुणा आणि एकतेने करण्यासाठी वचनबद्ध आहेत.',
    cmName: 'देवेंद्र फडणवीस',
    cmTitle: 'मुख्यमंत्री',
    government: 'महाराष्ट्र शासन',
  },
};

const independentVowels = {
  a: 'अ',
  aa: 'आ',
  i: 'इ',
  ee: 'ई',
  ii: 'ई',
  u: 'उ',
  oo: 'ऊ',
  uu: 'ऊ',
  e: 'ए',
  ai: 'ऐ',
  o: 'ओ',
  au: 'औ',
};

const vowelMarks = {
  a: '',
  aa: 'ा',
  i: 'ि',
  ee: 'ी',
  ii: 'ी',
  u: 'ु',
  oo: 'ू',
  uu: 'ू',
  e: 'े',
  ai: 'ै',
  o: 'ो',
  au: 'ौ',
};

const consonants = {
  ksh: 'क्ष',
  tra: 'त्र',
  gya: 'ज्ञ',
  chh: 'छ',
  kh: 'ख',
  gh: 'घ',
  ch: 'च',
  jh: 'झ',
  th: 'थ',
  dh: 'ध',
  ph: 'फ',
  bh: 'भ',
  sh: 'श',
  k: 'क',
  g: 'ग',
  c: 'क',
  j: 'ज',
  t: 'त',
  d: 'द',
  n: 'न',
  p: 'प',
  f: 'फ',
  b: 'ब',
  m: 'म',
  y: 'य',
  r: 'र',
  l: 'ल',
  v: 'व',
  w: 'व',
  s: 'स',
  h: 'ह',
};

const commonNameWords = {
  kumar: 'कुमार',
  ujjawal: 'उज्जवल',
  ujwal: 'उज्ज्वल',
  ujjwal: 'उज्ज्वल',
};

const hasDevanagari = (value) => /[\u0900-\u097F]/.test(value);

const matchToken = (value, index, dictionary) => {
  const keys = Object.keys(dictionary).sort((a, b) => b.length - a.length);
  const key = keys.find((candidate) => value.startsWith(candidate, index));
  return key ? [key, dictionary[key]] : null;
};

const transliterateWord = (word) => {
  if (!word || hasDevanagari(word)) return word;

  const common = commonNameWords[word.toLowerCase()];
  if (common) return common;

  let result = '';
  let index = 0;
  const normalized = word.toLowerCase();

  while (index < normalized.length) {
    const char = normalized[index];

    if (!/[a-z]/.test(char)) {
      result += word[index];
      index += 1;
      continue;
    }

    const vowel = matchToken(normalized, index, independentVowels);
    if (vowel) {
      result += vowel[1];
      index += vowel[0].length;
      continue;
    }

    const consonant = matchToken(normalized, index, consonants);
    if (!consonant) {
      result += word[index];
      index += 1;
      continue;
    }

    index += consonant[0].length;
    const nextVowel = matchToken(normalized, index, vowelMarks);

    if (nextVowel) {
      result += consonant[1] + nextVowel[1];
      index += nextVowel[0].length;
    } else if (index < normalized.length && /[a-z]/.test(normalized[index])) {
      result += `${consonant[1]}्`;
    } else {
      result += consonant[1];
    }
  }

  return result;
};

const transliterateName = (name) => name.split(/(\s+)/).map(transliterateWord).join('');

const Certificate = React.forwardRef(({ overrideData, preview = false }, ref) => {
  const { language } = useAppContext();
  const copy = certificateCopy[language] || certificateCopy.EN;
  const data = overrideData || { name: 'Participant Name' };
  const isEnglish = language === 'EN';
  const nameWords = (data.name || 'Participant Name').trim().split(/\s+/);
  const displayName =
    nameWords.length % 2 === 0 &&
    nameWords.slice(0, nameWords.length / 2).join(' ') === nameWords.slice(nameWords.length / 2).join(' ')
      ? nameWords.slice(0, nameWords.length / 2).join(' ')
      : nameWords.join(' ');
  const certificateName = isEnglish ? displayName : transliterateName(displayName);
  const isPdf = !preview;

  const sz = (pdfPx, previewClamp) => (isPdf ? `${pdfPx}px` : previewClamp);
  const logoSize = sz(165, 'clamp(30px, 16.5%, 118px)');
  const portraitSize = sz(190, 'clamp(36px, 19%, 136px)');

  return (
    <div
      style={{
        ...(isPdf
          ? { position: 'absolute', top: '-9999px', left: '-9999px' }
          : {
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 'clamp(6px, 1.6vw, 24px)',
              boxSizing: 'border-box',
            }),
      }}
    >
      <div
        ref={ref}
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#fffaf0',
          boxSizing: 'border-box',
          color: '#3a2015',
          fontFamily: isEnglish
            ? '"Playfair Display", Georgia, serif'
            : '"Noto Sans Devanagari", "Mangal", Arial, sans-serif',
          ...(isPdf
            ? { width: '1000px', height: '707px', flexShrink: 0 }
            : {
                width: '100%',
                maxWidth: '860px',
                aspectRatio: '2048 / 1448',
                borderRadius: 'clamp(6px, 1.2vw, 14px)',
                boxShadow: '0 10px 30px rgba(58,32,21,0.18)',
              }),
        }}
      >
        <img
          src="/images/certificate/frame%20.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 4,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: isPdf ? '54px 66px 52px' : '7.6% 6.6% 7.4%',
            background:
              'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.96), rgba(255,250,240,0.9) 58%, rgba(246,226,178,0.68))',
            border: '1px solid rgba(153, 92, 38, 0.28)',
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 5,
            height: '100%',
            padding: isPdf ? '78px 88px 78px' : '8.6% 8.8% 7.4%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: isPdf ? '10px' : '0.8%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sz(12, 'clamp(5px, 1.5vw, 12px)') }}>
              <img
                src="/logo.jpeg"
                alt="Kumbhparv logo"
                style={{
                  width: logoSize,
                  height: logoSize,
                  objectFit: 'contain',
                }}
              />
              <img
                src="/images/certificate/candle.png"
                alt=""
                aria-hidden="true"
                style={{
                  width: logoSize,
                  height: logoSize,
                  objectFit: 'contain',
                }}
              />
            </div>

            <img
              src="/images/certificate/fadnavis.png"
              alt="Devendra Fadnavis"
              style={{
                width: portraitSize,
                height: portraitSize,
                objectFit: 'contain',
              }}
            />
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              minHeight: 0,
            }}
          >
            <h1
              style={{
                margin: 0,
                maxWidth: '100%',
                color: '#7B1C1C',
                fontSize: isEnglish ? sz(26, 'clamp(7px, 1.65vw, 17px)') : sz(34, 'clamp(9px, 2.25vw, 24px)'),
                lineHeight: 1.15,
                fontWeight: 800,
                whiteSpace: 'nowrap',
                textTransform: isEnglish ? 'uppercase' : 'none',
                letterSpacing: isEnglish ? '0.015em' : 0,
              }}
            >
              {copy.title}
            </h1>

            <div
              style={{
                width: '42%',
                height: '2px',
                margin: isPdf ? '8px 0 10px' : '0.8% 0 1%',
                background: 'linear-gradient(90deg, transparent, #D4AF37, #7B1C1C, #D4AF37, transparent)',
              }}
            />

            <p
              style={{
                margin: 0,
                color: '#6f4a21',
                fontSize: sz(15, 'clamp(5px, 1.2vw, 12px)'),
                lineHeight: 1.3,
                fontWeight: 700,
              }}
            >
              {copy.certify}
            </p>

            <div
              style={{
                minWidth: '48%',
                maxWidth: '78%',
                margin: isPdf ? '4px 0 8px' : '0.5% 0 1%',
                padding: isPdf ? '2px 24px 6px' : '0.2% 3% 0.8%',
                borderBottom: '2px solid #7B1C1C',
              }}
            >
              <span
                style={{
                  display: 'block',
                  color: '#111827',
                  fontSize: sz(25, 'clamp(8px, 1.8vw, 18px)'),
                  lineHeight: 1.15,
                  fontWeight: 800,
                  overflowWrap: 'anywhere',
                }}
              >
                {certificateName}
              </span>
            </div>

            <p
              style={{
                margin: 0,
                maxWidth: isEnglish ? '84%' : '86%',
                color: '#3a2015',
                fontSize: sz(isEnglish ? 15 : 14, isEnglish ? 'clamp(4.5px, 0.92vw, 11px)' : 'clamp(4.5px, 0.88vw, 10px)'),
                lineHeight: isEnglish ? 1.32 : 1.38,
                fontWeight: 600,
              }}
            >
              {copy.body}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              minHeight: sz(88, 'clamp(22px, 8%, 64px)'),
            }}
          >
            <div
              style={{
                width: sz(230, 'clamp(112px, 28%, 172px)'),
                textAlign: 'center',
                color: '#3a2015',
              }}
            >
              <div
                style={{
                  height: sz(22, 'clamp(5px, 2.4%, 16px)'),
                  borderBottom: '1.5px solid rgba(58,32,21,0.5)',
                  marginBottom: sz(5, 'clamp(2px, 0.6vw, 5px)'),
                }}
              />
              <div style={{ fontSize: sz(15, 'clamp(5px, 1vw, 11px)'), fontWeight: 800, lineHeight: 1.15 }}>
                {copy.cmName}
              </div>
              <div style={{ fontSize: sz(11, 'clamp(4px, 0.85vw, 9px)'), fontWeight: 700, lineHeight: 1.2 }}>
                {copy.cmTitle}
              </div>
              <div style={{ fontSize: sz(10, 'clamp(4px, 0.78vw, 8px)'), fontWeight: 700, lineHeight: 1.2 }}>
                {copy.government}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Certificate.displayName = 'Certificate';
export default Certificate;
