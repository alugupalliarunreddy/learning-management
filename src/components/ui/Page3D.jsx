import React from 'react';
import { motion } from 'framer-motion';
import { useStudent } from '../../context/StudentContext';

export function Page3D({ children }) {
  const { enable3D } = useStudent();
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, rotateX: enable3D ? 4 : 0 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -15, rotateX: enable3D ? -4 : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={enable3D ? { transformStyle: "preserve-3d", perspective: 1000 } : {}}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
