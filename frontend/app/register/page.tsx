'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = 'Registration failed';

        if (typeof errorData.detail === 'string') errorMessage = errorData.detail;
        else if (Array.isArray(errorData.detail)) errorMessage = errorData.detail[0].msg;

        throw new Error(errorMessage);
      }

      const data = await res.json();
      console.log('Register successful', data);
      
      router.push('/');
      router.refresh();
      toast.success('Registered successfully!');
    } catch (e) {
      console.error('Register failed', e);
      toast.error(e instanceof Error ? e.message : 'Registration failed, please try again.');
    } finally {
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <main className="h-screen flex-center flex-col bg-background font-figtree">
      <div className="flex flex-col items-center h-112.5 w-[90%] sm:h-125 sm:w-125 shadow-lg rounded-sm md:p-12 sm:p-9 p-7">
        <div className="relative">
          <h1 className="text-3xl font-bold mb-5 text-shadow-sm text-shadow-primary after:h-0.5 after:w-[180%] after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:bg-primary after:shadow-xl">
            Register
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="h-full w-full flex flex-col gap-y-5 justify-center"
        >
          <div className="relative flex flex-col w-full after:w-full after:h-0.5 after:bg-primary after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 after:content-[''] after:scale-x-0 after:origin-center focus-within:after:scale-x-100">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder=" "
              onChange={(e) => setUsername(e.target.value)}
              required
              className="peer bg-background relative border-primary shadow-sm outline-0 w-full px-4 pt-5 pb-1 transition-all duration-300 focus:outline-none"
            />
            <label
              htmlFor="username"
              className="text-lg tracking-wide absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 peer-placeholder-shown:scale-100 peer-focus:scale-60 peer-focus:-translate-y-7 peer-focus:translate-x-[-20%] peer-[:not(:placeholder-shown)]:scale-60 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:translate-x-[-20%] peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-gray-500"
            >
              Username
            </label>
          </div>
          <div className="relative flex flex-col w-full after:w-full after:h-0.5 after:bg-primary after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 after:content-[''] after:scale-x-0 after:origin-center focus-within:after:scale-x-100">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer bg-background relative border-primary shadow-sm outline-0 w-full px-4 pt-5 pb-1 transition-all duration-300 focus:outline-none"
            />
            <label
              htmlFor="email"
              className="text-lg tracking-wide absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 peer-placeholder-shown:scale-100 peer-focus:scale-60 peer-focus:-translate-y-7 peer-focus:translate-x-[-20%] peer-[:not(:placeholder-shown)]:scale-60 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:translate-x-[-20%] peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-gray-500"
            >
              Email
            </label>
          </div>
          <div className="relative flex flex-col w-full after:w-full after:h-0.5 after:bg-primary after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 after:content-[''] after:scale-x-0 after:origin-center focus-within:after:scale-x-100">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer bg-background relative border-primary shadow-sm outline-0 w-full px-4 pt-5 pb-1 transition-all duration-300 focus:outline-none"
            />
            <label
              htmlFor="password"
              className="text-lg tracking-wide absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 peer-placeholder-shown:scale-100 peer-focus:scale-60 peer-focus:-translate-y-7 peer-focus:translate-x-[-20%] peer-[:not(:placeholder-shown)]:scale-60 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:translate-x-[-20%] peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-gray-500"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary/40 hover:text-main text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-200 mt-5"
          >
            Register
          </button>
        </form>
        <div className="flex gap-x-2 justify-center items-center">
          <p className="text-white">Already registered?</p>
          <Link
            href="/login"
            className="text-primary hover:text-secondary transition-colors duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
