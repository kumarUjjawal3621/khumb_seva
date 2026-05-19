import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { aboutContent } from '../data/aboutContent';

const AboutUs = () => {
  const { language } = useAppContext();
  const content = aboutContent[language] || aboutContent['EN'];
  const members = content.members;

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 min-h-[60vh] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-3xl p-6 sm:p-10 w-full border border-[var(--color-golden)]/30 shadow-sm"
      >
        <div className="text-center mb-10">
          <div className="text-[11px] font-bold tracking-[0.2em] text-[var(--color-golden)] uppercase mb-3">
            Members of NTKMA
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-maroon)] mb-6 leading-tight font-serif whitespace-pre-line">
            {content.title}
          </h1>
          <div className="w-24 h-1 bg-[var(--color-golden)] mx-auto rounded-full"></div>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto rounded-xl border border-[var(--color-golden)]/30 shadow-sm">
          <table className="w-full min-w-[600px] text-left border-collapse bg-white/50">
            <thead className="bg-[var(--color-maroon)] border-b-2 border-[var(--color-golden)]">
              <tr>
                <th className="py-4 px-6 text-xs sm:text-sm font-bold text-[var(--color-vanilla)] uppercase tracking-wider w-20 text-center">
                  {content.tableHeaders[0]}
                </th>
                <th className="py-4 px-6 text-xs sm:text-sm font-bold text-[var(--color-vanilla)] uppercase tracking-wider w-48 border-l border-[var(--color-golden)]/30">
                  {content.tableHeaders[1]}
                </th>
                <th className="py-4 px-6 text-xs sm:text-sm font-bold text-[var(--color-vanilla)] uppercase tracking-wider border-l border-[var(--color-golden)]/30">
                  {content.tableHeaders[2]}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-camel)]/20">
              {members.map((member, index) => (
                <tr 
                  key={member.sno} 
                  className={`transition-colors hover:bg-[var(--color-golden)]/10 ${index % 2 === 0 ? 'bg-white/80' : 'bg-[var(--color-camel)]/5'}`}
                >
                  <td className="py-4 px-6 text-sm text-[var(--color-maroon-dark)]/70 font-medium text-center">
                    {member.sno}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-[var(--color-maroon)] border-l border-[var(--color-camel)]/20">
                    {member.role}
                  </td>
                  <td className="py-4 px-6 text-sm text-[var(--color-text-main)] border-l border-[var(--color-camel)]/20 leading-relaxed font-medium">
                    {member.designation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
