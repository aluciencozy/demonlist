'use client'

import { Card } from '@/components/ui/card';

import { Demon } from '@/types/types'
import Link from 'next/link';
import Image from 'next/image';

const DemonCard = ({ demon }: { demon: Demon }) => {
  return (
    <div className="w-full lg:max-w-3xl">
      <Link href={`/demonlist/${demon.id}`}>
        <Card className="flex flex-col sm:flex-row items-center gap-4 sm:gap-x-8 p-4 sm:p-8 bg-background hover:translate-x-2 sm:hover:translate-x-4 transition-transform duration-300 after:content-[''] after:absolute after:opacity-0 after:inset-0 after:bg-border hover:after:opacity-30 relative after:duration-200 after:transition-all group">
          <div className="relative z-1 w-full sm:w-auto shrink-0">
            <div className="after:content-[''] after:absolute after:opacity-30 after:inset-0 after:bg-background group-hover:after:opacity-0 after:duration-200 after:transition-all" />
            <Image
              src={demon.thumbnail ?? '/images/default-thumbnail.jpg'}
              alt={demon.name}
              className="object-cover aspect-video w-full sm:w-56 h-auto border-background/30 border-2 shadow-xl"
              width={224}
              height={126}
            />
          </div>
          <div className="flex flex-col gap-2 z-1 text-center sm:text-left w-full">
            <h2 className="font-mono font-bold text-lg sm:text-xl">
              <span className="tracking-widest">#{demon.ranking}</span> |{' '}
              <span className="font-figtree text-red">{demon.name}</span>
            </h2>
            <p className="text-sm tracking-widest">{demon.points} Points (100%)</p>
            <p className="text-sm text-neutral-400 tracking-widest flex gap-2 items-center justify-center sm:justify-start">
              Created by {demon.creator}
            </p>
          </div>
        </Card>
      </Link>
    </div>
  );
}

export default DemonCard
