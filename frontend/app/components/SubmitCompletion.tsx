import { cacheTag, cacheLife } from 'next/cache';
import { cookies } from 'next/headers';
import SubmitCompletionForm from '@/app/components/SubmitCompletionForm';
import SubmitCompletionUnauthorized from '@/app/components/SubmitCompletionUnauthorized';

const SubmitCompletion = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) return <SubmitCompletionUnauthorized />;

  const res = await fetch('http://127.0.0.1:8000/api/v1/auth/me', {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) return <SubmitCompletionUnauthorized />;

  const user = await res.json();

  const getDemonlist = async () => {
    'use cache';

    cacheTag('demonlist');
    cacheLife('hours');

    const response = await fetch('http://127.0.0.1:8000/api/v1/demonlist/');
    if (!response.ok) throw new Error('Failed to fetch demonlist');

    return await response.json();
  };

  const demonlist = await getDemonlist();

  return (
    <main className="max-w-7xl mx-auto mt-30 relative mb-20 flex-center flex-col font-figtree">
      <h1 className="font-bold text-7xl font-figtree text-main text-shadow-xs text-shadow-main">
        Submit Completion
      </h1>
      <div className="mt-10 w-full max-w-3xl">
        <SubmitCompletionForm demonlist={demonlist} token={token.value} />
      </div>
    </main>
  );
};

export default SubmitCompletion;
