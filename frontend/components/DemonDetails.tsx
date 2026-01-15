import Image from 'next/image';
import Link from 'next/link';
import { Completion } from '@/types/types';
import { getDemon } from '@/lib/demonlist';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';

const DemonDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const demon = await getDemon(id);

  return (
    <div className="flex flex-col items-center w-full font-figtree gap-10 pb-20">
      <div className="flex items-center justify-center gap-6 mt-10">
        {demon.ranking > 1 ? (
          <Link
            href={`/demonlist/${demon.ranking - 1}`}
            className="text-4xl sm:text-6xl font-mono text-muted hover:text-white transition-colors p-2"
          >
            {'<'}
          </Link>
        ) : (
          <div className="w-12 sm:w-20" />
        )}

        <h1 className="text-4xl sm:text-6xl font-bold text-center tracking-tight text-shadow-main">
          {demon.name}
        </h1>

        {demon.ranking < 150 ? (
          <Link
            href={`/demonlist/${demon.ranking + 1}`}
            className="text-4xl sm:text-6xl font-mono text-muted hover:text-white transition-colors p-2"
          >
            {'>'}
          </Link>
        ) : (
          <div className="w-12 sm:w-20" />
        )}
      </div>

      <a
        href={demon.preview_link ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-full max-w-2xl aspect-video rounded-xl overflow-hidden backdrop-blur-sm border border-border/50"
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 z-10" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-90 group-hover:scale-110 transition-transform duration-300">
          <Image src="/images/youtube-logo.png" alt="YouTube Logo" width={60} height={60} />
        </div>

        <Image
          src={demon.thumbnail ?? '/images/default-thumbnail.jpg'}
          alt={demon.name}
          fill
          className="object-cover"
        />
      </a>

      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl px-4 py-6 bg-card/30 rounded-xl border border-border/40 backdrop-blur-sm">
        <div className="flex flex-col items-center text-center">
          <span className="text-muted-foreground text-sm uppercase tracking-wider font-bold mb-1">
            Created By
          </span>
          <span className="font-semibold truncate w-full px-2">{demon.creator}</span>
        </div>

        <div className="flex flex-col items-center text-center border-x border-border/30">
          <span className="text-muted-foreground text-sm uppercase tracking-wider font-bold mb-1">
            Verified By
          </span>
          <span className="font-semibold truncate w-full px-2">{demon.verifier}</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="text-muted-foreground text-sm uppercase tracking-wider font-bold mb-1">
            Points
          </span>
          <span className="font-semibold text-primary">{demon.points}</span>
        </div>
      </div>

      <div className="flex flex-col items-center w-full max-w-2xl px-4">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          Completions
          <span className="bg-primary/10 text-primary text-base px-3 py-1 rounded-full font-mono">
            {demon.completions.length}
          </span>
        </h2>

        {demon.completions.length > 0 ? (
          <Card className="w-full bg-card/50 backdrop-blur-md border-border/50">
            <ScrollArea className="h-100 w-full rounded-md p-4">
              <div className="flex flex-col gap-1">
                {demon.completions.map((completion: Completion, index: number) => (
                  <div key={index}>
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground font-mono w-6 text-right opacity-50">
                          {index + 1}
                        </span>
                        <span className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {completion.user.username}
                        </span>
                      </div>

                      {completion.proof_link && (
                        <a
                          href={completion.proof_link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all"
                        >
                          <span className="hidden sm:inline">Watch</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    {index < demon.completions.length - 1 && (
                      <Separator className="bg-border/30 my-1" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6 border border-dashed border-border rounded-xl w-full bg-card/10">
            <p className="font-mono text-muted-foreground text-center">
              No completions yet... be the first?
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemonDetails;
