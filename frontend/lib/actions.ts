'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateLeaderboardProfile(userId: number) {
  revalidateTag(`leaderboard-profile-${userId}`, 'max');
}
