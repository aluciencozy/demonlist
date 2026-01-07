'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SettingsClientProps {
  user: {
    email: string;
    username: string;
    is_superuser: boolean;
    id: number;
    avatar_url: string | null;
  };
  token: string;
  timestamp: number;
}

const SettingsClient = ({ user, token, timestamp }: SettingsClientProps) => {
  //! Add functionality to change username/password later
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user.avatar_url ? `${user.avatar_url}?t=${timestamp}` : null
  );

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/auth/me/avatar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      setAvatarUrl(`${data.url}?t=${Date.now()}`);
      alert('Profile picture uploaded successfully');
    } catch (e) {
      console.error(e);
      alert('Failed to upload profile picture');
    } finally {
      setUploading(false);
    }
  };

  const handleUsernameChange = () => {};
  const handlePasswordChange = () => {};

  return (
    <div className="flex-center w-full gap-50 font-figtree">
      <div className="min-w-max h-full relative">
        <Image
          src={avatarUrl || "/images/default-pfp.jpg"}
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-full relative"
        />
        <button
          className="glint-hover-large flex-center rounded-full p-3 bg-surface text-sm font-bold text-main overflow-hidden font-figtree absolute -bottom-1 -right-1"
        >
          <input type="file" onChange={handleProfilePictureChange} className="absolute inset-0 opacity-0 cursor-pointer" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-camera-icon lucide-camera"
          >
            <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </button>
      </div>
      <div className="w-full flex flex-col justify-items-center justify-center gap-6">
        <div className="text-lg font-figtree border-b border-primary font-medium">
          Email: <span className="text-muted font-mono ml-2">{user.email}</span>
        </div>
        <div className="text-lg font-figtree border-b border-primary font-medium">
          Username: <span className="text-muted font-mono ml-2">{user.username}</span>
        </div>
        <div className="flex items-center gap-10 mt-4">
          <button
            onClick={handleUsernameChange}
            className="glint-hover-large flex-center relative rounded-xl px-4 py-2 bg-linear-to-r from-primary/90 to-primary/70 text-sm font-bold text-main overflow-hidden font-figtree"
          >
            Change Username
          </button>
          <button
            onClick={handlePasswordChange}
            className="glint-hover-large flex-center relative rounded-xl px-4 py-2 bg-linear-to-r from-primary/90 to-primary/70 text-sm font-bold text-main overflow-hidden font-figtree"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsClient
