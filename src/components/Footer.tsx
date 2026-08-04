import { motion, useReducedMotion } from 'framer-motion';
import { i18nProps, t } from '@/i18n';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const headingClass = 'text-[12px] font-bold uppercase tracking-[0.14em] text-white/50 mb-4';

/* Official TEAM University social profiles (from teamuni.uz footer). */
const SOCIALS: { name: string; href: string; color: string; path: string }[] = [
  {
    name: 'Telegram',
    href: 'https://t.me/teamuni_uz',
    color: '#229ED9',
    path: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/teamuni_uz/',
    color: '#E1306C',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/teamuni.uz',
    color: '#1877F2',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/teamuni',
    color: '#0A66C2',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCnCQsoDg3PWOvBvOh3VBmZQ',
    color: '#FF0000',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
];

/* Landing page footer. */
export default function Footer() {
  const reduceMotion = useReducedMotion();

  function backToTop(): void {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  /* contact info lines: "Phone: ..." / "Email: ..." (translated, <br>-separated) */
  const contactLines = t('footer_contact_info').split('<br>');
  const contactIcons = [
    'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', // phone
    'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', // mail
  ];

  return (
    <footer className="relative text-white" style={{ background: 'linear-gradient(180deg, #0A1F5C 0%, #06153F 100%)' }}>
      {/* gradient hairline at the very top */}
      <div className="h-0.5" aria-hidden="true"
        style={{ background: 'linear-gradient(90deg, rgba(227,30,36,.9), rgba(255,255,255,.25), rgba(227,30,36,.9))' }} />
      <motion.div
        className="max-w-6xl mx-auto px-5 md:px-6 py-12 md:py-16"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={reduceMotion ? { duration: 0.01 } : { duration: 0.5, ease: EASE_OUT_EXPO }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.35fr_0.75fr_0.75fr_1.15fr] gap-10 md:gap-8">
          {/* brand + socials */}
          <div>
            <div className="flex items-center mb-4">
              <a href="https://teamuni.uz" target="_blank" rel="noopener noreferrer"
                className="hover:opacity-85 transition-opacity duration-150">
                <img src="https://static.tildacdn.com/tild6564-3335-4636-b730-323965336565/Team_Uni_LOGO.png"
                  alt="TEAM University Logo" className="h-9 w-auto" />
              </a>
            </div>
            <p className="text-white/60 text-sm leading-[1.7]" {...i18nProps('footer_tagline')} />
            <h4 className={headingClass + ' mt-7 mb-3'} {...i18nProps('footer_follow')} />
            <div className="flex items-center gap-2.5 flex-wrap">
              {SOCIALS.map(function (soc, i) {
                return (
                  <motion.a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.name}
                    title={soc.name}
                    className="social-btn"
                    style={{ '--sc': soc.color } as React.CSSProperties}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={reduceMotion ? { duration: 0.01 } : { duration: 0.35, delay: 0.15 + i * 0.06, ease: EASE_OUT_EXPO }}>
                    <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={soc.path} />
                    </svg>
                  </motion.a>
                );
              })}
            </div>
          </div>
          {/* exams (on-page anchors) */}
          <div>
            <h4 className={headingClass} {...i18nProps('footer_exams')} />
            <div className="flex flex-col gap-2.5 items-start">
              <a href="#registration" className="footer-link" {...i18nProps('nav_registration')} />
              <a href="#exam-info" className="footer-link" {...i18nProps('nav_exam_info')} />
              <a href="#faq" className="footer-link" {...i18nProps('nav_faq')} />
            </div>
          </div>
          {/* quick links */}
          <div>
            <h4 className={headingClass} {...i18nProps('footer_quick')} />
            <div className="flex flex-col gap-2.5 items-start">
              <a href="https://teamuni.uz" className="footer-link" {...i18nProps('footer_home')} />
              <a href="https://teamuni.uz/en/media-about-us" className="footer-link" {...i18nProps('footer_about')} />
              <a href="https://teamuni.uz/en/foundation" className="footer-link" {...i18nProps('footer_programs')} />
            </div>
          </div>
          {/* contact */}
          <div>
            <h4 className={headingClass} {...i18nProps('footer_contact')} />
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5 text-white/70 text-sm leading-[1.6]">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Temur Malik Street, 146,<br />Tashkent, Uzbekistan 100050</span>
              </div>
              {contactLines.map(function (line, i) {
                return (
                  <div key={i} className="flex items-start gap-2.5 text-white/70 text-sm leading-[1.6]">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={contactIcons[i] || contactIcons[1]} />
                    </svg>
                    <span dangerouslySetInnerHTML={{ __html: line }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 py-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs" {...i18nProps('footer_rights')} />
          <button type="button" onClick={backToTop} aria-label="Back to top"
            className="w-10 h-10 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
