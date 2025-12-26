import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { email, username, password } = await req.json();

  const response = await fetch('http://127.0.0.1:8000/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, username, password }),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Register failed' }, { status: 401 });
  }

  const data = await response.json();

  const cookieStore = await cookies();
  cookieStore.set({
    name: 'access_token',
    value: data.access_token,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  return NextResponse.json({ success: true });
}