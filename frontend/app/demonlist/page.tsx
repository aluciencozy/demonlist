import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Profile } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { getDemonlist } from '@/lib/demonlist';
import { getLeaderboard } from '@/lib/leaderboard';
import Demonlist from '@/components/Demonlist';
import AiChatCard from '@/components/AiChatCard';

const DemonlistPage = async () => {
  const demonlist = await getDemonlist();
  const leaderboard = await getLeaderboard();

  return (
    <main className="max-w-7xl mx-auto mt-20 lg:mt-30 mb-20 overflow-hidden p-4 lg:p-1.5">
      <div className="mb-10 lg:mb-15 space-y-4">
        <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl">Demonlist</h1>
        <h4 className="text-base lg:text-lg text-neutral-400">Top 150 Demons</h4>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-0">
        <div className="order-1 lg:order-2 w-full lg:max-w-sm">
          <div className="lg:w-full lg:h-full lg:flex lg:flex-col lg:gap-15">
            <AiChatCard />

            <Card className="hidden lg:block bg-background">
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

            <Card className="hidden lg:block bg-background">
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
          </div>
        </div>

        <div className="order-2 lg:order-1 flex-1 lg:pr-8">
          <div className="lg:max-w-none">
            <Demonlist demonlist={demonlist} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DemonlistPage;
