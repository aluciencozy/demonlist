'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Register successful', data);
      
      router.push('/login');
      router.refresh();
    } catch (e) {
      console.error('Register failed', e);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 w-125 bg-[#0a0a0a]">
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
