import DemonCard from '@/app/components/DemonCard';
import { cacheTag, cacheLife } from 'next/cache';
import { Demon, Profile } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

const DemonlistPage = async () => {
  const getDemonlist = async () => {
    'use cache';

    cacheTag('demonlist');
    cacheLife('hours');

    const response = await fetch('http://127.0.0.1:8000/api/v1/demonlist/');
    if (!response.ok) throw new Error('Failed to fetch demonlist');

    return await response.json();
  };

  const getLeaderboard = async () => {
    'use cache';

    cacheTag('leaderboard');
    cacheLife('hours');

    const response = await fetch('http://127.0.0.1:8000/api/v1/leaderboard/');
    if (!response.ok) throw new Error('Failed to fetch leaderboard');

    return await response.json();
  };

  const demonlist = await getDemonlist();
  const leaderboard = await getLeaderboard();

  return (
    <main className="max-w-7xl mx-auto mt-30 mb-20">
      <div className="mb-15 space-y-4">
        <h1 className="font-bold text-7xl font-figtree text-main text-shadow-xs text-shadow-main">
          Demonlist
        </h1>
        <h4 className="font-figtree text-muted text-lg">Top 150 Demons</h4>
      </div>
      {/* Demonlist section //! add search bar next to title later */}
      <div className="flex items-start justify-between">
        <section className="flex flex-col gap-7">
          {demonlist.map((demon: Demon) => (
            <DemonCard key={demon.id} demon={demon} />
          ))}
        </section>
        <aside className="w-full h-full max-w-sm flex flex-col gap-15">
          {/* Mini Leaderboard Section */}
          <div className="w-full h-full border bg-background border-border rounded-2xl p-8 flex flex-col gap-6 font-figtree flex-center">
            <h2 className="font-bold text-2xl text-main">Current Top Players</h2>
            <div className="w-full bg-border h-0.5 -mt-2" />
            <div className="flex flex-col gap-5 justify-items-center">
              {leaderboard.slice(0, 5).map((entry: Profile, index: number) => (
                <div key={index} className="flex items-center gap-x-2">
                  <Image
                    src={`/images/trophy-${index + 1}.webp`}
                    alt={entry.username}
                    width={30}
                    height={30}
                  />
                  <h3 className="font-figtree text-muted">
                    {entry.username} - {entry.total_points} Points
                  </h3>
                </div>
              ))}
            </div>
            <button className="flex-center font-figtree relative group">
              <Link
                href="/leaderboard"
                className="glint-hover-large flex-center relative rounded-xl px-4 py-2 bg-linear-to-r from-primary/90 to-primary/70 text-sm font-bold text-main overflow-hidden"
              >
                Leaderboard
              </Link>
            </button>
          </div>
          {/* Submit a Completion Link */}
          <div className="w-full h-full border bg-background border-border rounded-2xl p-8 flex-center flex-col font-figtree gap-6">
            <h2 className="font-bold text-2xl text-main">Submit Completion</h2>
            <div className="w-full bg-border h-0.5 -mt-2" />
            <p className="text-center text-muted">
              Have you completed a demon? Submit your record here! Please only submit completion
              videos and ensure they are not fraudulent.
            </p>
            <button className="flex-center relative group">
              <Link
                href="/submit-completion"
                className="glint-hover-large flex-center relative rounded-xl px-4 py-2 bg-linear-to-r from-primary/90 to-primary/70 text-sm font-bold text-main overflow-hidden"
              >
                Submit Record
              </Link>
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default DemonlistPage