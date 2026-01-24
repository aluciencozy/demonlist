import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrophyIcon } from "lucide-react";

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="relative h-full w-full flex-center flex-col text-center gap-4 lg:gap-5 text-main font-poppins z-1 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-4 lg:gap-7 w-full">
          <h6 className="tracking-widest text-ring font-mono text-sm lg:text-base">Developed by Alex Cosentino</h6>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl text-shadow-sm text-shadow-main font-figtree font-bold">
            Demonlist Ultimate
          </h1>
          <h2 className="text-base lg:text-lg text-primary tracking-wider lg:tracking-widest font-figtree px-2">
            Search and track the <span className="text-red">top 150 hardest rated demons</span> in
            the game. Create an account to save your progress and compete with others.
          </h2>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 lg:gap-7 w-full sm:w-auto">
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/demonlist">Demonlist</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
            <Link href="/leaderboard">
              <TrophyIcon /> Leaderboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home