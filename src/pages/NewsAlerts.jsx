import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Bell, Newspaper, Megaphone, FileText, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { homeContent } from '../data/homeContent';

const newsItems = [
  {
    icon: FileText,
    title: { EN: 'Establishment Of Nashik–Trimbakeshwar Kumbh Mela Authority (NTKMA)', HI: 'नासिक-त्र्यंबकेश्वर कुंभ मेला प्राधिकरण (NTKMA) की स्थापना', MR: 'नासिक-त्र्यंबकेश्वर कुंभमेळा प्राधिकरणाची (NTKMA) स्थापना' },
    date: { EN: '', HI: '', MR: '' },
    desc: {
      EN: 'Provides Statutory Framework For Organisation, Management, Budgeting, Procurement, And Legacy Management.',
      HI: 'संगठन, प्रबंधन, बजट, खरीद और विरासत प्रबंधन के लिए वैधानिक ढाँचा प्रदान करता है।',
      MR: 'संघटन, व्यवस्थापन, अर्थसंकल्प, खरेदी आणि वारसा व्यवस्थापनासाठी वैधानिक चौकट प्रदान करते.'
    },
    link: 'https://cdnbbsr.s3waas.gov.in/s36048ff4e8cb07aa60b6777b6f7384d52/uploads/2025/09/20250926685673557.pdf'
  },
  {
    icon: Shield,
    title: { EN: 'Constitution Of Apex Committee (Shikhar Samiti)', HI: 'शिखर समिति का गठन', MR: 'शिखर समितीची स्थापना' },
    subtitle: { EN: 'Under The Chairmanship Of Hon\'ble Chief Minister Of Maharashtra', HI: 'महाराष्ट्र के माननीय मुख्यमंत्री की अध्यक्षता में', MR: 'महाराष्ट्राचे माननीय मुख्यमंत्री यांच्या अध्यक्षतेखाली' },
    date: { EN: '', HI: '', MR: '' },
    desc: { EN: '', HI: '', MR: '' },
    link: 'https://cdnbbsr.s3waas.gov.in/s36048ff4e8cb07aa60b6777b6f7384d52/uploads/2025/09/202509261233796170.pdf'
  },
  {
    icon: Megaphone,
    title: { EN: 'Flag Hoisting Ceremony', HI: 'ध्वजारोहण समारोह', MR: 'ध्वजारोहण सोहळा' },
    date: { EN: 'Oct 31, 2026', HI: '३१ अक्टूबर २०२६', MR: '३१ ऑक्टोबर २०२६' },
    desc: {
      EN: 'The Sinhastha Kumbh Mela 2026-2028 officially begins with the flag hoisting ceremony at 12:02 PM.',
      HI: 'सिंहस्थ कुंभ मेला २०२६-२०२८ का ध्वजारोहण १२:०२ बजे होगा।',
      MR: 'सिंहस्थ कुंभमेळा २०२६-२०२८ चे ध्वजारोहण १२:०२ वाजता होईल.'
    }
  },
  {
    icon: Bell,
    title: { EN: 'Amrut Snan Dates Announced', HI: 'अमृत स्नान तिथियाँ घोषित', MR: 'अमृत स्नान तिथी जाहीर' },
    date: { EN: 'Coming Soon', HI: 'जल्द ही', MR: 'लवकरच' },
    desc: {
      EN: 'Sacred bathing dates for 2027 have been announced. Check the Snan Patrika section for details.',
      HI: '२०२७ के लिए पवित्र स्नान तिथियाँ घोषित कर दी गई हैं।',
      MR: '२०२७ साठी पवित्र स्नान तिथी जाहीर करण्यात आल्या आहेत.'
    }
  }
];

