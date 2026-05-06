import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="glass-card w-full max-w-md p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
          <p className="text-gray-500 mt-2">Sign in to access KumbhParv analytics.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Admin Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                placeholder="admin@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full primary-gradient text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-70 flex justify-center items-center h-12"
          >
            {isLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
