import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { t, pad2, getQText, getQOptions, getSecTitle, i18nProps } from '@/i18n';
import type { Question, Section } from '@/data/questions';
import LangSwitcher from '@/components/LangSwitcher';
import { useApp } from '@/store/app';
import {
  getCurrentSections,
  getGlobalQuestionIndex,
  getGrammarPassageIndex,
  getReadingLocation,
  getSectionDotColor,
  getSectionQuestionCount,
  getTotalQuestions,
  isQuestionAnswered,
} from '@/lib/exam';
import type { Passage } from '@/data/questions';

/* ================= question option list (renderOptions) ================= */
function Options({ q, gi }: { q: Question; gi: number }) {
  const { answers, selectOption } = useApp();
  const opts = getQOptions(q) ?? [];
  return (
    <div className="space-y-2">
      {opts.map(function (opt, i) {
        return (
          <label key={i} className="option-label" onClick={function () { selectOption(gi, i); }}>
            <span className={'option-radio' + (answers[gi] === i ? ' checked' : '')}></span>
            <span className="text-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: '<b class="text-navy mr-1">' + String.fromCharCode(65 + i) + '.</b> ' + opt }} />
          </label>
        );
      })}
    </div>
  );
}

/* ================= grammar (renderSection, type 'grammar') ================= */
function GrammarView({ s }: { s: Section }) {
  const { currentSection, currentQuestion, currentExam, answers, selectOption } = useApp();
  const sections = getCurrentSections(currentExam);
  const q = (s.questions ?? [])[currentQuestion];
  const gi = getGlobalQuestionIndex(sections, currentSection, currentQuestion);
  const pi = getGrammarPassageIndex(s, currentQuestion);
  const prevPi = currentQuestion > 0 ? getGrammarPassageIndex(s, currentQuestion - 1) : -1;
  const showPassage = pi >= 0 && pi !== prevPi;
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {showPassage && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <p className="text-gray-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: (s.passages ?? [])[pi].text }} />
        </div>
      )}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-navy text-white text-xs font-bold px-2.5 py-1 rounded-lg">Q{q.num}</span>
        <span className="text-xs text-gray-400 font-medium">Grammar</span>
      </div>
      <p className="text-gray-800 font-medium mb-5 text-base" dangerouslySetInnerHTML={{ __html: q.text }} />
      <div className="space-y-2">
        {(getQOptions(q) ?? []).map(function (opt, i) {
          return (
            <label key={i} className="option-label" onClick={function () { selectOption(gi, i); }}>
              <span className={'option-radio' + (answers[gi] === i ? ' checked' : '')}></span>
              <span className="text-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: '<b class="text-navy mr-1">' + String.fromCharCode(65 + i) + '.</b> ' + opt }} />
            </label>
          );
        })}
      </div>
    </div>
  );
}

