import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const { t } = useAppContext();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-8 sm:py-16"
    >

      
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[var(--color-kumbh-charcoal)] mb-8 tracking-tight leading-[1.1]">
        {t.hero.title}
      </h1>
      
      <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-12 leading-relaxed">
        {t.hero.description}
      </p>
    </motion.div>
  );
};

export default HeroSection;
