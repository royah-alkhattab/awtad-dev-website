import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NavigationProgress = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevPath = useRef(location.pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (location.pathname === prevPath.current) return;
    prevPath.current = location.pathname;

    // Start progress
    setProgress(0);
    setVisible(true);

    // Simulate progress: fast start, slow middle
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current > 85) current = 85;
      setProgress(current);
    }, 100);

    // Complete after a short delay (page has rendered)
    timerRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);
      setTimeout(() => setVisible(false), 300);
    }, 350);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[100] h-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-gold via-gold-light to-gold rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationProgress;
