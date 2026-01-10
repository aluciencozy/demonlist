'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CameraIcon } from 'lucide-react';

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

  const [uploading, setUploading] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
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
    if (oldPassword.length === 0 || newPassword.length === 0) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/users/me/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword,}),
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
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : 'An error occurred while changing password');
    }
  };

  return (
    <div className="flex-center w-full gap-50 font-figtree">
      <div className="min-w-max h-full relative">
        <Image
          src={avatarUrl || '/images/default-pfp.jpg'}
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-full relative"
        />
        <div className="cursor-pointer flex-center overflow-hidden rounded-full bg-background p-3 text-sm font-bold text-main font-figtree absolute -bottom-1 -right-1 hover:text-red transition-colors">
          <input
            type="file"
            onChange={handleProfilePictureChange}
            className="absolute inset-0 cursor-pointer opacity-0 z-20"
          />
          <CameraIcon size={24} color="currentColor" />
        </div>
      </div>
      <div className="w-full flex flex-col justify-items-center justify-center gap-6">
        <div className="text-lg font-figtree border-b border-primary text-neutral-400">
          Email: <span className="text-primary ml-2">{user.email}</span>
        </div>
        <div className="text-lg font-figtree border-b border-primary text-neutral-400">
          Username: <span className="text-primary ml-2">{user.username}</span>
        </div>
        <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg" className='max-w-max'>Change Password</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-106.25">
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>Enter your new password below.</DialogDescription>
              </DialogHeader>

              <form onSubmit={handlePasswordChange}>
                <div className="grid gap-5">
                  <div className="grid gap-3">
                    <Label htmlFor="old-password">Old Password</Label>
                    <Input
                      id="old-password"
                      name="old-password"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      name="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>

                <DialogFooter className="mt-5">
                  <DialogClose asChild>
                    <Button variant="outline" className='cursor-pointer'>Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className='cursor-pointer'>Update</Button>
                </DialogFooter>
              </form>
            </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default SettingsClient
