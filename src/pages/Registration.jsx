import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, CheckCircle2, Save, Download, Share2 } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import jsPDF from 'jspdf';
import Certificate from '../components/Certificate';

const highlightWords = {
  EN: {
    pledge: [
      'social harmony',
      'traditional knowledge systems',
      'support municipal authorities',
      'Segregate wet and dry waste',
      'Minimize plastic usage',
      'Plant at least one tree',
      'rivers', 'clean and pure',
      'civic rules',
      'traffic rules',
      'one meal together',
      'family deities together',
      'temples with family',
      'indigenous products',
      'support', 'local', 'vendors',
      'local food and traditional products',
      'cooperate with authorities',
      'during emergencies',
      'Assist pilgrims',
    ],
    seva: [
      'serve as a volunteer',
      'medical services',
      'emergency management', 'relief operations',
      'food donation',
      'senior citizen', 'multilingual guidance',
      'financial contribution',
      'business opportunities',
      'all my employees',
      'technical support',
      'mentor a small entrepreneur',
      'security management',
      'accommodation (home stay)',
      'training', 'service activities',
      'provide training',
      'environment and civic support',
      'cleanliness drives',
      'guide pilgrims',
      'traffic management',
      'digital platforms',
    ],
  },
  HI: {
    pledge: [
      'सामाजिक सद्भाव',
      'पारंपरिक ज्ञान प्रणालियों',
      'नगर प्राधिकरणों', 'समर्थन करें',
      'गीले और सूखे कचरे को अलग करें',
      'प्लास्टिक का उपयोग कम करें',
      'एक पेड़ लगाएं',
      'नदियों', 'स्वच्छ और पवित्र',
      'नागरिक नियमों',
      'यातायात नियमों',
      'एक भोजन एक साथ',
      'एक साथ कुलदेवता की पूजा',
      'परिवार के साथ', 'मंदिर',
      'स्वदेशी उत्पादों',
      'समर्थन', 'स्थानीय', 'विक्रेताओं',
      'स्थानीय भोजन और पारंपरिक उत्पादों',
      'अधिकारियों के साथ सहयोग करें',
      'आपात स्थिति',
      'तीर्थयात्रियों', 'सहायता करें',
    ],
    seva: [
      'स्वयंसेवक के रूप में सेवा करने',
      'चिकित्सा सेवाओं',
      'आपदा प्रबंधन', 'राहत कार्यों',
      'अन्नदान',
      'वरिष्ठ नागरिक', 'बहुभाषी मार्गदर्शन',
      'वित्तीय योगदान',
      'व्यावसायिक अवसरों',
      'अपने सभी कर्मचारियों',
      'तकनीकी सहायता',
      'एक छोटे उद्यमी का', 'मार्गदर्शन',
      'सुरक्षा प्रबंधन',
      'आवास (होम स्टे)',
      'प्रशिक्षण', 'सेवा गतिविधियों',
      'प्रशिक्षण प्रदान करने',
      'पर्यावरण और नागरिक सहायता',
      'स्वच्छता अभियानों',
      'तीर्थयात्रियों का मार्गदर्शन',
      'यातायात प्रबंधन',
      'डिजिटल प्लेटफॉर्म',
    ],
  },
  MR: {
    pledge: [
      'सामाजिक सद्भावाचा',
      'पारंपरिक ज्ञान प्रणालींचा',
      'नगर प्राधिकरणांना', 'सहकार्य करा',
      'ओला आणि सुका कचरा वेगळा करा',
      'प्लास्टिकचा वापर कमी करा',
      'एक झाड लावा',
      'नद्या', 'स्वच्छ आणि पवित्र',
      'नागरी नियम',
      'वाहतूक नियमांचे',
      'एक जेवण एकत्र',
      'एकत्र कुलदेवतेची पूजा',
      'कुटुंबासह', 'मंदिरात',
      'स्वदेशी उत्पादने',
      'पाठिंबा', 'स्थानिक', 'विक्रेते',
      'स्थानीय अन्न आणि पारंपरिक उत्पादनांचा',
      'अधिकाऱ्यांशी सहकार्य करा',
      'आणीबाणी',
      'यात्रेकरूंना', 'मदत करा',
    ],
    seva: [
      'स्वयंसेवक म्हणून काम करण्यास',
      'वैद्यकीय सेवा',
      'आपत्ती व्यवस्थापन', 'मदत कार्यात',
      'अन्नदान',
      'ज्येष्ठ नागरिक', 'बहुभाषिक मार्गदर्शन',
      'आर्थिक योगदान',
      'व्यावसायिक संधी',
      'माझ्या सर्व कर्मचाऱ्यांसह',
      'तांत्रिक सहाय्य',
      'एका लहान उद्योजकाला', 'मार्गदर्शन',
      'सुरक्षा व्यवस्थापनात',
      'निवारा (होम स्टे)',
      'प्रशिक्षण', 'सेवा उपक्रमांसाठी',
      'प्रशिक्षण देण्यास',
      'पर्यावरण आणि नागरी समर्थन',
      'स्वच्छता मोहिमेत',
      'यात्रेकरूंना मार्गदर्शन',
      'वाहतूक व्यवस्थापन',
      'डिजिटल प्लॅटफॉर्म',
    ],
  },
};

