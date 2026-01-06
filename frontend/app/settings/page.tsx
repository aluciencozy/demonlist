import SettingsServer from '@/app/components/SettingsServer';
import { Suspense } from 'react';

const SettingsPage = () => {
  return (
    <div className="max-w-7xl mx-auto mt-30 mb-20 flex-center min-h-[60vh] overflow-hidden max-h-screen">
      <Suspense fallback={<div>Loading settings...</div>}>
        <SettingsServer />
      </Suspense>
    </div>
  );
}

export default SettingsPage