import { t } from '@/i18n';
import { useApp } from '@/store/app';

/* Confirm dialog (showConfirm from the original). */
export default function ConfirmDialog() {
  const { confirm, closeConfirm } = useApp();
  if (!confirm) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', maxWidth: '400px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>{confirm.message}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            id="cfm-cancel"
            style={{ padding: '8px 16px', border: '1px solid #D1D5DB', borderRadius: '8px', background: '#fff', color: '#374151', cursor: 'pointer', fontSize: '13px' }}
            onClick={function () { closeConfirm(false); }}
          >
            {t('confirm_cancel')}
          </button>
          <button
            id="cfm-ok"
            style={{ padding: '8px 16px', border: 'none', borderRadius: '8px', background: '#0A1F5C', color: '#fff', cursor: 'pointer', fontSize: '13px' }}
            onClick={function () { closeConfirm(true); }}
          >
            {t('confirm_ok')}
          </button>
        </div>
      </div>
    </div>
  );
}
