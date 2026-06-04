import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { homeContent } from '../data/homeContent';

const AboutKumbh = () => {
  const { language } = useAppContext();
  const content = homeContent[language] || homeContent['EN'];

  return (
    <div className="w-full pb-20" data-lang={language.toLowerCase()}>
      {/* ─── PAGE HEADER ─── */}
      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-maroon)]/5 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-[var(--color-golden)]/40"></span>
            <span className="h-px w-16 bg-gradient-to-r from-[var(--color-golden)]/60 via-[var(--color-golden)] to-[var(--color-golden)]/60"></span>
            <span className="h-px w-8 bg-[var(--color-golden)]/40"></span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="text-[var(--color-maroon)] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
          >
            {language === 'HI' ? 'कुंभ के बारे में' : language === 'MR' ? 'कुंभ बद्दल' : 'About Kumbh'}
          </motion.h1>
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
