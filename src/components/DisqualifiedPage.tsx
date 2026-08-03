import { i18nProps } from '@/i18n';
import { useApp } from '@/store/app';

/* "Exam Disqualified" page (shown after 3 tab switches). */
export default function DisqualifiedPage() {
  const { showPage, studentName, currentExam } = useApp();
  const examLabel = currentExam === 'math' ? 'Mathematics' : 'English';
  return (
    <>
      <nav className="bg-navy h-14 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <span className="text-white font-bold text-xs tracking-widest uppercase">TEAM UNIVERSITY</span>
        </div>
      </nav>
      <div className="max-w-lg mx-auto px-6 py-12 text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-red mb-3" {...i18nProps('dq_title')} />
        <p className="text-gray-500 mb-8" {...i18nProps('dq_text')} />
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 text-left">
          <h3 className="text-navy font-bold text-lg mb-4" {...i18nProps('results_summary')} />
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100"><span
              className="text-gray-500 text-sm" {...i18nProps('results_name')}></span><span id="dq-student-name"
                className="text-gray-800 font-medium text-sm">{studentName || '--'}</span></div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100"><span
              className="text-gray-500 text-sm" {...i18nProps('results_exam_type')}></span><span id="dq-exam-type"
                className="text-gray-800 font-medium text-sm">{examLabel}</span></div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100"><span
              className="text-gray-500 text-sm" {...i18nProps('dq_status')}></span><span className="text-red font-semibold text-sm">DISQUALIFIED</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100"><span
              className="text-gray-500 text-sm" {...i18nProps('dq_reason')}></span><span className="text-gray-800 font-medium text-sm" {...i18nProps('dq_reason_val')}></span></div>
          </div>
        </div>
        <button onClick={function () { showPage('landing-page'); }} className="btn-primary" {...i18nProps('btn_return_home')} />
      </div>
    </>
  );
}
