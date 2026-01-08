import { cookies } from 'next/headers';
import { cache } from 'react';
import { User } from '@/types/types';

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) return null;

  try {
    const res = await fetch('http://127.0.0.1:8000/api/v1/users/me', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!res.ok) return null;

    const user = await res.json();
    return user;
  } catch (error) {
    console.error('Auth Fetch Error:', error);
    return null;
  }
});
