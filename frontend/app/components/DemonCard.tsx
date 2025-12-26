'use client'

import { Demon } from '@/types/types'
import Link from 'next/link';

const DemonCard = ({ demon }: { demon: Demon }) => {
  return (
    <div className='p-1'>
      <Link href={`/demonlist/${demon.id}`}>{demon.name}</Link>
    </div>
  )
}

export default DemonCard