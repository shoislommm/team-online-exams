/* Global app store: ports every global function/state variable from the
   original js2.html into a React context provider. */
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { FormEvent, ReactNode } from 'react';
import { LANGS, getCurrentLang, setCurrentLang, t, getDateLabel } from '@/i18n';
import type { LangCode } from '@/i18n';
import { EXAM_DATES, BITRIX24_WEBHOOK_URL, UF_EXAM_TYPE, UF_EXAM_SCORE } from '@/data/questions';
import { createBitrixLead, updateBitrixLeadWithResults } from '@/lib/bitrix';
import {
  getCurrentSections,
  getGlobalQuestionIndex,
  getSectionQuestionCount,
  getTotalQuestions,
} from '@/lib/exam';
import type { AnswersMap, FlagsMap, PlacementsMap, WritingMap } from '@/lib/exam';
import { arrFind, arrFindIndex } from '@/lib/helpers';

export type PageId =
  | 'landing-page'
  | 'waiting-page'
  | 'already-taken-page'
  | 'exam-interface'
  | 'review-page'
  | 'results-page'
  | 'disqualified-page';

export type ToastType = 'info' | 'success' | 'error';

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  leaving: boolean;
}

export interface ConfirmState {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface AppStore {
  /* i18n */
  lang: LangCode;
  setLanguage: (lang: LangCode) => void;
  /* pages */
  page: PageId;
  showPage: (id: PageId) => void;
  waitingDate: string;
  /* toast / confirm */
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType) => void;
  confirm: ConfirmState | null;
  showConfirm: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
  closeConfirm: (confirmed: boolean) => void;
  /* registration */
  selectedExamType: string | null;
  selectedExamDate: string | null;
  selectDate: (d: string) => void;
  selectExam: (type: string) => void;
  handleRegistration: (e: FormEvent<HTMLFormElement>) => void;
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  /* exam engine */
  currentExam: string;
  currentSection: number;
  currentQuestion: number;
  answers: AnswersMap;
  flags: FlagsMap;
  timeLeft: number;
  examRunning: boolean;
  selectedWord: number | null;
  wordBankPlacements: PlacementsMap;
  writingAnswers: WritingMap;
  sidebarMobileOpen: boolean;
  startExam: (type: string) => void;
  exitExam: () => void;
  setSection: (si: number) => void;
  jumpToQuestion: (si: number, qi: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  toggleFlag: () => void;
  selectOption: (gi: number, idx: number) => void;
  setTfng: (gi: number, v: string) => void;
  setShortAnswer: (gi: number, v: string) => void;
  selectWordChip: (i: number) => void;
  placeWordInGap: (qi: number) => void;
  removeWordFromGap: (qi: number) => void;
  updateWritingAnswer: (taskNum: number, v: string) => void;
  submitExam: () => void;
  goToReviewPage: () => void;
  backToExam: () => void;
  toggleMobileNav: () => void;
  toggleMobileSidebar: () => void;
  /* landing mobile navigation drawer (additive landing state) */
  mobileNavOpen: boolean;
  closeMobileNav: () => void;
  /* review modal */
  reviewModalOpen: boolean;
  openReviewModal: () => void;
  closeReviewModal: () => void;
  /* tab-switch security */
  tabWarning: { visible: boolean; count: number };
  closeTabWarning: () => void;
}

const AppContext = createContext<AppStore | null>(null);

export function useApp(): AppStore {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function hasAttemptedExam(n: string, p: string): boolean {
  const a = JSON.parse(localStorage.getItem('team_exam_attempts') || '[]') as Array<{ name: string; phone: string }>;
  for (let i = 0; i < a.length; i++) if (a[i].phone === p && a[i].name === n) return true;
  return false;
}

function recordAttempt(n: string, p: string, type: string): void {
  const a = JSON.parse(localStorage.getItem('team_exam_attempts') || '[]') as Array<Record<string, string>>;
  a.push({ name: n, phone: p, examType: type, date: new Date().toISOString() });
  localStorage.setItem('team_exam_attempts', JSON.stringify(a));
}

function saveStudentRecord(n: string, p: string, d: string, type: string): void {
  const r = JSON.parse(localStorage.getItem('team_exam_registrations') || '[]') as Array<Record<string, string>>;
  const i = arrFindIndex(r, function (x) { return x.phone === p; });
  const rec = { name: n, phone: p, date: d, examType: type, registeredAt: new Date().toISOString() };
  if (i >= 0) r[i] = rec;
  else r.push(rec);
  localStorage.setItem('team_exam_registrations', JSON.stringify(r));
}

function enterFullscreen(): void {
  const e = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => void;
    msRequestFullscreen?: () => void;
  };
  if (e.requestFullscreen) void e.requestFullscreen();
  else if (e.webkitRequestFullscreen) e.webkitRequestFullscreen();
  else if (e.msRequestFullscreen) e.msRequestFullscreen();
}

export function AppProvider({ children }: { children: ReactNode }) {
  /* ---- i18n ---- */
  const [lang, setLang] = useState<LangCode>(getCurrentLang());
  /* ---- pages ---- */
  const [page, setPage] = useState<PageId>('landing-page');
  const [waitingDate, setWaitingDate] = useState('--');
  /* ---- toast / confirm ---- */
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastIdRef = useRef(0);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);
  /* ---- registration ---- */
  const [selectedExamType, setSelectedExamType] = useState<string | null>(null);
  const [selectedExamDate, setSelectedExamDate] = useState<string | null>(null);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  /* ---- exam engine ---- */
  const [currentExam, setCurrentExam] = useState('english');
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [flags, setFlags] = useState<FlagsMap>({});
  const [timeLeft, setTimeLeft] = useState(6294);
  const [examRunning, setExamRunning] = useState(false);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [wordBankPlacements, setWordBankPlacements] = useState<PlacementsMap>({});
  const [writingAnswers, setWritingAnswers] = useState<WritingMap>({});
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  /* ---- landing mobile nav drawer ---- */
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  /* ---- review modal ---- */
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  /* ---- tab-switch security ---- */
  const [tabWarning, setTabWarning] = useState({ visible: false, count: 0 });
  const tabSwitchCountRef = useRef(0);
  const securityAttachedRef = useRef(false);
  const pageRef = useRef<PageId>(page);
  pageRef.current = page;

