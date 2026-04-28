import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Check } from 'lucide-react';

interface Props {
  progress: number;
}

const PHASES = [
  { threshold: 0, en: 'Foundation', ar: 'الأساسات' },
  { threshold: 25, en: 'Structure', ar: 'الهيكل' },
  { threshold: 60, en: 'Finishing', ar: 'التشطيبات' },
  { threshold: 90, en: 'Handover', ar: 'التسليم' },
];

const ProjectMilestones = ({ progress }: Props) => {
  const { t, language } = useLanguage();
  const pct = Math.max(0, Math.min(100, progress));

  // Pin progress along the 4-phase track. Each phase occupies one segment between
  // markers, and within a phase the bar advances proportionally to actual %.
  const phaseIndex = PHASES.reduce((acc, p, i) => (pct >= p.threshold ? i : acc), 0);
  const segments = PHASES.length - 1;
  const isLast = phaseIndex >= segments;
  const nextThreshold = PHASES[phaseIndex + 1]?.threshold ?? 100;
  const phaseSpan = nextThreshold - PHASES[phaseIndex].threshold || 1;
  const within = (pct - PHASES[phaseIndex].threshold) / phaseSpan;
  const visualProgress = isLast
    ? 100
    : Math.min(100, ((phaseIndex + Math.max(0, Math.min(1, within))) / segments) * 100);
  const currentLabel = language === 'ar' ? PHASES[phaseIndex].ar : PHASES[phaseIndex].en;

  return (
    <div className="rounded-lg border border-border/70 bg-card/50 p-6 md:p-8">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {t('Construction Progress', 'تقدم الإنشاء')}
          </p>
          <p className="mt-1 font-display text-lg font-semibold text-foreground">
            {t('Currently in:', 'المرحلة الحالية:')} <span className="text-primary">{currentLabel}</span>
          </p>
        </div>
        <div className="text-right rtl:text-left">
          <p className="font-display text-3xl font-bold text-gradient-gold" dir="ltr">{pct}%</p>
        </div>
      </div>

      <div className="relative pt-3 pb-12">
        {/* Track */}
        <div className="relative mx-4 h-[3px] rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${visualProgress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0, 0, 0.2, 1] }}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-gold rtl:left-auto rtl:right-0"
          />
        </div>

        {/* Markers */}
        <div className="absolute left-0 right-0 top-0 mx-4 flex justify-between">
          {PHASES.map((phase, i) => {
            const isDone = i < phaseIndex;
            const isCurrent = i === phaseIndex;
            return (
              <div key={phase.en} className="relative flex flex-col items-center" style={{ width: 1 }}>
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
                  className={`grid h-7 w-7 -translate-x-1/2 -translate-y-2 place-items-center rounded-full ring-4 transition-colors rtl:translate-x-1/2 ${
                    isDone
                      ? 'bg-gradient-gold ring-gold/20 text-primary-foreground'
                      : isCurrent
                      ? 'bg-cream ring-gold/40 text-primary'
                      : 'bg-muted ring-border text-muted-foreground'
                  }`}
                >
                  {isDone ? <Check size={13} strokeWidth={3} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                </motion.div>
                <span
                  className={`absolute top-9 -translate-x-1/2 whitespace-nowrap font-body text-[11px] font-medium tracking-wide rtl:translate-x-1/2 ${
                    isCurrent ? 'text-foreground' : isDone ? 'text-foreground/70' : 'text-muted-foreground'
                  }`}
                >
                  {language === 'ar' ? phase.ar : phase.en}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectMilestones;
