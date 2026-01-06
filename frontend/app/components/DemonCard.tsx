'use client'

import { Demon } from '@/types/types'
import Link from 'next/link';
import Image from 'next/image';
import CreateIcon from '@/app/components/CreateIcon';

const DemonCard = ({ demon }: { demon: Demon }) => {
  return (
    <div className="max-w-3xl w-3xl font-figtree">
      <Link href={`/demonlist/${demon.id}`}>
        <div className="flex items-center gap-x-8 bg-background border-border border p-8 rounded-2xl hover:translate-x-4 transition-transform duration-300 after:content-[''] after:absolute after:opacity-0 after:inset-0 after:bg-surface hover:after:opacity-30 relative after:duration-200 after:transition-all group">
          <div className='relative z-1'>
            <div className="after:content-[''] after:absolute after:opacity-15 after:inset-0 after:bg-primary group-hover:after:opacity-0 after:duration-200 after:transition-all" />
            <Image
              src={demon.thumbnail ?? '/images/default-thumbnail.jpg'}
              alt={demon.name}
              className="object-cover aspect-auto w-56 h-auto border-background/50 border-2 shadow-xl"
              width={224}
              height={126}
            />
          </div>
          <div className="flex flex-col gap-2 z-1">
            <h2 className="text-left font-mono font-bold text-xl text-muted">
              <span className="tracking-widest">#{demon.ranking}</span> |{' '}
              <span className="text-xl font-bold gradient-text font-figtree">{demon.name}</span>
            </h2>
            <p className="text-sm tracking-widest text-main">{demon.points} Points (100%)</p>
            <p className="text-sm text-muted tracking-widest flex gap-2 items-center">
              Created by {demon.creator} <CreateIcon />
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default DemonCard