  /* ================ toast / confirm ================ */
  function showToast(message: string, type: ToastType = 'info'): void {
    toastIdRef.current += 1;
    const id = toastIdRef.current;
    setToasts(function (prev) { return prev.concat([{ id: id, message: message, type: type, leaving: false }]); });
    setTimeout(function () {
      setToasts(function (prev) {
        return prev.map(function (x) { return x.id === id ? { id: x.id, message: x.message, type: x.type, leaving: true } : x; });
      });
      setTimeout(function () {
        setToasts(function (prev) { return prev.filter(function (x) { return x.id !== id; }); });
      }, 300);
    }, 3000);
  }

  function showConfirm(message: string, onConfirm: () => void, onCancel?: () => void): void {
    setConfirm({ message: message, onConfirm: onConfirm, onCancel: onCancel });
  }

  function closeConfirm(confirmed: boolean): void {
    const c = confirm;
    setConfirm(null);
    if (!c) return;
    if (confirmed) c.onConfirm();
    else if (c.onCancel) c.onCancel();
  }

  /* ================ i18n ================ */
  function setLanguage(l: LangCode): void {
    if (!LANGS[l]) return;
    setCurrentLang(l);
    setLang(l);
    try { localStorage.setItem('team_exam_lang', l); } catch (e) { /* ignore */ }
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', l);
      window.history.replaceState(null, '', url.toString());
    } catch (e) { /* ignore */ }
  }

  /* ================ pages ================ */
  function showPage(id: PageId): void {
    setPage(id);
  }
  useEffect(function () {
    window.scrollTo(0, 0);
  }, [page]);

  /* ================ registration ================ */
  function selectDate(d: string): void {
    /* past exam dates are not selectable */
    if (d !== 'TEST' && d < getTodayString()) return;
    setSelectedExamDate(d);
  }

  function selectExam(type: string): void {
    setSelectedExamType(type);
  }

  function handleRegistration(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const form = e.currentTarget;
    const n = (form.querySelector('#reg-name') as HTMLInputElement).value.trim();
    const p = (form.querySelector('#reg-phone') as HTMLInputElement).value.trim();
    const em = (form.querySelector('#reg-email') as HTMLInputElement).value.trim();
    const d = selectedExamDate || '';
    if (!n || !p) { showToast(t('toast_required'), 'error'); return; }
    if (!d) { showToast(t('toast_date'), 'error'); return; }
    if (!selectedExamType) { showToast(t('toast_type'), 'error'); return; }
    setStudentName(n);
    setStudentPhone(p);
    setStudentEmail(em || '');
    if (hasAttemptedExam(n, p)) { showPage('already-taken-page'); return; }
    saveStudentRecord(n, p, d, selectedExamType);
    if (d === 'TEST') { startExamNow(selectedExamType === 'mathematics' ? 'math' : 'english'); return; }
    if (d !== getTodayString()) { showWaitingPage(d); return; }
    startExamNow(selectedExamType === 'mathematics' ? 'math' : 'english');
  }

  function showWaitingPage(d: string): void {
    showPage('waiting-page');
    const fd = arrFind(EXAM_DATES, function (x) { return x.date === d; });
    setWaitingDate(fd ? getDateLabel(fd) : d);
  }

  /* ================ exam engine ================ */
  function startExamNow(type: string): void {
    setCurrentExam(type);
    setCurrentSection(0);
    setCurrentQuestion(0);
    setAnswers({});
    setFlags({});
    setTimeLeft(6294);
    setSelectedWord(null);
    setWordBankPlacements({});
    setWritingAnswers({});
    tabSwitchCountRef.current = 0;
    initSecurity();
    showPage('exam-interface');
    setExamRunning(true);
  }

  function startExam(type: string): void {
    startExamNow(type);
  }

  function setSection(si: number): void {
    setCurrentSection(si);
    setCurrentQuestion(0);
  }

  function jumpToQuestion(si: number, qi: number): void {
    setCurrentSection(si);
    setCurrentQuestion(qi);
  }

  function nextQuestion(): void {
    const sec = getCurrentSections(currentExam);
    const qc = getSectionQuestionCount(sec[currentSection]);
    if (currentQuestion < qc - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < sec.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      goToReviewPage();
      return;
    }
  }

  function prevQuestion(): void {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      const sec = getCurrentSections(currentExam);
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(getSectionQuestionCount(sec[currentSection - 1]) - 1);
    }
  }

  function toggleFlag(): void {
    const gi = getGlobalQuestionIndex(getCurrentSections(currentExam), currentSection, currentQuestion);
    setFlags(function (prev) {
      const next = Object.assign({}, prev);
      next[gi] = !prev[gi];
      return next;
    });
  }

  function selectOption(gi: number, idx: number): void {
    setAnswers(function (prev) {
      const next = Object.assign({}, prev);
      next[gi] = idx;
      return next;
    });
  }

  function setTfng(gi: number, v: string): void {
    setAnswers(function (prev) {
      const next = Object.assign({}, prev);
      next[gi] = v;
      return next;
    });
  }

  function setShortAnswer(gi: number, v: string): void {
    setAnswers(function (prev) {
      const next = Object.assign({}, prev);
      next[gi] = v;
      return next;
    });
  }

  function selectWordChip(i: number): void {
    if (Object.keys(wordBankPlacements).map(function (k) { return wordBankPlacements[Number(k)]; }).indexOf(i) >= 0) return;
    setSelectedWord(selectedWord === i ? null : i);
  }

  function placeWordInGap(qi: number): void {
    if (selectedWord === null) { showToast(t('toast_word_first'), 'info'); return; }
    const w = selectedWord;
    setWordBankPlacements(function (prev) {
      const next = Object.assign({}, prev);
      next[qi] = w;
      return next;
    });
    setSelectedWord(null);
  }

  function removeWordFromGap(qi: number): void {
    setWordBankPlacements(function (prev) {
      const next = Object.assign({}, prev);
      delete next[qi];
      return next;
    });
    setSelectedWord(null);
  }

  function updateWritingAnswer(taskNum: number, v: string): void {
    setWritingAnswers(function (prev) {
      const next = Object.assign({}, prev);
      next['w' + taskNum] = v;
      return next;
    });
  }

  function exitExam(): void {
    showConfirm(t('exit_confirm'), function () {
      setExamRunning(false);
      showPage('landing-page');
    });
  }

  function goToReviewPage(): void {
    showPage('review-page');
  }

  function backToExam(): void {
    showPage('exam-interface');
  }

  function toggleMobileNav(): void {
    setMobileNavOpen(function (v) { return !v; });
  }

  function closeMobileNav(): void {
    setMobileNavOpen(false);
  }

  function toggleMobileSidebar(): void {
    setSidebarMobileOpen(function (v) { return !v; });
  }

  function openReviewModal(): void {
    setReviewModalOpen(true);
  }

  function closeReviewModal(): void {
    setReviewModalOpen(false);
  }

  function closeTabWarning(): void {
    setTabWarning(function (prev) { return { visible: false, count: prev.count }; });
  }

  /* ================ submit / grading ================ */
  function submitExam(): void {
    setExamRunning(false);
    if (studentName && studentPhone) recordAttempt(studentName, studentPhone, currentExam);
    const examLabel = currentExam === 'math' ? 'Mathematics' : 'English';
    const todayStr = new Date().toISOString().split('T')[0];

    let correct = 0;
    let total = 0;
    let autoScore = 0;
    let sectionBreakdown = '';
    const sec = getCurrentSections(currentExam);
    let writingText = '';

    if (currentExam === 'english') {
      let gCorrect = 0;
      const grammarSec = sec[0];
      const grammarQs = grammarSec.questions ?? [];
      for (let i = 0; i < grammarQs.length; i++) {
        total++;
        if (answers[i] === grammarQs[i].correct) { correct++; gCorrect++; }
      }
      const gScore = gCorrect * 2;
      autoScore += gScore;
      sectionBreakdown += 'Grammar: ' + gCorrect + '/' + grammarQs.length + ' (' + gScore + ' marks)\n';
      const wb = sec[1];
      const wbQs = wb.questions ?? [];
      let wbCorrect = 0;
      let gi = grammarQs.length;
      for (let i = 0; i < wbQs.length; i++) {
        total++;
        if (wordBankPlacements[i] === (wb.correctMapping ?? [])[i]) { correct++; wbCorrect++; }
      }
      const wbScore = wbCorrect * 2;
      autoScore += wbScore;
      sectionBreakdown += 'Word Bank: ' + wbCorrect + '/' + wbQs.length + ' (' + wbScore + ' marks)\n';
      gi += wbQs.length;
      let rCorrect = 0;
      const readingSec = sec[2];
      let rTotal = 0;
      const passages = readingSec.passages ?? [];
      for (let pi = 0; pi < passages.length; pi++) {
        const p = passages[pi];
        const pqs = p.questions ?? [];
        for (let i = 0; i < pqs.length; i++) {
          total++; rTotal++;
          if (answers[gi] === pqs[i].correct) { correct++; rCorrect++; }
          gi++;
        }
      }
      const rScore = rCorrect * 2;
      autoScore += rScore;
      sectionBreakdown += 'Reading: ' + rCorrect + '/' + rTotal + ' (' + rScore + ' marks)\n';
      const saSec = sec[3];
      const saQs = saSec.questions ?? [];
      let saCorrect = 0;
      for (let i = 0; i < saQs.length; i++) {
        total++;
        const av = answers[gi];
        if (av !== undefined && av !== null && String(av).trim()) { saCorrect++; }
        gi++;
      }
      const saScore = saCorrect * 2;
      autoScore += saScore;
      sectionBreakdown += 'Short Answer: ' + saCorrect + '/' + saQs.length + ' (' + saScore + ' marks)\n';
      const tfSec = sec[4];
      const tfQs = tfSec.questions ?? [];
      let tfCorrect = 0;
      for (let i = 0; i < tfQs.length; i++) {
        total++;
        if (answers[gi] === tfQs[i].correct) { correct++; tfCorrect++; }
        gi++;
      }
      const tfScore = tfCorrect * 2;
      autoScore += tfScore;
      sectionBreakdown += 'T/F/NG: ' + tfCorrect + '/' + tfQs.length + ' (' + tfScore + ' marks)\n';

      const wTask1Text = writingAnswers['w1'] || '';
      const wTask2Text = writingAnswers['w2'] || '';
      const wTask1WordCount = wTask1Text.trim() ? wTask1Text.trim().split(/\s+/).length : 0;
      const wTask2WordCount = wTask2Text.trim() ? wTask2Text.trim().split(/\s+/).length : 0;
      sectionBreakdown += '\n--- Writing Tasks (Manual Grading) ---\n';
      sectionBreakdown += 'Writing Task 1: ' + wTask1WordCount + ' words (15 marks max)\n';
      sectionBreakdown += 'Writing Task 2: ' + wTask2WordCount + ' words (25 marks max)\n';
      sectionBreakdown += '\nAuto-graded Score: ' + autoScore + '/60\n';
      sectionBreakdown += 'Total Exam: 100 marks (60 auto-graded + 40 writing)\n';

      writingText = '\n--- Writing Task 1 (15 marks) ---\n' + wTask1Text + '\n\n--- Writing Task 2 (25 marks) ---\n' + wTask2Text;
    } else {
      for (let si = 0; si < sec.length; si++) {
        const s = sec[si];
        const sqs = s.questions ?? [];
        let sCorrect = 0;
        for (let i = 0; i < sqs.length; i++) {
          total++;
          const gidx = getGlobalQuestionIndex(sec, si, i);
          if (answers[gidx] === sqs[i].correct) { correct++; sCorrect++; }
        }
        sectionBreakdown += s.title + ': ' + sCorrect + '/' + sqs.length + '\n';
      }
      autoScore = correct;
      sectionBreakdown += '\nTotal Score: ' + correct + '/' + total + '\n';
      writingText = '';
    }

    const score = total > 0 ? Math.round(correct / total * 100) : 0;
    void score;
    sectionBreakdown += '\nExam Language: ' + LANGS[lang] + '\n';
    showPage('results-page');
    const mathTotal = getTotalQuestions(sec);

    const scoreStr = autoScore + '/' + (currentExam === 'english' ? '60' : mathTotal);
    const totalStr = currentExam === 'english' ? '100' : String(mathTotal);

    createBitrixLead(studentName, studentPhone, studentEmail, examLabel, selectedExamDate || todayStr, function () {
      updateBitrixLeadWithResults(scoreStr, totalStr, sectionBreakdown, examLabel, writingText || '');
    });
  }

  /* Ported from the (commented-out) disqualifyStudent in the original source;
     invoked by the visibility security handler on the 3rd tab switch. */
  function disqualifyStudent(): void {
    setExamRunning(false);
    if (studentName && studentPhone) recordAttempt(studentName, studentPhone, currentExam);
    showPage('disqualified-page');
    const examLabel = currentExam === 'math' ? 'Mathematics' : 'English';
    const dqText = 'Student was disqualified for leaving the exam page 3 times.';
    createBitrixLead(studentName, studentPhone, studentEmail, examLabel, selectedExamDate || new Date().toISOString().split('T')[0], function (leadId) {
      const updateUrl = BITRIX24_WEBHOOK_URL.replace('crm.lead.add', 'crm.lead.update');
      const fields: Record<string, unknown> = {
        COMMENTS: 'Status: Disqualified\nReason: ' + dqText + '\nExam Date: ' + (selectedExamDate || new Date().toISOString().split('T')[0]),
      };
      fields[UF_EXAM_TYPE] = examLabel;
      fields[UF_EXAM_SCORE] = '0';
      const payload = { id: leadId, fields: fields, params: { REGISTER_SONET_EVENT: 'Y' } };
      fetch(updateUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json(); })
        .then(function (d) { if (d.error) console.error('Bitrix DQ error:', d.error); })
        .catch(function (e) { console.error('Bitrix DQ network error:', e); });
    });
  }

  /* ================ security ================ */
  const disqualifyRef = useRef(disqualifyStudent);
  disqualifyRef.current = disqualifyStudent;

  function attachSecurityListeners(): void {
    if (securityAttachedRef.current) return;
    securityAttachedRef.current = true;
    document.addEventListener('contextmenu', function (e) { if (pageRef.current === 'exam-interface') e.preventDefault(); });
    document.addEventListener('copy', function (e) { if (pageRef.current === 'exam-interface') e.preventDefault(); });
    document.addEventListener('paste', function (e) { if (pageRef.current === 'exam-interface') e.preventDefault(); });
    document.addEventListener('visibilitychange', function () {
      if (pageRef.current !== 'exam-interface' || document.hidden) return;
      tabSwitchCountRef.current++;
      if (tabSwitchCountRef.current >= 3) { disqualifyRef.current(); }
      else { setTabWarning({ visible: true, count: tabSwitchCountRef.current }); }
    });
    window.addEventListener('beforeunload', function (e) {
      if (pageRef.current === 'exam-interface') { e.preventDefault(); e.returnValue = ''; }
    });
  }

  function initSecurity(): void {
    attachSecurityListeners();
    enterFullscreen();
  }

  /* ================ timer ================ */
  useEffect(function () {
    if (!examRunning) return;
    const id = setInterval(function () {
      setTimeLeft(function (prev) { return prev - 1; });
    }, 1000);
    return function () { clearInterval(id); };
  }, [examRunning]);

  const submitExamRef = useRef(submitExam);
  submitExamRef.current = submitExam;
  useEffect(function () {
    if (examRunning && timeLeft <= 0) submitExamRef.current();
  }, [examRunning, timeLeft]);

  /* ================ provider value ================ */
  const store: AppStore = {
    lang: lang,
    setLanguage: setLanguage,
    page: page,
    showPage: showPage,
    waitingDate: waitingDate,
    toasts: toasts,
    showToast: showToast,
    confirm: confirm,
    showConfirm: showConfirm,
    closeConfirm: closeConfirm,
    selectedExamType: selectedExamType,
    selectedExamDate: selectedExamDate,
    selectDate: selectDate,
    selectExam: selectExam,
    handleRegistration: handleRegistration,
    studentName: studentName,
    studentPhone: studentPhone,
    studentEmail: studentEmail,
    currentExam: currentExam,
    currentSection: currentSection,
    currentQuestion: currentQuestion,
    answers: answers,
    flags: flags,
    timeLeft: timeLeft,
    examRunning: examRunning,
    selectedWord: selectedWord,
    wordBankPlacements: wordBankPlacements,
    writingAnswers: writingAnswers,
    sidebarMobileOpen: sidebarMobileOpen,
    startExam: startExam,
    exitExam: exitExam,
    setSection: setSection,
    jumpToQuestion: jumpToQuestion,
    nextQuestion: nextQuestion,
    prevQuestion: prevQuestion,
    toggleFlag: toggleFlag,
    selectOption: selectOption,
    setTfng: setTfng,
    setShortAnswer: setShortAnswer,
    selectWordChip: selectWordChip,
    placeWordInGap: placeWordInGap,
    removeWordFromGap: removeWordFromGap,
    updateWritingAnswer: updateWritingAnswer,
    submitExam: submitExam,
    goToReviewPage: goToReviewPage,
    backToExam: backToExam,
    toggleMobileNav: toggleMobileNav,
    toggleMobileSidebar: toggleMobileSidebar,
    mobileNavOpen: mobileNavOpen,
    closeMobileNav: closeMobileNav,
    reviewModalOpen: reviewModalOpen,
    openReviewModal: openReviewModal,
    closeReviewModal: closeReviewModal,
    tabWarning: tabWarning,
    closeTabWarning: closeTabWarning,
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}
