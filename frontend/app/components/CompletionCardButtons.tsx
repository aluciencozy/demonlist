'use client';

import { PendingCompletion } from '@/types/types';

const CompletionCardButtons = ({ completion, token }: { completion: PendingCompletion, token: string }) => {
  const handleClick = async (status: 'approved' | 'rejected') => {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/completions/${completion.id}/status`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: status }),
    });
    if (!res.ok) throw new Error('Failed to update completion status');

    const data = await res.json();
    console.log(data);
    //! Later can add logic here to update the UI after a successful response
  };
  
  return (
    <div className="z-1 flex-center gap-6">
      <button
        onClick={() => handleClick('approved')}
        className="bg-green-500 glint-hover overflow-hidden text-white px-4 py-2 rounded-lg"
      >
        Approve
      </button>
      <button
        onClick={() => handleClick('rejected')}
        className="bg-red-500 glint-hover overflow-hidden text-white px-4 py-2 rounded-lg"
      >
        Reject
      </button>
    </div>
  );
};

export default CompletionCardButtons;