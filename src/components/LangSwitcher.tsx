import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { LANGS } from '@/i18n';
import type { LangCode } from '@/i18n';
import { useApp } from '@/store/app';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Language switcher (used in the landing nav and in the exam header).
   Behavior matches toggleLangMenu / setLanguage from the original. */
export default function LangSwitcher({ id }: { id?: string }) {
  const { lang, setLanguage } = useApp();
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  /* close on outside click (original: document click listener) */
  useEffect(function () {
    function onDocClick() { setOpen(false); }
    document.addEventListener('click', onDocClick);
    return function () { document.removeEventListener('click', onDocClick); };
  }, []);

  function toggleLangMenu(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    setOpen(function (v) { return !v; });
  }

  const langs: Array<{ code: LangCode; label: string }> = [
    { code: 'en', label: 'English' },
    { code: 'uz', label: 'Oʻzbekcha' },
    { code: 'ru', label: 'Русский' },
  ];

  return (
    <div className={open ? 'lang-switcher open' : 'lang-switcher'} id={id}>
      <button type="button" className="lang-btn" onClick={toggleLangMenu} aria-label="Language" aria-expanded={open}>
        <svg className="lang-globe" style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
        <span className="lang-current">{LANGS[lang]}</span>
        <svg className="lang-chevron" style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="lang-menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.96, y: -4, transition: { duration: 0.12, ease: EASE_OUT_EXPO } }}
            transition={reduceMotion
              ? { duration: 0.01 }
              : { duration: 0.18, ease: EASE_OUT_EXPO }}
          >
            {langs.map(function (l) {
              return (
                <button
                  key={l.code}
                  type="button"
                  data-lang={l.code}
                  className={lang === l.code ? 'active' : undefined}
                  onClick={function () { setLanguage(l.code); }}
                >
                  {l.label}
                  {lang === l.code && (
                    <svg className="lang-check" style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
