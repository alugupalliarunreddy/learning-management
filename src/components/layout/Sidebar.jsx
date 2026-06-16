import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart2, FileBarChart, GraduationCap, User, LogOut, LogIn } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export function Sidebar() {
  const { logout, isGuest } = useStudent();
  const links = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/analytics', label: 'Analytics Console', icon: BarChart2 },
    { to: '/reports', label: 'Insight Reports', icon: FileBarChart },
    { to: '/profile', label: 'Profile Settings', icon: User },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-20 transition-colors duration-300">
      <div className="flex flex-col">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-500/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-slate-850 dark:text-slate-100 tracking-wider">LEARNFLOW</h1>
            <p className="text-[9px] text-indigo-600 dark:text-indigo-400 font-mono tracking-widest uppercase">Analytics Suite</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-3 mt-6">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/15'
                    : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/40 dark:hover:bg-slate-800/40'
                  }`
                }
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-col border-t border-slate-150 dark:border-slate-800">
        {isGuest ? (
          <button
            onClick={logout}
            className="flex items-center gap-3 px-7 py-4 text-sm font-medium text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
          >
            <LogIn className="h-4.5 w-4.5" />
            <span>Sign In</span>
          </button>
        ) : (
          <button
            onClick={logout}
            className="flex items-center gap-3 px-7 py-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Sign Out</span>
          </button>
        )}
        <div className="p-4 text-[10px] text-slate-400 dark:text-slate-500 font-mono text-center">
          LEARNFLOW v1.2.0
        </div>
      </div>
    </aside>
  );
}
