import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, ArrowRight, RotateCw } from 'lucide-react';
import { getPropertyBySlug, getUnitsByProperty } from '@/services/api';
import type { Property } from '@/types';

interface Props {
  property: Property;
}

const statusColors: Record<string, string> = {
  upcoming: 'bg-primary/90 text-primary-foreground',
  under_construction: 'bg-gold/90 text-gold-dark',
  ready: 'bg-green-600 text-white',
  sold_out: 'bg-muted/80 text-muted-foreground',
};

const statusLabels: Record<string, { en: string; ar: string }> = {
  upcoming: { en: 'Upcoming', ar: 'قريباً' },
  under_construction: { en: 'Under Construction', ar: 'قيد الإنشاء' },
  ready: { en: 'Ready', ar: 'جاهز' },
  sold_out: { en: 'Sold Out', ar: 'نفذت' },
};

type LoadPhase = 'idle' | 'pressed' | 'loading' | 'slow' | 'failed';

const PropertyCard = ({ property }: Props) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const name = language === 'en' ? property.name_en : property.name_ar;
  const desc = language === 'en' ? property.short_description_en : property.short_description_ar;
  const loc = language === 'en' ? property.location_en : property.location_ar;
  const status = statusLabels[property.status] || statusLabels.upcoming;

  const [phase, setPhase] = useState<LoadPhase>('idle');
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const abortRef = useRef(false);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      abortRef.current = true;
    };
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const handleClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    if (phase !== 'idle') return;

    abortRef.current = false;
    setPhase('pressed');

    // After 300ms without completion, show loader
    const t1 = setTimeout(() => {
      if (!abortRef.current) setPhase('loading');
    }, 300);

    // After 4s, show slow connection
    const t2 = setTimeout(() => {
      if (!abortRef.current) setPhase('slow');
    }, 4000);

    timersRef.current = [t1, t2];

    try {
      // Prefetch property data
      const [prop] = await Promise.all([
        getPropertyBySlug(property.slug),
      ]);

      if (abortRef.current) return;
      clearTimers();

      if (prop) {
        // Prefetch units in background, navigate immediately
        const unitsPromise = getUnitsByProperty(prop.id);
        navigate(`/properties/${property.slug}`, {
          state: { prefetchedProperty: prop, unitsPromise: null },
        });
      } else {
        navigate(`/properties/${property.slug}`);
      }
    } catch {
      if (abortRef.current) return;
      clearTimers();
      setPhase('failed');
    }
  }, [phase, property.slug, navigate, clearTimers]);

  const handleRetry = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPhase('idle');
    // Small delay then re-trigger
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.MouseEvent;
      handleClick(fakeEvent);
    }, 50);
  }, [handleClick]);

  const handleCancel = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    abortRef.current = true;
    clearTimers();
    setPhase('idle');
  }, [clearTimers]);

  const isActive = phase !== 'idle';

  // Button content based on phase
  const renderButtonContent = () => {
    switch (phase) {
      case 'pressed':
        return (
          <>
            {t('View Details', 'عرض التفاصيل')}
            <ArrowRight size={15} className="rtl:rotate-180" />
          </>
        );
      case 'loading':
        return (
          <>
            {t('Opening…', 'جاري الفتح…')}
            <span className="flex gap-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/80 animate-bounce [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/80 animate-bounce [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/80 animate-bounce [animation-delay:300ms]" />
            </span>
          </>
        );
      case 'slow':
        return (
          <>
            {t('Still loading…', 'لا يزال يتم التحميل…')}
            <span className="flex gap-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/80 animate-bounce [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/80 animate-bounce [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/80 animate-bounce [animation-delay:300ms]" />
            </span>
          </>
        );
      case 'failed':
        return t('Connection failed', 'فشل الاتصال');
      default:
        return (
          <>
            {t('View Details', 'عرض التفاصيل')}
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </>
        );
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e as unknown as React.MouseEvent); }}
      className="group block cursor-pointer"
      aria-busy={isActive}
    >
      <div className={`overflow-hidden rounded-card border border-border/60 bg-card shadow-card transition-all duration-500 ${
        isActive ? '' : 'group-hover:shadow-card-hover group-hover:-translate-y-2'
      }`}>
        {/* Image */}
        <div className="relative m-3 overflow-hidden rounded-card-inner aspect-[4/3]">
          <img
            src={property.cover_image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className={`rounded-pill px-4 py-1.5 font-body text-xs font-semibold shadow-md backdrop-blur-sm ${statusColors[property.status]}`}>
              {t(status.en, status.ar)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-3">
          <div className="mb-2 flex items-center gap-1.5 text-muted-foreground">
            <MapPin size={13} />
            <span className="font-body text-xs">{loc}</span>
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">{name}</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-5">{desc}</p>

          {/* Availability chip */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-primary/10 px-4 py-1.5 font-body text-xs font-semibold text-primary animate-soft-pulse">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              {language === 'en' ? property.availability_summary : property.availability_summary_ar}
            </span>
          </div>

          {/* CTA Button */}
          <span
            className={`relative flex items-center justify-center gap-2 rounded-pill bg-gradient-gold px-6 py-3 font-body text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 ease-out ${
              phase === 'idle'
                ? 'group-hover:scale-[1.03] group-hover:shadow-md group-active:scale-[0.97]'
                : phase === 'pressed'
                  ? 'scale-[0.97]'
                  : ''
            } focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2`}
            aria-live="polite"
          >
            {/* Shimmer overlay during loading */}
            {(phase === 'loading' || phase === 'slow') && (
              <span className="absolute inset-0 rounded-pill overflow-hidden">
                <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </span>
            )}
            {renderButtonContent()}
          </span>

          {/* Slow connection actions */}
          {(phase === 'slow' || phase === 'failed') && (
            <div className="mt-3 flex items-center justify-center gap-3 font-body text-xs">
              {phase === 'slow' && (
                <span className="text-muted-foreground">{t('Connection is slow', 'الاتصال بطيء')}</span>
              )}
              {phase === 'failed' && (
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1 text-primary hover:text-gold-dark transition-colors"
                >
                  <RotateCw size={12} />
                  {t('Retry', 'إعادة المحاولة')}
                </button>
              )}
              <button
                onClick={handleCancel}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('Cancel', 'إلغاء')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