/* ================= word bank (type 'wordbank') ================= */
function WordBankView({ s }: { s: Section }) {
  const { selectedWord, wordBankPlacements, selectWordChip, placeWordInGap, removeWordFromGap } = useApp();
  const words = s.words ?? [];
  const qs = s.questions ?? [];
  const usedValues = Object.keys(wordBankPlacements).map(function (k) { return wordBankPlacements[Number(k)]; });
  const passage = typeof s.passage === 'string' ? s.passage : '';
  const parts = passage.split(/(\[Q\d+\])/);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-purple-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">Q11-Q15</span>
        <span className="text-xs text-gray-400 font-medium">Word Bank</span>
      </div>
      <p className="text-gray-700 text-sm mb-4">{s.instruction}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {words.map(function (w, i) {
          const used = usedValues.indexOf(i) >= 0;
          const isSel = selectedWord === i;
          return (
            <span key={i}
              className={'word-chip ' + (used ? 'used ' : '') + (isSel ? 'selected' : '')}
              onClick={function () { selectWordChip(i); }}>
              {w.label}. {w.text}
            </span>
          );
        })}
      </div>
      <div className="bg-gray-50 rounded-xl p-4 text-sm leading-relaxed text-gray-700">
        {parts.map(function (part, idx) {
          const m = part.match(/^\[Q(\d+)\]$/);
          if (!m) return <span key={idx}>{part}</span>;
          const qNum = Number(m[1]);
          const qi = qs.findIndex(function (q) { return q.num === qNum; });
          if (qi < 0) return <span key={idx}>{part}</span>;
          const pi = wordBankPlacements[qi];
          if (pi !== undefined) {
            return (
              <span key={idx} className="wb-gap filled" onClick={function () { removeWordFromGap(qi); }}>
                {words[pi].text}
              </span>
            );
          }
          return (
            <span key={idx} className="wb-gap" onClick={function () { placeWordInGap(qi); }}>
              Q{qNum} — select —
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ================= reading (type 'reading') ================= */
function ReadingView({ s }: { s: Section }) {
  const { currentSection, currentQuestion, currentExam } = useApp();
  const sections = getCurrentSections(currentExam);
  const { pIdx, qIdx } = getReadingLocation(s, currentQuestion);
  const ps = (s.passages ?? [])[pIdx];
  const q = (ps.questions ?? [])[qIdx];
  const gi = getGlobalQuestionIndex(sections, currentSection, currentQuestion);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-navy mb-2">{ps.title}</h3>
        <p className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: ps.text }} />
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">Q{q.num}</span>
          <span className="text-xs text-gray-400 font-medium">Reading</span>
        </div>
        <p className="text-gray-800 font-medium mb-5 text-base" dangerouslySetInnerHTML={{ __html: q.text }} />
        <Options q={q} gi={gi} />
      </div>
    </div>
  );
}

/* ================= short answer (type 'shortanswer') ================= */
function ShortAnswerView({ s }: { s: Section }) {
  const { currentSection, currentQuestion, currentExam, answers, setShortAnswer } = useApp();
  const sections = getCurrentSections(currentExam);
  const q = (s.questions ?? [])[currentQuestion];
  const gi = getGlobalQuestionIndex(sections, currentSection, currentQuestion);
  const curVal = answers[gi] !== undefined && answers[gi] !== null ? String(answers[gi]) : '';
  const maxW = q.maxWords || 3;
  const wc = curVal.trim() ? curVal.trim().split(/\s+/).length : 0;
  const passage = (typeof s.passage === 'object' ? s.passage : undefined) as Passage | undefined;
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {currentQuestion < 5 && passage && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <h3 className="font-bold text-navy mb-2">{passage.title}</h3>
          <p className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: passage.text }} />
        </div>
      )}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">Q{q.num}</span>
        <span className="text-xs text-gray-400 font-medium">Short Answer</span>
      </div>
      <p className="text-gray-800 font-medium mb-2 text-base" dangerouslySetInnerHTML={{ __html: q.text }} />
      <p className="text-red text-xs font-semibold mb-3">Answer in NO MORE THAN {maxW} WORDS</p>
      <input type="text" id={'sa-input-' + gi}
        className="sa-input w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
        placeholder="Type your answer..." value={curVal}
        onChange={function (e) { setShortAnswer(gi, e.target.value); }} />
      <p id={'sa-counter-' + gi}
        className={wc > maxW ? 'text-xs text-red mt-2 font-semibold' : 'text-xs text-gray-400 mt-2'}>
        {wc} / {maxW} words
      </p>
    </div>
  );
}

