"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CatchAllRedirect() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true); // State to control modal visibility

  useEffect(() => {
    // Automatically redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push('/admin/dashboard');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timeout
  }, [router]);

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Invalid Address</h2>
            <p className="mb-4">The page you're trying to access doesn't exist.</p>
            <p className="mb-4">You will be redirected to the dashboard in 3 seconds.</p>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-700"
            >
              Go to Dashboard Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
