import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { School, GraduationCap, Theater, Mic, Video, Bus, Music, PenTool, Palette, Brush, BookOpen, Users, Building, Stethoscope } from 'lucide-react';

const eventsData = {
  EN: {
    badge: 'Activities',
    title: 'Our Activities',
    sections: [
      {
        title: 'Janjagran',
        subtitle: 'Awareness and outreach programs to educate and engage the community.',
        icon: 'School',
        items: [
          { name: 'School Programs', icon: 'School' },
          { name: 'College Programs', icon: 'GraduationCap' },
          { name: 'Street Plays', icon: 'Theater' }
        ]
      },
      {
        title: 'Bhavjagran',
        subtitle: 'Cultural and spiritual programs to connect hearts with devotion.',
        icon: 'Mic',
        items: [
          { name: 'Podcast and Interviews', icon: 'Mic' },
          { name: 'Reel Competition', icon: 'Video' },
          { name: 'Kumbh on Wheels', icon: 'Bus' },
          { name: 'Dance Competition', icon: 'Music' },
          { name: 'Essay Competition', icon: 'PenTool' },
          { name: 'Rangoli Competition', icon: 'Palette' },
          { name: 'Drawing Competition', icon: 'Brush' },
          { name: 'Stotra Reciting Competition', icon: 'BookOpen' }
        ]
      },
      {
        title: 'Jansahabhag',
        subtitle: 'Collaborative events bringing together community leaders and professionals.',
        icon: 'Users',
        items: [
          { name: 'Influencer Meetup', icon: 'Users' },
          { name: 'Industry Meetup', icon: 'Building' },
          { name: 'IMA Meetup', icon: 'Stethoscope' }
        ]
      }
    ]
  },
  HI: {
    badge: 'कार्यक्रम',
    title: 'हमारे कार्यक्रम',
    sections: [
      {
        title: 'जनजागरण',
        subtitle: 'समुदाय को शिक्षित और जागरूक करने के लिए जनजागरण कार्यक्रम।',
        icon: 'School',
        items: [
          { name: 'स्कूल', icon: 'School' },
          { name: 'कॉलेज / महाविद्यालय', icon: 'GraduationCap' },
          { name: 'नुक्कड़ नाटक', icon: 'Theater' }
        ]
      },
      {
        title: 'भावजागरण',
        subtitle: 'भक्ति और सांस्कृतिक भावना से हृदय जोड़ने वाले कार्यक्रम।',
        icon: 'Mic',
        items: [
          { name: 'पॉडकास्ट और साक्षात्कार', icon: 'Mic' },
          { name: 'रील प्रतियोगिता', icon: 'Video' },
          { name: 'कुंभ ऑन व्हील्स', icon: 'Bus' },
          { name: 'नृत्य प्रतियोगिता', icon: 'Music' },
          { name: 'निबंध प्रतियोगिता', icon: 'PenTool' },
          { name: 'रंगोली प्रतियोगिता', icon: 'Palette' },
          { name: 'चित्रकला प्रतियोगिता', icon: 'Brush' },
          { name: 'स्तोत्र पठन प्रतियोगिता', icon: 'BookOpen' }
        ]
      },
      {
        title: 'जनसहभाग',
        subtitle: 'सामुदायिक नेताओं और पेशेवरों को एक साथ लाने वाले सहयोगी कार्यक्रम।',
        icon: 'Users',
        items: [
          { name: 'इन्फ्लुएंसर मीटअप', icon: 'Users' },
          { name: 'इंडस्ट्री मीटअप', icon: 'Building' },
          { name: 'आईएमए (IMA) मीटअप', icon: 'Stethoscope' }
        ]
      }
    ]
  },
  MR: {
    badge: 'उपक्रम',
    title: 'आमचे उपक्रम',
    sections: [
      {
        title: 'जनजागरण',
        subtitle: 'समाजाला शिक्षित आणि जागरूक करण्यासाठी जनजागरण उपक्रम.',
        icon: 'School',
        items: [
          { name: 'शाळा', icon: 'School' },
          { name: 'महाविद्यालय', icon: 'GraduationCap' },
          { name: 'पथनाट्य', icon: 'Theater' }
        ]
      },
      {
        title: 'भावजागरण',
        subtitle: 'भावना आणि भक्तीने हृदय जोडणारे सांस्कृतिक उपक्रम.',
        icon: 'Mic',
        items: [
          { name: 'पॉडकास्ट आणि मुलाखती', icon: 'Mic' },
          { name: 'रील्स स्पर्धा', icon: 'Video' },
          { name: 'कुंभ ऑन व्हील्स', icon: 'Bus' },
          { name: 'नृत्य स्पर्धा', icon: 'Music' },
          { name: 'निबंध स्पर्धा', icon: 'PenTool' },
          { name: 'रांगोळी स्पर्धा', icon: 'Palette' },
          { name: 'चित्रकला स्पर्धा', icon: 'Brush' },
          { name: 'स्तोत्रपठण स्पर्धा', icon: 'BookOpen' }
        ]
      },
      {
        title: 'जनसहभाग',
        subtitle: 'समुदाय नेते आणि व्यावसायिकांना एकत्र आणणारे सहयोगी उपक्रम.',
        icon: 'Users',
        items: [
          { name: 'इन्फ्लुएन्सर मीटअप', icon: 'Users' },
          { name: 'इंडस्ट्री (उद्योग) मीटअप', icon: 'Building' },
          { name: 'आय.एम.ए. (IMA) मीटअप', icon: 'Stethoscope' }
        ]
      }
    ]
  }
};

