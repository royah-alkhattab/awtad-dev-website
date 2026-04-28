import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Building2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Property } from '@/types';

interface Props {
  property: Property;
  index: number;
}

const statusLabel = (status: Property['status'], t: (a: string, b: string) => string) => {
  switch (status) {
    case 'upcoming': return t('Upcoming', 'قريباً');
    case 'under_construction': return t('Under Construction', 'قيد الإنشاء');
    case 'ready': return t('Ready', 'جاهز');
    case 'sold_out': return t('Sold Out', 'نفدت');
    default: return '';
  }
};

const EditorialPropertyRow = ({ property, index }: Props) => {
  const { t, language } = useLanguage();
  const reverse = index % 2 === 1;
  const name = language === 'en' ? property.name_en : property.name_ar;
  const loc = language === 'en' ? property.location_en : property.location_ar;
  const desc = language === 'en' ? property.short_description_en : property.short_description_ar;
  const status = statusLabel(property.status, t);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
      className="grid items-center gap-8 md:grid-cols-12 md:gap-14"
    >
      <Link
        to={`/properties/${property.slug}`}
        className={`group block overflow-hidden rounded-sm md:col-span-7 ${reverse ? 'md:order-2' : ''}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={property.cover_image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
          {status && (
            <span className="absolute left-6 top-6 rounded-full bg-cream/95 px-4 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal backdrop-blur rtl:left-auto rtl:right-6">
              {status}
            </span>
          )}
        </div>
      </Link>

      <div className={`md:col-span-5 ${reverse ? 'md:order-1' : ''}`}>
        <p className="mb-5 flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          <span className="font-display text-base font-bold text-primary/90">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px w-10 bg-primary/30" />
          {loc}
        </p>
        <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {name}
        </h2>
        {desc && (
          <p className="mt-5 font-body text-base leading-relaxed text-muted-foreground">
            {desc}
          </p>
        )}
        <div className="mt-7 flex items-center gap-6 font-body text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-primary/70" /> {loc}
          </span>
          {property.total_units > 0 && (
            <span className="flex items-center gap-1.5">
              <Building2 size={14} className="text-primary/70" /> {property.total_units} {t('units', 'وحدة')}
            </span>
          )}
        </div>
        <Link
          to={`/properties/${property.slug}`}
          className="group mt-9 inline-flex items-center gap-3 border-b border-primary/40 pb-1 font-body text-sm font-semibold text-primary transition-all hover:border-primary hover:gap-4"
        >
          {t('Explore Project', 'استكشاف المشروع')}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
};

export default EditorialPropertyRow;
