import { Suspense } from 'react';
import SubmitCompletion from '@/app/components/SubmitCompletion';

const SubmitCompletionPage = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubmitCompletion />
    </Suspense>
  );
};

export default SubmitCompletionPage