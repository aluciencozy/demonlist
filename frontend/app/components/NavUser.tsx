import { cookies } from 'next/headers';
import ProfileButton from './ProfileButton';
import AccountButtons from './AccountButtons';

export default async function NavUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) 
    return <AccountButtons />;

  const res = await fetch('http://127.0.0.1:8000/api/v1/auth/me', {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) 
    return <AccountButtons />;

  const user = await res.json();

  return <ProfileButton username={user.username} />;
}
