import { t, getQText, getSecTitle, i18nProps } from '@/i18n';
import { useApp } from '@/store/app';
import {
  getCurrentSections,
  getGlobalQuestionIndex,
  getReadingLocation,
  getSectionDotColor,
  getSectionQuestionCount,
  getTotalQuestions,
  isQuestionAnswered,
} from '@/lib/exam';

/* Full review page (goToReviewPage / renderReviewPage / backToExam). */
export default function ReviewPage() {
  const {
    currentExam,
    answers,
    flags,
    wordBankPlacements,
    writingAnswers,
    backToExam,
    jumpToQuestion,
    showConfirm,
    submitExam,
  } = useApp();

  const sections = getCurrentSections(currentExam);
  const total = getTotalQuestions(sections);
  let answered = 0;
  let flaggedCount = 0;
  let unansweredCount = 0;
  for (let si = 0; si < sections.length; si++) {
    const qc = getSectionQuestionCount(sections[si]);
    for (let qi = 0; qi < qc; qi++) {
      const gi = getGlobalQuestionIndex(sections, si, qi);
      if (isQuestionAnswered(sections[si], qi, gi, answers, wordBankPlacements, writingAnswers)) answered++;
      else unansweredCount++;
      if (flags[gi]) flaggedCount++;
    }
  }

  const bannerHtml = t('review_banner')
    .replace('{a}', String(answered))
    .replace('{t}', String(total))
    .replace('{f}', String(flaggedCount));

  return (
    <>
      <div className="bg-navy h-14 flex items-center px-4 sm:px-6 flex-shrink-0">
        <span className="text-white font-bold text-xs tracking-widest uppercase">TEAM UNIVERSITY</span>
      </div>
      <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 py-3">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-amber-800 font-semibold text-sm" {...i18nProps('review_mode')} />
              <p id="review-banner-stats" className="text-amber-600 text-xs"
                dangerouslySetInnerHTML={{ __html: bannerHtml }} />
            </div>
          </div>
          <div className="w-full sm:w-48 bg-amber-200 rounded-full h-2 flex-shrink-0">
            <div id="review-progress-bar" className="bg-amber-500 h-2 rounded-full transition-all"
              style={{ width: (answered / total * 100) + '%' }}></div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div id="review-stats" className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="review-stat-card">
            <div className="text-2xl font-bold text-navy">{total}</div>
            <div className="text-xs text-gray-500 mt-1">{t('stat_total_q')}</div>
          </div>
          <div className="review-stat-card">
            <div className="text-2xl font-bold text-green-500">{answered}</div>
            <div className="text-xs text-gray-500 mt-1">{t('legend_answered')}</div>
          </div>
          <div className="review-stat-card">
            <div className="text-2xl font-bold text-amber">{flaggedCount}</div>
            <div className="text-xs text-gray-500 mt-1">{t('legend_flagged')}</div>
          </div>
          <div className="review-stat-card">
            <div className="text-2xl font-bold text-gray-400">{unansweredCount}</div>
            <div className="text-xs text-gray-500 mt-1">{t('legend_unanswered')}</div>
          </div>
        </div>
        <div id="unanswered-warning" className={unansweredCount > 0 ? 'mb-6' : 'hidden mb-6'}>
          {unansweredCount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <div>
                <p className="text-red-800 font-semibold text-sm">{t('review_warn_title').replace('{n}', String(unansweredCount))}</p>
                <p className="text-red-600 text-xs mt-1">{t('review_warn_sub')}</p>
              </div>
            </div>
          )}
        </div>
        <div id="review-sections">
          {sections.map(function (sec, si) {
            const qc = getSectionQuestionCount(sec);
            const rows = [];
            for (let qi = 0; qi < qc; qi++) {
              const gi = getGlobalQuestionIndex(sections, si, qi);
              const isAnswered = isQuestionAnswered(sec, qi, gi, answers, wordBankPlacements, writingAnswers);
              const isFlagged = flags[gi] || false;
              let qText = '';
              if (sec.type === 'reading') {
                const loc = getReadingLocation(sec, qi);
                qText = ((sec.passages ?? [])[loc.pIdx].questions ?? [])[loc.qIdx].text;
              } else if (sec.type === 'writing') {
                const task = (sec.tasks ?? [])[qi];
                qText = task.title + ': ' + task.prompt.substring(0, 60) + '...';
              } else {
                qText = getQText((sec.questions ?? [])[qi]);
              }
              if (qText.length > 80) qText = qText.substring(0, 80) + '...';
              rows.push(
                <div className="review-q-item" style={{ cursor: 'pointer' }} key={gi}
                  onClick={function () { backToExam(); jumpToQuestion(si, qi); }}>
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className={'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ' + (isAnswered ? 'bg-navy text-white' : 'border-2 border-gray-200 text-gray-400')}>{gi + 1}</span>
                    <span className="text-sm text-gray-700 truncate min-w-0">{qText}</span>
                  </div>
                  {isFlagged
                    ? <span className="text-xs font-semibold text-amber">{t('legend_flagged')}</span>
                    : isAnswered
                      ? <span className="text-xs text-navy">{t('legend_answered')}</span>
                      : <span className="text-xs text-red font-semibold">{t('legend_unanswered')}</span>}
                </div>
              );
            }
            return (
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mb-4" key={si}>
                <h3 className="text-navy font-bold text-base mb-4 flex items-center gap-2">
                  <span className="snav-dot" style={{ background: getSectionDotColor(sec.type) }}></span>
                  {getSecTitle(sec)}
                </h3>
                {rows}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-8 mb-8">
          <button onClick={backToExam} className="btn-outline text-center" {...i18nProps('btn_back_exam')} />
          <button onClick={function () { showConfirm(t('submit_confirm'), submitExam); }}
            className="btn-primary bg-red text-center" style={{ background: '#E31E24' }} {...i18nProps('btn_submit_exam')} />
        </div>
      </div>
    </>
  );
}
