import { useApp } from '@/store/app';

const TOAST_CONTAINER_STYLE = {
  position: 'fixed',
  top: '24px',
  right: '24px',
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  maxWidth: '360px',
} as const;

const TOAST_STYLE = {
  background: '#1F2937',
  color: '#fff',
  padding: '12px 16px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '13px',
  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  animation: 'toastSlideIn 0.3s ease',
} as const;

function toastIcon(type: string) {
  if (type === 'success') {
    return <svg style={{ width: '20px', height: '20px', color: '#10B981', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;
  }
  if (type === 'error') {
    return <svg style={{ width: '20px', height: '20px', color: '#E31E24', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;
  }
  return <svg style={{ width: '20px', height: '20px', color: '#3B82F6', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}

/* Toast notifications (showToast from the original). */
export default function Toast() {
  const { toasts } = useApp();
  if (toasts.length === 0) return null;
  return (
    <div id="toast-container" style={TOAST_CONTAINER_STYLE}>
      {toasts.map(function (toast) {
        const style = toast.leaving
          ? Object.assign({}, TOAST_STYLE, { animation: 'toastSlideOut 0.3s ease' })
          : TOAST_STYLE;
        return (
          <div key={toast.id} style={style}>
            {toastIcon(toast.type)}
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
