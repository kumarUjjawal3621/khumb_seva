import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Registration from './pages/Registration';
import AboutUs from './pages/AboutUs';
import AboutNasik from './pages/AboutNasik';
import Verticals from './pages/Verticals';
import Media from './pages/Media';
import NewsAlerts from './pages/NewsAlerts';
import Events from './pages/Events';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const { adminUser, authLoading } = useAppContext();
  
  if (authLoading) return <div className="min-h-[100dvh] flex items-center justify-center">Loading...</div>;
  if (!adminUser) return <Navigate to="/admin/login" replace />;
  
  return children;
};

const MainApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/register" element={<Layout><Registration /></Layout>} />
        <Route path="/about" element={<Layout><AboutUs /></Layout>} />
        <Route path="/about-nasik" element={<Layout><AboutNasik /></Layout>} />
        <Route path="/verticals" element={<Layout><Verticals /></Layout>} />
        <Route path="/media" element={<Layout><Media /></Layout>} />
        <Route path="/news" element={<Layout><NewsAlerts /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/admin/login" element={<Layout><AdminLogin /></Layout>} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Layout><AdminDashboard /></Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

const App = () => {
  // Force mobile browsers to recalculate viewport scale after fonts/images load
  // Fixes Chrome Android bug where page renders zoomed-out on initial load
  useEffect(() => {
    const fixViewport = () => {
      const meta = document.querySelector('meta[name=viewport]');
      if (meta) {
        meta.content = 'width=device-width, initial-scale=1.0';
      }
    };
    if (document.readyState === 'complete') {
      fixViewport();
    } else {
      window.addEventListener('load', fixViewport);
      return () => window.removeEventListener('load', fixViewport);
    }
  }, []);

  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
};

export default App;
