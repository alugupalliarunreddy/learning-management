import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { LogIn } from 'lucide-react';

export function Login() {
  const { login, loginAsGuest } = useStudent();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@school.com' && password === 'admin123') {
      login();
    } else {
      setError('Invalid credentials. Try admin@school.com / admin123');
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-white dark:bg-slate-950 transition-colors duration-300 font-sans">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        <div className="absolute top-8 left-8 text-indigo-600 dark:text-indigo-400 font-extrabold tracking-widest text-lg flex items-center gap-2">
          <span className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg"><LogIn className="h-5 w-5" /></span>
          LEARNFLOW
        </div>
        
        <div className="w-full max-w-sm space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Welcome Back</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Please enter your details to access the dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400 text-sm font-medium flex items-start gap-3">
                <span className="mt-0.5 text-rose-500">⚠</span>
                {error}
              </div>
            )}
            
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                placeholder="admin@school.com"
              />
            </div>
            
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button 
                type="submit"
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
              >
                Sign In to Dashboard <LogIn className="h-4 w-4" />
              </button>
              <button 
                type="button"
                onClick={() => loginAsGuest()}
                className="w-full py-3.5 px-4 bg-transparent border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all"
              >
                Skip & View Demo
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel - Graphic */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-purple-900/40 z-0"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent z-0"></div>
        
        {/* Decorative Glass Panel */}
        <div className="z-10 w-3/4 max-w-lg aspect-square rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center p-12 text-center transform hover:scale-105 transition-transform duration-700">
          <div className="h-20 w-20 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center justify-center mb-8">
            <LogIn className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-3xl font-extrabold text-white mb-4">Empower Your Learning</h3>
          <p className="text-slate-400 text-lg leading-relaxed">
            Gain deep insights into your educational journey with real-time analytics and personalized syllabus interventions.
          </p>
        </div>
      </div>
    </div>
  );
}