const iconMap = {
  School, GraduationCap, Theater, Mic, Video, Bus, Music, PenTool, Palette, Brush, BookOpen, Users, Building, Stethoscope
};

const sectionIconMap = {
  School: School,
  Mic: Mic,
  Users: Users
};

const Events = () => {
  const { language } = useAppContext();
  const content = eventsData[language] || eventsData['EN'];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 12 } }
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden pt-6 sm:pt-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-golden)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[var(--color-maroon)]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8 pt-4 sm:pt-6">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[10px] font-bold text-[var(--color-golden)] uppercase tracking-[0.25em] mb-4"
          >
            {content.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--color-maroon)] leading-tight font-serif"
          >
            {content.title}
          </motion.h1>
        </div>

        {/* Sections */}
        <div className="space-y-8 sm:space-y-12">
          {content.sections.map((section, sIdx) => {
            const SectionIcon = sectionIconMap[section.icon] || School;

            return (
              <motion.section
                key={sIdx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: sIdx * 0.1 }}
              >
                {/* Section Header */}
                <div className="mb-4 sm:mb-5">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 rounded-lg bg-[var(--color-maroon)]/8 flex items-center justify-center text-[var(--color-maroon)]">
                      <SectionIcon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-[var(--color-maroon)] font-serif">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-text-main)]/55 ml-12 mb-3 leading-relaxed max-w-lg">
                    {section.subtitle}
                  </p>
                  <div className="w-full h-px bg-gradient-to-r from-[var(--color-maroon)]/15 via-[var(--color-golden)]/20 to-transparent" />
                </div>

                {/* Cards Grid */}
                  <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3"
                >
                  {section.items.map((item, iIdx) => {
                    const IconComp = iconMap[item.icon] || School;
                    return (
                      <motion.div
                        key={iIdx}
                        variants={itemVariants}
                        whileHover={{ y: -2 }}
                        className="group rounded-xl border border-[var(--color-golden)]/15 bg-white/60 px-3 py-4 sm:py-5 flex flex-col items-center text-center cursor-default transition-all duration-300 hover:border-[var(--color-golden)]/35 hover:bg-white/90 hover:shadow-[0_6px_20px_-8px_rgba(123,28,28,0.12)]"
                      >
                        <div className="w-9 h-9 rounded-full bg-[var(--color-maroon)]/6 flex items-center justify-center text-[var(--color-maroon)]/70 mb-2 transition-all duration-300 group-hover:bg-[var(--color-maroon)]/10 group-hover:text-[var(--color-maroon)]">
                          <IconComp className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-semibold text-[var(--color-maroon)]/80 leading-snug transition-colors duration-300 group-hover:text-[var(--color-maroon)]">
                          {item.name}
                        </h3>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;