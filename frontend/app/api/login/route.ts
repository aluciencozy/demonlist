import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);

  const response = await fetch('http://127.0.0.1:8000/api/v1/auth/token', {
    method: 'POST',
    body: formData.toString(),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (!response.ok) 
    return NextResponse.json({ error: 'Login failed' }, { status: 401 });
  
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