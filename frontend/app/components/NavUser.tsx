import ProfileButton from './ProfileButton';
import AccountButtons from './AccountButtons';
import { getCurrentUser } from '@/lib/auth';

export default async function NavUser() {
  const user = await getCurrentUser();
  
  if (!user) return <AccountButtons />;

  return <ProfileButton user={user} />;
}
