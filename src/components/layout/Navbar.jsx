import React, { useState, useEffect, useRef } from 'react';
import { Bell, Sun, Moon, Check, X } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export function Navbar() {
  const {
    theme, toggleTheme, notifications, markAllNotificationsRead,
    markNotificationRead, deleteNotification, userProfile, enableNotifications, isGuest
  } = useStudent();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = enableNotifications ? notifications.filter(n => n.unread).length : 0;

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Learning Analytics Control</h2>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer"
        >
          {theme === 'light' ? <Moon className="h-4.5 w-4.5 text-indigo-600" /> : <Sun className="h-4.5 w-4.5 text-amber-400" />}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer relative"
          >
            <Bell className="h-4.5 w-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 text-[10px] text-white rounded-full flex items-center justify-center font-bold font-mono">
                {unreadCount}
              </span>
            )}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn text-slate-800 dark:text-slate-200">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-850">
                <h3 className="font-bold text-xs text-slate-650 dark:text-slate-300 uppercase tracking-wider">Alerts</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllNotificationsRead} className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-semibold">
                    Mark all read
                  </button>
                )}
              </div>

              <div className="mt-3 max-h-64 overflow-y-auto space-y-2 pr-1">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-xl border transition-colors flex items-start gap-2.5 group relative ${notif.unread ? 'bg-slate-50/70 dark:bg-slate-850/50 border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200' : 'bg-transparent border-slate-100 dark:border-slate-900 text-slate-500 dark:text-slate-400'
                      }`}
                  >
                    {notif.unread && <span className="h-2 w-2 rounded-full bg-indigo-500 shrink-0 mt-1.5 animate-pulse"></span>}
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 break-words">{notif.title}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 break-words">{notif.message}</span>
                    </div>

                    <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1.5">
                      {notif.unread && (
                        <button onClick={() => markNotificationRead(notif.id)} className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-0.5">
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button onClick={() => deleteNotification(notif.id)} className="text-slate-400 hover:text-rose-500 p-0.5">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 font-mono">No new alerts.</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5 border-l border-slate-200 dark:border-slate-800 pl-4">
          <div className="h-8.5 w-8.5 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center border border-indigo-500 shadow-sm shadow-indigo-500/10">
            {userProfile.name.charAt(0)}
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold text-slate-855 dark:text-slate-200 leading-tight">
              {isGuest ? "Guest User" : userProfile.name}
            </span>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">
              {isGuest ? "Visitor" : "Administrator"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
