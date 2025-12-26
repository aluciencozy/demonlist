import { cookies } from 'next/headers';

export default async function UserStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) {
    return <p>Not logged in</p>;
  }

  const response = await fetch('http://127.0.0.1:8000/api/v1/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return <p>Failed to load user data</p>;
  }

  const user = await response.json();

  return <p>Logged in as {user.username}</p>;
}
