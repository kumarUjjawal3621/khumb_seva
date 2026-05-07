import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const { language, setLanguage, t } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-kumbh-white)]">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
            <img src="/logo.png" alt="Kumbhparv Logo" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
            <div>
              <h1 className="font-bold text-[var(--color-primary)] leading-tight text-lg sm:text-xl">
                {t.labels.appTitle}
              </h1>
              <p className="text-xs text-[var(--color-secondary)] font-medium">{t.labels.appLocation}</p>
            </div>
          </Link>
          
          <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-100">
            {['EN', 'HI', 'MR'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  language === lang 
                    ? 'primary-gradient text-white shadow-md' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-gray-100 mt-10">
        <p className="text-gray-500 text-sm">{t.labels.footerRights}</p>
        <p className="text-gray-400 text-xs mt-1">{t.labels.footerTagline}</p>
        <div className="mt-4">
          <Link to="/admin/login" className="text-[var(--color-secondary)] text-xs font-semibold hover:underline">
            Admin Portal
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
