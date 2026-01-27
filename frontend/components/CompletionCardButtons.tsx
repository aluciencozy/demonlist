'use client';

import { PendingCompletion } from '@/types/types';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/config';

const CompletionCardButtons = ({
  completion,
  token,
}: {
  completion: PendingCompletion;
  token: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = async (status: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/completions/${completion.id}/status`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = 'Failed to update completion status';

        if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
        else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;

        throw new Error(errorMessage);
      }

      startTransition(() => {
        router.refresh();
      });

      const data = await res.json();
      console.log(data);
      toast.success(`Completion ${status}`);
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : 'Failed to update completion status');
    }
  };

  return (
    <div className="z-1 flex-center gap-6">
      <button
        onClick={() => handleClick('approved')}
        disabled={isPending}
        className="bg-green-500 overflow-hidden text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
      >
        {isPending ? 'Processing...' : 'Approve'}
      </button>
      <button
        onClick={() => handleClick('rejected')}
        disabled={isPending}
        className="bg-red-500 overflow-hidden text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
      >
        {isPending ? 'Processing...' : 'Reject'}
      </button>
    </div>
  );
};

export default CompletionCardButtons;
