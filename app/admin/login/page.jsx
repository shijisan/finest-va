"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';

export default function Login() {
    const router = useRouter(); 
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Handle response and potential errors
        try {
            const data = await res.json();

            if (res.ok) {
                // Save the token to local storage
                localStorage.setItem('token', data.token);
                router.push('/admin/dashboard'); // Redirect to dashboard on successful login
            } else {
                setError(data.message); // Set the error message
            }
        } catch (error) {
            console.error('Failed to parse JSON:', error);
            setError('An unexpected error occurred.'); // Handle unexpected errors
        }
    };

    return (
        <>
        <Nav />
        <div className="container mt-28">
          <form onSubmit={handleSubmit} className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-medium text-center">Admin Login</h2>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
  
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-sm font-semibold">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username} // Controlled input
                onChange={(e) => setUsername(e.target.value)} // Update username state
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                required
              />
            </div>
  
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-semibold">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password} // Controlled input
                onChange={(e) => setPassword(e.target.value)} // Update password state
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                required
              />
            </div>
  
            <button
              type="submit"
              className="w-full py-2 font-semibold text-center rounded-lg shadow-lg focus:outline-none"
            >
              Login
            </button>
          </form>
        </div>
        <Footer />
      </>
    );
}
