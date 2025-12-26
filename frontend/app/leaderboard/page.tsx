import { cacheTag, cacheLife } from 'next/cache';
import { Profile } from '@/types/types';
import LeaderboardCard from '@/app/components/LeaderboardCard';

const getLeaderboard = async () => {
  'use cache';

  cacheTag('leaderboard');
  cacheLife('hours');

  const response = await fetch('http://127.0.0.1:8000/api/v1/leaderboard/');
  if (!response.ok) throw new Error('Failed to fetch leaderboard');

  return await response.json();
};

const LeaderboardPage = async () => {
  const leaderboard = await getLeaderboard();

  return (
    <div>
      <h1 className="font-bold text-5xl mt-5 p-4">Leaderboard</h1>
      {leaderboard.map((entry: Profile) => (
        <LeaderboardCard key={entry.id} profile={entry} />
      ))}
    </div>
  );
};

export default LeaderboardPage;
