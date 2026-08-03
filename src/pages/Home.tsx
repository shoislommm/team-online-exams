import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RegistrationForm from '@/components/RegistrationForm';
import ExamInfo from '@/components/ExamInfo';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import WaitingPage from '@/components/WaitingPage';
import AlreadyTakenPage from '@/components/AlreadyTakenPage';
import ExamInterface from '@/components/ExamInterface';
import ReviewPage from '@/components/ReviewPage';
import ResultsPage from '@/components/ResultsPage';
import DisqualifiedPage from '@/components/DisqualifiedPage';
import TabWarningOverlay from '@/components/TabWarningOverlay';
import ReviewModal from '@/components/ReviewModal';
import Toast from '@/components/Toast';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useApp } from '@/store/app';
import type { PageId } from '@/store/app';

/* Single-page app: page sections shown/hidden exactly like the original
   showPage() (`.page-section.active` class + `hidden` attribute). */
export default function Home() {
  const { page } = useApp();

  function sectionProps(id: PageId, extraClass: string) {
    return {
      id: id,
      className: 'page-section' + (page === id ? ' active' : '') + extraClass,
      hidden: page !== id,
    };
  }

  return (
    <>
      <div {...sectionProps('landing-page', '')}>
        <Navbar />
        <Hero />
        <RegistrationForm />
        <ExamInfo />
        <Faq />
        <Footer />
      </div>
      <div {...sectionProps('waiting-page', ' min-h-screen bg-gray-50')}>
        <WaitingPage />
      </div>
      <div {...sectionProps('already-taken-page', ' min-h-screen bg-gray-50')}>
        <AlreadyTakenPage />
      </div>
      <div {...sectionProps('exam-interface', '')} style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ExamInterface />
      </div>
      <div {...sectionProps('review-page', ' min-h-screen bg-gray-50')}>
        <ReviewPage />
      </div>
      <div {...sectionProps('results-page', ' min-h-screen bg-gray-50')}>
        <ResultsPage />
      </div>
      <div {...sectionProps('disqualified-page', ' min-h-screen bg-gray-50')}>
        <DisqualifiedPage />
      </div>
      <TabWarningOverlay />
      <ReviewModal />
      <Toast />
      <ConfirmDialog />
    </>
  );
}