/* ================= true/false/not-given (type 'tfng') ================= */
function TfngView({ s }: { s: Section }) {
  const { currentSection, currentQuestion, currentExam, answers, setTfng } = useApp();
  const sections = getCurrentSections(currentExam);
  const q = (s.questions ?? [])[currentQuestion];
  const gi = getGlobalQuestionIndex(sections, currentSection, currentQuestion);
  const sel = answers[gi];
  const passage = (typeof s.passage === 'object' ? s.passage : undefined) as Passage | undefined;
  return (
    <>
      {currentQuestion < 5 && passage && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <h3 className="font-bold text-navy mb-2">{passage.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: passage.text }} />
          </div>
        </div>
      )}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">Q{q.num}</span>
          <span className="text-xs text-gray-400 font-medium">T / F / NG</span>
        </div>
        <p className="text-gray-800 font-medium mb-5 text-base" dangerouslySetInnerHTML={{ __html: q.text }} />
        <div className="flex gap-3">
          <button className={'tfng-btn flex-1 py-3 border font-medium text-sm rounded-xl ' + (sel === 'true' ? 'true-selected' : 'border-gray-300 text-gray-600')}
            onClick={function () { setTfng(gi, 'true'); }}>TRUE</button>
          <button className={'tfng-btn flex-1 py-3 border font-medium text-sm rounded-xl ' + (sel === 'false' ? 'false-selected' : 'border-gray-300 text-gray-600')}
            onClick={function () { setTfng(gi, 'false'); }}>FALSE</button>
          <button className={'tfng-btn flex-1 py-3 border font-medium text-sm rounded-xl ' + (sel === 'notgiven' ? 'ng-selected' : 'border-gray-300 text-gray-600')}
            onClick={function () { setTfng(gi, 'notgiven'); }}>NOT GIVEN</button>
        </div>
      </div>
    </>
  );
}

/* ================= multiple choice (type 'mcq', math exam) ================= */
function McqView({ s }: { s: Section }) {
  const { currentSection, currentQuestion, currentExam } = useApp();
  const sections = getCurrentSections(currentExam);
  const q = (s.questions ?? [])[currentQuestion];
  const gi = getGlobalQuestionIndex(sections, currentSection, currentQuestion);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-navy text-white text-xs font-bold px-2.5 py-1 rounded-lg">Q{q.num}</span>
        <span className="text-xs text-gray-400 font-medium">{getSecTitle(s)}</span>
      </div>
      {q.image && (
        <div className="mb-4">
          <img src={q.image} alt="Question image" style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #E5E7EB' }} />
        </div>
      )}
      <p className="text-gray-800 font-medium mb-5 text-base"
        dangerouslySetInnerHTML={{ __html: getQText(q).replace(/\n/g, '<br>') }} />
      <Options q={q} gi={gi} />
    </div>
  );
}

/* ================= writing (type 'writing') ================= */
function WritingView({ s }: { s: Section }) {
  const { currentQuestion, writingAnswers, updateWritingAnswer } = useApp();
  const task = (s.tasks ?? [])[currentQuestion];
  const wKey = 'w' + task.num;
  const wVal = writingAnswers[wKey] || '';
  const wCount = wVal.trim() ? wVal.trim().split(/\s+/).length : 0;
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-navy text-white text-xs font-bold px-2.5 py-1 rounded-lg">Task {task.num}</span>
        <span className="text-xs text-gray-400 font-medium">Writing</span>
      </div>
      <h3 className="text-navy font-bold text-lg mb-2">{task.title} ({task.marks} marks)</h3>
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">{task.prompt}</p>
      <p className="text-red text-xs font-semibold mb-3">Minimum {task.minWords} words required</p>
      <textarea id={'writing-area-' + wKey}
        className="sa-input w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
        style={{ minHeight: '200px', resize: 'vertical' }}
        placeholder="Write your response here..."
        value={wVal}
        onChange={function (e) { updateWritingAnswer(task.num, e.target.value); }} />
      <p id={'writing-counter-' + wKey}
        className={wCount === 0 ? 'text-xs text-gray-400 mt-2' : (wCount < task.minWords ? 'text-xs text-amber mt-2 font-semibold' : 'text-xs text-green-500 mt-2 font-semibold')}>
        {wCount} / {task.minWords} words (minimum)
      </p>
    </div>
  );
}

