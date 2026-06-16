import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useStudent } from '../../context/StudentContext';

export function Card3D({ children, className = "", glowColor = "indigo", ...props }) {
  const { enable3D } = useStudent();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], enable3D ? [12, -12] : [0, 0]);
  const rotateY = useTransform(x, [-150, 150], enable3D ? [-12, 12] : [0, 0]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const glowShadows = {
    indigo: 'glow-card-indigo hover:border-indigo-500/40 dark:hover:border-indigo-500/30',
    emerald: 'glow-card-emerald hover:border-emerald-500/40 dark:hover:border-emerald-500/30',
    cyan: 'glow-card-cyan hover:border-cyan-500/40 dark:hover:border-cyan-500/30',
    orange: 'glow-card-orange hover:border-orange-500/40 dark:hover:border-orange-500/30'
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={`bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden group shadow-sm ${glowShadows[glowColor] || ''} ${className}`}
      {...props}
    >
      <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
