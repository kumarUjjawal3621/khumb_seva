import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { language, setLanguage, t } = useAppContext();
  const location = useLocation();

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
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
            <img 
              src="/logo.jpeg" 
              alt="Kumbhparv Logo" 
              className="max-h-12 sm:max-h-14 w-auto h-auto object-contain" 
            />
            <div>
              <h1 className="font-bold text-[var(--color-golden)] leading-tight text-lg sm:text-xl font-serif">
                {t.labels.appTitle}
              </h1>
            </div>
          </Link>
          
          <nav className="flex items-center gap-2 sm:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold transition-colors ${
                  location.pathname === link.path
                    ? 'text-[var(--color-golden)] border-b-2 border-[var(--color-golden)] pb-1'
                    : 'text-[var(--color-vanilla)]/80 hover:text-[var(--color-golden)] pb-1'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex bg-[var(--color-maroon-dark)] rounded-full p-1 shadow-inner border border-[var(--color-golden)]/20">
            {['EN', 'HI', 'MR'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
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
