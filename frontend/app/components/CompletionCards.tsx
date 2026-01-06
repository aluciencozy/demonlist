import { cookies } from 'next/headers';
import { PendingCompletion, Demon } from '@/types/types';
import CompletionCard from './CompletionCard';

const CompletionCards = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) return <p>Unauthorized</p>;

  const res = await fetch('http://127.0.0.1:8000/api/v1/auth/me', {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) return <p>Unauthorized</p>;

  const user = await res.json();

  if (!user.is_superuser) return <p>Unauthorized</p>;

  const getPendingCompletions = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/v1/completions/pending', { 
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
    });
    if (!response.ok) throw new Error('Failed to fetch pending completions');
    
    return await response.json();
  }

  const getDemonlist = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/v1/demonlist/');
    if (!response.ok) throw new Error('Failed to fetch demonlist');

    return await response.json();
  };

  const pendingCompletions = await getPendingCompletions();
  const demonlist = await getDemonlist();

  pendingCompletions.forEach((completion: PendingCompletion) => {
    const demon = demonlist.find((demon: Demon) => demon.id === completion.demon_id);
    if (demon) completion.demon = demon;
  });
  console.log(pendingCompletions);

  return (
    <div>
      {pendingCompletions.map((completion: PendingCompletion) => (
        <CompletionCard key={completion.id} completion={completion} token={token.value} />
      ))}
    </div>
  )
}

export default CompletionCards