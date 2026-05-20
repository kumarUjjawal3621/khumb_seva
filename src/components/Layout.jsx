import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const { language, setLanguage, t } = useAppContext();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t.labels.navHome || 'Home' },
    { path: '/about', label: t.labels.navAbout || 'About Us' },
    { path: '/verticals', label: t.labels.navVerticals || 'Verticals' },
    { path: '/register', label: t.labels.volunteerRegistration || 'Volunteer Registration' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-vanilla)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--color-maroon)] border-b border-[var(--color-golden)]/30 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="sm:hidden w-10 h-10 rounded-full border border-[var(--color-golden)]/35 text-[var(--color-golden)] flex items-center justify-center hover:bg-[var(--color-maroon-dark)] transition-colors"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 sm:gap-4 hover:opacity-90 transition-opacity min-w-0">
              <img 
                src="/logo.jpeg" 
                alt="Kumbhparv Logo" 
                className="max-h-11 sm:max-h-14 w-auto h-auto object-contain flex-shrink-0" 
              />
              <div className="min-w-0">
                <h1 className="font-bold text-[var(--color-golden)] leading-tight text-base sm:text-xl font-serif truncate">
                  {t.labels.appTitle}
                </h1>
              </div>
            </Link>
            
            <nav className="hidden sm:flex items-center gap-6">
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

            <div className="flex bg-[var(--color-maroon-dark)] rounded-full p-1 shadow-inner border border-[var(--color-golden)]/20 flex-shrink-0">
              {['EN', 'HI', 'MR'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold transition-all ${
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

          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} sm:hidden flex-col gap-1 mt-3 pt-3 border-t border-[var(--color-golden)]/20`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-3 rounded-xl text-sm font-bold transition-colors ${
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
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-10 text-center bg-[var(--color-maroon)] border-t border-[var(--color-golden)]/30 mt-10 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-[var(--color-golden)] text-sm font-semibold mb-2">{t.labels.footerRights}</p>
          <p className="text-[var(--color-vanilla)]/70 text-xs mt-1 font-serif italic">{t.labels.footerTagline}</p>
          <div className="mt-6 flex justify-center">
            <Link to="/admin/login" className="px-4 py-1.5 border border-[var(--color-golden)]/40 rounded-full text-[var(--color-golden)]/80 text-xs font-semibold hover:bg-[var(--color-golden)] hover:text-[var(--color-maroon)] transition-all">
              Admin Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
