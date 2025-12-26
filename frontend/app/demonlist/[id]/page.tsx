import { Suspense } from 'react';
import DemonDetails from '@/app/components/DemonDetails';

const DemonPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div>
      <h1>Demon Page</h1>
      <Suspense fallback={<p>Loading demon details...</p>}>
        <DemonDetails params={params} />
      </Suspense>
    </div>
  );
};

export default DemonPage;
