// app/utils/auth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAuthCheck = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            router.push('/admin/login');
        }
        setLoading(false); // Set loading to false once the check is done
    }, [router]);

    return { loading, isAuthenticated };
};
