import React, { createContext, useState, useContext, useEffect } from 'react';
import { content } from '../data/content';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN'); // EN, HI, MR
  const [adminUser, setAdminUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const t = content[language];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdminUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        adminUser,
        authLoading,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
