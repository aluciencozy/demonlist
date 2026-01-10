import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrophyIcon } from "lucide-react";

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* <div className="absolute inset-0 w-full h-full object-cover bg-background opacity-98" />
      <video
        className="absolute inset-0 w-full h-full object-cover z-[-1] blur-[0px] grayscale"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video> */}
      <div className="relative h-full w-full flex-center flex-col text-center gap-5 text-main font-poppins z-1">
        <div className="max-w-5xl mx-auto p-4 flex flex-col gap-7 w-5xl">
          <h6 className="tracking-widest text-ring font-mono">Developed by Alex Cosentino</h6>
          <h1 className="text-8xl text-shadow-sm text-shadow-main font-figtree font-bold">
            Demonlist Ultimate
          </h1>
          <h2 className="text-lg text-primary tracking-widest font-figtree">
            Search and track the <span className="text-red">top 150 hardest rated demons</span> in
            the game. Create an account to save your progress and compete with others.
          </h2>
        </div>
        <div className="max-w-5xl mx-auto p-4 flex gap-7">
          <Button asChild variant="outline" size="lg">
            <Link href="/demonlist">Demonlist</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
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