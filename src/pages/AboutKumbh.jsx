import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { homeContent } from '../data/homeContent';

const AboutKumbh = () => {
  const { language } = useAppContext();
  const content = homeContent[language] || homeContent['EN'];
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (heading) => {
    setOpenSections((prev) => ({
      ...prev,
      [heading]: !prev[heading]
    }));
  };

  const collapsibleHeadings = {
    EN: new Set([
      'Location Determination of Kumbh Parva:',
      'Kumbh Parva and Adi Shankaracharya:',
      'Naga Sadhus:',
      'Kumbh Parva: A Festival of Indian Knowledge Traditions:',
      'The Mythological Story of Kumbh Parva:'
    ]),
    HI: new Set([
      'कुंभपर्व की पौराणिक कथा:',
      'कुंभपर्व का स्थान निर्धारण:',
      'कुंभपर्व और आद्य शंकराचार्य:',
      'नागा साधु:',
      'कुंभपर्व - भारतीय ज्ञान परंपराओं का उत्सव:',
    ]),
    MR: new Set([
      'कुंभपर्वाची पौराणिक कथा',
      'कुंभपर्वाची स्थाननिश्चिती',
      'कुंभपर्व आणि आद्य शंकराचार्य:',
      'नागा साधू:',
      'कुंभपर्व भारतीय ज्ञान परंपरांचा उत्सव:',
    ])
  };

  return (
    <div className="w-full pb-20" data-lang={language.toLowerCase()}>
      {/* ─── HERO ─── */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src="/images/about kumbh hero.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-8 bg-[var(--color-golden)]/40"></span>
              <span className="h-px w-16 bg-gradient-to-r from-[var(--color-golden)]/60 via-[var(--color-golden)] to-[var(--color-golden)]/60"></span>
              <span className="h-px w-8 bg-[var(--color-golden)]/40"></span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              className="text-white text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-lg"
            >
              {language === 'HI' ? 'कुंभ के बारे में' : language === 'MR' ? 'कुंभ बद्दल' : 'About Kumbh'}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* ─── INTRODUCTION ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-8 pt-10 sm:pt-16 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center justify-start gap-3 mb-6">
            <span className="h-px w-8 bg-[var(--color-golden)]/40"></span>
            <span className="h-px w-16 bg-gradient-to-r from-[var(--color-golden)]/60 via-[var(--color-golden)] to-[var(--color-golden)]/60"></span>
            <span className="h-px w-8 bg-[var(--color-golden)]/40"></span>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-left text-[var(--color-golden)] text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-4"
          >
            {content.intro.sectionLabel || 'The Divine Story'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="text-left text-[var(--color-maroon)] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
          >
            {content.intro.title}
          </motion.h2>
          <div className="mb-10 mt-6 space-y-6">
            {content.intro.paragraphs.slice(0, 2).map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.2 }}
                className="text-[var(--color-text-main)] text-base sm:text-lg leading-[1.9] font-medium text-justify"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* ─── DUAL SACRED GEOGRAPHY ─── */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-[var(--color-text-main)] text-base sm:text-lg leading-[1.9] font-medium text-justify mb-6"
          >
            {content.intro.paragraphs[7]}
          </motion.p>

          {/* ─── RAMKUND & KUSHAVARTA IMAGES ─── */}
          <div className="pt-3 pb-6 w-full">
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2">
              <div className="flex flex-col items-center gap-2 relative z-10 sm:flex-1 sm:max-w-[44%]">
                <motion.img
                  src="/images/ramkunda1.jpeg"
                  alt="Ramkund"
                  initial={{ x: -80, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="w-full max-w-[420px] h-auto object-contain drop-shadow-xl"
                />
                <div className="text-center w-full max-w-[420px] mx-auto">
                  <p className="text-[var(--color-maroon)] text-sm sm:text-base font-bold tracking-wide">Ramkund, Panchavati</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 relative z-10 sm:flex-1 sm:max-w-[44%]">
                <motion.img
                  src="/images/kushvarta1.jpeg"
                  alt="Kushavarta"
                  initial={{ x: 80, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="w-full max-w-[420px] h-auto object-contain drop-shadow-xl"
                />
                <div className="text-center w-full max-w-[420px] mx-auto">
                  <p className="text-[var(--color-maroon)] text-sm sm:text-base font-bold tracking-wide">Kushavarta, Trimbakeshwar</p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── PARAGRAPHS & COLLAPSIBLES ─── */}
          <div className="mb-8 mt-4 space-y-3">
            {(() => {
              const triggers = {
                EN: '30 km',
                HI: 'दो विशिष्ट तीर्थस्थलों',
                MR: 'दोन स्वतंत्र तीर्थक्षेत्रांमध्ये',
              };
              const regularEls = [];
              const collapsibleEls = [];

              content.intro.paragraphs.forEach((para, idx) => {
                if (idx < 2) return;
                const isDualSection = para.includes(triggers[language] || triggers.EN);
                const headingsSet = collapsibleHeadings[language] || collapsibleHeadings.EN;
                const matchedHeading = Array.from(headingsSet).find((heading) => para.startsWith(heading));
                const isCollapsible = Boolean(matchedHeading);

                if (isCollapsible && matchedHeading) {
                  const heading = matchedHeading;
                  const body = para.slice(heading.length).trim();
                  const isOpen = openSections[heading];
                  collapsibleEls.push(
                    <div key={`collapsible-${idx}`} className="w-full border-b border-[var(--color-golden)]/20">
                      <button
                        type="button"
                        onClick={() => toggleSection(heading)}
                        className="w-full flex items-center justify-between py-2.5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="font-serif font-semibold text-base sm:text-lg text-[var(--color-maroon)] leading-snug pr-3">
                          {heading}
                        </span>
                        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-[var(--color-golden)]/40 flex items-center justify-center text-[var(--color-golden)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="overflow-hidden px-0 pb-3"
                          >
                            <p className="text-[var(--color-text-main)] text-sm sm:text-base leading-6 font-medium text-justify">
                              {body}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                  return;
                }

                if (isDualSection) return;

                const pEl = (
                  <motion.p
                    key={`p-${idx}`}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.2 }}
                    className="text-[var(--color-text-main)] text-sm sm:text-base leading-[1.7] font-medium text-justify"
                  >
                    {para}
                  </motion.p>
                );
                regularEls.push(pEl);
              });

              return [...regularEls, ...collapsibleEls];
            })()}
          </div>
        </div>
      </section>

      {/* ─── TRIKHANDI YOG ─── */}
      <section id="trikhandi" className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-8 pt-10 sm:pt-16 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center justify-start gap-3 mb-6">
            <span className="h-px w-8 bg-[var(--color-golden)]/40"></span>
            <span className="h-px w-16 bg-gradient-to-r from-[var(--color-golden)]/60 via-[var(--color-golden)] to-[var(--color-golden)]/60"></span>
            <span className="h-px w-8 bg-[var(--color-golden)]/40"></span>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-left text-[var(--color-golden)] text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-2 leading-relaxed"
          >
            {language === 'HI' ? 'त्रिखंड योग — सिंहस्थ कुंभ का अलौकिक संयोग' : language === 'MR' ? 'त्रिखंड योग — सिंहस्थ कुंभपर्वाचा अलौकिक संयोग' : 'The Celestial Wonder of Sinhastha Kumbh'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="text-left text-[var(--color-maroon)] text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight max-w-4xl"
          >
            {content.trikhandiYog.title}
          </motion.h2>
          <img
            src="/images/trikhand.png"
            alt=""
            aria-hidden
            className="block lg:hidden w-3/4 mx-auto my-6 h-auto object-contain"
          />
          <div className="mb-6 mt-6 space-y-6">
            <img
              src="/images/trikhand.png"
              alt="Trikhand Yog"
              className="hidden lg:block float-right w-[40%] lg:w-[35%] ml-6 lg:ml-8 mb-4 h-auto object-contain"
            />
            {content.trikhandiYog.paragraphs.slice(1, 3).map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.2 }}
                className="text-[var(--color-text-main)] text-base sm:text-lg leading-[1.9] font-medium text-justify max-w-4xl"
              >
                {para}
              </motion.p>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            {content.trikhandiYog.paragraphs.slice(3, 6).map((para, idx) => {
              let title = '';
              let desc = para;
              const colonIdx = para.indexOf(':');
              const dashIdx = para.indexOf(' \u2014 ');
              const questionIdx = para.indexOf('? ');
              if (questionIdx !== -1 && (colonIdx === -1 || questionIdx < colonIdx) && (dashIdx === -1 || questionIdx < dashIdx)) {
                title = para.substring(0, questionIdx + 1).trim();
                desc = para.substring(questionIdx + 2).trim();
              } else if (colonIdx !== -1) {
                title = para.substring(0, colonIdx).trim();
                desc = para.substring(colonIdx + 1).trim();
              } else if (dashIdx !== -1) {
                title = para.substring(0, dashIdx).trim();
                desc = para.substring(dashIdx + 3).trim();
              }
              const isFullWidth = idx === 2;
              return (
                <motion.div
                  key={idx}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.15 }}
                  className={`${isFullWidth ? 'sm:col-span-2' : ''} bg-white/[0.04] backdrop-blur-[1px] border border-[var(--color-golden)]/30 p-6 sm:p-8 rounded-2xl hover:border-[var(--color-golden)]/60 transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-2 h-2 rounded-full ${idx === 2 ? 'bg-[var(--color-maroon)]' : 'bg-[var(--color-golden)]'}`}></span>
                    <h4 className={`${isFullWidth ? 'type-card-heading' : 'type-card-heading'} text-[var(--color-maroon)] mb-0`}>{title}</h4>
                  </div>
                  <p className="text-[var(--color-text-main)] text-sm sm:text-base leading-[1.8] font-medium font-semibold text-justify">
                    {desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutKumbh;
