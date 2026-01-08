'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const [changingPassword, setChangingPassword] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
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
      const res = await fetch('http://127.0.0.1:8000/api/v1/users/me/avatar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = 'Something went wrong';

        if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
        else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;

        throw new Error(errorMessage);
      }

      const data = await res.json();

      setAvatarUrl(`${data.url}?t=${Date.now()}`);
      toast.success(data.message);

      window.dispatchEvent(new Event('avatar-updated'));
      router.refresh();
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : 'An error occurred while uploading the profile picture');
    } finally {
      setUploading(false);
    }
  };
  
  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (oldPassword.length === 0 || password.length === 0) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/users/me/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ old_password: oldPassword, new_password: password,}),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = 'Something went wrong';

        if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
        else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;

        throw new Error(errorMessage);
      }
  
      const data = await res.json();
      toast.success(data.message);
  
      setChangingPassword(false);
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : 'An error occurred while changing password');
    }
  };

  return (
    <div className="flex-center w-full gap-50 font-figtree">
      {changingPassword && (
        <div className="absolute inset-0 bg-black/50 flex-center z-50">
          <div className="bg-[#0a0018] p-8 rounded-lg flex flex-col gap-6">
            <form onSubmit={handlePasswordChange}>
              <div className="flex items-center gap-3 border-b border-primary">
                <label htmlFor="old-password" className="min-w-max text-muted">
                  Old Password:
                </label>
                <input
                  type="password"
                  id="old-password"
                  required
                  className="w-full p-3 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 border-b border-primary">
                <label htmlFor="new-password" className="min-w-max text-muted">
                  New Password:
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3  outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <button
                type="submit"
                className="flex-center rounded-xl px-4 py-2 bg-primary hover:bg-primary/70 transition-all duration-300 text-sm font-bold text-main overflow-hidden font-figtree mt-4 w-full"
              >
                Change Password
              </button>
            </form>
            <button
              onClick={() => setChangingPassword(false)}
              className="flex-center rounded-xl px-4 py-2 bg-primary hover:bg-primary/70 transition-all duration-300 text-sm font-bold text-main overflow-hidden font-figtree"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="min-w-max h-full relative">
        <Image
          src={avatarUrl || '/images/default-pfp.jpg'}
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-full relative"
        />
        <div className="glint-hover-large cursor-pointer flex-center overflow-hidden rounded-full p-3 bg-surface text-sm font-bold text-main font-figtree absolute -bottom-1 -right-1">
          <input
            type="file"
            onChange={handleProfilePictureChange}
            className="absolute inset-0 cursor-pointer opacity-0 z-20"
          />
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
        </div>
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
            onClick={() => setChangingPassword(true)}
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
