import { Suspense } from 'react';
import LeaderboardProfileDetails from '@/app/components/LeaderboardProfileDetails';

const LeaderboardProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div>
      <h1>User Profile</h1>
      <Suspense fallback={<p>Loading user stats...</p>}>
        <LeaderboardProfileDetails params={params} />
      </Suspense>
    </div>
  );
};

export default LeaderboardProfilePage;
