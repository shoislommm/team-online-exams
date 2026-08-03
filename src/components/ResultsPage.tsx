import { LANGS, i18nProps } from '@/i18n';
import { useApp } from '@/store/app';

/* "Exam Submitted Successfully" results page. */
export default function ResultsPage() {
  const { showPage, studentName, currentExam, selectedExamDate, lang } = useApp();
  const examLabel = currentExam === 'math' ? 'Mathematics' : 'English';
  const todayStr = new Date().toISOString().split('T')[0];
  return (
    <>
      <nav className="bg-navy h-14 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <span className="text-white font-bold text-xs tracking-widest uppercase">TEAM UNIVERSITY</span>
        </div>
      </nav>
      <div className="max-w-lg mx-auto px-6 py-12 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-navy mb-3" {...i18nProps('results_title')} />
        <p className="text-gray-500 mb-8" {...i18nProps('results_sub')} />
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 text-left">
          <h3 className="text-navy font-bold text-lg mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span {...i18nProps('results_summary')}></span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 text-sm" {...i18nProps('results_name')}></span>
              <span id="result-student-name" className="text-gray-800 font-medium text-sm">{studentName || '--'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 text-sm" {...i18nProps('results_exam_type')}></span>
              <span id="result-exam-type" className="text-gray-800 font-medium text-sm">{examLabel}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 text-sm" {...i18nProps('results_exam_date')}></span>
              <span id="result-exam-date" className="text-gray-800 font-medium text-sm">{selectedExamDate || todayStr}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 text-sm" {...i18nProps('results_language')}></span>
              <span id="result-lang" className="text-gray-800 font-medium text-sm">{LANGS[lang]}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 text-left">
          <h3 className="text-navy font-bold text-base mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span {...i18nProps('results_next_t')}></span>
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm" {...i18nProps('results_next1')} />
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm" {...i18nProps('results_next2')} />
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm" {...i18nProps('results_next3')} />
            </div>
          </div>
        </div>

        <button onClick={function () { showPage('landing-page'); }} className="btn-primary flex items-center justify-center gap-2 mx-auto">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span {...i18nProps('btn_return_home')}></span>
        </button>
      </div>
    </>
  );
}
