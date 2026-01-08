import { cacheTag, cacheLife } from 'next/cache';
import { Demon } from '@/types/types';

export const getDemonlist = async (): Promise<Demon[]> => {
  'use cache';
  cacheTag('demonlist');
  cacheLife('days');

  const res = await fetch('http://127.0.0.1:8000/api/v1/demonlist/');

  if (!res.ok) {
    const errorData = await res.json();
    let errorMessage = 'Failed to fetch demonlist';

    if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
    else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;

    throw new Error(errorMessage);
  }

  return await res.json();
};

export const getDemon = async (id: string) => {
  'use cache';
  cacheTag(`demon-${id}`);
  cacheLife('days');

  const res = await fetch(`http://127.0.0.1:8000/api/v1/demonlist/${id}`);

  if (!res.ok) {
    const errorData = await res.json();
    let errorMessage = 'Failed to fetch demon';

    if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
    else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;

    throw new Error(errorMessage);
  }

  return await res.json();
};
