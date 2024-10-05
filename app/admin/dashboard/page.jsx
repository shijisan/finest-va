"use client";

import AdminNav from "@/app/components/AdminNav";
import { useRouter } from 'next/navigation'; 
import { useState, useEffect } from 'react'; 
import { isAuthenticated } from '@/app/utils/auth'; 

export default function Dashboard() {
    const router = useRouter(); 
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/admin/login'); 
        } else {
            setLoading(false); 
        }
    }, [router]);

    const handleLogout = async () => {
        localStorage.removeItem('token'); // Remove token from local storage
        router.push('/admin/login'); // Redirect to login page
    };

    if (loading) {
        return <p>Loading...</p>; 
    }

    return (
        <>
            <AdminNav />
            <div className="container mt-28">
                <h1>Hello World!</h1>
                {error && <p className="text-red-500">{error}</p>} 
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 mt-4 font-semibold text-white bg-red-500 rounded-lg focus:outline-none"
                >
                    Logout
                </button>
            </div>
        </>
    );
}
