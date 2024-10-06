"use client";

import AdminNav from "@/app/components/AdminNav";
import { useRouter } from 'next/navigation'; 
import { useState, useEffect } from 'react'; 
import { useAuthCheck } from "@/app/utils/auth"; // Import the auth check function


export default function Dashboard() {
    const router = useRouter(); 
    const [error, setError] = useState(''); 
    const { loading, isAuthenticated } = useAuthCheck(); // Get loading and auth status

    // While loading, return a loading message
    if (loading) {
        return <p>Loading...</p>;
    }

    // If not authenticated, you should already have redirected
    if (!isAuthenticated) {
        return null; // Or return a message, but the router should redirect
    }

    return (
        <>
            <AdminNav />
            <div className="container mt-28">
                <h1>Hello World!</h1>
                {error && <p className="text-red-500">{error}</p>} 
            </div>
        </>
    );
}
