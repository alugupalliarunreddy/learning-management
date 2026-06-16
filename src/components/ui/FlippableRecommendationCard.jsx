import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, ChevronRight } from 'lucide-react';

export function FlippableRecommendationCard({ title, desc, details }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 w-full h-44 cursor-pointer select-none"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full preserve-3d"
      >
        <div
          className="absolute inset-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4.5 flex flex-col justify-between backface-hidden shadow-sm hover:border-indigo-500/40 transition-colors"
        >
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
              <CheckSquare className="h-4 w-4 shrink-0" />
              <span>{title}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">{desc}</p>
          </div>
          <div className="flex justify-between items-center mt-3 text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
            <span>RECOMMENDED PATH</span>
            <span className="flex items-center gap-1">View Details <ChevronRight className="h-3 w-3" /></span>
          </div>
        </div>

        <div
          style={{ transform: "rotateY(180deg)" }}
          className="absolute inset-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4.5 flex flex-col justify-between backface-hidden shadow-sm"
        >
          <div>
            <h5 className="font-bold text-xs text-indigo-900 dark:text-indigo-300">Curriculum Syllabus</h5>
            <ul className="mt-2.5 space-y-1 text-[10.5px] text-slate-600 dark:text-slate-450 font-medium">
              {details.map((item, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 bg-indigo-500 dark:bg-indigo-400 rounded-full shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
            <span>CLICK TO FLIP BACK</span>
            <span className="px-2 py-0.5 bg-indigo-200/50 dark:bg-indigo-900/50 rounded uppercase text-[8px]">ACTIVE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
