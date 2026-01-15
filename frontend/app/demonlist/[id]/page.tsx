import { Suspense } from 'react';
import DemonDetails from '@/components/DemonDetails';

const DemonPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <main className="max-w-7xl mx-auto mt-30 mb-20 relative flex-center flex-col font-figtree">
      <Suspense fallback={<p>Loading demon details...</p>}>
        <DemonDetails params={params} />
      </Suspense>
    </main>
  );
};

export default DemonPage;
