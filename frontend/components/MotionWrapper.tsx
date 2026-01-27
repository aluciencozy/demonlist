'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';

type MotionWrapperProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const MotionWrapper = ({ children, delay = 0, className }: MotionWrapperProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;

