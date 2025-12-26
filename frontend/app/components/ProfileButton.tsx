'use client';

import Link from "next/dist/client/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileButton = ({ username }: { username: string | null }) => {
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
    <div className="relative border p-2">
      <button onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}>{username ?? "Profile"}</button>
      <div
        className={`absolute z-20 top-full right-0 bg-red-500 text-white p-2 rounded mt-2 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-y-2">
          <li className="">
            <Link href="/me">
              <div>View Profile</div>
            </Link>
          </li>
          <li className="">
            <Link href="/settings">
              <div>Settings</div>
            </Link>
          </li>
          <li className="">
            <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileButton