import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, CheckCircle2, Save, Download, Share2 } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Certificate from '../components/Certificate';
import HeroSection from '../components/HeroSection';

const Home = () => {
  const { t } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    pincode: '',
    pledgeAccepted: false,
    selectedSevas: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  const certificateRef = useRef(null);
  const printRef = useRef(null);

  useEffect(() => {
    // Automatically scroll to the form after 1.5 seconds
    const timer = setTimeout(() => {
      const el = document.getElementById('registration-form');
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
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.whatsapp.trim() || formData.whatsapp.length < 10) newErrors.whatsapp = 'Valid number required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) newErrors.pincode = 'Valid PIN required';
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
      alert("Please fill all required user details correctly.");
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
      const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [800, 600] });
      pdf.addImage(imgData, 'PNG', 0, 0, 800, 600);
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
      const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'Kumbh_Certificate.png', { type: 'image/png' });
        if (navigator.share) {
          await navigator.share({
            title: 'Kumbh Parv 2026 Certificate',
            text: 'I have taken the Citizens Pledge for Kumbh Parv Nashik 2026!',
            files: [file]
          });
        } else {
          // Fallback for browsers that don't support sharing files
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
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">{t.labels.step4Title}</h2>
          <p className="text-gray-600 text-lg">{t.labels.step4Desc}</p>
        </motion.div>

        {/* Preview Container */}
        <div className="mb-10 max-w-2xl mx-auto">
          <Certificate preview={true} overrideData={formData} />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="primary-gradient text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all flex-1"
          >
            {isDownloading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Download className="w-5 h-5" />}
            {isDownloading ? t.labels.generatingPdf : t.labels.downloadCertificate}
          </button>
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="bg-white text-[var(--color-secondary)] border-2 border-[var(--color-secondary)] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-50 transition-all flex-1"
          >
            {isSharing ? <div className="w-5 h-5 border-2 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin" /> : <Share2 className="w-5 h-5" />}
            {isSharing ? 'Preparing...' : 'Share'}
          </button>
        </div>

        {/* Hidden component for printing */}
        <Certificate ref={printRef} overrideData={formData} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 px-4">
      <HeroSection />

      {/* User Details */}
      <section id="registration-form" className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-2">{t.labels.step1Title}</h2>
          <p className="text-gray-600">{t.labels.step1Desc}</p>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.labels.name} *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                <input type="text" value={formData.name} onChange={(e) => updateFormData({ name: e.target.value })} className={`block w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all`} placeholder="John Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.labels.email} *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                <input type="email" value={formData.email} onChange={(e) => updateFormData({ email: e.target.value })} className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all`} placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.labels.whatsapp} *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-400" /></div>
                <input type="tel" value={formData.whatsapp} onChange={(e) => updateFormData({ whatsapp: e.target.value })} className={`block w-full pl-10 pr-3 py-3 border ${errors.whatsapp ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all`} placeholder="+91 9876543210" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.labels.pincode} *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin className="h-5 w-5 text-gray-400" /></div>
                <input type="text" value={formData.pincode} onChange={(e) => updateFormData({ pincode: e.target.value })} className={`block w-full pl-10 pr-3 py-3 border ${errors.pincode ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all`} placeholder="422001" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citizens' Pledge (Optional) - Now Full View */}
      <section className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 px-3 py-1 text-xs font-bold rounded-full">Optional</div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-2">{t.labels.step2Title}</h2>
          <p className="text-gray-600">{t.labels.step2Desc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {t.pledgePoints.map((point, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="mt-0.5 min-w-[28px]">
                <div className="w-7 h-7 rounded-full bg-teal-50 text-[var(--color-secondary)] flex items-center justify-center text-xs font-bold border border-teal-100">{idx + 1}</div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
        <label className="flex items-center gap-3 cursor-pointer p-5 bg-teal-50/50 rounded-2xl border-2 border-dashed border-[var(--color-secondary)] hover:bg-teal-50 transition-all">
          <div className="relative flex items-center">
            <input type="checkbox" className="peer sr-only" checked={formData.pledgeAccepted} onChange={(e) => updateFormData({ pledgeAccepted: e.target.checked })} />
            <div className="w-7 h-7 rounded-lg border-2 border-gray-300 peer-checked:border-[var(--color-secondary)] peer-checked:bg-[var(--color-secondary)] flex items-center justify-center transition-colors">
              <CheckCircle2 className="w-5 h-5 text-white opacity-0 peer-checked:opacity-100" />
            </div>
          </div>
          <span className="font-bold text-gray-800 text-lg">{t.labels.acceptAll}</span>
        </label>
      </section>

      {/* Seva Registration (Optional) */}
      <section className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 px-3 py-1 text-xs font-bold rounded-full">Optional</div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-2">{t.labels.step3Title}</h2>
          <p className="text-gray-600">{t.labels.step3Desc}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.sevaOptions.map((seva, idx) => {
            const isSelected = formData.selectedSevas.includes(idx);
            return (
              <div key={idx} onClick={() => toggleSeva(idx)} className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${isSelected ? 'border-[var(--color-primary)] bg-orange-50 shadow-md' : 'border-gray-200 bg-white hover:border-orange-200 shadow-sm'}`}>
                <div className={`mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${isSelected ? 'border-[var(--color-primary)] bg-[var(--color-primary)]' : 'border-gray-300'}`}>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
                <p className={`text-sm ${isSelected ? 'font-semibold text-[var(--color-primary)]' : 'text-gray-700'}`}>{seva}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Submit Button Section */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-sm text-gray-500 font-medium text-center sm:text-left max-w-sm">
          By submitting, you agree to join the Kumbh Parv 2026 digital mission.
        </div>
        <button onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-auto primary-gradient text-white px-12 py-5 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-70 text-lg shadow-md">
          {isSubmitting ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-6 h-6" />}
          {isSubmitting ? t.labels.saving : t.labels.submit}
        </button>
      </div>
    </div>
  );
};

export default Home;
