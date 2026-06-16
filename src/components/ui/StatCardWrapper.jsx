import React from 'react';
import { Card3D } from './Card3D';

export function StatCardWrapper({ title, value, icon: Icon, glowColor, description }) {
  const iconColorClasses = {
    indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
  };
  const badgeColorClasses = {
    indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 border-indigo-500/10 dark:border-indigo-500/20',
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 border-emerald-500/10 dark:border-emerald-500/20',
    cyan: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/5 border-cyan-500/10 dark:border-cyan-500/20',
    orange: 'text-orange-600 dark:text-orange-400 bg-orange-500/5 border-orange-500/10 dark:border-orange-500/20'
  };

  return (
    <Card3D glowColor={glowColor}>
      <div className="flex justify-between items-start">
        <span className={`p-2.5 rounded-xl border group-hover:scale-110 transition-transform ${iconColorClasses[glowColor] || 'bg-slate-100 text-slate-500 border-slate-200'}`}>
          <Icon className="h-5 w-5" />
        </span>
        <span className={`text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border uppercase ${badgeColorClasses[glowColor] || 'text-slate-500 bg-slate-100 border-slate-200'}`}>
          {title}
        </span>
      </div>
      <div className="mt-5">
        <h4 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight leading-none">{value}</h4>
        <p className="text-xs text-slate-450 dark:text-slate-400 mt-2">{description}</p>
      </div>
    </Card3D>
  );
}
