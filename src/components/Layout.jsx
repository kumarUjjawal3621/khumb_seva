import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const { language, setLanguage, t } = useAppContext();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { path: '/', label: t.labels.navHome || 'Home' },
    { path: '/about', label: t.labels.navAbout || 'About Us' },
    { path: '/about-nasik', label: t.labels.navAboutNasik || 'About Nasik' },
    { path: '/register', label: t.labels.volunteerRegistration || 'Volunteer Registration' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-vanilla)]">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-[var(--color-maroon)] border-b border-[var(--color-golden)]/30 shadow-lg'
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}>
        <div className="max-w-5xl mx-auto px-4 py-3 lg:py-4">
          <div className="flex justify-between items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className={`lg:hidden w-10 h-10 rounded-full border border-[var(--color-golden)]/35 text-[var(--color-golden)] flex items-center justify-center transition-colors flex-shrink-0 ${
                isScrolled || isMenuOpen ? 'hover:bg-[var(--color-maroon-dark)]' : 'bg-black/20 backdrop-blur-sm hover:bg-black/30'
              }`}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-4 hover:opacity-90 transition-opacity min-w-0 flex-1 lg:flex-none">
              <img 
                src="/logo.jpeg" 
                alt="Kumbhparv Logo" 
                className="max-h-10 lg:max-h-14 w-auto h-auto object-contain flex-shrink-0" 
              />
              <div className="min-w-0 max-w-[8.5rem] lg:max-w-none">
                <h1 className="font-bold text-[var(--color-golden)] leading-tight text-center lg:text-left text-sm lg:text-xl font-serif whitespace-normal">
                  {t.labels.appTitle}
                </h1>
              </div>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-bold transition-colors whitespace-nowrap ${
                    location.pathname === link.path
                      ? 'text-[var(--color-golden)] border-b-2 border-[var(--color-golden)] pb-1'
                      : 'text-[var(--color-vanilla)]/80 hover:text-[var(--color-golden)] pb-1'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className={`flex rounded-full p-1 shadow-inner border border-[var(--color-golden)]/20 flex-shrink-0 ${
              isScrolled || isMenuOpen ? 'bg-[var(--color-maroon-dark)]' : 'bg-black/25 backdrop-blur-sm'
            }`}>
              {['EN', 'HI', 'MR'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`min-w-8 lg:min-w-9 px-2 lg:px-3 py-1 rounded-full text-xs font-bold transition-all text-center ${
                    language === lang 
                      ? 'bg-[var(--color-golden)] text-[var(--color-maroon)] shadow-md' 
                      : 'text-[var(--color-vanilla)]/60 hover:text-[var(--color-golden)]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} lg:hidden flex-col gap-1 mt-3 pt-3 border-t border-[var(--color-golden)]/20`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`w-full px-3 py-3 rounded-xl text-sm leading-snug font-bold transition-colors break-words ${
                  location.pathname === link.path
                    ? 'bg-[var(--color-golden)] text-[var(--color-maroon)]'
                    : 'text-[var(--color-vanilla)]/85 hover:bg-[var(--color-maroon-dark)] hover:text-[var(--color-golden)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full mx-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-camel-light)] border-t border-[var(--color-golden)]/40 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-10 lg:py-12">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Link to="/" className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity">
                <img
                  src="/logo.jpeg"
                  alt="Kumbhparv Logo"
                  className="h-14 w-auto object-contain"
                />
                <span className="font-serif text-xl font-bold leading-tight text-[var(--color-maroon)]">
                  {t.labels.appTitle}
                </span>
              </Link>
              <p className="mt-4 max-w-md text-sm leading-6 text-[var(--color-maroon)]/75">
                {t.labels.footerTagline}
              </p>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-maroon)]/70">
                Quick Links
              </h2>
              <nav className="mt-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm font-semibold text-[var(--color-maroon)]/75 transition-colors hover:text-[var(--color-maroon)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <div className="mt-4 inline-flex max-w-sm flex-col items-start gap-3 rounded-xl border border-[var(--color-golden)]/35 bg-[var(--color-vanilla)]/45 px-4 py-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--color-maroon)]/60">
                  In Collaboration With
                </p>
                <img src="/images/eyeviewlogo.png" alt="Eye View Enterprises logo" className="h-16 max-w-full object-contain" />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-[var(--color-maroon)]/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[var(--color-maroon)]/65">{t.labels.footerRights}</p>
            <Link to="/admin/login" className="text-xs font-semibold text-[var(--color-maroon)]/65 transition-colors hover:text-[var(--color-maroon)]">
              Admin Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
