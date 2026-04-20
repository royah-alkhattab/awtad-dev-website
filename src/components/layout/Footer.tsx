import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Phone, Instagram } from 'lucide-react';
import { subscribeNewsletter } from '@/services/api';

const Footer = () => {
  const { t, dir } = useLanguage();
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');
    const res = await subscribeNewsletter(value.trim(), contactType, honeypot);
    if (res.success) {
      setStatus('success');
      setValue('');
    } else {
      setStatus('error');
      setErrorMsg(res.error || t('Something went wrong.', 'حدث خطأ ما.'));
    }
  };

  return (
    <footer className="border-t border-border bg-accent text-accent-foreground">
      <div className="container-premium py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src="/logow.PNG" alt="AWTAD" className="h-20 w-auto mb-4" />
            <p className="font-body text-sm leading-relaxed opacity-80">
              {t(
                'Building landmarks that define the future of luxury living.',
                'نبني معالم تحدد مستقبل الحياة الفاخرة.'
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest mb-4 opacity-60">
              {t('Quick Links', 'روابط سريعة')}
            </h4>
            <ul className="space-y-3 font-body text-sm">
              <li><Link to="/" className="opacity-80 transition-opacity hover:opacity-100">{t('Home', 'الرئيسية')}</Link></li>
              <li><Link to="/properties" className="opacity-80 transition-opacity hover:opacity-100">{t('Properties', 'المشاريع')}</Link></li>
              <li><Link to="/about" className="opacity-80 transition-opacity hover:opacity-100">{t('About Us', 'من نحن')}</Link></li>
              <li><Link to="/contact" className="opacity-80 transition-opacity hover:opacity-100">{t('Contact', 'تواصل معنا')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest mb-4 opacity-60">
              {t('Contact Us', 'تواصل معنا')}
            </h4>
            <ul className="space-y-3 font-body text-sm">
              <li className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100">
                <MapPin size={14} className="shrink-0" />
                <a href="https://maps.app.goo.gl/fDGkevP6VkFa3WRN8" target="_blank" rel="noopener noreferrer">
                  {t('18th November St, Muscat, Oman', 'شارع ١٨ نوفمبر ، مسقط، عُمان')}
                </a>
              </li>
              <li className="flex items-start gap-2 opacity-80 transition-opacity hover:opacity-100">
                <Phone size={14} className="shrink-0 mt-0.5" />
                <span className="flex flex-col gap-1">
                  <a href="tel:+96895599902" dir="ltr">+968 9559 9902</a>
                  <a href="tel:+96895559902" dir="ltr">+968 9555 9902</a>
                </span>
              </li>
              <li className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100">
                <Instagram size={14} className="shrink-0" />
                <a href="https://www.instagram.com/awtad.om9" target="_blank" rel="noopener noreferrer">@awtad.om9</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest mb-4 opacity-60">
              {t('Stay Updated', 'ابقَ على اطلاع')}
            </h4>
            <p className="font-body text-sm opacity-80 mb-4">
              {t('Subscribe for the latest project updates.', 'اشترك لتلقي آخر تحديثات المشاريع.')}
            </p>

            {/* Toggle */}
            <div className="mb-3 inline-flex rounded-pill border border-accent-foreground/15 bg-background/10 p-1">
              <button
                type="button"
                onClick={() => { setContactType('email'); setValue(''); setStatus('idle'); }}
                className={`rounded-pill px-3 py-1 font-body text-xs font-medium transition-colors ${
                  contactType === 'email' ? 'bg-gradient-gold text-primary-foreground' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {t('Email', 'بريد إلكتروني')}
              </button>
              <button
                type="button"
                onClick={() => { setContactType('phone'); setValue(''); setStatus('idle'); }}
                className={`rounded-pill px-3 py-1 font-body text-xs font-medium transition-colors ${
                  contactType === 'phone' ? 'bg-gradient-gold text-primary-foreground' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {t('Phone', 'هاتف')}
              </button>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              {/* Honeypot */}
              <input
                type="text"
                name="company_name"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              />
              <input
                type={contactType === 'email' ? 'email' : 'tel'}
                dir={contactType === 'phone' ? 'ltr' : dir}
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={contactType === 'email'
                  ? t('Your email', 'بريدك الإلكتروني')
                  : t('Your phone number', 'رقم هاتفك')}
                className="flex-1 rounded-md border border-border bg-background/10 px-3 py-2 font-body text-sm text-accent-foreground placeholder:opacity-50 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded-md bg-gradient-gold px-4 py-2 font-body text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === 'loading'
                  ? t('Sending...', 'جارٍ الإرسال...')
                  : t('Subscribe', 'اشترك')}
              </button>
            </form>

            {status === 'success' && (
              <p className="mt-2 font-body text-xs text-emerald-400">
                {t('Thanks for subscribing!', 'شكراً لاشتراكك!')}
              </p>
            )}
            {status === 'error' && (
              <p className="mt-2 font-body text-xs text-red-400">
                {errorMsg}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-accent-foreground/10 pt-6 text-center font-body text-xs opacity-50">
          © {new Date().getFullYear()} Awtad Development. {t('All rights reserved.', 'جميع الحقوق محفوظة.')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
