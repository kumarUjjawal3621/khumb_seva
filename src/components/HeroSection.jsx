import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const { t } = useAppContext();

  const scrollToForm = () => {
    const formElement = document.getElementById('registration-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-8 sm:py-16"
    >
      <div className="flex justify-center mb-10">
        <img 
          src="/logo.png" 
          alt="Kumbh Parv Logo" 
          className="w-32 h-32 sm:w-48 sm:h-48 object-contain drop-shadow-xl" 
        />
      </div>
      
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[var(--color-kumbh-charcoal)] mb-8 tracking-tight leading-[1.1]">
        {t.hero.title}
      </h1>
      
      <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-12 leading-relaxed">
        {t.hero.description}
      </p>

      <motion.button
        whileHover={{ scale: 1.05, y: 2 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToForm}
        className="primary-gradient text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
      >
        {t.labels.joinUs}
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </motion.button>
    </motion.div>
  );
};

export default HeroSection;
