'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CameraIcon, Loader2, User, Mail, ShieldAlert } from 'lucide-react';
import { revalidateLeaderboardProfile } from '@/lib/actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
        headers: { Authorization: `Bearer ${token}` },
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
      await revalidateLeaderboardProfile(user.id);
      router.refresh();
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : 'Error uploading profile picture');
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
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
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
      toast.error(e instanceof Error ? e.message : 'Error changing password');
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-10 font-figtree">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Settings</CardTitle>
              <CardDescription>Manage your account details and preferences.</CardDescription>
            </div>
            {user.is_superuser && (
              <Badge variant="destructive" className="flex gap-1 items-center">
                <ShieldAlert className="w-3 h-3" /> Admin
              </Badge>
            )}
          </div>
        </CardHeader>

        <Separator className="mb-6" />

        <CardContent className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-auto flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="rounded-full p-1 border-2 border-border relative overflow-hidden">
                <Image
                  src={avatarUrl || '/images/default-pfp.jpg'}
                  alt="Profile Picture"
                  width={150}
                  height={150}
                  className={`rounded-full object-cover aspect-square transition-opacity duration-300 ${
                    uploading ? 'opacity-50' : 'opacity-100'
                  }`}
                />

                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                )}
              </div>

              <Label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 p-2.5 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg ${
                  uploading ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                <CameraIcon className="w-5 h-5" />
                <input
                  id="avatar-upload"
                  type="file"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                  accept="image/*"
                  disabled={uploading}
                />
              </Label>
            </div>
            <p className="text-sm text-muted-foreground text-center max-w-37.5">
              Click the camera icon to upload a new photo.
            </p>
          </div>

          <div className="flex-1 w-full space-y-6">
            <div className="grid gap-2">
              <Label className="text-muted-foreground">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input value={user.username} readOnly className="pl-9 bg-muted/50" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-muted-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input value={user.email} readOnly className="pl-9 bg-muted/50" />
              </div>
            </div>

            <div className="pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    Change Password
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-106.25">
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>Make sure your new password is secure.</DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handlePasswordChange} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="old-password">Old Password</Label>
                      <Input
                        id="old-password"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="ghost">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button type="submit">Update Password</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsClient;