const NewsAlerts = () => {
  const { t, language } = useAppContext();
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
  const pdfContentRef = useRef(null);

  const downloadImage = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
        img.src = '/logo.jpeg';
      });
      await new Promise((r) => setTimeout(r, 100));
      const canvas = await html2canvas(pdfContentRef.current, {
        scale: 3,
        backgroundColor: '#FAF5F0',
        logging: false,
      });
      const link = document.createElement('a');
      link.download = 'Sinhastha-Nasik-Snan-Patrika-2027.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Image generation failed:', err);
    }
    setDownloading(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <span className="text-[var(--color-golden)] text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
          {language === 'HI' ? 'सूचना' : language === 'MR' ? 'सूचना' : 'Alerts'}
        </span>
        <h1 className="text-[var(--color-maroon)] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mt-3">
          {language === 'HI' ? 'सूचना' : language === 'MR' ? 'सूचना' : 'News & Alerts'}
        </h1>
      </motion.div>

      <div className="space-y-6">
        {newsItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={item.link ? () => window.open(item.link, '_blank') : idx === 2 ? () => navigate('/#flag-hoisting') : idx === 3 ? downloadImage : undefined}
              className={`glass-card rounded-xl p-6 sm:p-8 flex gap-5 ${item.link || idx === 2 || idx === 3 ? 'cursor-pointer' : ''}`}
            >
              <div className="shrink-0 w-12 h-12 rounded-full bg-[var(--color-golden)]/20 flex items-center justify-center">
                <Icon className="w-6 h-6 text-[var(--color-golden)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="text-lg font-bold text-[var(--color-maroon)]">{item.title[language] || item.title.EN}</h2>
                  {item.date[language] || item.date.EN ? <span className="text-xs font-semibold text-[var(--color-golden)] bg-[var(--color-golden)]/10 px-2.5 py-0.5 rounded-full">{item.date[language] || item.date.EN}</span> : null}
                </div>
                {item.subtitle && <p className="text-sm text-[var(--color-text-main)]/75 leading-relaxed mb-2">{item.subtitle[language] || item.subtitle.EN}</p>}
                {item.desc[language] || item.desc.EN ? <p className="text-sm text-[var(--color-text-main)]/75 leading-relaxed">{item.desc[language] || item.desc.EN}</p> : null}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div ref={pdfContentRef} style={{ position: 'fixed', left: '-9999px', top: '-9999px', width: '600px', background: '#FAF5F0', fontFamily: 'Georgia, serif', padding: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <img src="/logo.jpeg" alt="logo" style={{ width: '80px', height: 'auto', margin: '0 auto 16px', display: 'block' }} />
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#7B1C1C', letterSpacing: '1px', margin: '0 0 2px' }}>SINHASTHA KUMBHPARV NASIK</div>
          <div style={{ width: '100px', height: '2px', background: '#D4AF37', margin: '10px auto' }}></div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#D4AF37', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 2px' }}>{homeContent[language]?.snanPatrika?.sectionLabel || 'Snan Patrika 2027'}</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#7B1C1C', margin: '0 0 20px' }}>{homeContent[language]?.snanPatrika?.title || 'Important Bathing Dates'}</div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ background: '#7B1C1C', color: '#fff' }}>
              {(homeContent[language]?.snanPatrika?.tableHeaders || ['Date','Day','Tithi','Occasion','Location']).map((h, i) => (
                <th key={i} style={{ padding: '8px 6px', textAlign: 'left', fontSize: '10px', letterSpacing: '1px', fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(homeContent[language]?.snanPatrika?.dates || []).map((d, i) => {
              const occasionText = d.occasion.split('—')[1] ? d.occasion.split('—')[1].trim() : d.occasion;
              return (
                <tr key={i} style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.3)', background: i % 2 === 0 ? '#F8F3EC' : 'transparent' }}>
                  <td style={{ padding: '7px 6px', fontWeight: 700, color: '#7B1C1C' }}>{d.date}</td>
                  <td style={{ padding: '7px 6px', color: '#5C1515' }}>{d.day}</td>
                  <td style={{ padding: '7px 6px', fontWeight: 600, color: '#5C1515' }}>{d.tithi}</td>
                  <td style={{ padding: '7px 6px', color: '#3A2015', fontSize: '11px' }}>{occasionText}</td>
                  <td style={{ padding: '7px 6px', fontWeight: 700, color: '#D4AF37', fontSize: '10px' }}>{d.location}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <div style={{ width: '50px', height: '1px', background: '#D4AF37', margin: '0 auto 10px' }}></div>
          <div style={{ fontSize: '11px', color: '#7B1C1C', fontStyle: 'italic' }}>{t.heroSubtitle || ''}</div>
          <div style={{ fontSize: '9px', color: '#D4AF37', letterSpacing: '2px', marginTop: '4px', fontWeight: 700 }}>SINHASTHA KUMBHPARV NASIK {t.heroYears || '2026-2027'}</div>
        </div>
      </div>
    </div>
  );
};

export default NewsAlerts;
