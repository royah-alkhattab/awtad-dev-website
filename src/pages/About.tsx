import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Eye, Shield, Gem, Leaf, Lightbulb } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import aboutHero from '@/assets/about-hero.jpg';
import heroImg from '@/assets/hero-main.jpeg';
import saidProfile from '@/assets/said-profile.jpeg';
import { useRef } from 'react';

const About = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const team = [
    { name: t('Said Al Maawali', 'سعيد المعولي'), role: t('Chief Executive Officer', 'الرئيس التنفيذي'), image: saidProfile },
  ];

  const values = [
    {
      icon: Shield,
      title: t('Transparency', 'الشفافية'),
      desc: t(
        'We believe in the importance of trust and building trust with our clients and partners.',
        'نؤمن بأهمية الثقة وبناء الثقة مع عملائنا وشركائنا.'
      ),
    },
    {
      icon: Gem,
      title: t('Quality', 'الجودة'),
      desc: t(
        'Commitment to the highest standards at every stage of development.',
        'الالتزام بأعلى المعايير في جميع مراحل التطوير.'
      ),
    },
    {
      icon: Leaf,
      title: t('Sustainability', 'الاستدامة'),
      desc: t(
        'Delivering projects that respect the environment and serve future generations.',
        'تقديم مشاريع تحترم البيئة وتخدم الأجيال القادمة.'
      ),
    },
    {
      icon: Lightbulb,
      title: t('Innovation', 'الابتكار'),
      desc: t(
        'Adopting the latest technologies and trends in the real estate world.',
        'اعتماد أحدث التقنيات والتوجهات في عالم العقارات.'
      ),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <img src={aboutHero} alt="About" className="h-full w-full object-cover" />
          <div className="bg-overlay-dark absolute inset-0" />
        </motion.div>
        <div className="container-premium relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-light"
          >
            {t('About Awtad', 'عن أوتاد')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl font-bold text-cream md:text-5xl"
          >
            {t('About Us', 'من نحن')}
          </motion.h1>
        </div>
      </section>

      {/* About Us */}
      <section className="section-padding">
        <div className="container-premium max-w-4xl">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-foreground mb-6 md:text-4xl">
              {t('Who We Are', 'من نحن')}
            </h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-4">
              {t(
                'Awtaad Real Estate Development is a leading developer of residential and commercial projects. We strive to provide innovative real estate solutions that meet the needs of the local and regional market. In all our projects, we adhere to the highest standards of quality and innovation, focusing on building modern communities that reflect our values and vision for the future.',
                'شركة أوتاد للتطوير العقاري هي شركة رائدة في تطوير المشاريع السكنية والتجارية، تسعى إلى تقديم حلول عقارية مبتكرة تلبي احتياجات السوق المحلي والإقليمي، وتلتزم في جميع مشاريعها بأعلى معايير الجودة والابتكار، مع التركيز على بناء مجتمعات حديثة تعكس قيمها ورؤيتها للمستقبل.'
              )}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision & Objectives */}
      <section className="section-padding bg-secondary">
        <div className="container-premium grid gap-16 md:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Eye size={24} />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">{t('Our Vision', 'رؤيتنا')}</h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              {t(
                'To be pioneers in real estate development by delivering exceptional projects that contribute to creating sustainable value for our clients and the community, reflecting the highest standards of excellence in quality and urban planning.',
                'أن نكون رواد التطوير العقاري من خلال تقديم مشاريع استثنائية تساهم في خلق قيمة مستدامة للعملاء والمجتمع، وتعكس أعلى معايير التميز في الجودة والتخطيط العمراني.'
              )}
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Target size={24} />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">{t('Objectives', 'الأهداف')}</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-gold" />
                <p className="font-body text-base leading-relaxed text-muted-foreground">
                  {t(
                    'Developing 587 residential units by the end of 2029.',
                    'تنفيذ 587 وحدة سكنية نهاية 2029.'
                  )}
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-gold" />
                <p className="font-body text-base leading-relaxed text-muted-foreground">
                  {t(
                    'Establishing the company as one of the leading real estate developers in the local market.',
                    'ترسيخ اسم الشركة كواحدة من أبرز المطورين العقاريين في السوق المحلي.'
                  )}
                </p>
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding">
        <div className="container-premium">
          <ScrollReveal className="mb-12 text-center">
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t('What Drives Us', 'ما يحركنا')}
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              {t('Our Values', 'قيمنا')}
            </h2>
          </ScrollReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="rounded-card border border-border/60 bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <v.icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-secondary">
        <div className="container-premium grid gap-12 items-center md:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="overflow-hidden rounded-lg">
              <img src={heroImg} alt="Our journey" className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t('Our Journey', 'مسيرتنا')}
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('14 Years of Shaping Skylines', '14 أعوام من تشكيل الأفق')}
            </h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-4">
              {t(
                'Awtaad Development was founded in 2012 and has grown from a visionary startup to one of the leading real estate development companies in Oman.',
                'تأسست أوتاد للتطوير في عام 2012 ، ونمت من شركة ناشئة ذات رؤية إلى واحدة من أبرز شركات التطوير العقاري في عُمان.'
              )}
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              {t(
                'Every project we undertake reflects our core values: quality without compromise, innovative design that respects local heritage, and a deep commitment to our clients\' aspirations.',
                'يعكس كل مشروع نتولاه قيمنا الأساسية: الجودة بلا تنازل، والتصميم المبتكر الذي يحترم التراث المحلي، والالتزام العميق بتطلعات عملائنا.'
              )}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Management Team */}
      <section className="section-padding">
        <div className="container-premium">
          <ScrollReveal className="mb-12 text-center">
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t('Leadership', 'القيادة')}
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              {t('Management Team', 'فريق الإدارة')}
            </h2>
          </ScrollReveal>
          <div className="flex justify-center">
            {team.map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="text-center">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 transition-transform duration-300 hover:scale-105">
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="font-body text-sm text-muted-foreground">{member.role}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-accent">
        <div className="container-premium text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-accent-foreground md:text-4xl mb-4">
              {t('Partner With Us', 'شاركنا')}
            </h2>
            <p className="mx-auto max-w-xl font-body text-base text-accent-foreground/70 mb-8">
              {t(
                'Whether you are looking for your dream home or a smart investment, we would love to hear from you.',
                'سواء كنت تبحث عن منزل أحلامك أو استثمار ذكي، يسعدنا التواصل معك.'
              )}
            </p>
            <Link to="/contact" className="inline-block rounded-md bg-gradient-gold px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              {t('Contact Us', 'تواصل معنا')}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default About;
