import { cookies } from 'next/headers';
import { PendingCompletion, Demon } from '@/types/types';
import CompletionCard from './CompletionCard';
import { getCurrentUser } from '@/lib/auth';
import { getDemonlist } from '@/lib/demonlist';

const CompletionCards = async () => {
  const user = await getCurrentUser();

  if (!user || !user.is_superuser) return <p className='text-red-500 text-6xl font-bold font-figtree'>Unauthorized</p>;

  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';

  const getPendingCompletions = async (): Promise<PendingCompletion[]> => {
    const res = await fetch('http://127.0.0.1:8000/api/v1/completions/pending', { headers: { Authorization: `Bearer ${token}` } });

    if (!res.ok) {
      const errorData = await res.json();
      let errorMessage = 'An error occurred';

      if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
      else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;

      throw new Error(errorMessage);
    }
    
    return await res.json();
  }

  const pendingCompletions = await getPendingCompletions();
  const demonlist = await getDemonlist();

  pendingCompletions.forEach((completion: PendingCompletion) => {
    const demon = demonlist.find((demon: Demon) => demon.id === completion.demon_id);
    if (demon) completion.demon = demon;
  });

  return (
    <>
      <div className="mb-8 space-y-15">
        <h1 className="font-bold text-7xl font-figtree text-main text-shadow-xs text-shadow-main">
          Admin Dashboard
        </h1>
        <h2 className="text-4xl font-bold font-figtree text-muted text-shadow-xs">Verify Pending Completions</h2>
      </div>
      <div className='flex flex-col gap-8'>
        {pendingCompletions.length > 0 ? pendingCompletions.map((completion: PendingCompletion) => (
          <CompletionCard key={completion.id} completion={completion} token={token} />
        )) : <p className='text-muted'>No pending completions :/</p>}
      </div>
    </>
  )
}

export default CompletionCards