/* ================= exam interface (header + sidebar + question area) ================= */
/* ================= scrollable section tabs with edge-fade scroll indicators ================= */
function TabScroller(props: {
  id?: string;
  sections: Section[];
  currentSection: number;
  lang: string;
  active: boolean;
  onPick: (i: number) => void;
  outerClass: string;
  scrollClass: string;
  contentClass: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [st, setSt] = useState({ left: false, right: false });

  function upd(): void {
    const el = ref.current;
    if (!el) return;
    setSt({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }

  useEffect(function () {
    upd();
    /* exam interface mounts hidden — re-measure once it becomes visible,
       after transitions settle, and whenever the element resizes */
    const t1 = setTimeout(upd, 60);
    const t2 = setTimeout(upd, 350);
    window.addEventListener('resize', upd);
    const el = ref.current;
    let ro: ResizeObserver | null = null;
    if (el && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(upd);
      ro.observe(el);
    }
    return function () {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', upd);
      if (ro) ro.disconnect();
    };
    // re-measure when tab labels change width (language), sections change, or the exam page shows
  }, [props.sections, props.lang, props.active]);

  function scrollBy(dir: number): void {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * 220, behavior: 'smooth' });
  }

  const fadeBase = 'absolute top-0 bottom-0 w-16 pointer-events-none z-10 flex items-center';
  const badgeBase = 'w-7 h-7 rounded-full bg-white text-navy flex items-center justify-center shadow-lg';
  return (
    <div className={props.outerClass}>
      <div id={props.id} ref={ref} onScroll={upd} className={props.scrollClass}>
        <div className={props.contentClass}>
          {props.sections.map(function (sec, i) {
            return (
              <span key={i}
                className={'section-tab' + (i === props.currentSection ? ' active' : '')}
                onClick={function () { props.onPick(i); }}>
                {getSecTitle(sec)}
              </span>
            );
          })}
        </div>
      </div>
      {st.left && (
        <div className={fadeBase + ' left-0 justify-start pl-1.5'}
          style={{ background: 'linear-gradient(to right, #0A1F5C 45%, rgba(10,31,92,0))' }}>
          <button type="button" onClick={function () { scrollBy(-1); }} aria-label="Scroll sections left"
            className={badgeBase + ' tab-nudge-left pointer-events-auto cursor-pointer hover:bg-navy hover:text-white transition-colors'}
            style={{ pointerEvents: 'auto' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      )}
      {st.right && (
        <div className={fadeBase + ' right-0 justify-end pr-1.5'}
          style={{ background: 'linear-gradient(to left, #0A1F5C 45%, rgba(10,31,92,0))' }}>
          <button type="button" onClick={function () { scrollBy(1); }} aria-label="Scroll sections right"
            className={badgeBase + ' tab-nudge-right pointer-events-auto cursor-pointer hover:bg-navy hover:text-white transition-colors'}
            style={{ pointerEvents: 'auto' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExamInterface() {
  const {
    page,
    lang,
    currentExam,
    currentSection,
    currentQuestion,
    answers,
    flags,
    timeLeft,
    wordBankPlacements,
    writingAnswers,
    sidebarMobileOpen,
    toggleMobileSidebar,
    setSection,
    jumpToQuestion,
    nextQuestion,
    prevQuestion,
    toggleFlag,
    selectOption,
    setTfng,
    exitExam,
    openReviewModal,
    showConfirm,
    submitExam,
  } = useApp();

  const sections = getCurrentSections(currentExam);
  const s = sections[currentSection];
  const total = getTotalQuestions(sections);
  const gi = getGlobalQuestionIndex(sections, currentSection, currentQuestion);

  /* ================= keyboard shortcuts (kbd_hint) =================
     1-4 answer | ArrowLeft/ArrowRight navigate | F flag | S next.
     Active only while the exam interface page is visible; ignored
     while typing in inputs/textareas (short answer, writing). */
  const keyHandlerRef = useRef<(e: KeyboardEvent) => void>(function () {});
  keyHandlerRef.current = function (e: KeyboardEvent) {
    if (page !== 'exam-interface') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
    const key = e.key;
    if (key === 'ArrowLeft') { e.preventDefault(); prevQuestion(); return; }
    if (key === 'ArrowRight') { e.preventDefault(); nextQuestion(); return; }
    if (key === 'f' || key === 'F') { e.preventDefault(); toggleFlag(); return; }
    if (key === 's' || key === 'S') { e.preventDefault(); nextQuestion(); return; }
    if (key >= '1' && key <= '4') {
      const idx = Number(key) - 1;
      if (s.type === 'tfng') {
        const vals = ['true', 'false', 'notgiven'];
        if (idx < vals.length) { e.preventDefault(); setTfng(gi, vals[idx]); }
        return;
      }
      let opts: string[] | null = null;
      if (s.type === 'reading') {
        const loc = getReadingLocation(s, currentQuestion);
        const ps = (s.passages ?? [])[loc.pIdx];
        const q = ps ? (ps.questions ?? [])[loc.qIdx] : undefined;
        opts = q ? (getQOptions(q) ?? null) : null;
      } else if (s.type === 'mcq' || s.type === 'grammar') {
        const q = (s.questions ?? [])[currentQuestion];
        opts = q ? (getQOptions(q) ?? null) : null;
      }
      if (opts && idx < opts.length) { e.preventDefault(); selectOption(gi, idx); }
    }
  };
  useEffect(function () {
    const h = function (e: KeyboardEvent) { keyHandlerRef.current(e); };
    window.addEventListener('keydown', h);
    return function () { window.removeEventListener('keydown', h); };
  }, []);

  /* updateProgress */
  let answeredCount = 0;
  for (let si = 0; si < sections.length; si++) {
    const qcount = getSectionQuestionCount(sections[si]);
    for (let qi = 0; qi < qcount; qi++) {
      const g = getGlobalQuestionIndex(sections, si, qi);
      if (isQuestionAnswered(sections[si], qi, g, answers, wordBankPlacements, writingAnswers)) answeredCount++;
    }
  }

  /* timer */
  const th = Math.floor(timeLeft / 3600);
  const tm = Math.floor((timeLeft % 3600) / 60);
  const ts = timeLeft % 60;
  const timerClass =
    'bg-white rounded-full px-4 py-1.5 flex items-center gap-2' +
    (timeLeft <= 180 ? ' timer-danger' : timeLeft <= 600 ? ' timer-warning' : '');

  const counterHtml = t('question_of')
    .replace('{n}', '<b class="text-white">' + (gi + 1) + '</b>')
    .replace('{total}', String(total));

  const isMath = currentExam === 'math';

  /* updateBottomNav */
  const qc = s ? getSectionQuestionCount(s) : 0;
  const isFirst = currentQuestion === 0 && currentSection === 0;
  const isLast = currentQuestion === qc - 1 && currentSection === sections.length - 1;
  const curFlagged = !!flags[gi];

  /* renderSection */
  let content: ReactNode = null;
  if (s) {
    if (s.type === 'grammar') content = <GrammarView s={s} />;
    else if (s.type === 'wordbank') content = <WordBankView s={s} />;
    else if (s.type === 'reading') content = <ReadingView s={s} />;
    else if (s.type === 'shortanswer') content = <ShortAnswerView s={s} />;
    else if (s.type === 'tfng') content = <TfngView s={s} />;
    else if (s.type === 'mcq') content = <McqView s={s} />;
    else if (s.type === 'writing') content = <WritingView s={s} />;
  }

  return (
    <>
      <div className="bg-navy h-14 flex items-center justify-between px-3 md:px-4 flex-shrink-0" style={{ minHeight: '56px' }}>
        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
          {/* mobile: open the exam status sidebar (drawer) */}
          <button onClick={toggleMobileSidebar} aria-label="Questions panel"
            className="lg:hidden text-white/90 hover:text-white p-2 -ml-1 flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* logo hidden on phones — the timer/lang/exit controls need the space */}
          <img src="https://static.tildacdn.com/tild6564-3335-4636-b730-323965336565/Team_Uni_LOGO.png"
            alt="TEAM University Logo"
            className="hidden sm:block h-8 md:h-9 w-auto mr-1 md:mr-3 flex-shrink-0" />
          {/* scrollable on medium desktops (1024-1280px) so tabs never overlap the counter/timer */}
          <TabScroller id="exam-section-tabs" sections={sections} currentSection={currentSection}
            lang={lang} active={page === 'exam-interface'} onPick={setSection}
            outerClass="hidden lg:block relative min-w-0 flex-1"
            scrollClass="tabstrip-noscroll overflow-x-auto"
            contentClass="flex items-center gap-1" />
        </div>
        <div className="flex items-center gap-2.5 md:gap-4 flex-shrink-0 ml-3 md:ml-4">
          <span id="exam-question-counter" className="hidden sm:block text-white/80 text-sm"
            dangerouslySetInnerHTML={{ __html: counterHtml }} />
          <div id="timer-container" className={timerClass}>
            <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span id="timer" className="text-navy font-bold text-sm font-mono">{pad2(th)}:{pad2(tm)}:{pad2(ts)}</span>
          </div>
          <LangSwitcher id="lang-switcher-exam" />
          <button onClick={exitExam}
            className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-1.5 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden md:inline" {...i18nProps('btn_exit')}></span>
          </button>
        </div>
      </div>
      {/* mobile-only: horizontally scrollable section tabs strip (desktop tabs stay in the header) */}
      <TabScroller sections={sections} currentSection={currentSection} lang={lang}
        active={page === 'exam-interface'} onPick={setSection}
        outerClass="lg:hidden bg-navy border-t border-white/10 flex-shrink-0 relative"
        scrollClass="tabstrip-noscroll overflow-x-auto"
        contentClass="flex items-center gap-1 px-3 py-2 w-max" />
      <div className="flex flex-1 overflow-hidden">
        {/* mobile scrim behind the sidebar drawer */}
        {sidebarMobileOpen && (
          <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" aria-hidden="true"
            onClick={toggleMobileSidebar}></div>
        )}
        <div id="exam-sidebar"
          className={'w-64 flex-shrink-0 overflow-y-auto border-r border-gray-200' + (sidebarMobileOpen ? ' mobile-open' : '')}
          style={{ width: '260px', background: '#F8F9FC' }}>
          <div className="p-4">
            <div className="mb-4">
              <span id="sidebar-exam-label" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {isMath ? t('math_exam_label') : t('eng_exam_label')}
              </span>
              <h3 id="sidebar-part-title" className="text-lg font-bold text-navy mt-0.5"
                dangerouslySetInnerHTML={{ __html: isMath ? t('all_sections') : t('part1_title') }} />
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-gray-500" {...i18nProps('sidebar_progress')}></span>
                <span id="progress-text" className="font-bold text-navy">{answeredCount}/{total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div id="progress-bar" className="bg-navy h-2 rounded-full transition-all duration-300"
                  style={{ width: (answeredCount / total * 100) + '%' }}></div>
              </div>
            </div>
            <div id="section-nav-items" className="mb-4">
              {sections.map(function (sec, i) {
                const qcount = getSectionQuestionCount(sec);
                let answered = 0;
                for (let qi = 0; qi < qcount; qi++) {
                  const g = getGlobalQuestionIndex(sections, i, qi);
                  if (sec.type === 'wordbank') { if (wordBankPlacements[qi] !== undefined) answered++; }
                  else if (sec.type !== 'writing' && answers[g] !== undefined && answers[g] !== null && answers[g] !== '') answered++;
                }
                return (
                  <div key={i}
                    className={'snav-item' + (i === currentSection ? ' active' : '')}
                    onClick={function () { setSection(i); if (sidebarMobileOpen) toggleMobileSidebar(); }}>
                    <span className="snav-dot" style={{ background: getSectionDotColor(sec.type) }}></span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-700">{getSecTitle(sec)}</div>
                      <div className="text-xs text-gray-400">{answered}/{qcount} {t('answered_short')}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div id="question-pills-label" className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2" {...i18nProps('sidebar_questions')} />
            <div id="question-pills" className="grid grid-cols-5 gap-1.5 mb-4">
              {sections.map(function (sec, si) {
                const qcount = getSectionQuestionCount(sec);
                const pills: ReactNode[] = [];
                for (let qi = 0; qi < qcount; qi++) {
                  const g = getGlobalQuestionIndex(sections, si, qi);
                  const isAnswered = isQuestionAnswered(sec, qi, g, answers, wordBankPlacements, writingAnswers);
                  let cls = 'q-pill';
                  if (g === gi) cls += ' current';
                  else if (isAnswered) cls += ' answered';
                  if (flags[g]) cls += ' flagged';
                  pills.push(
                    <div key={si + '-' + qi} className={cls}
                      onClick={function () { jumpToQuestion(si, qi); if (sidebarMobileOpen) toggleMobileSidebar(); }}>
                      {g + 1}
                    </div>
                  );
                }
                return pills;
              })}
            </div>
            <div className="border-t border-gray-200 pt-3 mb-4">
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-navy"></span><span
                  className="text-xs text-gray-500" {...i18nProps('legend_answered')}></span></div>
                <div className="flex items-center gap-1.5"><span
                  className="w-3 h-3 rounded-full border-2 border-gray-300"></span><span
                    className="text-xs text-gray-500" {...i18nProps('legend_unanswered')}></span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red"></span><span
                  className="text-xs text-gray-500" {...i18nProps('legend_current')}></span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber"></span><span
                  className="text-xs text-gray-500" {...i18nProps('legend_flagged')}></span></div>
              </div>
            </div>
            <div className="space-y-2">
              <button onClick={openReviewModal}
                className="w-full border border-navy text-navy font-medium text-sm rounded-xl py-2.5 flex items-center justify-center gap-2 hover:bg-navy hover:text-white transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span {...i18nProps('btn_review_all')}></span>
              </button>
              <button onClick={function () { showConfirm(t('submit_confirm'), submitExam); }}
                className="w-full bg-red text-white font-medium text-sm rounded-xl py-2.5 flex items-center justify-center gap-2 hover:opacity-90 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span {...i18nProps('btn_submit_exam')}></span>
              </button>
            </div>
          </div>
        </div>
        <div id="main-content" className="flex-1 overflow-y-auto" style={{ background: '#FAFBFF' }}>
          <div id="section-container" className="max-w-3xl mx-auto p-4 sm:p-6">{content}</div>
          <div className="flex items-center justify-between gap-2 mt-2 mb-6 max-w-3xl mx-auto px-4 sm:px-6">
            <button id="prev-btn" onClick={prevQuestion}
              className="flex items-center gap-1.5 sm:gap-2 text-[13px] sm:text-sm font-medium text-gray-600 hover:text-navy transition py-2.5 px-2 sm:px-4 whitespace-nowrap flex-shrink-0"
              style={{ visibility: isFirst ? 'hidden' : 'visible' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden min-[420px]:inline" {...i18nProps('btn_previous')}></span>
            </button>
            <button id="flag-btn" onClick={toggleFlag}
              className="flex items-center justify-center gap-1.5 sm:gap-2 border border-gray-300 text-gray-600 text-[13px] sm:text-sm font-medium rounded-xl py-2.5 px-3 sm:px-5 hover:border-navy hover:text-navy transition whitespace-nowrap min-w-0"
              style={curFlagged ? { borderColor: '#F59E0B', color: '#F59E0B' } : undefined}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 7h18M3 7a2 2 0 012-2h14a2 2 0 012 2" />
              </svg>
              <span id="flag-btn-text" data-i18n="btn_flag" className="truncate">{curFlagged ? t('btn_flagged') : t('btn_flag')}</span>
            </button>
            <button id="next-btn" onClick={nextQuestion}
              className="flex items-center gap-1.5 sm:gap-2 bg-navy text-white text-[13px] sm:text-sm font-medium rounded-xl py-2.5 px-4 sm:px-6 hover:opacity-90 transition whitespace-nowrap flex-shrink-0">
              {isLast ? t('btn_review') : t('btn_next')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="text-center pb-4 hidden md:block">
            <span className="text-xs text-gray-400" {...i18nProps('kbd_hint')}></span>
          </div>
        </div>
      </div>
    </>
  );
}
