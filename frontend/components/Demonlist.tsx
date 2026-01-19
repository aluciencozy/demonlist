'use client';

import { Input } from '@/components/ui/input';

import DemonCard from '@/components/DemonCard';
import { Demon } from '@/types/types';
import { useState } from 'react';

const Demonlist = ({ demonlist }: { demonlist: Demon[] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section>
      <Input
        type="text"
        placeholder="Search Demons..."
        value={searchTerm}
        className="mb-7 p-5 w-full"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-7">
        {demonlist
          .filter((demon: Demon) => demon.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((demon: Demon) => (
            <DemonCard key={demon.id} demon={demon} />
          ))}
      </div>
    </section>
  );
};

export default Demonlist;
