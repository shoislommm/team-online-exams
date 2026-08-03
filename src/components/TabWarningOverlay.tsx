import { t, i18nProps } from '@/i18n';
import { useApp } from '@/store/app';

/* Tab-switch warning overlay (showTabWarning / closeTabWarning). */
export default function TabWarningOverlay() {
  const { tabWarning, closeTabWarning, lang } = useApp();
  const count = tabWarning.count;
  const msgMap: Record<string, string> = {
    en: 'You left the exam page. This is your <b style="color:#E31E24;">' + count + '/3</b> warning.',
    uz: 'Siz imtihon sahifasidan chiqdingiz. Bu sizning <b style="color:#E31E24;">' + count + '/3</b>-ogohlantirishingiz.',
    ru: 'Вы покинули страницу экзамена. Это <b style="color:#E31E24;">' + count + '/3</b>-е предупреждение.',
  };
  const msg = msgMap[lang] || msgMap.en;
  return (
    <div id="tab-warning-overlay"
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 20000, display: tabWarning.visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{ background: '#fff', borderRadius: '20px', padding: '40px', maxWidth: '420px', width: '90%', textAlign: 'center', boxShadow: '0 25px 80px rgba(0,0,0,0.3)' }}>
        <div
          style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg style={{ width: '36px', height: '36px', color: '#F59E0B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0A1F5C', marginBottom: '8px' }} {...i18nProps('warn_title')} />
        <p id="tab-warning-text" style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.6, marginBottom: '24px' }}
          data-i18n="warn_default"
          dangerouslySetInnerHTML={{ __html: tabWarning.visible ? msg : t('warn_default') }} />
        <button onClick={closeTabWarning}
          style={{ background: '#0A1F5C', color: '#fff', padding: '14px 40px', borderRadius: '12px', fontWeight: 700, fontSize: '15px', border: 'none', cursor: 'pointer', transition: 'all .2s' }}
          {...i18nProps('btn_understand')} />
      </div>
    </div>
  );
}
