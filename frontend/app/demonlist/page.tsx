import DemonCard from '@/app/components/DemonCard';
import { cacheTag, cacheLife } from 'next/cache';
import { Demon } from '@/types/types';

const getDemonlist = async () => {
  'use cache';

  cacheTag('demonlist');
  cacheLife('hours');

  const response = await fetch('http://127.0.0.1:8000/api/v1/demonlist/');
  if (!response.ok) throw new Error('Failed to fetch demonlist');

  return await response.json();
}

const DemonlistPage = async () => {
  const demonlist = await getDemonlist();

  return (
    <div>
      <h1 className="font-bold text-5xl mt-5 p-4">Demonlist</h1>
      {demonlist.map((demon: Demon) => (
        <DemonCard key={demon.id} demon={demon} />
      ))}
    </div>
  );
}

export default DemonlistPage