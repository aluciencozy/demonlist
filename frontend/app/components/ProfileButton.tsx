'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '@/types/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const ProfileButton = ({ user }: { user: User }) => {
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const router = useRouter();

  const storageKey = `avatar_timestamp_${user.id}`;

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

  const handleLogout = async () => {
    localStorage.removeItem(storageKey);
    await fetch('http://localhost:3000/api/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  const baseAvatarUrl = user.avatar_url || '/images/default-pfp.jpg';
  const currentAvatarUrl = timestamp ? `${baseAvatarUrl}?t=${timestamp}` : baseAvatarUrl;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full hover:scale-110 transition-all duration-200 outline-none">
        <Avatar>
          <AvatarImage src={currentAvatarUrl} alt="Profile" />
          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 font-figtree">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`/leaderboard/${user.id}`} className="cursor-pointer">
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            Settings
          </Link>
        </DropdownMenuItem>

        {user.is_superuser && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="cursor-pointer">
              Admin
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-500 focus:text-red-500"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
