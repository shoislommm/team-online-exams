import { i18nProps } from '@/i18n';
import { useApp } from '@/store/app';

/* "Your Exam is Scheduled" waiting page. */
export default function WaitingPage() {
  const { showPage, waitingDate } = useApp();
  return (
    <>
      <nav className="bg-navy h-16 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <span className="text-white font-extrabold text-lg">TEAM</span>
          <span className="text-white/70 text-xs ml-1.5 tracking-[0.2em]">UNIVERSITY</span>
        </div>
      </nav>
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-navy mb-2" {...i18nProps('waiting_title')} />
          <p className="text-gray-600 mb-6" {...i18nProps('waiting_sub')} />
          <div className="bg-navy/5 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-500 mb-1" {...i18nProps('waiting_date_label')} />
            <p id="waiting-date" className="text-2xl font-bold text-navy">{waitingDate}</p>
          </div>
          <p className="text-gray-500 text-sm mb-6" {...i18nProps('waiting_note')} />
          <button onClick={function () { showPage('landing-page'); }} className="btn-outline" {...i18nProps('btn_back_home')} />
        </div>
      </div>
    </>
  );
}
