import SettingsServer from '@/components/SettingsServer';
import { Suspense } from 'react';
import SettingsSkeleton from '@/components/SettingsSkeleton';

const SettingsPage = () => {
  return (
    <div className="max-w-7xl mx-auto mt-30 mb-20 flex-center min-h-[60vh] overflow-hidden max-h-screen">
      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsServer />
      </Suspense>
    </div>
  );
};

export default SettingsPage;
