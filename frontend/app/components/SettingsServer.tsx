import { cookies } from 'next/headers';
import SettingsClient from './SettingsClient';

const SettingsServer = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) return <p>Not logged in</p>;

  const res = await fetch('http://127.0.0.1:8000/api/v1/auth/me', {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) return <p>Failed to load user data</p>;

  const user = await res.json();

  const currentTimestamp = Date.now();

  return (
    <SettingsClient user={user} token={token.value} timestamp={currentTimestamp} />
  );
}

export default SettingsServer