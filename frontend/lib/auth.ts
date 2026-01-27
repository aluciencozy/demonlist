import { cookies } from 'next/headers';
import { cache } from 'react';
import { User } from '@/types/types';
import { API_BASE_URL } from '@/lib/config';

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
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
