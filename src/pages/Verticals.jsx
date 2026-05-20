import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { verticalsContent } from '../data/verticalsContent';
import { Megaphone, ShieldCheck, HeartHandshake, Leaf, CalendarDays, Flame } from 'lucide-react';

const iconMap = {
  Megaphone,
  ShieldCheck,
  HeartHandshake,
  Leaf,
  CalendarDays,
  Flame
};

const Verticals = () => {
  const { language } = useAppContext();
  const items = verticalsContent[language] || verticalsContent['EN'];

  // Localized headings for the page
  const pageHeadings = {
    EN: {
      title: "Our Work Verticals",
      subtitle: "The pillars of our service and commitment to the holy Kumbhparv.",
      badge: "Areas of Seva"
    },
    HI: {
      title: "हमारे कार्य क्षेत्र (वर्टिकल्स)",
      subtitle: "पवित्र कुंभपर्व के लिए हमारी सेवा और प्रतिबद्धता के प्रमुख स्तंभ।",
      badge: "सेवा के क्षेत्र"
    },
    MR: {
      title: "आमचे कार्य क्षेत्र (वर्टिकल्स)",
      subtitle: "पवित्र कुंभपर्वासाठी आमच्या सेवा आणि वचनबद्धतेचे प्रमुख स्तंभ।",
      badge: "सेवेचे क्षेत्र"
    }
  };

  const headings = pageHeadings[language] || pageHeadings['EN'];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 min-h-[70vh] flex flex-col items-center">
      {/* Page Header */}
      <div className="text-center mb-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[11px] font-bold tracking-[0.2em] text-[var(--color-golden)] uppercase px-4 py-1.5 rounded-full bg-[var(--color-maroon)]/10 border border-[var(--color-golden)]/30 mb-4 shadow-sm"
        >
          {headings.badge}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-maroon)] mb-4 leading-tight font-serif"
        >
          {headings.title}
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-[var(--color-golden)] mx-auto rounded-full mb-5"
        ></motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-[var(--color-text-main)]/80 font-medium leading-relaxed font-sans"
        >
          {headings.subtitle}
        </motion.p>
      </div>

      {/* Grid of Verticals */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        {items.map((item) => {
          const IconComponent = iconMap[item.iconName] || Megaphone;
          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 12px 24px -10px rgba(123, 28, 28, 0.15)",
                borderColor: "rgba(212, 175, 55, 0.6)"
              }}
              className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[var(--color-camel)]/35 shadow-sm transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-full bg-[var(--color-vanilla)] flex items-center justify-center border border-[var(--color-golden)]/30 text-[var(--color-maroon)] mb-5 shadow-inner transition-colors duration-300 group-hover:bg-[var(--color-maroon)] group-hover:text-[var(--color-vanilla)] group-hover:border-[var(--color-maroon)]">
                <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-[var(--color-maroon)] mb-3 font-serif">
                {item.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-700 leading-relaxed font-sans">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Verticals;
