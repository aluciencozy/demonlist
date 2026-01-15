import { Demon } from '@/types/types';
import DemonCard from '@/components/DemonCard';
import { getDemonlist } from '@/lib/demonlist';
import { getLeaderboardProfile } from '@/lib/leaderboard';
import LeaderboardProfileDetailsAvatar from './LeaderboardProfileDetailsAvatar';

const LeaderboardProfileDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const profile = await getLeaderboardProfile(id);

  const demonlist = await getDemonlist();

  profile.completions = profile.completions.map((completionId: number) => {
    const demon = demonlist.find((demon: Demon) => demon.id === completionId);
    if (demon) return demon;
  });

  profile.completions = profile.completions.sort((a: Demon, b: Demon) => a.ranking - b.ranking);

  return (
    <div className="flex-center flex-col gap-15 font-figtree">
      <div className="flex-center gap-10">
        <LeaderboardProfileDetailsAvatar avatar_url={profile.avatar_url} user_id={profile.id} />
        <div className="flex items-start justify-center flex-col gap-2 max-w-125 truncate">
          <h1 className="text-6xl font-bold max-w-125 truncate">{profile.username}</h1>
          <p className="text-xl text-neutral-400 font-mono">
            Points: {profile.total_points.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="w-full max-w-3xl flex justify-center flex-col">
        <h2 className="text-3xl mb-5 font-semibold">Completions</h2>
        <ul className="flex flex-col gap-4">
          {profile.completions.map((demon: Demon, index: number) => (
            <li key={index}>
              <DemonCard demon={demon} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaderboardProfileDetails;
