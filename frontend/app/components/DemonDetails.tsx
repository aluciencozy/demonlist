import Image from "next/image";
import AnimatedCompletionList from "@/app/components/AnimatedCompletionList";
import { Completion } from "@/types/types";
import Link from "next/link";

const DemonDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const response = await fetch(`http://127.0.0.1:8000/api/v1/demonlist/${id}`);
  if (!response.ok) throw new Error('Failed to fetch');

  const demon = await response.json();

  return (
    <div className="flex-center flex-col w-full font-figtree gap-10">
      <div className="flex-center flex-row gap-5  ">
        {demon.ranking > 1 && <Link href={`/demonlist/${demon.ranking - 1}`} className="text-6xl font-mono">{'<'}</Link>}
        <h1 className="text-6xl">{demon.name}</h1>
        {demon.ranking < 150 && <Link href={`/demonlist/${demon.ranking + 1}`} className="text-6xl font-mono">{'>'}</Link>}
      </div>
      <a
        href={demon.preview_link ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-center relative cursor-pointer group max-w-100 w-full"
      >
        <div className="after:content-[''] after:absolute after:opacity-15 after:inset-0 after:bg-primary group-hover:after:opacity-0 after:duration-200 after:transition-all" />
        <Image
          src="/images/youtube-logo.png"
          alt="YouTube Logo"
          width={50}
          height={50}
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        />
        <Image
          src={demon.thumbnail ?? '/images/default-thumbnail.jpg'}
          alt={demon.name}
          className="object-cover aspect-auto w-100 h-auto border-background/50 border-2 shadow-xl"
          width={480}
          height={270}
        />
      </a>
      <div className="flex items-center justify-between gap-15 w-full max-w-120">
        <h3 className="text-muted flex font-figtree font-semibold flex-col gap-2 flex-1">
          <span className="text-main">Created by</span>
          <span>{demon.creator}</span>
        </h3>
        <h3 className="text-muted flex-center font-figtree font-semibold flex-col gap-2">
          <span className="text-main">Verified by</span>
          <span>{demon.verifier}</span>
        </h3>
        <h3 className="text-muted flex items-end font-figtree font-semibold flex-col gap-2 flex-1">
          <span className="text-main">Points</span>
          <span>{demon.points}</span>
        </h3>
      </div>
      <div className="mt-10 flex-center flex-col w-full">
        <h2 className="text-4xl font-bold mb-5">Completions</h2>
        {demon.completions.length > 0 ? <AnimatedCompletionList items={demon.completions.map((completion: Completion) => completion.user.username)} urls={demon.completions.map((completion: Completion) => completion.proof_link)} /> : <p className="font-mono text-muted text-center">No completions yet :/</p>}
      </div>
    </div>
  );
};

export default DemonDetails;