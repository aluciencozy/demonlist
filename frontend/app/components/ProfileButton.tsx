'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileButton = ({ username, isAdmin, id, avatar_url }: { username: string, isAdmin: boolean, id: number, avatar_url: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('http://localhost:3000/api/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  return (
    <div className="relative flex-center p-2">
      <button onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)} className="rounded-full shadow-xl overflow-hidden hover:scale-110 transition-all duration-200">
        <Image src={avatar_url || "/images/default-pfp.jpg"} alt="Profile Picture" width={40} height={40} />
      </button>
      <div
        className={`absolute z-20 top-full right-0 bg-background text-white p-2.5 rounded mt-2 border border-border shadow-xl transition-all duration-200 transform origin-top ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-y-2.5 font-figtree font-semibold text-muted">
          <li className="hover:text-main hover:-translate-y-0.5 transition-all duration-200">
            <Link href={`/leaderboard/${id}`}>Profile</Link>
          </li>
          <li className="hover:text-main hover:-translate-y-0.5 transition-all duration-200">
            <Link href="/settings">Settings</Link>
          </li>
          {isAdmin && <li className="hover:text-main hover:-translate-y-0.5 transition-all duration-200">
            <Link href="/admin">Admin</Link>
          </li>}
          <li className="hover:text-main hover:-translate-y-0.5 transition-all duration-200">
            <button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileButton