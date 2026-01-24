import ProfileButton from './ProfileButton';
import AccountButtons from './AccountButtons';
import { User } from '@/types/types';

interface NavUserProps {
  user: User | null;
}

export default function NavUser({ user }: NavUserProps) {
  if (!user) return <AccountButtons />;

  return <ProfileButton user={user} />;
}
