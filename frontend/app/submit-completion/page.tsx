import { Suspense } from 'react';
import SubmitCompletion from '@/components/SubmitCompletion';
import SubmitSkeleton from '@/components/SubmitSkeleton';

const SubmitCompletionPage = async () => {
  return (
    <Suspense fallback={<SubmitSkeleton />}>
      <SubmitCompletion />
    </Suspense>
  );
};

export default SubmitCompletionPage;
