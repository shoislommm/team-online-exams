import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { i18nProps } from '@/i18n';
import { currentFaqData } from '@/lib/helpers';
import { useApp } from '@/store/app';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_STANDARD: [number, number, number, number] = [0.4, 0, 0.2, 1];

/* FAQ accordion (renderFAQ + toggleFaq from the original). Answers animate to
   their measured auto height via framer-motion (no max-height clipping). */
export default function Faq() {
  const { lang } = useApp();
  const [openIndex, setOpenIndex] = useState(-1);
  const reduceMotion = useReducedMotion();
  const data = currentFaqData(lang);

  return (
    <section id="faq" className="bg-[#F5F7FC] py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-5 md:px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 0.5, ease: EASE_OUT_EXPO }}>
          <div className="w-12 h-1 rounded-full bg-red mb-4 mx-auto" aria-hidden="true" />
          <h2 className="text-navy text-[26px] md:text-[34px] font-extrabold tracking-[-0.02em] leading-[1.15] text-center" {...i18nProps('faq_title')} />
        </motion.div>
        <motion.div
          className="space-y-3 mt-8 md:mt-10"
          id="faq-container"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 0.55, ease: EASE_OUT_EXPO }}>
          {data.map(function (item, i) {
            const open = openIndex === i;
            return (
              <div key={i} className={open ? 'faq-item open' : 'faq-item'}>
                <button className="faq-btn" aria-expanded={open}
                  onClick={function () { setOpenIndex(openIndex === i ? -1 : i); }}>
                  <span>{item.q}</span>
                  <svg className="faq-chevron ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="answer"
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={reduceMotion ? { duration: 0.01 } : { duration: 0.3, ease: EASE_STANDARD }}>
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