const highlightText = (text, keywords) => {
  if (!keywords || keywords.length === 0) return text;
  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  const escaped = sorted.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  const keywordSet = new Set(keywords.map(k => k.toLowerCase()));
  return parts.map((part, i) =>
    keywordSet.has(part.toLowerCase()) ? <span key={i} className="font-bold text-[var(--color-maroon)]">{part}</span> : part
  );
};

const Registration = () => {
  const { t, language, setLanguage } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    address: '',
    gender: '',
    bloodGroup: '',
    birthdate: '',
    area: '',
    suggestion: '',
    pledgeAccepted: false,
    selectedSevas: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  const printRef = useRef(null);

  useEffect(() => {
    // Automatically scroll to the form after 1.5 seconds
    const timer = setTimeout(() => {
      const el = document.getElementById('language-selection');
      if (el) {
        // Use an offset to account for the sticky header (approx 80-100px)
        const offset = 100;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const updateFormData = (data) => setFormData(prev => ({ ...prev, ...data }));

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.whatsapp.trim() || formData.whatsapp.length < 10) newErrors.whatsapp = 'Valid number required';
    if (!formData.gender) newErrors.gender = 'Required';
    if (!formData.pledgeAccepted) newErrors.pledge = 'Pledge Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleSeva = (index) => {
    const current = formData.selectedSevas;
    const isSelected = current.includes(index);
    updateFormData({
      selectedSevas: isSelected ? current.filter(i => i !== index) : [...current, index]
    });
  };

  const handleSubmit = async () => {
    if (!validate()) {
      if (errors.pledge || !formData.pledgeAccepted) {
        alert(t.labels.pledgeAcceptError || "Please accept the Citizens' Pledge to continue.");
      } else {
        alert("Please fill all required user details correctly.");
      }
      const el = document.getElementById('registration-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'users'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Submission failed. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = async () => {
    if (!printRef.current) return;
    setIsDownloading(true);
    try {
      const imgData = printRef.current.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1000, 707] });
      pdf.addImage(imgData, 'PNG', 0, 0, 1000, 707);
      pdf.save('Kumbh_Parv_Certificate.pdf');
    } catch (error) {
      console.error("Error generating PDF", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!printRef.current) return;
    setIsSharing(true);
    try {
      printRef.current.toBlob(async (blob) => {
        const file = new File([blob], 'Kumbh_Certificate.png', { type: 'image/png' });
        if (navigator.share) {
          await navigator.share({
            title: 'Kumbhparv 2027 Certificate',
            text: 'I have taken the Citizens Pledge for Kumbhparv Nasik 2027!',
            files: [file]
          });
        } else {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'Kumbh_Certificate.png';
          link.click();
          alert("Image downloaded. You can now share it manually!");
        }
      });
    } catch (error) {
      console.error("Error sharing", error);
    } finally {
      setIsSharing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-20 h-20 bg-[var(--color-camel)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[var(--color-golden)]" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--color-maroon)] mb-3">{t.labels.step4Title}</h2>
          <p className="text-[var(--color-maroon-dark)]/80 text-lg">{t.labels.step4Desc}</p>
        </motion.div>

        {/* Preview Container */}
        <div className="mb-10 max-w-2xl mx-auto border-4 border-[var(--color-golden)]/30 rounded-[18px] p-2 bg-[var(--color-camel)]/5 shadow-xl">
          <Certificate preview={true} overrideData={formData} />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="primary-gradient px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all flex-1 border border-[var(--color-golden)]/50"
          >
            {isDownloading ? <div className="w-5 h-5 border-2 border-[var(--color-maroon)] border-t-transparent rounded-full animate-spin" /> : <Download className="w-5 h-5 text-[var(--color-maroon)]" />}
            {isDownloading ? t.labels.generatingPdf : t.labels.downloadCertificate}
          </button>
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="bg-white text-[var(--color-maroon)] border-2 border-[var(--color-golden)] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[var(--color-camel)]/10 transition-all flex-1 shadow-sm"
          >
            {isSharing ? <div className="w-5 h-5 border-2 border-[var(--color-maroon)] border-t-transparent rounded-full animate-spin" /> : <Share2 className="w-5 h-5 text-[var(--color-maroon)]" />}
            {isSharing ? 'Preparing...' : 'Share'}
          </button>
        </div>

        {/* Hidden component for printing */}
        <Certificate ref={printRef} overrideData={formData} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 px-4 pt-10 sm:pt-12">

      {/* Language Selection */}
      <motion.div 
        id="language-selection"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-4 mb-4"
      >
        <p className="text-sm font-bold text-[var(--color-maroon-dark)]/70 uppercase tracking-widest">{t.labels.language}</p>
        <div className="flex bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-[var(--color-golden)]/30">
          {[
            { code: 'EN', label: 'English' },
            { code: 'HI', label: 'हिन्दी' },
            { code: 'MR', label: 'मराठी' }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                language === lang.code 
                  ? 'bg-[var(--color-golden)] text-[var(--color-maroon)] shadow-md' 
                  : 'text-[var(--color-maroon-dark)]/60 hover:text-[var(--color-maroon)] hover:bg-[var(--color-camel)]/10'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* User Details */}
      <section id="registration-form" className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-maroon)] mb-2">{t.labels.step1Title}</h2>
          <p className="text-[var(--color-text-main)]/80">{t.labels.step1Desc}</p>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-1">{t.labels.name} *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-[var(--color-maroon)]/50" /></div>
                <input type="text" value={formData.name} onChange={(e) => updateFormData({ name: e.target.value })} className={`block w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-500 bg-red-50' : 'border-[var(--color-camel)]/30 bg-white/80'} rounded-xl focus:ring-2 focus:ring-[var(--color-golden)] focus:border-transparent outline-none transition-all shadow-sm`} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-1">{t.labels.email}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-[var(--color-maroon)]/50" /></div>
                <input type="email" value={formData.email} onChange={(e) => updateFormData({ email: e.target.value })} className={`block w-full pl-10 pr-3 py-3 border border-[var(--color-camel)]/30 bg-white/80 rounded-xl focus:ring-2 focus:ring-[var(--color-golden)] focus:border-transparent outline-none transition-all shadow-sm`} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-1">{t.labels.whatsapp} *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-[var(--color-maroon)]/50" /></div>
                <input type="tel" value={formData.whatsapp} onChange={(e) => updateFormData({ whatsapp: e.target.value })} className={`block w-full pl-10 pr-3 py-3 border ${errors.whatsapp ? 'border-red-500 bg-red-50' : 'border-[var(--color-camel)]/30 bg-white/80'} rounded-xl focus:ring-2 focus:ring-[var(--color-golden)] focus:border-transparent outline-none transition-all shadow-sm`} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-1">{t.labels.address}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin className="h-5 w-5 text-[var(--color-maroon)]/50" /></div>
                <input type="text" value={formData.address} onChange={(e) => updateFormData({ address: e.target.value })} className={`block w-full pl-10 pr-3 py-3 border border-[var(--color-camel)]/30 bg-white/80 rounded-xl focus:ring-2 focus:ring-[var(--color-golden)] focus:border-transparent outline-none transition-all shadow-sm`} />
              </div>
            </div>

            {/* Age Group Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-1">{t.labels.birthdate}</label>
              <input
                type="date"
                value={formData.birthdate}
                onChange={(e) => updateFormData({ birthdate: e.target.value })}
                className="block w-full px-4 py-3 border border-[var(--color-camel)]/30 bg-white/80 rounded-xl focus:ring-2 focus:ring-[var(--color-golden)] focus:border-transparent outline-none transition-all shadow-sm text-[var(--color-text-main)]"
              />
            </div>

            {/* Area Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-1">{t.labels.area}</label>
              <select 
                value={formData.area} 
                onChange={(e) => updateFormData({ area: e.target.value })}
                className="block w-full px-4 py-3 border border-[var(--color-camel)]/30 bg-white/80 rounded-xl focus:ring-2 focus:ring-[var(--color-golden)] focus:border-transparent outline-none transition-all shadow-sm text-[var(--color-text-main)]"
              >
                <option value="">{t.labels.selectArea}</option>
                {t.areas.map((area, idx) => (
                  <option key={idx} value={area}>{area}</option>
                ))}
              </select>
            </div>

            {/* Gender Dropdown (mandatory) */}
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-1">{t.labels.gender} *</label>
              <select
                value={formData.gender}
                onChange={(e) => updateFormData({ gender: e.target.value })}
                className={`block w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[var(--color-golden)] focus:border-transparent outline-none transition-all shadow-sm text-[var(--color-text-main)] ${errors.gender ? 'border-red-500 bg-red-50' : 'border border-[var(--color-camel)]/30 bg-white/80'}`}
              >
                <option value="">{t.labels.selectGender}</option>
                {(t.genderOptions || []).map((g, i) => (
                  <option key={i} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Blood Group Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-1">{t.labels.bloodGroup}</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => updateFormData({ bloodGroup: e.target.value })}
                className="block w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[var(--color-golden)] focus:border-transparent outline-none transition-all shadow-sm text-[var(--color-text-main)] border border-[var(--color-camel)]/30 bg-white/80"
              >
                <option value="">{t.labels.selectBloodGroup}</option>
                {(t.bloodGroupOptions || []).map((b, i) => (
                  <option key={i} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Citizens' Pledge - Now Compulsory */}
      <section className={`glass-card rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden transition-all ${errors.pledge ? 'ring-2 ring-red-500' : ''}`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-maroon)] mb-2">{t.labels.step2Title}</h2>
          <p className="text-[var(--color-text-main)]/80">{t.labels.step2Desc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {t.pledgePoints.map((point, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white/80 p-4 rounded-xl border border-[var(--color-golden)]/20 shadow-sm">
              <div className="mt-0.5 min-w-[28px]">
                <div className="w-7 h-7 rounded-full bg-[var(--color-camel)]/20 text-[var(--color-maroon)] flex items-center justify-center text-xs font-bold border border-[var(--color-camel)]/30">{idx + 1}</div>
              </div>
              <p className="text-sm text-[var(--color-text-main)] leading-relaxed">{highlightText(point, highlightWords[language]?.pledge)}</p>
            </div>
          ))}
        </div>
        <label className="flex items-center gap-3 cursor-pointer p-5 bg-[var(--color-camel)]/10 rounded-2xl border-2 border-dashed border-[var(--color-golden)]/60 hover:bg-[var(--color-camel)]/20 transition-all">
          <div className="relative flex items-center">
            <input type="checkbox" className="peer sr-only" checked={formData.pledgeAccepted} onChange={(e) => updateFormData({ pledgeAccepted: e.target.checked })} />
            <div className="w-7 h-7 rounded-lg border-2 border-[var(--color-golden)] peer-checked:border-[var(--color-golden)] peer-checked:bg-[var(--color-golden)] bg-white flex items-center justify-center transition-colors">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-maroon)] opacity-0 peer-checked:opacity-100" />
            </div>
          </div>
          <span className="font-bold text-[var(--color-maroon)] text-lg">{t.labels.acceptAll}</span>
        </label>
      </section>

      {/* Seva Registration */}
      <section className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-maroon)] mb-2">{t.labels.step3Title}</h2>
          <p className="text-[var(--color-text-main)]/80">{t.labels.step3Desc}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.sevaOptions.map((seva, idx) => {
            const isSelected = formData.selectedSevas.includes(idx);
            return (
              <div key={idx} onClick={() => toggleSeva(idx)} className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${isSelected ? 'border-[var(--color-golden)] bg-[var(--color-golden)]/10 shadow-md' : 'border-[var(--color-golden)]/20 bg-white/80 hover:border-[var(--color-golden)]/60 shadow-sm'}`}>
                <div className={`mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${isSelected ? 'border-[var(--color-golden)] bg-[var(--color-golden)]' : 'border-[var(--color-camel)]/50'}`}>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-maroon)]" />}
                </div>
                <p className={`text-sm ${isSelected ? 'font-bold text-[var(--color-maroon)]' : 'text-[var(--color-text-main)]'}`}>{highlightText(seva, highlightWords[language]?.seva)}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Any Other Suggestion */}
      <section className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[var(--color-maroon)] mb-1">{t.labels.suggestion}</h2>
        </div>
        <textarea 
          value={formData.suggestion}
          onChange={(e) => updateFormData({ suggestion: e.target.value.slice(0, 3000) })}
          placeholder={t.labels.suggestionPlaceholder}
          className="w-full h-32 p-4 border border-[var(--color-camel)]/30 rounded-xl focus:ring-2 focus:ring-[var(--color-golden)] focus:border-transparent outline-none transition-all bg-white/80 resize-none text-[var(--color-text-main)] shadow-sm"
        />
        <div className="text-right text-xs text-[var(--color-maroon-dark)]/50 mt-1">
          {t.labels.maxWords}
        </div>
      </section>

      {/* Submit Button Section */}
      <div className="bg-white/80 p-6 sm:p-10 rounded-2xl border border-[var(--color-golden)]/30 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-sm text-[var(--color-maroon-dark)]/80 font-medium text-center sm:text-left max-w-sm">
          {t.labels.missionAgreement}
        </div>
        <button onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-auto primary-gradient text-[var(--color-maroon)] px-12 py-5 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] transition-all disabled:opacity-70 text-lg border border-[var(--color-golden)]/50">
          {isSubmitting ? <div className="w-6 h-6 border-2 border-[var(--color-maroon)] border-t-transparent rounded-full animate-spin" /> : <Save className="w-6 h-6 text-[var(--color-maroon)]" />}
          {isSubmitting ? t.labels.saving : t.labels.submit}
        </button>
      </div>
    </div>
  );
};

export default Registration;
