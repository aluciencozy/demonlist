import Image from 'next/image';
import { Profile } from '@/types/types';
import AnimatedLeaderboardList from '@/app/components/AnimatedLeaderboardList';
import Link from 'next/link';
import { getLeaderboard } from '@/lib/leaderboard';

const LeaderboardPage = async () => {
  const leaderboard: Profile[] = await getLeaderboard();
  const top3 = leaderboard.slice(0, 3);
  const top3Ids = top3.map((entry: Profile) => entry.id);
  const top3Formatted = top3.map((entry: Profile, index: number) => (
    `${index + 1}. ${entry.username} - ${entry.total_points} points`
  ));
  const rest = leaderboard.slice(3);
  const restIds = rest.map((entry: Profile) => entry.id);
  const restFormatted = rest.map((entry: Profile, index: number) => (
    `${index + 4}. ${entry.username} - ${entry.total_points} points`
  ));

  return (
    <main className="max-w-7xl mx-auto mt-30 relative mb-20">
      <div className="mb-15 gap-15 flex-center flex-col text-main">
        <h1 className="font-bold text-7xl font-figtree text-main text-shadow-xs text-shadow-main">
          Top Players
        </h1>
        {top3.length >= 3 ? (
          <div className="flex items-end gap-20 font-figtree text-xl font-semibold">
            <div className="flex-center flex-col">
              <Link
                href={`/leaderboard/${top3[1] ? top3[1].id : ''}`}
                className="flex-center flex-col hover:-translate-y-1 transition-transform"
              >
                <div className="relative">
                  <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-25 h-25 bg-primary/15 rounded-full blur-[20px] z-20" />
                  <Image src="/images/trophy-2.webp" alt="Trophy 2" width={65} height={65} />
                </div>
                <div className="mt-5 flex-center flex-col">
                  <h4 className="gradient-text">{top3[1] ? top3[1].username : ''}</h4>
                  <p className="text-muted text-sm font-mono">{top3[1].total_points} points</p>
                </div>
                <h5 className="mt-10 text-3xl">2</h5>
              </Link>
            </div>
            <div className="flex-center flex-col mb-10">
              <Link
                href={`/leaderboard/${top3[0] ? top3[0].id : ''}`}
                className="flex-center flex-col hover:-translate-y-1 transition-transform"
              >
                <div className="relative">
                  <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-25 h-25 bg-primary/15 rounded-full blur-[20px] z-20" />
                  <Image src="/images/trophy-1.webp" alt="Trophy 1" width={65} height={65} />
                </div>
                <div className="mt-5 flex-center flex-col">
                  <h4 className="gradient-text">{top3[0] ? top3[0].username : ''}</h4>
                  <p className="text-muted text-sm font-mono">{top3[0].total_points} points</p>
                </div>
                <h5 className="mt-10 text-3xl">1</h5>
              </Link>
            </div>
            <div className="flex-center flex-col">
              <Link
                href={`/leaderboard/${top3[2] ? top3[2].id : ''}`}
                className="flex-center flex-col hover:-translate-y-1 transition-transform"
              >
                <div className="relative">
                  <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-25 h-25 bg-primary/15 rounded-full blur-[20px] z-20" />
                  <Image src="/images/trophy-3.webp" alt="Trophy 3" width={65} height={65} />
                </div>
                <div className="mt-5 flex-center flex-col">
                  <h4 className="gradient-text">{top3[2] ? top3[2].username : ''}</h4>
                  <p className="text-muted text-sm font-mono">{top3[2].total_points} points</p>
                </div>
                <h5 className="mt-10 text-3xl">3</h5>
              </Link>
            </div>
          </div>
        ) : (
          <div className="">
            <AnimatedLeaderboardList items={top3Formatted} ids={top3Ids} />
          </div>
        )}
        <div className="">
          <AnimatedLeaderboardList items={restFormatted} ids={restIds} />
        </div>
      </div>
    </main>
  );
};

export default LeaderboardPage;

// Gradients:
// First Place: from-[#FEF001] via-[#FFD701] to-[#EFB200]
// Second Place: from-[#FFFEFE] via-[#E6E6E6] to-[#BDBCBC]
// Third Place: from-[#FFC23F] via-[#FEA726] to-[#FE7800]

/* Podium shapes for top 3 players */


/* <div className="flex items-end font-figtree text-xl font-semibold mt-15">
      <div className="flex-center flex-col">
        <span className="">{top3[1] ? top3[1].username : ''}</span>
        <div className="border-r-0 h-72 w-36 flex-center border border-border/20">
          <Image src="/images/trophy-2.webp" alt="Trophy 2" width={65} height={65} />
        </div>
      </div>
      <div className="flex-center flex-col">
        <span className="">{top3[0] ? top3[0].username : ''}</span>
        <div className="h-96 w-36 flex-center border border-border/20">
          <Image
            src="/images/trophy-1.webp"
            alt="Trophy 1"
            width={65}
            height={65}
            className=""
          />
        </div>
      </div>
      <div className="flex-center flex-col">
        <span className="">{top3[2] ? top3[2].username : ''}</span>
        <div className="border-l-0 h-56 w-36 flex-center border border-border/20">
          <Image src="/images/trophy-3.webp" alt="Trophy 3" width={65} height={65} />
        </div>
      </div>
    </div> */