import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { User, Mail, Save } from 'lucide-react';
import { Page3D } from '../components/ui/Page3D';

export function Profile() {
  const { userProfile, updateProfile } = useStudent();
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(name, email);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <Page3D>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Profile Settings</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your personal information and preferences.</p>
        </div>

        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" /> Full Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" /> Email Address
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              {isSaved ? (
                <span className="text-emerald-500 text-sm font-semibold">Changes saved successfully!</span>
              ) : <span></span>}
              <button 
                type="submit"
                className="flex items-center gap-2 py-2.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-colors"
              >
                <Save className="h-4 w-4" /> Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </Page3D>
  );
}
