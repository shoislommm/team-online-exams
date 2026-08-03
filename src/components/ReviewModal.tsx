import { t, getSecTitle } from '@/i18n';
import { useApp } from '@/store/app';
import {
  getCurrentSections,
  getGlobalQuestionIndex,
  getSectionQuestionCount,
  getTotalQuestions,
  isQuestionAnswered,
} from '@/lib/exam';

/* Quick review modal (openReviewModal / closeReviewModal). */
export default function ReviewModal() {
  const {
    currentExam,
    currentSection,
    currentQuestion,
    answers,
    flags,
    wordBankPlacements,
    writingAnswers,
    reviewModalOpen,
    closeReviewModal,
    jumpToQuestion,
    goToReviewPage,
  } = useApp();

  const sections = getCurrentSections(currentExam);
  const total = getTotalQuestions(sections);
  let answered = 0;
  let flaggedCount = 0;
  for (let si = 0; si < sections.length; si++) {
    const qc = getSectionQuestionCount(sections[si]);
    for (let qi = 0; qi < qc; qi++) {
      const gi = getGlobalQuestionIndex(sections, si, qi);
      if (isQuestionAnswered(sections[si], qi, gi, answers, wordBankPlacements, writingAnswers)) answered++;
      if (flags[gi]) flaggedCount++;
    }
  }

  return (
    <div id="review-modal-overlay" className={reviewModalOpen ? 'open' : undefined}>
      <div className="review-modal" onClick={function (e) { e.stopPropagation(); }}>
        <div id="review-modal-body">
          <h3 className="text-navy font-bold text-lg mb-4">{t('modal_quick_review')}</h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-navy">{answered}</div>
              <div className="text-[10px] sm:text-xs leading-tight text-gray-500">{t('legend_answered')}</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-amber">{flaggedCount}</div>
              <div className="text-[10px] sm:text-xs leading-tight text-gray-500">{t('legend_flagged')}</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-gray-400">{total - answered}</div>
              <div className="text-[10px] sm:text-xs leading-tight text-gray-500">{t('legend_unanswered')}</div>
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {sections.map(function (sec, si) {
              const qc = getSectionQuestionCount(sec);
              const rows = [];
              for (let qi = 0; qi < qc; qi++) {
                const gi = getGlobalQuestionIndex(sections, si, qi);
                const isAnswered = isQuestionAnswered(sec, qi, gi, answers, wordBankPlacements, writingAnswers);
                const isFlagged = flags[gi] || false;
                const isCurrent = si === currentSection && qi === currentQuestion;
                rows.push(
                  <div key={gi}
                    className={'flex items-center justify-between py-1.5 px-2 rounded-lg ' + (isCurrent ? 'bg-red-50' : '')}
                    style={{ cursor: 'pointer' }}
                    onClick={function () { jumpToQuestion(si, qi); closeReviewModal(); }}>
                    <span className={'text-sm font-medium ' + (isCurrent ? 'text-red font-bold' : 'text-gray-700')}>Q{gi + 1}</span>
                    {isFlagged
                      ? <span className="text-xs text-amber font-semibold">{t('legend_flagged')}</span>
                      : isAnswered
                        ? <span className="text-xs text-navy">{t('legend_answered')}</span>
                        : <span className="text-xs text-gray-400">{t('legend_unanswered')}</span>}
                  </div>
                );
              }
              return (
                <div className="mb-3" key={si}>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{getSecTitle(sec)}</div>
                  {rows}
                </div>
              );
            })}
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={closeReviewModal} className="flex-1 btn-outline text-sm py-2.5 px-3 whitespace-nowrap">{t('btn_close')}</button>
            <button onClick={function () { closeReviewModal(); goToReviewPage(); }} className="flex-1 btn-primary text-sm py-2.5 px-3 whitespace-nowrap">{t('btn_full_review')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
