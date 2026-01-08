import { Demon } from '@/types/types';
import DemonCard from '@/app/components/DemonCard';
import { getDemonlist } from '@/lib/demonlist';
import { getLeaderboardProfile } from '@/lib/leaderboard';

const LeaderboardProfileDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const profile = await getLeaderboardProfile(id);

  const demonlist = await getDemonlist();

  profile.completions = profile.completions.map((completionId: number) => {
      const demon = demonlist.find((demon: Demon) => demon.id === completionId);
      if (demon) return demon;
    });

  profile.completions = profile.completions.sort((a: Demon, b: Demon) => a.ranking - b.ranking);

  //! Add Profile Picture Later
  return (
    <div className="flex-center flex-col gap-15 font-figtree">
      <div className="flex-center flex-col gap-2">
        <h1 className="gradient-text text-7xl">{profile.username}</h1>
        <p className="text-muted text-xl">Points: {profile.total_points.toFixed(2)}</p>
      </div>
      <div className="w-full max-w-3xl flex-center flex-col">
        <h2 className="text-3xl mb-5">Completions</h2>
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
}

export default LeaderboardProfileDetails;