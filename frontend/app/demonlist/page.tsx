import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import DemonCard from '@/components/DemonCard';
import { Demon, Profile } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { getDemonlist } from '@/lib/demonlist';
import { getLeaderboard } from '@/lib/leaderboard';

const DemonlistPage = async () => {
  const demonlist = await getDemonlist();
  const leaderboard = await getLeaderboard();

  return (
    <main className="max-w-7xl mx-auto mt-30 mb-20 overflow-hidden">
      <div className="mb-15 space-y-4">
        <h1 className="font-bold text-7xl">Demonlist</h1>
        <h4 className="text-lg text-neutral-400">Top 150 Demons</h4>
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
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-center text-3xl">Current Top Players</CardTitle>
              <div className="w-full bg-border h-px -mt-1" />
              <CardDescription className="text-center">
                Check out the top players on the leaderboard!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5 justify-items-center">
                {leaderboard.slice(0, 5).map((entry: Profile, index: number) => (
                  <div key={index} className="flex-center gap-x-2">
                    <Image
                      src={`/images/trophy-${index + 1}.webp`}
                      alt={entry.username}
                      width={30}
                      height={30}
                    />
                    <h3 className="text-center text-neutral-400">
                      {entry.username} - {entry.total_points} Points
                    </h3>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/leaderboard">Leaderboard</Link>
              </Button>
            </CardFooter>
          </Card>
          {/* Submit a Completion Link */}
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Submit a Completion</CardTitle>
              <div className="w-full bg-border h-px -mt-1" />
              <CardDescription className="text-center">
                Have you completed a demon? Submit your record here! Please only submit completion
                videos and ensure they are not fraudulent.
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/submit-completion">Submit Now</Link>
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </main>
  );
};

export default DemonlistPage;
