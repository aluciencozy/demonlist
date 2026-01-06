'use client';

import Image from 'next/image';

interface SettingsClientProps {
  user: {
    email: string;
    username: string;
    is_superuser: boolean;
    id: number;
  };
}

const SettingsClient = ({ user }: SettingsClientProps) => {
  //! Add functionality to change username/password/profile picture later
  const handleProfilePictureChange = () => {};
  const handleUsernameChange = () => {};
  const handlePasswordChange = () => {};

  return (
    <div className="flex-center w-full gap-50 font-figtree">
      <div className="min-w-max h-full relative">
        {/* //! put user profile picture here later instead of default */}
        <Image
          src="/images/default-pfp.jpg"
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-full relative"
        />
        <button
          onClick={handleProfilePictureChange}
          className="glint-hover-large flex-center rounded-full p-3 bg-surface text-sm font-bold text-main overflow-hidden font-figtree absolute -bottom-1 -right-1"
        >
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
