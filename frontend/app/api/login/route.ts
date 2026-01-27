import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { API_BASE_URL } from '@/lib/config';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);

  const res = await fetch(`${API_BASE_URL}/api/v1/auth/token`, {
    method: 'POST',
    body: formData.toString(),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (!res.ok) {
    const errorData = await res.json();
    let errorMessage = 'Login failed';

    if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
    else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;

    return NextResponse.json({ detail: errorMessage }, { status: 401 });
  }

  const data = await res.json();

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
