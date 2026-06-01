import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const { language, setLanguage, t } = useAppContext();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAboutNasik = location.pathname === '/about-nasik';
  const transparentHeader = isHome || isAboutNasik;
  const [scrolled, setScrolled] = useState(!transparentHeader);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t.labels.navHome || 'Home' },
    { path: '/about-nasik', label: t.labels.navAboutNasik || 'History' },
    { path: '/media', label: t.labels.navMedia || 'Media' },
    { path: '/news', label: t.labels.navNews || 'News & Alerts' },
    { path: '/events', label: t.labels.navEvents || 'Events' },
    { path: '/about', label: t.labels.navAbout || 'Team' },
    { path: '/register', label: t.labels.volunteerRegistration || 'Volunteer Registration' }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    if (transparentHeader) {
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    } else {
      setScrolled(true);
    }
  }, [transparentHeader]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      }
    }
  }, [location]);

  return (
    <div data-lang={language.toLowerCase()} className="min-h-[100dvh] flex flex-col bg-[var(--color-vanilla)]">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-maroon)]/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 sm:h-20">
            {/* Desktop */}
            <div className="hidden md:flex items-center w-full relative">
              {/* Logo — appears on scroll */}
              <div className={`absolute left-0 transition-all duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <a href="/" className="hover:opacity-90 transition-opacity">
                  <img src="/images/logo.png" alt="Kumbhparv Logo" className="h-14 w-auto object-contain brightness-0 invert" />
                </a>
              </div>

              <nav className="flex items-center justify-center flex-1 gap-2 pointer-events-none">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  const isCTA = idx === navLinks.length - 1;
                  if (isCTA) {
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`px-4 py-2 rounded-lg ${language === 'HI' || language === 'MR' ? 'text-[13px]' : 'text-[11px]'} font-bold uppercase tracking-[0.1em] transition-all duration-200 pointer-events-auto bg-[var(--color-golden)] text-[var(--color-maroon)] shadow-md hover:shadow-lg hover:brightness-110 border-2 border-[var(--color-golden)]`}
                      >
                        {link.label}
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-3 py-2 rounded-lg ${language === 'HI' || language === 'MR' ? 'text-[13px]' : 'text-[11px]'} font-bold uppercase tracking-[0.1em] transition-all duration-200 pointer-events-auto ${
                        isActive
                          ? scrolled
                            ? 'bg-white/20 text-white'
                            : 'bg-white/15 text-white'
                          : scrolled
                            ? 'text-white/80 hover:text-white hover:bg-white/10'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Lang toggle — appears on scroll */}
              <div className={`absolute right-0 transition-all duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex items-center gap-2">
                  {[
                    { code: 'EN', label: 'English' },
                    { code: 'HI', label: 'हिन्दी' },
                    { code: 'MR', label: 'मराठी' }
                  ].map((lang, idx) => (
                    <span key={lang.code} className="flex items-center">
                      {idx > 0 && <span className="text-white/20 mx-0.5">|</span>}
                      <button
                        onClick={() => setLanguage(lang.code)}
                        className={`text-[11px] sm:text-xs font-bold tracking-wide transition-all duration-200 ${
                          language === lang.code
                            ? 'text-white'
                            : 'text-white/40 hover:text-white/80'
                        }`}
                      >
                        {lang.label}
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: lang toggle left, logo centered (on scroll), hamburger right */}
            <div className="md:hidden flex items-center w-full pointer-events-auto relative">
              <div className="flex items-center gap-1">
                {[
                  { code: 'EN', label: 'English' },
                  { code: 'HI', label: 'हिन्दी' },
                  { code: 'MR', label: 'मराठी' }
                ].map((lang, idx) => (
                  <span key={lang.code} className="flex items-center">
                    {idx > 0 && <span className="text-white/20 mx-0.5">|</span>}
                    <button
                      onClick={() => setLanguage(lang.code)}
                      className={`text-[11px] font-bold tracking-wide transition-all duration-200 ${
                        language === lang.code
                          ? 'text-white'
                          : 'text-white/40 hover:text-white/80'
                      }`}
                    >
                      {lang.label}
                    </button>
                  </span>
                ))}
              </div>
              {/* Centered logo — appears on scroll */}
              <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <a href="/" className="hover:opacity-90 transition-opacity">
                  <img src="/images/logo.png" alt="Kumbhparv Logo" className="h-14 w-auto object-contain brightness-0 invert" />
                </a>
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className={`p-2 rounded-lg transition-colors ${
                    scrolled ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/10'
                  }`}
                >
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden bg-[var(--color-maroon)] border-t border-white/10 shadow-xl">
            <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                const isCTA = idx === navLinks.length - 1;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                      isCTA
                        ? 'bg-[var(--color-golden)] text-[var(--color-maroon)] mx-2 mt-2 text-center shadow-md'
                        : isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className={`flex-1 w-full mx-auto ${location.pathname !== '/' ? 'pt-16 sm:pt-20' : ''}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-camel-light)] border-t border-[var(--color-golden)]/40 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
            {/* Brand */}
            <div>
              <img
                src="/images/kumbhlogo.jpeg"
                alt="Kumbhparv Logo"
                className="h-28 w-auto object-contain rounded-xl ml-4"
              />
              <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--color-maroon)]/75">
                {t.labels.footerTagline}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-[var(--color-maroon)]/10 hover:bg-[var(--color-maroon)] text-[var(--color-maroon)]/60 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[var(--color-maroon)]/10 hover:bg-[var(--color-maroon)] text-[var(--color-maroon)]/60 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.525c.636-.247 1.363-.416 2.427-.465C8.88 2.013 9.235 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[var(--color-maroon)]/10 hover:bg-[var(--color-maroon)] text-[var(--color-maroon)]/60 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="YouTube">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="w-full text-xs font-semibold uppercase tracking-wider text-[var(--color-maroon)]/50 mb-0.5">Download the Kumbh Parv App</span>
                <a href="#" className="inline-flex items-center gap-1.5 bg-black/5 hover:bg-black/10 border border-black/10 rounded-lg px-3 py-1.5 transition-all duration-200 hover:shadow-sm">
                  <svg className="w-5 h-5 text-[var(--color-maroon)]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 12.308c-.019-2.297 1.872-3.397 1.957-3.45-1.066-1.558-2.726-1.771-3.317-1.796-1.413-.143-2.758.833-3.475.833-.717 0-1.825-.812-2.999-.791-1.543.023-2.966.897-3.761 2.28-1.603 2.782-.41 6.904 1.152 9.162.764 1.104 1.675 2.347 2.871 2.302 1.152-.046 1.588-.746 2.98-.746 1.393 0 1.785.746 3.003.723 1.24-.023 2.025-1.127 2.785-2.235.878-1.283 1.239-2.527 1.26-2.591-.027-.012-2.419-.929-2.442-3.681zm-2.233-6.598c.637-.773 1.067-1.846.95-2.915-.919.037-2.031.612-2.691 1.385-.59.683-1.107 1.777-.968 2.826 1.024.08 2.069-.522 2.709-1.296z"/></svg>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-maroon)]/50 leading-tight">Download on</span>
                      <span className="text-sm font-bold text-[var(--color-maroon)] leading-tight -mt-0.5">App Store</span>
                  </div>
                </a>
                <a href="#" className="inline-flex items-center gap-1.5 bg-black/5 hover:bg-black/10 border border-black/10 rounded-lg px-3 py-1.5 transition-all duration-200 hover:shadow-sm">
                  <svg className="w-5 h-5 text-[var(--color-maroon)]" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-maroon)]/50 leading-tight">Get it on</span>
                      <span className="text-sm font-bold text-[var(--color-maroon)] leading-tight -mt-0.5">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-maroon)]/70">
                Quick Links
              </h2>
              <nav className="mt-4 flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm font-semibold text-[var(--color-maroon)]/75 transition-colors hover:text-[var(--color-maroon)] hover:translate-x-0.5 inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--color-golden)]/60"></span>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Info */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-maroon)]/70">
                Info
              </h2>
              <nav className="mt-4 flex flex-col gap-2.5">
                <Link
                  to="/verticals"
                  className="text-sm font-semibold text-[var(--color-maroon)]/75 transition-colors hover:text-[var(--color-maroon)] hover:translate-x-0.5 inline-flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--color-golden)]/60"></span>
                  {t.labels.navVerticals || 'Verticals'}
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold text-[var(--color-maroon)]/75 transition-colors hover:text-[var(--color-maroon)] hover:translate-x-0.5 inline-flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--color-golden)]/60"></span>
                  {t.labels.volunteerRegistration}
                </Link>
                <Link
                  to="/admin/login"
                  className="text-sm font-semibold text-[var(--color-maroon)]/75 transition-colors hover:text-[var(--color-maroon)] hover:translate-x-0.5 inline-flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--color-golden)]/60"></span>
                  Admin Portal
                </Link>
              </nav>
            </div>

            {/* Contact & Collaboration */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-maroon)]/70">
                Contact
              </h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3 text-sm text-[var(--color-maroon)]/75">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-golden)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span>Nasik, Maharashtra, India</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[var(--color-maroon)]/75">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-golden)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <span>info@kumbhparvnasik.org</span>
                </div>
              </div>

              <a href="https://eyeview.org.in" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex flex-col gap-2.5 rounded-xl border border-[var(--color-golden)]/35 bg-[var(--color-vanilla)]/45 px-4 py-3.5 w-full hover:bg-[var(--color-golden)]/10 hover:border-[var(--color-golden)]/60 transition-all duration-300 cursor-pointer">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-maroon)]/60">
                  {language === 'HI' ? 'सहयोग से' : language === 'MR' ? 'सहकार्याने' : 'In Collaboration With'}
                </p>
                <img src="/images/eyeviewlogo.png" alt="Eye View Enterprises logo" className="h-14 max-w-full object-contain" />
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-[var(--color-maroon)]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[var(--color-maroon)]/65">{t.labels.footerRights}</p>
            <div className="flex items-center gap-4 text-xs">
              <Link to="/admin/login" className="font-semibold text-[var(--color-maroon)]/65 transition-colors hover:text-[var(--color-maroon)]">
                Admin Portal
              </Link>
              <span className="text-[var(--color-maroon)]/25">|</span>
              <span className="text-[var(--color-maroon)]/50">Simhastha Kumbhparv Nasik 2026–2028</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
