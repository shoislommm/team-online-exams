import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { i18nProps } from '@/i18n';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const statsContainer: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.45, staggerChildren: 0.06 } },
};

const statItem: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

/* Landing page hero section: layered background + staggered entrance. */
export default function Hero() {
  const reduceMotion = useReducedMotion();
  const instant = reduceMotion ? { duration: 0.01 } : undefined;

  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center text-center min-h-[560px] md:min-h-[640px]">
      {/* 1. background image with slow zoom (A11) */}
      <div className="absolute inset-0 bg-cover bg-center hero-bg-zoom"
        style={{ backgroundImage: "url('https://static.tildacdn.com/tild3466-3365-4362-a362-393564653264/TEAM_universty_1.png')" }}>
      </div>
      {/* 2. gradient overlay (A7) */}
      <motion.div className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(6,21,63,.82) 0%, rgba(10,31,92,.72) 45%, rgba(6,21,63,.88) 100%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={instant ?? { duration: 0.6, ease: EASE_OUT_EXPO }} />
      {/* 3. decorative glows */}
      <div className="absolute pointer-events-none" aria-hidden="true"
        style={{
          top: '-5%', right: '-10%', width: '600px', height: '600px',
          background: 'radial-gradient(closest-side, rgba(51,87,171,.45), transparent 70%)',
        }} />
      <div className="absolute pointer-events-none" aria-hidden="true"
        style={{
          bottom: '-8%', left: '-15%', width: '480px', height: '480px',
          background: 'radial-gradient(closest-side, rgba(227,30,36,.18), transparent 70%)',
        }} />
      {/* 4. content */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 pt-24 pb-20">
        <motion.h1
          className="text-white font-extrabold tracking-[-0.025em] leading-[1.08] max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(2.125rem, 5vw + 1rem, 3.5rem)' }}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={instant ?? { duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.15 }}
          {...i18nProps('hero_title')} />
        <motion.p
          className="text-white/75 text-[15px] md:text-[17px] leading-[1.65] mt-5 max-w-xl mx-auto"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={instant ?? { duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.3 }}
          {...i18nProps('hero_sub')} />
        <motion.div
          className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-10 max-w-xl mx-auto"
          variants={statsContainer}
          initial={reduceMotion ? false : 'hidden'}
          animate="show">
          <motion.div className="stat-box" variants={statItem} transition={instant}>
            <div className="text-white text-[24px] sm:text-[36px] font-extrabold tracking-[-0.02em] leading-none">2</div>
            <div className="w-6 h-[3px] bg-red rounded-full mx-auto mt-2" aria-hidden="true" />
            <div className="text-white/60 text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase leading-[1.3] mt-2" {...i18nProps('stat_exam_types')} />
          </motion.div>
          <motion.div className="stat-box" variants={statItem} transition={instant}>
            <div className="text-white text-[24px] sm:text-[36px] font-extrabold tracking-[-0.02em] leading-none">30+</div>
            <div className="w-6 h-[3px] bg-red rounded-full mx-auto mt-2" aria-hidden="true" />
            <div className="text-white/60 text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase leading-[1.3] mt-2" {...i18nProps('stat_questions')} />
          </motion.div>
          <motion.div className="stat-box" variants={statItem} transition={instant}>
            <div className="text-white text-[24px] sm:text-[36px] font-extrabold tracking-[-0.02em] leading-none">120</div>
            <div className="w-6 h-[3px] bg-red rounded-full mx-auto mt-2" aria-hidden="true" />
            <div className="text-white/60 text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase leading-[1.3] mt-2" {...i18nProps('stat_minutes')} />
          </motion.div>
        </motion.div>
      </div>
      {/* scroll indicator (A12) */}
      <motion.a
        href="#registration"
        aria-label="Scroll to registration"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-6 h-10 rounded-full border-2 border-white/40 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={instant ?? { duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.9 }}>
        <span className="block w-1 h-2 bg-white rounded-full scroll-dot" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
