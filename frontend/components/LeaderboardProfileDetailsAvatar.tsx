'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LeaderboardProfileDetailsAvatar = ({
  avatar_url,
  user_id,
}: {
  avatar_url: string;
  user_id: string;
}) => {
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const router = useRouter();
  const storageKey = `avatar_timestamp_${user_id}`;

  useEffect(() => {
    const savedTimestamp = localStorage.getItem(storageKey);
    if (savedTimestamp) {
      setTimestamp(Number(savedTimestamp));
    }

    const handleAvatarUpdate = () => {
      const newTime = Date.now();
      setTimestamp(newTime);
      localStorage.setItem(storageKey, newTime.toString());
    };

    window.addEventListener('avatar-updated', handleAvatarUpdate);
    return () => window.removeEventListener('avatar-updated', handleAvatarUpdate);
  }, [router, storageKey]);

  const baseAvatarUrl = avatar_url || '/images/default-pfp.jpg';
  const currentAvatarUrl = timestamp ? `${baseAvatarUrl}?t=${timestamp}` : baseAvatarUrl;

  return (
    <Image
      src={currentAvatarUrl}
      alt="Profile Picture"
      width={150}
      height={150}
      className="rounded-full relative"
    />
  );
};

export default LeaderboardProfileDetailsAvatar;
