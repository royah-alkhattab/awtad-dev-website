import { useState, useEffect, useCallback, useRef } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FloatingActions = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, close]);

  return (
    <div ref={containerRef} className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-start gap-3">
      {/* Main toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-colors duration-200 hover:bg-primary/90 active:scale-95"
        animate={{ rotate: open ? 135 : 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Action buttons */}
      <AnimatePresence>
        {open && (
          <>
            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/96895599902"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              initial={{ opacity: 0, scale: 0.4, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.4, y: 20 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
              className="flex items-center gap-2.5 rounded-pill bg-[#1a8d48] pl-4 pr-5 py-2.5 text-white shadow-lg shadow-[#1a8d48]/20 transition-all duration-200 hover:bg-[#167a3e] hover:shadow-xl active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span className="font-body text-sm font-medium">WhatsApp</span>
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+96895599902"
              aria-label="Call us"
              initial={{ opacity: 0, scale: 0.4, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.4, y: 20 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              className="flex items-center gap-2.5 rounded-pill bg-gradient-gold pl-4 pr-5 py-2.5 text-primary-foreground shadow-lg shadow-gold/20 transition-all duration-200 hover:opacity-90 hover:shadow-xl active:scale-95"
            >
              <Phone size={20} />
              <span className="font-body text-sm font-medium">Call</span>
            </motion.a>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActions;
