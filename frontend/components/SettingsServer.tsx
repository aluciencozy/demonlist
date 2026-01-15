import { cookies } from 'next/headers';
import SettingsClient from './SettingsClient';
import { getCurrentUser } from '@/lib/auth';

const SettingsServer = async () => {
  const user = await getCurrentUser();

  if (!user) return <p>Please log in to access settings.</p>;

  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';

  const currentTimestamp = Date.now();

  return (
    <SettingsClient user={user} token={token} timestamp={currentTimestamp} />
  );
}

export default SettingsServer;