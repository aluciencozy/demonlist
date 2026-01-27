'use client';

import { Input } from '@/components/ui/input';
import DemonCard from '@/components/DemonCard';
import MotionWrapper from '@/components/MotionWrapper';
import { Demon } from '@/types/types';
import { useState } from 'react';

const Demonlist = ({ demonlist }: { demonlist: Demon[] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section className="w-full">
      <Input
        type="text"
        placeholder="Search Demons..."
        value={searchTerm}
        className="mb-6 lg:mb-7 p-4 lg:p-5 w-full lg:max-w-3xl"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-4 lg:gap-7 w-full">
        {demonlist
          .filter((demon: Demon) => demon.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((demon: Demon, index: number) => (
            <MotionWrapper key={demon.id} delay={index * 0.03}>
              <DemonCard demon={demon} />
            </MotionWrapper>
          ))}
      </div>
    </section>
  );
};

export default Demonlist;
