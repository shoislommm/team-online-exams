import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { i18nProps } from '@/i18n';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
};

/* "Exam Information" three-card section. */
export default function ExamInfo() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="exam-info" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 0.5, ease: EASE_OUT_EXPO }}>
          <div className="w-12 h-1 rounded-full bg-red mb-4 mx-auto" aria-hidden="true" />
          <h2 className="text-navy text-[26px] md:text-[34px] font-extrabold tracking-[-0.02em] leading-[1.15] text-center" {...i18nProps('info_title')} />
          <p className="text-slate-500 text-sm text-center max-w-lg mx-auto mt-3 leading-[1.7]" {...i18nProps('info_sub')} />
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-12"
          variants={cardsContainer}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}>
          <motion.div className="info-card" variants={cardItem}>
            <div className="info-icon">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-navy font-bold text-base tracking-[-0.01em] leading-[1.25] mt-4 mb-2" {...i18nProps('info_duration_t')} />
            <p className="text-slate-500 text-sm leading-[1.65]" {...i18nProps('info_duration')} />
          </motion.div>
          <motion.div className="info-card" variants={cardItem}>
            <div className="info-icon">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-navy font-bold text-base tracking-[-0.01em] leading-[1.25] mt-4 mb-2" {...i18nProps('info_types_t')} />
            <p className="text-slate-500 text-sm leading-[1.65]" {...i18nProps('info_types')} />
          </motion.div>
          <motion.div className="info-card" variants={cardItem}>
            <div className="info-icon">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-navy font-bold text-base tracking-[-0.01em] leading-[1.25] mt-4 mb-2" {...i18nProps('info_rules_t')} />
            <p className="text-slate-500 text-sm leading-[1.65]" {...i18nProps('info_rules')} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
