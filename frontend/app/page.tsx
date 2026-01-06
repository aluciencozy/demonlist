import Link from "next/link";

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-125 h-125 bg-primary/20 rounded-full blur-[120px] z-1" />
      <div className="absolute inset-0 w-full h-full object-cover bg-background opacity-95" />
      <video
        className="absolute inset-0 w-full h-full object-cover z-[-1] blur-[0px]"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="relative h-full w-full flex-center flex-col text-center gap-5 text-main font-poppins z-1">
        <div className="max-w-5xl mx-auto p-4 flex flex-col gap-7 w-5xl">
          <h6 className="tracking-widest text-muted font-figtree">Created by Alex Cosentino</h6>
          <h1 className="text-8xl text-shadow-sm text-shadow-main font-figtree">
            Demonlist Ultimate
          </h1>
          <h2 className="text-lg text-muted tracking-widest text-shadow-black text-shadow-sm font-figtree">
            Search and track the{' '}
            <span className="text-main text-shadow-primary/40 text-shadow-md">
              top 150 hardest rated demons
            </span>{' '}
            in the game. Create an account to save your progress and compete with others.
          </h2>
        </div>
        <div className="max-w-5xl mx-auto p-4 flex flex-col gap-7">
          <button className="flex-center font-mono relative group">
            <Link href="/demonlist" className="glint-hover flex-center relative rounded-2xl px-6 py-3 bg-linear-to-r from-primary/90 to-primary/70 text-lg font-bold text-main overflow-hidden">
              DEMONLIST
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home