import { cacheTag, cacheLife } from 'next/cache';
import { cookies } from 'next/headers';
import SubmitCompletionForm from '@/components/SubmitCompletionForm';
import SubmitCompletionUnauthorized from '@/components/SubmitCompletionUnauthorized';
import { getCurrentUser } from '@/lib/auth';
import { getDemonlist } from '@/lib/demonlist';

const SubmitCompletion = async () => {
  const user = await getCurrentUser();

  if (!user)
    return (
      <SubmitCompletionUnauthorized message="You must be logged in to submit a completion :/" />
    );

  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';

  const demonlist = await getDemonlist();

  return (
    <main className="max-w-7xl mx-auto mt-20 lg:mt-30 relative mb-20 flex-center flex-col font-figtree px-4">
      <h1 className="font-bold text-4xl sm:text-6xl lg:text-7xl font-figtree text-main text-shadow-xs text-shadow-main text-center">
        Submit Completion
      </h1>
      <div className="mt-6 lg:mt-10 w-full max-w-3xl">
        <SubmitCompletionForm demonlist={demonlist} token={token} />
      </div>
    </main>
  );
};

export default SubmitCompletion;
