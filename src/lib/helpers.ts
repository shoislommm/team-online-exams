/* Small verbatim helpers from the original js2.html.
   (The DOM-scanning render functions of the original — renderSection,
   renderOptions, renderQuestionPills, renderSectionNav, renderSectionTabs,
   renderFAQ, renderReviewPage, updateBottomNav, updateProgress,
   updateQuestionCounter, applyStaticTranslations, updateLangSwitcherUI,
   setExamSidebarLabels, safeRender, initI18n, showTabWarning, isExamActive —
   are expressed as reactive React rendering/effects in the components and
   store; these pure helpers are kept verbatim.) */
import { EXAM_DATES, faqData, faqDataUZ, faqDataRU } from '@/data/questions';
import type { FaqItem } from '@/data/questions';
import type { LangCode } from '@/i18n';

export function arrFind<T>(arr: T[], fn: (x: T) => boolean): T | undefined {
  for (let i = 0; i < arr.length; i++) { if (fn(arr[i])) return arr[i]; }
  return undefined;
}

export function arrFindIndex<T>(arr: T[], fn: (x: T) => boolean): number {
  for (let i = 0; i < arr.length; i++) { if (fn(arr[i])) return i; }
  return -1;
}

export function nodeListEach<T>(nl: ArrayLike<T>, fn: (x: T, i: number) => void): void {
  for (let i = 0; i < nl.length; i++) fn(nl[i], i);
}

export function isExamDate(ds: string): boolean {
  if (ds === 'NOW') return true;
  for (let i = 0; i < EXAM_DATES.length; i++) if (EXAM_DATES[i].date === ds) return true;
  return false;
}

export function currentFaqData(lang: LangCode): FaqItem[] {
  if (lang === 'uz') return faqDataUZ;
  if (lang === 'ru') return faqDataRU;
  return faqData;
}
