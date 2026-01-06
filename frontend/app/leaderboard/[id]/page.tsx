import { Suspense } from 'react';
import LeaderboardProfileDetails from '@/app/components/LeaderboardProfileDetails';

const LeaderboardProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div className="max-w-7xl mx-auto mt-30 mb-20">
      <Suspense fallback={<p>Loading user stats...</p>}>
        <LeaderboardProfileDetails params={params} />
      </Suspense>
    </div>
  );
};

export default LeaderboardProfilePage;
