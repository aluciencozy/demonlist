'use client';

import { Demon } from '@/types/types';
import { useState, useRef } from 'react';

const SubmitCompletionForm = ({ demonlist, token }: { demonlist: Demon[]; token: string }) => {
  const [selectedDemon, setSelectedDemon] = useState<string>('');
  const [proofVideoUrl, setProofVideoUrl] = useState<string>('');
  const [proofVideoFile, setProofVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDemon) {
      alert('Please select a demon.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (proofVideoUrl) {
        const response = await fetch('http://127.0.0.1:8000/api/v1/completions/', {
          method: 'POST',
          body: JSON.stringify({ demon_id: selectedDemon, proof_link: proofVideoUrl }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to submit URL');
        alert('Completion submitted successfully!');
      } else if (proofVideoFile) {
        const formData = new FormData();
        formData.append('file', proofVideoFile);

        const response = await fetch(`http://127.0.0.1:8000/api/v1/completions/upload?demon_id=${selectedDemon}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');
        alert('Video uploaded and completion submitted successfully!');
      }

      resetForm();
    } catch (e) {
      console.error(e);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedDemon('');
    setProofVideoUrl('');
    setProofVideoFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="flex-center flex-col gap-5">
      <select
        className="w-full p-3 border border-border rounded outline-none bg-background"
        value={selectedDemon}
        onChange={(e) => setSelectedDemon(e.target.value)}
        required
        disabled={isSubmitting}
      >
        <option value="">Select Demon</option>
        {demonlist.map((demon) => (
          <option key={demon.id} value={demon.id}>
            {demon.name}
          </option>
        ))}
      </select>

      <div className="w-full flex-center gap-10">
        <input
          type="url"
          placeholder="Proof Video URL"
          className="w-full p-3 border border-border rounded outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          value={proofVideoUrl}
          onChange={(e) => setProofVideoUrl(e.target.value)}
          disabled={!!proofVideoFile || isSubmitting}
        />

        <p className="text-center min-w-max">- OR -</p>

        <input
          type="file"
          ref={fileInputRef}
          accept="video/mp4,video/quicktime,video/webm"
          onChange={(e) => setProofVideoFile(e.target.files ? e.target.files[0] : null)}
          className="w-full p-3 border border-border rounded outline-none cursor-pointer disabled:opacity-50"
          disabled={!!proofVideoUrl || isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-400"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default SubmitCompletionForm;
