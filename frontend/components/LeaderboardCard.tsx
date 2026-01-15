'use client'

import { Profile } from '@/types/types';
import Link from 'next/link';

const LeaderboardCard = ({ profile }: { profile: Profile }) => {
  return (
    <div className="p-1">
      <Link href={`/leaderboard/${profile.id}`}>{profile.username}</Link>
    </div>
  );
};

export default LeaderboardCard;