'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Login successful', data);

      router.push('/');
      router.refresh();
    } catch (e) {
      console.error('Login failed', e);
    }
  }

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 w-125 bg-[#0a0a0a]">
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login