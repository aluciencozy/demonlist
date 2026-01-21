import Image from 'next/image';
import Link from 'next/link';
import { Profile } from '@/types/types';
import { getLeaderboard } from '@/lib/leaderboard';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

const LeaderboardPage = async () => {
  const leaderboard: Profile[] = await getLeaderboard();

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <main className="max-w-7xl mx-auto mt-30 relative mb-20 px-4">
      <div className="mb-15 gap-15 flex-center flex-col text-main">
        <h1 className="font-bold text-7xl font-figtree text-main text-shadow-xs text-shadow-main text-center mb-10">
          Top Players
        </h1>

        {top3.length >= 3 ?
          <div className="flex flex-wrap justify-center items-end gap-10 md:gap-20 font-figtree text-xl font-semibold">
            <div className="flex-center flex-col order-1 md:order-0">
              <Link
                href={`/leaderboard/${top3[1]?.id}`}
                className="flex-center flex-col hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div className="relative">
                  <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-25 h-25 bg-gray-400/20 rounded-full blur-[20px] z-0 group-hover:bg-gray-400/40 transition-all" />
                  <Image
                    src="/images/trophy-2.webp"
                    alt="Silver Trophy"
                    width={65}
                    height={65}
                    className="relative z-10 drop-shadow-lg"
                  />
                </div>
                <div className="mt-5 flex-center flex-col">
                  <h4 className="text-transparent bg-clip-text bg-linear-to-b from-[#FFFEFE] via-[#E6E6E6] to-[#BDBCBC] font-bold">
                    {top3[1]?.username}
                  </h4>
                  <p className="text-muted text-sm font-mono mt-1">{top3[1]?.total_points} pts</p>
                </div>
                <h5 className="mt-6 text-3xl font-bold text-gray-400">#2</h5>
              </Link>
            </div>

            <div className="flex-center flex-col mb-10 order-2 md:order-0 z-10">
              <Link
                href={`/leaderboard/${top3[0]?.id}`}
                className="flex-center flex-col hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div className="relative">
                  <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-500/20 rounded-full blur-[30px] z-0 group-hover:bg-yellow-500/40 transition-all" />
                  <Image
                    src="/images/trophy-1.webp"
                    alt="Gold Trophy"
                    width={90}
                    height={90}
                    className="relative z-10 drop-shadow-2xl scale-110"
                  />
                </div>
                <div className="mt-6 flex-center flex-col">
                  <h4 className="text-transparent bg-clip-text bg-linear-to-b from-[#FEF001] via-[#FFD701] to-[#EFB200] font-bold text-2xl">
                    {top3[0]?.username}
                  </h4>
                  <p className="text-muted text-base font-mono mt-1">{top3[0]?.total_points} pts</p>
                </div>
                <h5 className="mt-6 text-5xl font-bold text-yellow-500">#1</h5>
              </Link>
            </div>

            <div className="flex-center flex-col order-3 md:order-0">
              <Link
                href={`/leaderboard/${top3[2]?.id}`}
                className="flex-center flex-col hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div className="relative">
                  <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-25 h-25 bg-orange-500/20 rounded-full blur-[20px] z-0 group-hover:bg-orange-500/40 transition-all" />
                  <Image
                    src="/images/trophy-3.webp"
                    alt="Bronze Trophy"
                    width={65}
                    height={65}
                    className="relative z-10 drop-shadow-lg"
                  />
                </div>
                <div className="mt-5 flex-center flex-col">
                  <h4 className="text-transparent bg-clip-text bg-linear-to-b from-[#FFC23F] via-[#FEA726] to-[#FE7800] font-bold">
                    {top3[2]?.username}
                  </h4>
                  <p className="text-muted text-sm font-mono mt-1">{top3[2]?.total_points} pts</p>
                </div>
                <h5 className="mt-6 text-3xl font-bold text-orange-600">#3</h5>
              </Link>
            </div>
          </div>
        : null}

        <div className="w-full max-w-2xl mt-8">
          <Card className="bg-background/50 border-border/50 backdrop-blur-sm">
            <ScrollArea className="h-125 w-full rounded-md p-4">
              <div className="flex flex-col gap-2">
                {(top3.length < 3 ? leaderboard : rest).map((entry, index) => {
                  const rank = top3.length < 3 ? index + 1 : index + 4;

                  return (
                    <Link key={entry.id} href={`/leaderboard/${entry.id}`} className="group">
                      <div className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200">
                        <div className="flex items-center gap-6">
                          <span className="font-figtree font-bold text-xl w-8 text-center text-muted-foreground group-hover:text-white transition-colors">
                            {rank}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="font-figtree font-medium text-lg text-primary group-hover:translate-x-1 transition-transform">
                              {entry.username}
                            </span>
                          </div>
                        </div>

                        <div className="font-mono text-primary font-bold">
                          {entry.total_points}{' '}
                          <span className="text-muted text-xs font-sans font-normal ml-1">PTS</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}

                {leaderboard.length === 0 && (
                  <div className="text-center py-10 text-muted">No players found.</div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default LeaderboardPage;
