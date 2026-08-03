/* Pure exam-engine helpers ported from the original js2.html. */
import { englishSections, mathSections } from '@/data/questions';
import type { Section } from '@/data/questions';

export type AnswersMap = Record<number, number | string>;
export type FlagsMap = Record<number, boolean>;
export type PlacementsMap = Record<number, number>;
export type WritingMap = Record<string, string>;

export function getCurrentSections(currentExam: string): Section[] {
  return currentExam === 'english' ? englishSections : mathSections;
}

export function getSectionQuestionCount(sec: Section): number {
  if (sec.type === 'reading') {
    let t = 0;
    for (let i = 0; i < (sec.passages ?? []).length; i++) t += (sec.passages?.[i].questions ?? []).length;
    return t;
  }
  if (sec.type === 'writing') return (sec.tasks ?? []).length;
  return (sec.questions ?? []).length;
}

export function getGlobalQuestionIndex(sections: Section[], si: number, qi: number): number {
  let idx = 0;
  for (let i = 0; i < si; i++) idx += getSectionQuestionCount(sections[i]);
  return idx + qi;
}

export function getTotalQuestions(sections: Section[]): number {
  let t = 0;
  for (let i = 0; i < sections.length; i++) t += getSectionQuestionCount(sections[i]);
  return t;
}

export function getSectionDotColor(type: string): string {
  if (type === 'grammar') return '#0A1F5C';
  if (type === 'wordbank') return '#8B5CF6';
  if (type === 'reading') return '#3B82F6';
  if (type === 'shortanswer') return '#10B981';
  if (type === 'tfng') return '#F59E0B';
  if (type === 'writing') return '#EC4899';
  return '#0A1F5C';
}

export function getGrammarPassageIndex(sec: Section, qi: number): number {
  if (!sec.passages) return -1;
  if (qi === 0) return 0;
  if (qi >= 1 && qi <= 2) return 1;
  if (qi >= 3 && qi <= 4) return 2;
  if (qi >= 5 && qi <= 9) return 3;
  return -1;
}

/* Answered check used by updateProgress / question pills / review pages. */
export function isQuestionAnswered(
  sec: Section,
  qi: number,
  gi: number,
  answers: AnswersMap,
  wordBankPlacements: PlacementsMap,
  writingAnswers: WritingMap,
): boolean {
  if (sec.type === 'wordbank') return wordBankPlacements[qi] !== undefined;
  if (sec.type === 'writing') {
    const wKey = 'w' + (sec.tasks?.[qi].num ?? 0);
    return !!(writingAnswers[wKey] && writingAnswers[wKey].trim());
  }
  return answers[gi] !== undefined && answers[gi] !== null && answers[gi] !== '';
}

/* Reading section: locate passage/question indices for a flat question index. */
export function getReadingLocation(sec: Section, qi: number): { pIdx: number; qIdx: number } {
  let pIdx = 0;
  let qIdx = 0;
  let cur = 0;
  const passages = sec.passages ?? [];
  for (let pi = 0; pi < passages.length; pi++) {
    const pql = (passages[pi].questions ?? []).length;
    if (qi < cur + pql) { pIdx = pi; qIdx = qi - cur; break; }
    cur += pql;
  }
  return { pIdx, qIdx };
}
