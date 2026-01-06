'use client';

import { Demon } from '@/types/types';
import { useState } from 'react';

const SubmitCompletionForm = ({ demonlist, token }: { demonlist: Demon[], token: string }) => {
  const [selectedDemon, setSelectedDemon] = useState<string>('');
  const [proofVideoUrl, setProofVideoUrl] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/completions/', {
        method: 'POST',
        body: JSON.stringify({ demon_id: selectedDemon, proof_link: proofVideoUrl }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Submission successful', data);

      setSelectedDemon('');
      setProofVideoUrl('');
    } catch (e) {
      console.error('Submission failed', e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-center flex-col gap-5">
      <label htmlFor="demon-select" className="sr-only">
        Select Demon
      </label>
      <select
        id="demon-select"
        className="w-full p-3 border border-border rounded outline-none"
        value={selectedDemon}
        onChange={(e) => setSelectedDemon(e.target.value)}
      >
        <option value="" className="bg-background text-main">
          Select Demon
        </option>
        {demonlist.map((demon: Demon) => (
          <option key={demon.id} value={demon.id} className="bg-background text-main">
            {demon.name}
          </option>
        ))}
      </select>
      <label htmlFor="proof-video-url" className="sr-only">
        Proof Video URL
      </label>
      <input
        type="url"
        id="proof-video-url"
        placeholder="Proof Video URL"
        className="w-full p-3 border border-border rounded outline-none"
        value={proofVideoUrl}
        onChange={(e) => setProofVideoUrl(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary/40 hover:text-main text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-200"
      >
        Submit
      </button>
    </form>
  );
}

export default SubmitCompletionForm