import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { i18nProps } from '@/i18n';
import LangSwitcher from '@/components/LangSwitcher';
import { useApp } from '@/store/app';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_STANDARD: [number, number, number, number] = [0.4, 0, 0.2, 1];

const NAV_LINKS = [
  { href: '#registration', key: 'nav_registration' },
  { href: '#exam-info', key: 'nav_exam_info' },
  { href: '#faq', key: 'nav_faq' },
];

const DRAWER_QUICK_LINKS = [
  { href: 'https://teamuni.uz', key: 'footer_home' },
  { href: 'https://teamuni.uz/en/media-about-us', key: 'footer_about' },
  { href: 'https://teamuni.uz/en/foundation', key: 'footer_programs' },
];

/* Landing page top navigation: glass sticky navbar + animated mobile drawer. */
export default function Navbar() {
  const { toggleMobileNav, mobileNavOpen, closeMobileNav, page } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  /* A1: transparent at top -> glass navy once scrolled past 8px */
  useEffect(function () {
    function onScroll() { setScrolled(window.scrollY > 8); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return function () { window.removeEventListener('scroll', onScroll); };
  }, []);

  /* close drawer on Escape, on resize to desktop, and on page change */
  useEffect(function () {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') closeMobileNav(); }
    function onResize() { if (window.innerWidth >= 768) closeMobileNav(); }
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return function () {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [closeMobileNav]);

  useEffect(function () {
    closeMobileNav();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  /* body scroll-lock while the drawer is open */
  useEffect(function () {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
      return function () { document.body.style.overflow = ''; };
    }
  }, [mobileNavOpen]);

  function goToAnchor(href: string): void {
    closeMobileNav();
    window.setTimeout(function () {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }, 100);
  }

  return (
    <>
      <nav
        className={
          'fixed top-0 inset-x-0 z-50 h-16 transition-[background-color,box-shadow,border-color] duration-300 ' +
          (scrolled
            ? 'bg-[rgba(10,31,92,.85)] backdrop-blur-[14px] backdrop-saturate-[1.4] border-b border-white/10 shadow-[0_8px_24px_rgba(6,21,63,.25)]'
            : 'bg-transparent border-b border-transparent')
        }
      >
        <div className="max-w-6xl mx-auto px-5 md:px-6 h-full flex items-center justify-between">
          <div className="flex items-center">
            <a href="https://teamuni.uz" target="_blank" rel="noopener noreferrer"
              className="hover:opacity-85 transition-opacity duration-150">
              <img src="https://static.tildacdn.com/tild6564-3335-4636-b730-323965336565/Team_Uni_LOGO.png"
                alt="TEAM University Logo" className="h-8 md:h-9 w-auto" />
            </a>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(function (l) {
              return (
                <a key={l.href} href={l.href}
                  className="px-4 py-2 rounded-full text-[14px] font-medium tracking-[0.01em] text-white/75 hover:text-white hover:bg-white/10 transition-all duration-200"
                  {...i18nProps(l.key)} />
              );
            })}
          </div>
          <div className="flex items-center gap-2.5">
            <LangSwitcher />
            <button
              className="md:hidden relative w-11 h-11 -mr-2.5 flex flex-col items-center justify-center text-white"
              onClick={toggleMobileNav} aria-label="Menu" aria-expanded={mobileNavOpen}>
              <span className={'burger-bar' + (mobileNavOpen ? ' translate-y-[7px] rotate-45' : '')} />
              <span className={'burger-bar mt-[5px]' + (mobileNavOpen ? ' opacity-0 scale-x-0' : '')} />
              <span className={'burger-bar mt-[5px]' + (mobileNavOpen ? ' -translate-y-[7px] -rotate-45' : '')} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileNavOpen && (
          <>
            {/* A4: scrim */}
            <motion.div
              key="mobile-nav-scrim"
              className="fixed inset-0 z-[60] bg-navy-900/60 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE_STANDARD }}
              onClick={closeMobileNav}
              aria-hidden="true"
            />
            {/* A5: panel */}
            <motion.div
              key="mobile-nav-panel"
              className="fixed top-0 right-0 z-[70] h-full w-[300px] max-w-[85vw] bg-navy flex flex-col shadow-[0_24px_64px_rgba(6,21,63,.35)]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={reduceMotion
                ? { x: '100%', transition: { duration: 0.01 } }
                : { x: '100%', transition: { duration: 0.22, ease: EASE_STANDARD } }}
              transition={reduceMotion
                ? { duration: 0.01 }
                : { duration: 0.32, ease: EASE_OUT_EXPO }}
              role="dialog"
              aria-label="Menu"
            >
              <div className="h-16 px-4 flex items-center justify-between flex-shrink-0">
                <a href="https://teamuni.uz" target="_blank" rel="noopener noreferrer">
                  <img src="https://static.tildacdn.com/tild6564-3335-4636-b730-323965336565/Team_Uni_LOGO.png"
                    alt="TEAM University Logo" className="h-8 w-auto" />
                </a>
                <button
                  className="w-11 h-11 -mr-2.5 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  onClick={closeMobileNav} aria-label="Close menu">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="mt-4 px-4 flex flex-col">
                {/* A6: link stagger, starting 120ms after panel opens */}
                {NAV_LINKS.map(function (l, i) {
                  return (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT_EXPO, delay: 0.12 + i * 0.06 }}
                      className="flex items-center justify-between h-14 px-4 rounded-xl text-[15px] font-medium text-white/85 hover:bg-white/10 hover:text-white transition-colors"
                      onClick={function (e) { e.preventDefault(); goToAnchor(l.href); }}
                    >
                      <span {...i18nProps(l.key)} />
                      <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  );
                })}
              </nav>
              <div className="mt-auto">
                <div className="border-t border-white/10 mx-4" />
                <div className="px-4 py-4 flex flex-col gap-1">
                  {DRAWER_QUICK_LINKS.map(function (l) {
                    return (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                        className="px-4 py-2 text-[13px] text-white/50 hover:text-white/80 transition-colors"
                        {...i18nProps(l.key)} />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
