import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { School, GraduationCap, Theater, Mic, Video, Bus, Music, PenTool, Palette, Brush, BookOpen, Users, Building, Stethoscope } from 'lucide-react';

const eventsData = {
  EN: {
    badge: 'Events',
    title: 'Our Events',
    sections: [
      {
        title: 'Janjagran Events',
        subtitle: 'Awareness and outreach programs to educate and engage the community.',
        icon: 'School',
        items: [
          { name: 'School Programs', icon: 'School' },
          { name: 'College Programs', icon: 'GraduationCap' },
          { name: 'Street Plays', icon: 'Theater' }
        ]
      },
      {
        title: 'Bhavjagran Events',
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
        title: 'Jansahabhag Events',
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
        title: 'जनजागरण कार्यक्रम',
        subtitle: 'समुदाय को शिक्षित और जागरूक करने के लिए आउटरीच कार्यक्रम।',
        icon: 'School',
        items: [
          { name: 'स्कूल', icon: 'School' },
          { name: 'कॉलेज / महाविद्यालय', icon: 'GraduationCap' },
          { name: 'नुक्कड़ नाटक', icon: 'Theater' }
        ]
      },
      {
        title: 'भावजागरण कार्यक्रम',
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
        title: 'जनसहभाग कार्यक्रम',
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
        title: 'जनजागरण उपक्रम',
        subtitle: 'समाजाला शिक्षित आणि जागरूक करण्यासाठी आउटरीच उपक्रम.',
        icon: 'School',
        items: [
          { name: 'शाळा', icon: 'School' },
          { name: 'महाविद्यालय', icon: 'GraduationCap' },
          { name: 'पथनाट्य', icon: 'Theater' }
        ]
      },
      {
        title: 'भावजागरण उपक्रम',
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
        title: 'जनसहभाग उपक्रम',
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

const sectionColors = {
  'Janjagran': { from: '#7B1C1C', to: '#A52A2A', light: 'rgba(123,28,28,0.08)' },
  'Bhavjagran': { from: '#D4AF37', to: '#C5A028', light: 'rgba(212,175,55,0.08)' },
  'Jansahabhag': { from: '#8B4513', to: '#6B3410', light: 'rgba(139,69,19,0.08)' }
};

const getSectionKey = (title) => {
  if (title.includes('Janjagran') || title.includes('जनजागरण')) return 'Janjagran';
  if (title.includes('Bhavjagran') || title.includes('भावजागरण')) return 'Bhavjagran';
  return 'Jansahabhag';
};

const Events = () => {
  const { language } = useAppContext();
  const content = eventsData[language] || eventsData['EN'];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 min-h-[70vh]">
      {/* Page Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[11px] font-bold text-[var(--color-golden)] uppercase px-4 py-1.5 rounded-full bg-[var(--color-maroon)]/10 border border-[var(--color-golden)]/30 mb-4 shadow-sm"
        >
          {content.badge}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-maroon)] mb-4 leading-tight font-serif"
        >
          {content.title}
        </motion.h1>
      </div>

      {/* Sections */}
      <div className="space-y-16">
        {content.sections.map((section, sIdx) => {
          const key = getSectionKey(section.title);
          const colors = sectionColors[key];
          const SectionIcon = sectionIconMap[section.icon] || School;

          return (
            <motion.section
              key={sIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-2">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                  style={{ background: colors.light, color: colors.from }}
                >
                  <SectionIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif" style={{ color: colors.from }}>
                    {section.title}
                  </h2>
                  <p className="text-sm text-[var(--color-text-main)]/70 mt-0.5">{section.subtitle}</p>
                </div>
              </div>
              <div className="w-full h-px bg-gradient-to-r my-5" style={{ background: `linear-gradient(to right, ${colors.from}30, transparent)` }} />

              {/* Cards Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {section.items.map((item, iIdx) => {
                  const IconComp = iconMap[item.icon] || School;
                  return (
                    <motion.div
                      key={iIdx}
                      variants={itemVariants}
                      whileHover={{ y: -4, boxShadow: `0 8px 20px -8px ${colors.from}40` }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-[var(--color-camel)]/30 shadow-sm transition-all duration-300 flex flex-col items-center text-center group cursor-default"
                      style={{ borderColor: `${colors.from}15` }}
                    >
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center mb-3 transition-colors duration-300"
                        style={{
                          background: colors.light,
                          color: colors.from
                        }}
                      >
                        <IconComp className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <h3 className="text-sm font-bold text-[var(--color-maroon)] leading-snug">
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
  );
};

export default Events;
