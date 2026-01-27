import { cacheTag, cacheLife } from 'next/cache';
import { Profile } from '@/types/types';
import { API_BASE_URL } from '@/lib/config';

export const getLeaderboard = async (): Promise<Profile[]> => {
  'use cache';
  cacheTag('leaderboard');
  cacheLife('hours');

  const res = await fetch(`${API_BASE_URL}/api/v1/leaderboard/`);

  if (!res.ok) {
    const errorData = await res.json();
    let errorMessage = 'Failed to fetch leaderboard';

    if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
    else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;

    throw new Error(errorMessage);
  }

  return await res.json();
};

export const getLeaderboardProfile = async (id: string) => {
  'use cache';
  cacheTag(`leaderboard-profile-${id}`);
  cacheLife('hours');

  const res = await fetch(`${API_BASE_URL}/api/v1/leaderboard/${id}`);

  if (!res.ok) {
    const errorData = await res.json();
    let errorMessage = 'Failed to fetch leaderboard profile';

    if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
    else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;

    throw new Error(errorMessage);
  }

  return await res.json();
};
